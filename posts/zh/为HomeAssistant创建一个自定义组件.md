---
title: 为HomeAssistant创建一个自定义组件
date: 2024-03-24 13:56:09
toc: true
tags: [ homeassistant, ha, 自定义组件, 教程 ]
---

## 前言

关于 Home Assistant 的顶级玩法，可以去看看我的b站视频合集 [Home Assistant顶级玩法](https://space.bilibili.com/137683614/channel/collectiondetail?sid=2050382)

> 本教程为 Home Assistant 社区的文章翻译，原文链接为：<https://community.home-assistant.io/t/tutorial-for-creating-a-custom-component/204793>，作者：Aaron Godfrey。

下面是原作者的帖子内容：

> 我开始了一个如何为 HomeAssistant 创建自定义组件的教程。<https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_1/>
> 想要获得一些反馈，看看其中的一些内容是否有用，或者我是否忽略了一些显而易见的东西。

- [第一部分 如何创建一个基础集成(integration)](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_1/)
- [第二部分 讨论单元测试和持续集成](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_2/)
- [第三部分 重点添加一个配置流(Config Flow)](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_3/)
- [第四部分 重点添加一个选项s流(Options Flow)](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_4/)
- [第五部分 讨论使用 devcontainer 进行调试](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_5/)

## 构建一个 Home Assistant 自定义组件

## 第一部分：项目结构和基础

### 介绍

这个系列的文章为一个教程，旨在教会我们为 Home Assistant 创建一个自定义组件。我们将从一个组件骨架开始，然后在每篇教程里添加内容。在本系列教程文章的最后，你将会拥有一个完整的功能组件，至少可以在 [集成质量衡量(Integration Quality Scale)](https://developers.home-assistant.io/docs/integration_quality_scale_index/) 中拿到 Sliver 级别的分数。

在这个项目中，我们将使用 [GitHub API](https://developer.github.com/v3/) 来为我们的组件提供数据。这已经有一个存在的 [GitHub 集成](https://www.home-assistant.io/integrations/github/)，但我们将自己去实现并尝试去通过单元测试去提升这个已有的组件质量。可以通过 UI 来进行配置，并添加一些实用的功能。

每篇文章都是 [GitHub 仓库](https://github.com/boralyl/github-custom-component-tutorial) 的不同分支。所以你可以在自己的编辑器中跟随学习，或者浏览适当分支中的代码。此部分的更改都可以在 [feature/part1 分支](https://github.com/boralyl/github-custom-component-tutorial/compare/feature/bare-repo...feature/part1?expand=1) 中查阅。

我建议去查阅官方的 [开发者文档](https://developers.home-assistant.io/)，从 Home Assistant 架构中的概念获得一些灵感。

### 项目结构

一开始，我们需要为自定义组件生成基础的文件。幸运的是，通过 [cookiecutter project template](https://github.com/boralyl/cookiecutter-homeassistant-component) 项目做这件事很容易。

让我们安装 [cokkiecutter](https://github.com/cookiecutter/cookiecutter)，并且通过问答的方式创建我们的工程。

```text
$ pip install cookiecutter
$ cookiecutter https://github.com/boralyl/cookiecutter-homeassistant-component
domain [my_component]: github_custom
name [My Component]: Github Custom
docs_url [https://github.com/user/my_component/]: https://github.com/boralyl/github-custom-component-tutorial
owner [@user]: @boralyl
Select config_flow:
1 - yes
2 - no
Choose from 1, 2 [1]: 2
Select iot_class:
1 - Assumed State
2 - Cloud Polling
3 - Cloud Push
4 - Local Polling
5 - Local Push
Choose from 1, 2, 3, 4, 5 [1]: 2
```

> 注意：一开始我们跳过了使用配置流(Config Flow)。我们将在教程的后续文章中添加这部分功能。

![项目结构树](https://aarongodfrey.dev/assets/images/0012_project_tree.png)

现在我们忽略根目录文件夹下的文件和测试文件夹。让我们关注 `custom_components` 和`github_custom` 文件夹。[manifest.json](https://developers.home-assistant.io/docs/creating_integration_manifest) 包含了一些我们这个组件的基础信息，Home Assistant 在加载的时候会用到。`const.py` 只包含了我们的常量，在这个案例中，我们只有组件的 [DOMAIN](https://developers.home-assistant.io/docs/creating_integration_manifest#domain)。`__init__.py` 包含了 `async_setup` 方法，用于 Home Assistant 加载我们的组件。

此时自定义组件是合法的，如果你放在自己的 Home Assistant `config` 目录下，Home Assistant 会正常加载，并不会实际创建任何实体(entities)。

### 实现组件

现在，是时候开始编写我们的组件了。有四个基本部分去实现。

1. 在 `manifest.json` 添加我们的 requrements。如果我们需要添加额外的 python 依赖，就需要在这添加。
2. 添加我么自己的配置规则。将用于定义我们希望用户添加进他们的 `configuration.yaml` 文件的值。
3. 在 Home Assistant 中注册我们所有的传感器。将在 `async_setuo_platform` 函数中进行实现。
4. 创建一个实体，用于代表我们希望手收集关于 GitHub 仓库的状态和数据。这个实体也应该实现 `async_update` 方法，从 GitHub 来更新数据。

这四处的最终实现，可以看这个 [diff](https://github.com/boralyl/github-custom-component-tutorial/compare/feature/bare-repo...feature/part1?expand=1)。在这个 diff 中需要注意的是，我从 `__init__.py` 中移除了 `async_setup` 函数。因为我们集成使用了 platform，所以我们可以移除这部分的代码。这些 platforms 允许你在集成中拥有多个实例，而不是仅一个。如果你正在同时监控公共仓库和一些使用 GitHub Enterprise 服务的私有仓库，是非常有用的。

### 向 manifest.json 添加 requirements

我们将使用 [gidgethub](https://github.com/brettcannon/gidgethub) 库来与 GitHub API 进行交互。它支持开箱即用的异步通信，可以非常简单直接使用。

```diff
  "documentation": "https://github.com/boralyl/github-custom-component-tutorial",
  "domain": "github_custom",
  "name": "Github Custom",
-  "requirements": []
+  "requirements": ["gidgethub[aiohttp]==4.1.1"]
}
```

我们向 `requirements` 数组添加了指定版本的依赖。值得注意的是，指定一个异步库是可选的。为了保证这些依赖被正确安装，我们需要额外在 requirement 中额外指定 `aiohttp`。

### platform 配置方案

对于我们的 platform 配置方案来说，我们需要根据官方的 [GitHub 集成](https://www.home-assistant.io/integrations/github/) 来实现。下面是一个基础的示例：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: github_custom
    access_token: !secret github_access_token
    repositories:
      - path: "home-assistant/core"
        name: "Home Assistant Core"
      - path: "boralyl/steam-wishlist"

  - platform: github_custom
    url: https://my.enterprisegithubserver.com
    access_token: !secret github_access_token
    repositories:
      - path: "company/some-repo"
```

我们不需要去修改任何内容，所以配置方案与官方集成的完全一致：

```text
REPO_SCHEMA = vol.Schema(
    {vol.Required(CONF_PATH): cv.string, vol.Optional(CONF_NAME): cv.string}
)

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        vol.Required(CONF_ACCESS_TOKEN): cv.string,
        vol.Required(CONF_REPOS): vol.All(cv.ensure_list, [REPO_SCHEMA]),
        vol.Optional(CONF_URL): cv.url,
    }
)
```

上面的内容非常直观。我们需要一个 access token和一个仓库列表。每个仓库必须拥有 `path` 键，并且可以可选有一个 `name` 键。我们也可选地允许 `url` 键，用于指定 GitHub Enterprise 服务器的 URL。

上面的代码本质上扩展了 Home Assistant platform 配置方案，添加了我们自己的域名 `github_custom`。它将为我们处理认证和展示适当的错误。

### 注册传感器(snesors)

下一步注册我们所有的传感器。将为在 platform 配置中的每一个仓库创建一个传感器。习惯上，Home Assistant 会查看你 `sensor.py` 文件中的 `setup_platform` 或者 `async_setup_platform` 函数。如果你的数据通过库来更新，使用 [asyncio](https://docs.python.org/3/library/asyncio.html) 来异步获取数据，那就需要使用 `async_setup_platform` 函数，否则应该创建 `setup_platform` 函数。自我们使用 [gidgethub](https://github.com/brettcannon/gidgethub/) 库，他就支持异步，所以我们使用 `async_setup_platform` 函数。

```python
async def async_setup_platform(
    hass: HomeAssistantType,
    config: ConfigType,
    async_add_entities: Callable,
    discovery_info: Optional[DiscoveryInfoType] = None,
) -> None:
    """Set up the sensor platform."""
    session = async_get_clientsession(hass)
    github = GitHubAPI(session, "requester", oauth_token=config[CONF_ACCESS_TOKEN])
    sensors = [GitHubRepoSensor(github, repo) for repo in config[CONF_REPOS]]
    async_add_entities(sensors, update_before_add=True)
```

在这个函数中，我们首先恢复了一个 aiohttp 客户端会话。这个帮助函数关注于为我们恢复和关闭会话（少了一件需要考虑的事情）。我们初始化了 GitHub API 客户端，并为在我们的 `configuration.yaml` 中指定的每个仓库创建了一个 `GitHubRepoSensor`。

`async_add_entities` 函数将会处理在 Home Assistant 中添加和注册这些传感器。第二个参数也值得注意。将它设置为 `True` 的时候，是告诉 Home Assistant 应该在集成完成加载之后进行数据更新。没有这项配置（或者将它设置为 `False`），它将等待直到 `SCAN_INTERVAL` 的时候再从 GitHub 获取数据。这个常量被设置为 10 分钟，意味着在 Home Assistant 重启之后的十分钟，我们的传感器是没有数据的。（或者，它将在恢复重新启动之前的上一次更新的数据）

### GitHub 仓库传感器实体和 async_update

上一部分我们定义了组件的实体和指定了一个更新方法。简而言之，并没有包含完整的类（的代码），但你可以在 [GitHub](https://github.com/boralyl/github-custom-component-tutorial/blob/3ee4d35f4bb08ec92098e7932fd4ae29ef59591f/custom_components/github_custom/sensor.py#L98-L212) 中查看。

最主要的部分是它继承了 `homeassistant.helpers.entity.Entity`，这个类为你实现了必要的逻辑。我们定义自己的返回传感器的 `状态(state)` 属性。这个传感器，我们将使用 commit sha 的前7个字符。我们也定义了一个返回和状态相关的 `device_state_attributes` 的属性，可以被自动化(automations) 和 lovelace UI 所使用。

我们的自定义传感器类必须指定一个 `update` 或者 `async_update` 方法，为了从 GitHub 获取数据用于更新 state 和 device_state_attributes。再者，我们的组件使用了一个支持异步的库，包含了 `async_update` 方法，用于从 GitHub 获取需要的数据。Home Assistant 将基于我们定义的间隔调用这个方法，习惯上去寻找一个叫做 `SCAN_INTERVAL` 的常量。如果你在自己的文件中定义了它，它的值是一个 `datetime.timedelta` 实例。我们为自己的组件使用10分钟作为更新的间隔。

```python
SCAN_INTERVAL = timedelta(minutes=10)
```

### 结语

我们现在有了一个完整功能的异步自定义组件，是官方集成的提升版。

在后面的文章中，我们将简单的讨论如何去为帮助提升自定义组件，来添加单元测试和捕获 bugs。我们也会使用 [GitHub Actions](https://github.com/features/actions) 来为自定义组件添加持续集成。
