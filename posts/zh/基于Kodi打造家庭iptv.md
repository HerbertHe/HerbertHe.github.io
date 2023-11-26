---
title: 基于 Kodi 打造家庭 IPTV
date: 2023-11-26 17:00
toc: true
tags: [ 
    Kodi, iptv, 小米电视
]
---

## 写在前面的

随着智能电视的不断迭代，运行 Android 系统的电视设备越来越变的不纯粹，更像是一个默认为影音app入口的超大号显示设备。面对着无数的广告和数不尽的会员，更纯粹的看电视变得奢求，因此开始了基于 Kodi 的家庭 iptv 改造计划。

如果你还不知道什么是 Kodi，请参阅 <https://kodi.tv/> 了解这个项目

## 开始改造

改造计划分为下面的步骤，网络上有大量的教程，这里只对于关注点提供必要的流程。

本次改造计划使用小米电视，其他的 Android 电视设备大同小异。

### 安装 Kodi 至小米电视

- 打开小米电视 **“开发者模式”**
- 打开小米电视 **“允许安装未知应用”** 和 **“允许 adb 调试”**
- 手机安装 **甲壳虫ADB助手**
- 手机下载 **[Kodi for Android](https://kodi.tv/download/android/) APK**（根据架构选择 **v20 ARMV7A** 或者 **v20 ARMV8A**，这取决于你的电视指令集架构，在系统设置中进行查看）
- 打开 **甲壳虫ADB助手** 填写电视 **IP地址** 进行连接（记得电视用遥控器确认允许）
- 通过 **甲壳虫ADB助手** 向电视安装 **Kodi for Android** APK 应用

至此，在电视上安装 Kodi 就完成了。

> 需要解释的是：小米虽然在系统上限制了第三方APP的安装，但我们使用了 **甲壳虫ADB助手** 对电视进行操作，因为 `adb` 本身是 Android 调试桥，便于 Android 开发者对设备应用进行调试，权限比较高，小米在系统层面不对其进行限制。

### 对 Kodi 进行配置

好看的主题提升用户使用体验，所以我们对 Kodi 进行一些简单的配置。

> 需要注意的是：**在稳定使用之前，🙅不要将语言切换到中文！否则，会造成很大的麻烦！** 教程步骤为中文翻译，请注意对应的英文选项

- 更改下载源

Kodi 的插件托管在 GitHub 上，国内能不能连上纯粹是个玄学问题。因此我们需要对 Kodi 的插件仓库软件源进行替换，虽然 清华TUNA 和 中科大USTC 源镜像站都提供了参考文档。但是 Nexus（20）版本，无法找到对应的文件 `addons/repository.xbmc.org/addon.xml`。在查阅官方仓库源代码后发现，需要首先安装 `repository.xbmc.org` 仓库插件，这是我之前完全没想到的.

你可以通过 <https://dl.jieec.cn/s/k5h6> 下载 `repository.xbmc.org` 插件，已经是修改完成了的。

下载完成之后，通过 **ADB助手** 上传文件至电视文件根目录，通过 `插件 -> 从 zip 文件安装插件 -> 找到对应的 zip 文件安装`

电视遥控器按左键，对插件仓库进行更新。

- 更改 Kodi 主题

在试错很多次之后，我选择了 Arctic Horizon 2 作为 Kodi 的主题，原因无他，好看罢了。

首先，需要下载安装 [repository.jurialmunkey](https://jurialmunkey.github.io/repository.jurialmunkey/) 仓库差价，安装步骤与上面 `repository.xbmc.org` 插件完全一致。

其次，需要预先按顺序安装 [script.module.jurialmunkey](https://dl.ghpig.top/https://github.com/jurialmunkey/script.module.jurialmunkey/archive/refs/tags/v0.1.17.zip)（下载安装）、`script.skinvariables` 和 `plugin.video.themoviedb.helper`（电视上的 jurialmunkey 插件仓库搜索安装）插件，不然在下载主题的时候会报错。

然后在 `插件 -> 从库里安装 -> jurialmunkey 插件库 -> look and feel -> 皮肤 -> Arctic Horizon 2` 安装即可，花费的时间不短，耐心等待。

- 设置中文页面

切换字体 `右上角小齿轮 -> 系统设置 -> UI -> skin -> font -> CJK - Chinese/Japanese/Korean`

> 默认 CJK 是不被支持的，因此先切换字体才不会导致乱码

切换区域 `regional -> language -> chinese(simple)`

> 设置简体中文

至此 Kodi 的基础安装全部完成！

### 支持 IPTV

光有 Kodi 是不行的，还需要配置 IPTV 才能收看 Kodi 所说的 **直播电视**。

分为两部分：

- Kodi 安装客户端插件 `IPTV Simple Client`
- 添加 `IPTV Simple Client` 配置文件

安装客户端插件的流程与上面一致，通过 `插件 -> 从库里安装 -> Kodi 官方库 -> PVR 客户端 -> IPTV Simple Client` 安装即可。

配置 `IPTV Simple Client`：`插件的设置 -> 添加附加设置` 分别填写 **名称** 、 **位置选择：远程路径（互联网地址）** 和 **M3U播放列表URL**

你可以使用 <https://epg.pw/test_channel_page.html> 提供的 m3u 服务，或者使用我维护的 <https://m3u.ibert.me> 服务

## 关于 `HerbertHe/iptv-sources`

[HerbertHe/iptv-sources](https://github.com/HerbertHe/iptv-sources/tree/gh-pages) 是 <https://m3u.ibert.me> 服务的 GitHub 开源项目，对 <https://epg.pw/test_channel_page.html> 提供的 m3u 服务进行了过滤去重。考虑到了主要面向中国大陆用户，所以没有对所有的服务进行处理，如果有其他需要请 fork 进行二次开发。

本次改造如使用 <https://m3u.ibert.me> 服务，请关闭本地缓存，打开自动更新，并且调整更新频率为 120 分钟。

支持的 m3u 源，请参考 <https://m3u.ibert.me> 进行查看使用，每 3 个小时自动更新一次。

获取最及时的消息，请加入 Discord <https://discord.gg/EawDmkpd>，这是最及时获取更新消息的地方。
