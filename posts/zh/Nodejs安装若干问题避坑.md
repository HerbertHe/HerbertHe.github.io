---
title: Nodejs安装若干问题避坑
date: 2020-01-26 21:43:54
toc: true
tags: [ Nodejs , Frontend , 前端开发 , 环境搭建 , nvm ]
---

## nodejs的windows下传统安装

[nodejs官网](https://nodejs.org/en/)下载：LTS为长期支持版，Current是最新版

> 根据官网给的安装包一步步来即可安装

## nodejs的不同版本安装思考

由于平时可能涉及到的node版本不同导致所用的代码会出现各种各样的问题，node的版本管理工具切换node版本显得比较重要！在`Linux/Mac`端`nvm`很好的解决了版本管理的问题，在Windows端不可使用`nvm`进行管理！

Github项目[nvm-windows](https://github.com/coreybutler/nvm-windows)利用go语言开发解决了Windows环境下的nodejs管理问题！

> 下面对 `nodejs` 和 `node`, `nvm` 和 `nvm-windows` 不加以区分

<!-- more -->

## 配置安装nvm-windows

1. 首先建议`卸载`本地环境下的nodejs，以便更好地管理node版本

2. [releases](https://github.com/coreybutler/nvm-windows/releases)中下载最新的安装包

    > 建议使用: `nvm-setup.zip` 傻瓜式安装, `nvm-noinstall.zip` 为绿色版需要自行配置

3. 安装配置`nvm-windows`

    * `nvm` 安装路径可以自定义
    * symlink为超链接的目标目录，即用`nvm use`切换node版本时，本质上是切换链接的指向！symlink配置之后安装工具会把链接的地址加入系统环境变量之中，下面将会详述`nvm`的命令和具体使用！这个目录就当成node的安装目录就好了。

## nvm命令详解

* `nvm version`: 查询当前的nvm版本
* `nvm`: 列出所有的命令

    ```shell
    Running version 1.1.7.

    Usage:

    nvm arch                     : 显示node运行在32位还是在64位系统上
    nvm install <version> [arch] : 利用nvm下载node, 可以指定版本下载或者"latest"下载最新稳定版, 可选指定下载32/64位的版本, 默认与系统架构相同。
                                    arch参数为"all"则32/64位版本都下载, 命令后面添加--insecure可以跳过SSL检查下载
    nvm list [available]         : 列出所有的node下载, "nvm list available" 命令可以查看所有可下载的node版本, 别名ls
    nvm on                       : 允许进行node版本管理
    nvm off                      : 不允许进行node版本管理
    nvm proxy [url]              : 为下载配置代理, url参数为空打印当前代理, 参数为"none"删除代理
    nvm node_mirror [url]        : 设置node镜像, 默认是 https://nodejs.org/dist/ （国内可用: https://npm.taobao.org/mirrors/node/）
    nvm npm_mirror [url]         : 设置npm镜像, 默认是 https://github.com/npm/cli/archive/ （国内可用淘宝镜像: https://npm.taobao.org/mirrors/npm/）
    nvm uninstall <version>      : 卸载指定版本node
    nvm use [version] [arch]     : 切换指定使用的node版本, 可选指定32或64位架构, "arch"参数可选
    nvm root [path]              : 设置nvm管理的不同版本node的储存位置, 如果路径没有设置就打印当前nvm安装的目录（ps: 这个其实可以不用设置的）
    nvm version                  : 显示当前Windows环境下nvm的版本, 别名 v
    ```

## Win10一般配置nvm

```shell
# 设置64位架构
nvm arch 64

# 设置node镜像
nvm node_mirror https://npm.taobao.org/mirrors/node/

# 设置npm镜像
nvm npm_mirror https://npm.taobao.org/mirrors/npm/

# 列出所有可以下载的node
nvm list available

# 以12.14.1版本为例下载node
nvm install 12.14.1

# 显示所有已下载的node
nvm list

# 切换使用12.14.1
nvm use 12.14.1
```

## 需要注意的问题

1. `nvm`管理node时，利用npm/yarn全局下载的包只能是下载到当前使用版本的node的node_modules\node_global\node_modules下，如果切换node版本，依赖包是要重新下载的！

2. 由于yarn和npm全局下载的包在node_modules中的结构是不同的，yarn全局下载的包使用PowerShell跑的时候找不到命令，所以强烈建议全局下载例如Taro、Vue、React等的脚手架工具时使用npm做node的依赖包管理，而非yarn
3. 因为yarn可以多线程下载，下载包的速度比npm要快还能多，所以建议在项目中使用yarn进行包管理
4. 安装过程中出现的异常通常可以通过重启或者使用`管理员身份打开`解决

## npm/yarn包镜像源的管理

> 强烈建议使用`yrm`进行镜像源管理

```shell
# 下载yrm
npm install yrm -g

# 列出所有可以使用的镜像源
yrm ls

# 示例使用taobao镜像源
yrm use taobao
```

## yrm命令详解

> 命令行使用`yrm`即可显示所有的yrm命令

```shell
Usage: cli [options] [command]

Options:
  -V, --version                输出版本
  -h, --help                   输出使用信息

Commands:
  ls                           列出所有的仓库
  current                      展示当前的仓库名
  use <仓库名>                 使用指定的仓库
  add <仓库名> <url> [home]    添加一个自定义仓库
  del <仓库名>                 删除一个仓库
  home <仓库名> [browser]      用可选浏览器打开仓库首页
  test [仓库名]                展示指定仓库或者所有仓库的响应时间
  help                         打印帮助
```
