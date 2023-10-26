---
title: 记一次JS线程问题
date: 2020-01-30 16:55:42
toc: true
tags: [ JavaScript, Promise, JS线程, 异步编程 ]
---

## 遇到的错误

![错误图片](/img/微信图片_20200130165732.png)

正如你所见的，报了一个`value below was evaluated just now`的信息，意味着我拿到的是原来的数据而不是最新的，下面伴随一些demo来看看这个问题。

## 问题的引出

问题最早来源于我想拿到`Promise`里面返回的数据，所使用的是`React`并使用`Axios`来访问请求，`Axios`为http的异步请求。这里使用的是`GitHub`和`Gitee`的接口，请求得到当前的指定用户的关注、关注者、Star的仓库和自己仓库的数据量。具体的示例可以参考PC版的 [Jieec Server](https://server.jieec.cn)（目前没有在移动端上适配个人信息相关的，用media隐藏掉了）**目前这个问题并未完全解决**

> 全站代码都已经开源，可以在[HerbertHe/JieecServerPage](https://github.com/HerbertHe/JieecServerPage)获取

因为每次API请求的数据获取有限制，然后就使用了`分页`的操作，并且使用了循环的操作。

## 第一个问题：如何降低`React`中异步更新状态的次数

最开始，我是直接在`Axios`的`.then`直接使用了`this.setState()`的方法，这样直接在获取数据之后直接渲染DOM，这样会导致页面的重复更新。**更重要**的问题是`this.setState()`这个方法也是**异步**的！

> demo如下：

```js
import Axios from 'axios'

// .....省略组件定义.....

constructor(props){
    super(props)
    this.state = {
        result: 0
    }
}

for (let i = 1; i < 4; i++) {
    Axios.get(`https://api.github.com/users/HerbertHe/followers?page=${i}`).then(res => {
            if (res.data.length !== 0) {
                this.setState({
                    result: this.state.result + res.data.length
                })
            }
        }
    )
}
```

因为`this.setState()`的操作是异步的，那么问题来了，我根本拿不到最新的`this.state.result`的值。就意味着`setState()`设置的值根本不能确定是不是少算了，并且受执行的时刻影响，就真的是"薛定谔的猫了"

## 第二个问题：如何抽离请求的代码

参考这个commit[d28a5ebf3d47cd4e090208773f3bade28a499945](https://github.com/HerbertHe/JieecServerPage/commit/d28a5ebf3d47cd4e090208773f3bade28a499945#r37037127)，太多的`Axios`请求导致代码越来越冗余，由于项目是小项目并没有使用`Redux`进行状态管理，而是单独抽取了一个文件[githubAndGiteeData.js](https://github.com/HerbertHe/JieecServerPage/blob/master/src/Components/githubAndGiteeData.js)，数据使用了`_data`这样一个全局变量做
统一管理，然后`export default GetReq()`这个函数供外部使用。参考[commit](https://github.com/HerbertHe/JieecServerPage/commit/01805298a39a90a3feae5d7770d6d3ab8c25d78e#r37037265)

## 第三个问题：获取Promise的返回值

`Axios`是一个Promise，取值需要在`.then`之中，因为作用域的问题，对于更新值使用了`setter`这样的方法，在`Axios`返回之后做一个记录，从而异步操作数据和重复的DOM渲染问题。参考[githubAndGiteeData.js](https://github.com/HerbertHe/JieecServerPage/blob/master/src/Components/githubAndGiteeData.js)。

## 第四个问题：上面引言的错误如何解决

最开始的代码是直接调用`GetReq`的方法并且`console.log()`打印了值，也就出现了上面图的报错，我打印的并不是最新的值。后来我才意识到虽然`js`是单线程的，但是它有协程的存在，函数的执行时机是很有影响的。

> 可以参考这篇文章[彻底明白 JS 线程](https://www.jianshu.com/p/8821c6432fe1)

然后参考CSDN做了一个简单而粗暴的解决办法，可以参考commit[01805298a39a90a3feae5d7770d6d3ab8c25d78e](https://github.com/HerbertHe/JieecServerPage/commit/01805298a39a90a3feae5d7770d6d3ab8c25d78e#r37037489)，通过设置`setTimeout()`的方式强行延时处理设置状态渲染DOM

## 更多的问题和预想解决方案

上面设置定时器处理很依赖API的响应时间，如果API响应很慢的话，会导致渲染数据不准确的情况（已经发现，主要是GitHub API真的不好确认时间）；如果设的时间过长，用户体验会大打折扣。

> 目前预想的解决方案是利用`React`提供的下一个生命周期函数来获取数据，具体需要更多的尝试。
