---
title: EMQ试用Log
date: 2019-07-09 00:01:27
toc: true
tags: [ EMQ, emqx, 物联网, mqtt ]
---

## 什么是EMQ

EMQ是一款部署在服务端的物联网框架，支持主流的物联网协议。更多的介绍可以参考 [EMQ官网](https://www.emqx.io/cn/) 的介绍。

<!-- more -->

## 为什么要选择EMQ

> 各个框架的对比可以参考 [GitHub的一篇比较全面的对比文章](https://github.com/mqtt/mqtt.github.io/wiki/server-support)，其中的emqttd就是这里的EMQ。

EMQ国人开发的，因此在中文文档支持上会好很多，更容易去使用。EMQ提供了可视的数据监控台、大量的API和集成了一些插件，对于快速建立和部署服务端很友好。

## EMQ的安装

作者用的是Win10的系统，在开发上来说个人不是很推荐，但是做硬件和软件客户端的测试和学习还是很不错的！EMQ也提供了Win10的版本！！

官方的简介和安装可以直接参考文档 [开始使用](https://developer.emqx.io/docs/broker/v3/cn/getstarted.html#) 和 [程序安装](https://developer.emqx.io/docs/broker/v3/cn/install.html)

> Win10直接下载zip到非系统盘解压就完事了

## 程序的启动（Win10）

1. 进入文件夹的bin下
2. 打开Git Bash 或者 Windows PowerShell
3. ./emqx.cmd start 启动服务
4. ./emqx_ctl.cmd status 查看状态
5. ./emqx.cmd stop 停止服务

## 在线监控

> 浏览器打开localhost:18083即可进入DashBoard页面，默认用户名是admin，密码是public