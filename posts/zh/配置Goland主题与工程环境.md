---
title: 配置Goland主题与工程环境
date: 2020-03-09 13:58:20
toc: true
tags: [ golang, goland, go ]
---

## 关于Goland与vscode的比较

Goland为JetBrains出品的针对于Go编程的IDE，与IDEA、Webstorm、Pycharm等耳熟能详的IDE的风格基本相似。针对于不同的语言，略有差异。vscode通过安装插件也可以搭建优雅的Go开发环境，但是在参考了很多网上的帖子和走过很多坑之后还是放弃了，继续使用了Goland。

### Goland的优越性

- 代码智能提示
- 完备的项目开发流程

### Goland的缺点

- 纯英文的开发环境，很容易导致功能了解不完全和误操作
- 自不知道哪一版的更新之后，Goland的中文显示就崩掉了，需要自己配置
- 从非Goland创建的工程移植，本地库的导入需要手动操作
- 需要自行做一些IDE关于proxy的配置

## 配置Goland主题和字体

在这里我使用的是`Material Theme UI`这个插件，`File`->`Settings`->`Plugins`->`Marketplace`搜索就好了，选择一个自己喜欢的主题。

<img src="/img/Snipaste_2020-03-09_14-28-07.png" />

字体的配置在`File`->`Settings`->`Editor`的`Font`、`Color Scheme`的`Color Scheme Font`和`Console Font`下

<img src="/img/Snipaste_2020-03-09_14-42-25.png" />

字体推荐使用的是`Fira Code`看起来很舒服，但是在显示的时候如果习惯普通的符号的话，对于`===`、`!=`、`!==`等这些符号看起来可能会比较陌生。字体链接: [GitHub](https://github.com/tonsky/FiraCode)

> 一定要配置`Fallback font`这一项不然汉字可能出现渲染问题！

## 关于IDE配置和项目配置

默认情况下，只要你根据golang的配置要求配置了`GOROOT`和`GOPATH`，IDE都会默认找到对应的本地库，可以通过下图的位置来检查。

<img src="/img/Snipaste_2020-03-09_14-54-57.png" />

<img src="/img/Snipaste_2020-03-09_14-55-42.png" />

<img src="/img/Snipaste_2020-03-09_14-57-00.png" />

## 从别的IDE迁到Goland

根据go语言的特性，默认go的源代码必须位于`GOPATH`的`src`下，go在更新后提供了`go module`的包管理工具，强烈建议在新的项目中使用`go mod init xxx.xxx`的方式使用`go module`来初始化项目的包管理，以此来抽离项目于默认的文件夹。从别的IDE迁移至`Goland`请仔细检查上图中的配置，否则可能会导致本地包智能提示无法识别的问题。

在上图`Go Modules`的proxy配置中，强烈建议改为上图配置以解决国内网络环境对于包下载的不友好，配置 `https://goproxy.cn,direct`

同样建议使用`go env`检查`GOPROXY`，`go env set GOPROXY=https://goproxy.cn,direct`
