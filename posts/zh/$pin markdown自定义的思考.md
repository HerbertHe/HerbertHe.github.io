---
title: markdown自定义的思考
date: 2021-02-07 23:24:40
toc: true
tags: [ markdown, marked.js, vditor, lute, golang, javascript, react native, codeblock-iframe ]
---

## 写在前面的

已经记不清什么时候开始接触的markdown了，好像是从我的一个学长做了我们学校的大数据协会论坛开始的。如果我没记错的话用的还是b3log的开源项目，应该是使用的[Symphony](https://github.com/88250/symphony)。后来听学长说太复杂了，维护无从下手然后删库跑路了😂

也正是他画的这个饼，让我从零开始设计一个社区给不同学科、不同专业的同学来使用，之前实现过的版本并不是很满意（应该在我的链滴帖子里还能找到），然后又开始了重构之路。也正是不断的与markdown不同的编辑器接触，也让我对marked.js、markdown-it、for-editor、lute、vditor等等的编辑器、编译器、渲染器有了很多的接触，对于markdown及其拓展语法有了各种奇奇怪怪的想法

<!-- more -->

## for-editor-herb

for-editor是一个UI设计非常不错的编辑器，它的底层解析引擎为marked.js。marked.js对于markdown的解析渲染在前端非常有名，并且在很多的编辑器上面也得到了应用。for-editor很轻、很小、很美，但是也避免不了出现了不少的bug，也不支持很多的features。当时只算是个开源项目的萌新，给作者提PR没有得到回复，然后给作者发邮件还是没有回复23333我明显感觉到作者好像无意再继续维护下去了，在issues里面也帮助了一些老哥解决了一些问题。

直到有个老哥建议我不如去自己新开一个仓库，然后自己来打包发布2333 其实吧，当时做前端顶多算个页面仔，也就是自己写写页面这个样子，压根也没接触过npm的库咋发布，然后就试错硬着头皮来呗。修复了很多的bug，一度怀疑人生😑尤其是那个编辑器-简直是噩梦，有兴趣的同学可以了解一下前端如何实现一个富文本编辑器🤣我当时一度怀疑我是不是在试图写一个word！！在编辑器开发里其实说问题吧，多也不多，也就是怎么撑开textarea、怎么控制焦点、怎么获取选区这点问题😈当然这只是开个玩笑，实操起来真的是怀疑人生。

for-editor计算行号就明显有个问题，它的行号是基于 `\n` 来计算的，这根本是不准确的。在打开和关闭渲染的时候由于textarea的宽度会发生改变。这就直接会导致，其实字它会换行，其实这跟行号就完全不匹配了。后来我的改进方案是获取容器的实际高度，然后根据字高来算实际的行数。一般默认的字体大小 `font-size: 16px;` ，然后明面上解决了这个问题，但是还是没能解决开关渲染导致的不准确，因为根本不会触发height发生改变。。。这个很大程度上跟设计机制有关系（随便看一看HTML就知道问题了），不过整体体验影响还可以，虽然一度让我想重构整个编辑器。愚以为vscode的体验真的是神仙，vscode其实知道的都知道是基于electron开发的，叹为观止。。。

上面就是举个例子，在for-editor里面也就实现了下面的一些功能，好像有老哥还把这个用于项目了😨

- 更多的工具栏按钮
- 支持数学公式的渲染
- 支持响应式布局
- 支持大纲跳转锚点
- 支持大纲直接生成插入
- 内置简繁体中文、英文和日文的支持
- 支持自定义支持编辑器国际化
- 支持GitHub Diff语法渲染（这个vditor好像并没有完全支持）
- 支持自定义注册代码高亮的语言类型
- 支持emoji短码渲染绘文字emoji
- 支持`==markdown==` 语法行内高亮

其实我之前还准备支持mermaid的，但是之前我一直没有解决渲染的问题，没找到渲染的时机，后来放弃支持了。到后来我其实比较抗拒维护这个项目了，因为我能明显感觉到渲染越来越慢。在这个项目的issue里，也有老哥给我安利过vditor，但是他貌似不会在React里面用emmm。这个项目我几乎调整了80%的代码结构，有一些问题不是很好修复，只能寄希望于重构😭 但是当时又在同步写着pyvm，没有想法继续重构下去。后来业务代码越来越多就没有继续了，被我Achieved了，有4个fork，应该还有老哥还在维护，项目可以在 [for-editor-herb](https://goer.icu/for-editor-herb/) 体验。

在这个项目的开发中，我为了实现一些解析语法去阅读了marked.js的源码。marked.js整个项目的灵魂在于正则表达式，里面的正则表达式写的非常非常厉害。在部分features实现的时候也参考了，marked.js一直到高级使用部分都非常非常熟悉。但是，性能和维护永远是最大的问题。

## lute

先写lute的原因是vditor我一直在不断地关注着，并且一直发现问题和提feature疯狂“作妖”😁希望 @Vanessa V姐不会觉得我超级烦😥

接触lute的原因是有一些feature依靠vditor没办法实现。举个例子，在React Native中如何实现markdown渲染？难道是套一个WebView加载H5？虽然在某些场景不得不去这么实现，比如依赖KaTeX做数学公式渲染、abcjs做五线谱渲染，要不就自己再写一个库？emmm WebView会有很多的限制，而且其实在移动端做markdown即时渲染的体验不会很好。即使是GitHub官方的APP也没有实现，然后我的眼光就放到了lute的身上23333

lute是基于编译原理使用go开发的，刚好一不小心之前自学过golang，然后开始研究lute。看的很浅显，并没有关注生成AST的部分，自己关注的主要是在渲染的处理上。lute关于内部实现方面没有文档，只能自己去看源码。lute的代码结构设计很优秀，很容易上手去阅读定位具体的问题和实现的位置。

分析需求和具体实现：基于lute直接实现组件渲染其实是不实际的，即使后来vditor支持了自定义渲染器，但是其实仍然是string类型的。而React Native的组件是JSX，所以我需要一棵树，自己根据这棵树来遍历递归渲染。很遗憾，lute其实并没有提供这个方法，lute并不是一个纯粹的解析器，而是同时是一个渲染器，直接生成了DOM！如果你尝试在js里面调用lute暴露的某些在godoc有的方法，会直接报错。

其实，lute的节点细分比vditor多很多，好像是有一百四十多个。并且随着特性的不断增加，这个数量还在增加。最后还是实现了“这棵树”的输出，自lute v1.7.1之后支持，是 `lute.RenderJSON()` 这个方法。这棵树实现了vditor绝大多数支持的语法输出，但其实vditor有很多很多的渲染都是在前端完成的。其实依靠这个方法，是可以自行实现与vditor兼容的一个纯粹的渲染器，可以自行看lute的文档 [如何使用](https://github.com/88250/lute#%E5%85%B3%E4%BA%8E-luterenderjson-%E7%9A%84%E4%BD%BF%E7%94%A8)

当我开始基于lute写npm包的时候，发现了一个很严重的问题。lute的包太大了，打包失败。lute是通过gopherjs打包成js的，没办法拆包。上文提到lute其实并不是一个纯粹的解析器，包含了渲染的部分，不知道 @88250 D哥有没有计划把解析的部分单独分离出去，新成立一个极高效率的markdown解析器的项目emmm

如果你想要使用lute自定义渲染器，或者写个库什么的，这并不影响你在web端的使用。可以参考rollup外部依赖的这部分，通过CDN外部引入问题不大的，只是把lute打包会出现问题而已。

## vditor

刚刚查了一下，在vditor总共提过9个issues，开始提的问题是极蠢的，对8起，浪费V姐的时间了。不过好像我提的好几个issue后来的版本实现了2333。比如这个 [使用hint at方法报错](https://github.com/Vanessa219/vditor/issues/592) ，我希望通过拓展 `@` 这个方法，实现at的并不只是一个用户，甚至是可以引用一篇文章等。

不过有一说一，我回顾了一下我的issue还是觉得有一些是真的low😥vditor的源码看了一部分，有的部分还是很有意思的，我也知道了vditor为什么有的方法那么实现。vditor的features更新速度总是比文档快很多，如果想尝鲜之类的话，建议去阅读源码（手动滑稽）

不过，这几天发现vditor有一个问题我还是感觉挺严重的。当vditor和SSR一起使用的时候，可能会导致页面崩溃，甚至是浏览器崩溃。当你在sv模式下输入iframe这个HTML标签，可能会导致一些问题。具体讨论可以看这个issue [#918](https://github.com/Vanessa219/vditor/issues/918) ，需求是在这个issue [#906](https://github.com/Vanessa219/vditor/issues/906) 提出的。

**需要提醒把vditor当作编辑器的项目，markdown原生支持HTML标签，所以除了开启vditor的安全过滤规避XSS攻击（默认打开的）之外，还需要过滤iframe这个标签！如果是论坛等交互式网站的话，可能无法控制用户通过iframe植入广告甚至是非法网站！**

iframe渲染这个需求，其实实现起来并不简单，需要尤其注意过滤iframe的domain和减少iframe导致的GET请求，有的引用网站不排除有访问的风控。在上面issue的讨论里我提供了两种思路，目的就是为了iframe的请求和过滤非法域名，我已经自行实现了第一种思路，依赖下面介绍的库实现起来其实非常简单。其实就是延时渲染或者防抖，这些其实在前端优化里面都有实际的应用，每个人都有不同的实现方式，不赘述了。

## codeblock-iframe语法

这是我在上面的思考中提出的一种语法，也许之前可能有人提也能不一定的。方法特别简单，即把iframe当作代码块处理，遵循TOML的语法，这样对代码侵入很小。

基于这个思想，我写了两个库分别支持了webpack等打包工具的调用和web端直接通过script进行引用，并且为docsify写了插件支持这种语法。

转化过程可以在这个demo里体验 [demo](https://goer.icu/codeblock-iframe/demo/)

docsify的使用在这个demo里体验 [demo](https://goer.icu/docsify-codeblock-iframe/demo/#/)

仓库地址如下

- [toml2iframe](https://github.com/HerbertHe/toml2iframe) 支持webpack等打包工具
- [codeblock-iframe](https://github.com/HerbertHe/codeblock-iframe) 支持web端通过CDN导入
- [docsify-codeblock-iframe](https://github.com/HerbertHe/docsify-codeblock-iframe) 为docsify提供的支持插件

## Todos

在我的脑子里，还有很多很多的feature提供给markdown进行支持，比如最近对markdown支持化学结构式很感兴趣。看了现存的极少的实现方案，感觉不怎么样，可能的话只能自己去研究了，比如zrender

因为自己是物理系的，对公式输入很敏感所以早都基于KaTeX尝试实现了Tex

更多的想法的话，可能会为飞书写应用或者单独开发一个PC端为协同办公提供服务。虽然飞书的云文档很好用，但是还是避免不了它还是不能支撑很多的协同文档问题。所以，为团队的项目开发的话，可能会基于vditor实现一个协同文档的服务，有想法是借鉴slack实现。目标跟思源笔记的方向完全不一样，主要协同文档、文档安全、权限控制等，实现起来的架构设计和算法还是挺难的。

因为idea太多了，导致自己写代码的速度跟不上哈哈哈哈哈

## 我的其他开源项目

就写我认为好用的吧，其他的小插件都在我的仓库里很好找的

- [nbc](https://github.com/NucoTech/nuco-backend-cli) 全称**nuco-backend-cli** 是我针对限制团队commit风格和开发有的常用需求写的命令行工具，基于golang开发，支持MacOS、Linux和Windows三端，已经投入平时的开发之中使用了，并且提供了详细的文档[使用文档](https://nucotech.github.io/nuco-backend-cli)
- [nuco-docsify](https://github.com/NucoTech/nuco-docsify) 这是为了团队项目生成文档模板的工具，支持很多feature。这样我们就不必要每一次都配置文档了，`nbc` 也提供了`nbc docs` 直接生成文档，并且可以通过`nbc serve` 直接启动静态预览！

还有一些文档翻译什么的，如果你觉得好用的话给个Star嗷~哈哈哈哈
