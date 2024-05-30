---
title: Ubuntu环境安装docker记录
date: 2020-01-28 13:26:34
toc: true
tags: [ docker, Ubuntu19, Linux, 记录 ]
---

## 本地环境

* Ubuntu系统版本: Ubuntu19.10
* 软件源: 清华大学Tuna
* 虚拟机环境: VMware 15

## 新装Ubuntu基本配置

```shell
# 配置软件源
sudo nano /etc/apt/sources.list
```

```txt
# 首先注释掉所有的默认软件源
# 添加清华源 (演示系统为Ubuntu19.10, 软件代号为eoan! )

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ eoan-proposed main restricted universe multiverse
```

> Ubuntu各版本代号简介请参考: [传送门](https://blog.csdn.net/zhengmx100/article/details/78352773), 不同版本对应的软件清华源: [传送门](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)

```shell
sudo apt update
sudo apt upgrade
```

## 安装docker社区版

安装docker可以参考docker官网的[Get Docker Engine - Community for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), 也可以使用清华源镜像, 下面是参考*docker官网*和*清华源*对于安装过程的总结

docker支持的Ubuntu版本为:

* Disco 19.04
* Cosmic 18.10
* Bionic 18.04 (LTS)
* Xenial 16.04 (LTS)

> 社区版支持的架构为: `x86_64(amd64)`, `armhf`, `arm64`, `s390x`, `ppc64le`!**Eoan 19.10软件源并不受支持!因此官网和清华源的命令在Ubuntu19.10下并不会成功!**报错请参考: [分享Ubuntu19无法安装docker源问题](https://www.jb51.net/article/173316.htm)

### 卸载旧版本的docker

```shell
sudo apt-get remove docker docker-engine docker.io containerd runc
```

> docker社区版新版本名称为: docker-ce

### 更新软件源

```shell
sudo apt update
```

### 下载依赖

```shell
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

### 添加docker官方的GPG key

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

### 验证指纹信息

```shell
sudo apt-key fingerprint 0EBFCD88

# 输出
pub   rsa4096 2017-02-22 [SCEA]
      9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
sub   rsa4096 2017-02-22 [S]
```

### 设置软件源

> 这一步很关键！

* 官网命令

```shell
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

* 清华源命令

```shell
sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

> 上面的命令会在`/etc/apt/sources.list`文件中添加下面的内容(以清华源为例), 执行之后会报上面提到的错误

```txt
deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu eoan stable
# deb-src [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu eoan stable
```

> 正确的做法是手动更改添加`Disco 19.04`的docker软件源！

```shell
sudo nano /etc/apt/sources.list
```

```txt
deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu disco stable
# deb-src [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu disco stable
```

保存之后执行更新和下载

```shell
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

> 指定版本下载，列出软件源所有可下载的版本可以参考官网的[To install a specific version of Docker Engine - Community](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-engine---community-1), 用包下载安装可以参考[Install from a package](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-from-a-package)

### 验证docker安装

通过跑测试镜像`hello-world`验证

```shell
sudo docker run hello-world
```

> 可能会因为网络的原因报错, 参考这篇帖子: [docker pull error pulling image configuration](https://blog.csdn.net/anjie5595/article/details/101501786)

报错解决

```shell
# 停止docker服务
systemctl stop docker
# 修改daemon配置文件添加加速源
sudo nano /etc/docker/daemon.json
```

```json
{
　　"registry-mirrors": ["https://registry.docker-cn.com","http://hub-mirror.c.163.com"]
}
```

```shell
# 重载配置
systemctl daemon-reload
# 重启docker服务
systemctl restart docker
```

> 测试成功信息

```shell
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 \$ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

```

### docker更新

直接使用`sudo apt upgrade`即可
