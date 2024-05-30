---
title: Hexo基础搭建使用
date: 2019-07-02 22:25:57
toc: true
tags: [ Hexo, nginx ]
---

## Hexo安装环境

* [Node.js](http://nodejs.org/) \([nvm](https://github.com/creationix/nvm)\)
* [Git](http://git-scm.com/)

> 推荐使用nvm，在实践之后发现nvm真的很好用，当然Windows用户可以直接下载安装

```shell
# 下载node.js
 nvm install stable
```

<!-- more -->

## 安装Hexo

> Linux和Mac用户直接使用下面的shell就完事了，Windows用户可以使用在相应文件夹下使用Window Powershell或者git bash然后shell，国内推荐用npm下载cnpm，代替npm来提高依赖的下载速度和稳定性！！（cnpm用的是淘宝的镜像）

```shell
# 下载cnpm
 npm install -g cnpm --registry=https://registry.npm.taobao.org
```

```shell
# 安装Hexo
 cnpm install -g hexo-cli
```

## 文章迁移插件的安装（没有需要的可以跳过）

Hexo官方支持的迁移来源

* [RSS](https://hexo.io/zh-cn/docs/migration#RSS)
* [Jekyll](https://hexo.io/zh-cn/docs/migration#Jekyll)
* [Octopress](https://hexo.io/zh-cn/docs/migration#Octopress)
* [WordPress](https://hexo.io/zh-cn/docs/migration#WordPress)
* [Joomla](https://hexo.io/zh-cn/docs/migration#Joomla)

## 初始化一个Hexo项目

```shell
# 初始化博客项目
 hexo init <项目名称>
 cd <项目名称>      # 打开项目文件夹

# 下载Hexo server
 cnpm install hexo-server --save

# 启动本地预览
 hexo server       # 默认http://localhost:4000
```

> 关于更改预览设置的请参考 [Hexo Server](https://hexo.io/zh-cn/docs/server)

## 修改Hexo的主题

这里以yilia为例（请保证网络环境）

```sh
# 确保在上面项目文件夹下
git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia
```

> themes/yilia 也就是下载到项目文件夹下的themes/yilia目录下

进入themes/yilia下，修改_config.yml文件

```shell
# Linux的进入修改
 cd themes/yilia
 nano _config.yml
```

> Windows建议使用vscode打开编辑

```yml
# 修改内容
themes: yilia        # (上面下载位置文件夹名)
```

## 生成保存更改

> Hexo每次修改或者添加等操作都需要重新生成文件，生成的文件在工程根目录的public文件夹下

```shell
# 清除之前的文件
 hexo clean

# 生成新的文件
 hexo generate
# 或者
 hexo g

# 预览文件
 hexo server
# 或者
 hexo start
# 或者
 hexo s

```

> 在生成操作时可以使用--watch来比较文件的SHA1 checksum仅生成不同的文件

```shell
# 监视文件变动
 hexo generate --watch
```

一条命令也可以这样写

```shell
# 清除保存预览
 hexo clean && hexo g && hexo s
```

## Hexo的目录树

目录树在此就不赘述了，请参考Hexo官方介绍 [资源文件夹](https://hexo.io/zh-cn/docs/asset-folders) 和 [数据文件夹](https://hexo.io/zh-cn/docs/data-files)

> 作为仅markdown用户个人没有采取官方的引用方式而是使用了\! \[ \] \( \)

## Hexo新建文章

Hexo的文章放置在根目录的/sources/_post下

```shell
# 生成一篇md文章
 hexo new <文章名>
# 或者
 hexo n <文件名>
```

> 相关关于写作的具体操作参考 [写作](https://hexo.io/zh-cn/docs/writing)

## Hexo的部署

作为一个Git用户表示也习惯了git的使用，本文采取Gitpage来演示（其他参考 [官方教程](https://hexo.io/zh-cn/docs/deployment)）

### 首先得下载依赖（根目录下）

```shell
# 下载hexo-deployer-git
 cnpm install hexo-deployer-git --save
```

### 修改配置文件

修改根目录下的_config.yml

```yml
deploy:
    type: git
    repo: <Gitpage仓库地址>
    branch: master            # 默认的分支就是master
```

### 重新生成更新文件（同上）

### 发到部署仓库

```shell
# 部署命令
 hexo deploy
# 这里采取非监视的一条shell
 hexo clean && hexo g && hexo d
```

> 私有库要求输入用户名和密码，首次安装git请参考git的设置

## 私人云服务器Git仓库的搭建、nginx配置及部署

### 云Git仓库的建立

```shell
# 设置新的用户
 useradd git           # 添加git用户
 passwd git            # 设置git密码

# 修改权限文件
 chown 740 /etc/sudoers
 nano /etc/sudoers

# 添加内容
# 找到 root ALL=(ALL:ALL) ALL
# 下面添加
git ALL=(ALL:ALL) ALL

# 保存退出
# 修改权限
 chown 440 /etc/sudoers

# 关闭git用户shell权限
 nano /etc/passwd

# 将git:x:1001:1001:,,,:/home/git:/bin/bash改为
git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell
```

在网上教程中会要求su git切换用户！！这里有一个坑，会报错的！！因为上面禁掉了git的shell权限！！可以不切换的

```shell
# 创建git目录
 cd /home/git                # 没有的进入home然后mkdir git
 mkdir blog.git              # 这里以blog.git为例建立git仓库
 git init --bare             # 创建空仓库

# 创建网站目录
 cd /var/www
 mkdir blog                  # 这里/var/www/blog作为网站源码的存放位置
```

网上教程在这里证书配置ssh免密码认证，个人没有采用这种方式（老老实实输密码）

用户组的管理

```shell
 ll /home/git/
 ll /var/www/
# 确保blog.git、blog目录的用户组权限为git:git
```

> 如果不是

```shell
# 执行
 chown git:git -R /var/www/blog
 chown git:git -R /home/git/blog.git
```

### 配置nginx

这里就不赘述nginx的参数意义和配置了，仅仅修改源码放置的配置！！！

```nginx
# 进入/etc/nginx/sites-available下
 nano default

# 修改配置文件的location下的root
# 举个例子

root /var/www/blog;
```

保存退出！然后重新加载nginx

```shell
# 重新加载nginx
 service nginx reload
```

### 配置Git Hooks

```shell
# 创建post-receive文件并添加内容
 cd /home/git/blog.git/hooks           # 切换目录

 nano post-receive
```

添加内容

```txt
#!/bin/bash
GIT_REPO=/home/git/blog.git
TMP_GIT_CLONE=/tmp/blog
PUBLIC_WWW=/var/www/blog
rm -rf ${TMP_GIT_CLONE}
git clone $GIT_REPO $TMP_GIT_CLONE
rm -rf ${PUBLIC_WWW}/*
cp -rf ${TMP_GIT_CLONE}/* ${PUBLIC_WWW}
```

> 上面内容可以按需要修改

保存退出之后，chmod +x post-receive赋予可执行权限

### 配置本地工程部署

上面是基于Gitpage配置的Hexo，在此只需要修改_config.yml的deploy下的repo

```yml
repo: git@你的服务器IP:blog.git               # git访问对应服务器的blog.git仓库
```

然后就是上面的部署操作就完成了！！

## yilia主题下文章预览设置more的操作

```md
<!-- 在你要中断文章结尾的位置添加下面的内容 -->

<!-- more -->
```

## 参考文档

* [官网文档](https://hexo.io/zh-cn/docs/)
* [简书博文](https://www.jianshu.com/p/b926ecf1c6f6)
