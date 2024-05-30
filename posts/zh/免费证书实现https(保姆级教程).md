---
title: 免费证书实现https(保姆级教程)
date: 2019-08-01 11:38:13
toc: true
tags: [ domain, https, Ubuntu18, nginx, ssl ]
categories: [ Linux, 环境搭建 ]
---

## 使用Certbot

Certbot使用的是[Let's Encrypt](https://letsencrypt.org)的证书，该组织也强烈建议使用[Certbot](https://certbot.eff.org/)获取证书。

## Certbot配置

使用这个的目的是获取通配符证书，也就是支持二级域的证书验证，避免https错误的预警。

* 主机商: 阿里云
* 系统版本: Ubuntu18.04
* Web服务: nginx
* 使用环境: python3

<!-- more -->

### 在Certbot

进入[Certbot](https://certbot.eff.org/)选择Web服务和系统

<img src="/img/20190801231928.png">

上图我选的是在Ubuntu18.04上面跑的nginx。下面的提示就是你使用证书实现https之前需要有一个正常运行的网站，并且得有sudo的权限(直接云服务器实例，轻量应用服务器之类的就可以了)

<img src="/img/20190801232653.png">

可以选择 **默认(Default)** 和 **通配符(wildcard)**

#### 默认的就是一张单域名的证书 (我用的是通配符的，直接通配符的可以跳过这一节)

1. SSH连接

2. 添加Certbot PPA到库(阿里云root下不需要sudo就直接可以的，下同)

    ```shell
    apt update
    apt install software-properties-common
    add-apt-repository universe
    add-apt-repository ppa:certbot/certbot
    apt-get update
    ```

3. 下载Certbot

    ```shell
    apt install certbot python-certbot-nginx
    ```

4. 选择使用一种方式(推荐使用手动！！)

   自动：使用Certbot下载证书并且更新你的nginx设置

   ```shell
   certbot --nginx
   ```

   手动：只下载证书，手动配置/重启/重载nginx(手动配置nginx需要对nginx有一定的了解，下面的参考文章里有阿里云ssl配置的参考)

   ```shell
   certbot certonly --nginx
   # 主要区别就在于certonly这个参数，通配符咱们也会遇到
   ```

    > 证书成功生成之后会有信息显示证书所在的位置的，或者运行下面的命令查看证书，然后配置nginx的ssl_certificate和ssl_certificate_key这两个参数就好了。其中privkey.pem对应的就是ssl_certificate_key的目标文件。

    ```shell
    certbot certificates
    ```

5. 测试自动更新

    Certbot支持自动更新证书，然后自动添加了定时任务，就不需要手动更新证书了。官网说在/etc/crontab、/etc/cron.\*/\*或者systemctl list-timers里面使用了，不放心的可以手动添加定时任务并且设置重启nginx的。

    ```shell
    certbot renew --dry-run
    # --dry-run这个参数用于测试的
    ```

6. 查看的网站的状态

   这个要看具体的配置，80端口开启ssl直接就好了，443端口https访问！

#### 通配符证书

1. 检查DNS服务商是否被支持（国内的就不用看了）

2. SSH连接

3. 添加Certbot PPA到库(阿里云root下不需要sudo就直接可以的，下同)

    ```shell
    apt update
    apt install software-properties-common
    add-apt-repository universe
    add-apt-repository ppa:certbot/certbot
    apt-get update
    ```

4. 下载Certbot

    ```shell
    apt install certbot python-certbot-nginx
    ```

5. 下载正确的插件(国内的，从这一步开始咱们就可以下一章了！)

## 通配符插件国内主机如何解决之使用certbot-letencrypt-wildcardcertificates-alydns-au

Certbot官方有给出插件的编写的方法，也有提供第三方的插件(有兴趣自行去了解)。国内有大佬自己写了插件，在此使用的是[certbot-letencrypt-wildcardcertificates-alydns-au](https://github.com/ywdblog/certbot-letencrypt-wildcardcertificates-alydns-au)，文档比较友好，并且issues的回复也很快。

> 特别提醒： **下面官方的使用参考文档中的所有./certbot-auto命令不再支持！请使用直接使用certbot！** 下面是基于aliyun+python+nginx的演示，具体流程和参数说明请直接参考官方文档！！

### 下载到/var下

```shell
cd /var
git clone https://github.com/ywdblog/certbot-letencrypt-wildcardcertificates-alydns-au
cd certbot-letencrypt-wildcardcertificates-alydns-au
chmod 0777 au.sh
```

### 配置domain.ini

```shell
cat domain.ini
# 如果有自己域名后缀的话就不用执行下面修改了
nano domain.ini
```

### 获取阿里云的accesskey(腾讯云请参考官方文档)

参考 [阿里云API Key和Secret的申请](https://help.aliyun.com/knowledge_detail/38738.html)

### 修改au.sh参数

```shell
nano au.sh
```

```bash
# 填写下面两个参数
ALY_KEY=""
ALY_TOKEN=""
# 命令行路径可以修改，/usr/bin/python可以改为/usr/bin/python3，不过作者已经对python2、3都进行了适配
```

### 申请证书(nginx+python)

测试配置

```shell
certbot certonly  -d *.example.com --manual --preferred-challenges dns --dry-run  --manual-auth-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly add" --manual-cleanup-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly clean"
```

```shell
# 一个顶级域名获取通配符证书直接修改*.example.com为自己的就好了，上述命令去掉--dry-run参数
# 以baidu.com举例(python)

certbot certonly  -d *.baidu.com --manual --preferred-challenges dns --manual-auth-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly add" --manual-cleanup-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly clean"
```

SAN通配符证书(直接添加-d 和域名就好了)

```shell
# 基于官方示例(python)
certbot certonly  -d *.example.com -d *.example.org -d www.example.cn --manual --preferred-challenges dns --manual-auth-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly add" --manual-cleanup-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly clean"
```

### 配置nginx

上面包括下面的所有命令都带certonly，因此所有的操作都是只做认证，nginx需要自行修改配置！！

> 证书成功生成之后会有信息显示证书所在的位置的，或者运行下面的命令查看证书，然后配置nginx的ssl_certificate和ssl_certificate_key这两个参数就好了。其中privkey.pem对应的就是ssl_certificate_key的目标文件。

如果不知道证书的位置，可以使用下面的命令查看

```shell
certbot certificates
```

配置完成之后

```shell
service nginx restart
```

### 证书的续期

请直接参考[官方文档](https://github.com/ywdblog/certbot-letencrypt-wildcardcertificates-alydns-au/blob/master/README.md)，下面贴出来的只是基于官方文档的 **阿里云+python版** shell，官方演示shell使用的都是php和阿里云！！

```shell
# 所有证书renew
certbot renew  --manual --preferred-challenges dns --manual-auth-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly add" --manual-cleanup-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly clean"

# 某一张证书续期
# 查看证书
certbot certificates

# 记住证书名，比如simplehttps.com
certbot renew --cert-name simplehttps.com  --manual-auth-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly add" --manual-cleanup-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly clean"
```

### 加入crontab

因为我使用了nginx，所以添加crontab就直接renew成功之后重启nginx了。这里强烈建议service nginx restart重启！nginx -s reload重载nginx.conf配置时并不一定会报错而带来影响debug的问题。

```shell
nano /etc/crontab
```

添加内容

```txt
1 1 */1 * * root certbot-auto renew --manual --preferred-challenges dns --deploy-hook  "service nginx restart" --manual-auth-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly add" --manual-cleanup-hook "/var/certbot-letencrypt-wildcardcertificates-alydns-au/au.sh python aly clean"
```

然后，就结束了！！

## 参考文章

* [linux的crontab定时配置全过程](https://blog.csdn.net/u010102390/article/details/80505451)
* [插件certbot-letencrypt-wildcardcertificates-alydns-au的使用](https://github.com/ywdblog/certbot-letencrypt-wildcardcertificates-alydns-au/blob/master/README.md)
* [Nginx/Tengine服务器安装SSL证书](https://help.aliyun.com/knowledge_detail/95491.html?spm=5176.2020520163.cas.52.5cd656a7iFDuEI)
