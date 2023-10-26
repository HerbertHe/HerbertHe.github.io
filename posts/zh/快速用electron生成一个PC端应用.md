---
title: 快速用electron生成一个PC端应用
date: 2020-03-17 18:13:18
toc: true
tags: [ React, Electron, PC端开发, 框架 ]
---

## 写在前面的

在使用Electron开发应用的过程中遇到了很多小的bug，这些bug有的解决方案尚且有用，有的bug已经过时了。网上的帖子有很多，质量层次不齐，如何去引入解决问题云云，很多的bug是框架自身的问题甚至还活在issues里。为了便于开发electron应用，我整理了三个模板仓库便于直接应用于开发，因为本地没有OSX的环境，所以都是在Win10完成的开发，这也是解决起来最麻烦的。

仓库地址: [Gitee](https://gitee.com/HerbertHe), [GitHub](https://github.com/HerbertHe)

## 为什么是React

针对于Vue的帖子有很多，也很多人使用，我也曾用过。因为自己学过和用过很多开发语言，而React更适用于我的编程逻辑和习惯，Vue面向设计师我感觉是很合适的(～﹃～)~zZ。

## 关于`Eraac`、`Eraasc`和`Eraatc`

`Eraac`全名为`electron-react-antd-antv-cli`，另外的两个`s`和`t`分别代表`sqlite3`的版本和`typescript`的版本。`Eraac`和`Eraasc`的类型检查都是用的`prop-types`，根据react官方的建议和发展趋势`ts`版本会越来越流行，`js`版本降低了开发难度和考虑因素同时存在类型安全的问题，`ts`版本更适合大型应用的开发。

> `sqlite3`的版本本质就是`Eraac`引入了`sqlites3`，但是由于`sqlite3`并不能直接使用。构建同样是一个大坑，因此整理为了一个独立的仓库。**同时需要说明的是：框架限制了electron的版本更新，因为electron版本更新也存在不兼容的问题，如果有需要请自行更新！模板的master分支会尽快跟着electron进行更新的兼容性测试，新项目无需担心。**

### 为什么引入了antd和antv

antd是阿里蚂蚁提供的可视化开源组件，跟饿了么提供的`element-ui`面向vue一样都是组件。antv是蚂蚁提供的数据可视化组件，在一个应用开发中往往数据可视化也能带来更好的用户体验。antv使用的是`BizCharts`，为阿里面向react的商业级数据可视化组件，能够保证足够的开发质量。

## 如何快速生成一个electron应用

第一次使用我建议使用`Eraac`模板，因为足够便捷。根据`README.md`的使用指南，很快就会启动成功一个electron应用，根据自己的需要可以清掉所有的demo和test文件直接构建。

### 基本使用

主进程位于: `/public/electron.js`

渲染进程可以位于任何组件中，只需要使用`window.electron`即可使用`electron`提供的所有API。

### 进阶使用

参考`REAME.md`引用的文档，配置好`package.json`和`.yml`文件，遵循使用说明，即可实现直接构建带有自动升级的PC端应用！

## 使用demo: `EdeverClient`

`EdeverClient`仓库位于[GitHub](https://github.com/HerbertHe/EdeverClient)和[Gitee](https://gitee.com/HerbertHe/EdeverClient)，它是基于`Eraac`和`Gitee OpenAPI`的便于了解系列所有框架实时动态的PC端。目前只提供了win x64的版本，因为没有Mac，如果能参与构建就很感谢了！

下面是使用界面:

<img src="/img/Snipaste_2020-03-17_18-50-54.png"/>

自带了自动更新，无需再考虑版本更新问题，请在 [GitHub](https://github.com/HerbertHe/EdeverClient) 的release中获取（因为Gitee限制了附件大小，实在没有办法）

这同时是一个demo基于`React Hooks`开发，仓库里的代码开源，哪里不会看哪里比文档更直观。

## 写在后面的

作者大三，同时也是考研狗，不是科班出身，更新框架可能有时候会慢一点，欢迎使用，欢迎pr，issues，如果能给个star那就是最好的鼓励了！有任何问题都可以issues。
