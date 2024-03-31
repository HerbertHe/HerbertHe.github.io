---
title: 为HomeAssistant创建一个自定义组件
date: 2024-03-24 13:56:09
toc: true
tags: [ homeassistant, ha, 自定义组件, 教程 ]
---

> 更新于 2024-03-27

## 前言

关于 Home Assistant 的顶级玩法，可以去看看我的b站视频合集 [Home Assistant顶级玩法](https://space.bilibili.com/137683614/channel/collectiondetail?sid=2050382)

> 本教程为 Home Assistant 社区的文章翻译，原文链接为：<https://community.home-assistant.io/t/tutorial-for-creating-a-custom-component/204793>，作者：Aaron Godfrey。

下面是原作者的帖子内容：

> 我开始了一个如何为 HomeAssistant 创建自定义组件的教程。<https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_1/>
> 想要获得一些反馈，看看其中的一些内容是否有用，或者我是否忽略了一些显而易见的东西。

- [第一部分 如何创建一个基础集成(integration)](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_1/)
- [第二部分 讨论单元测试和持续集成](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_2/)
- [第三部分 重点添加一个配置流(Config Flow)](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_3/)
- [第四部分 重点添加一个选项流(Options Flow)](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_4/)
- [第五部分 讨论使用 devcontainer 进行调试](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_5/)

## 构建一个 Home Assistant 自定义组件

## 第一部分：项目结构和基础

### 摘要

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
2. 添加我们自己的配置规则。将用于定义我们希望用户添加进他们的 `configuration.yaml` 文件的值。
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

### 注册传感器(sensors)

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

## 第二部分：单元测试和持续集成

> 原文链接：<https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_2/>

### 摘要

这篇教程我们将讨论如何对自定义组件进行单元测试，并和 GitHub 的持续集成一起使用。我们仍然使用一样的示例项目 [github-custom-component](https://github.com/boralyl/github-custom-component-tutorial)，我已经为此添加了单元测试和一些持续集成的配置。你可以在 [feature/part2 分支](https://github.com/boralyl/github-custom-component-tutorial/compare/feature/part1...feature/part2?expand=1) 寻找这篇文章带来的差异。

### 单元测试

通常来说测试 Home Assistant 自定义组件并没有什么特殊之处，与其他的 python 项目的流程非常相似。然而，在某些情况下，访问一些 Home Assistant 的特定功能会使编写测试变得容易得多。

Home Assistant 有一堆测试工具集和 [pytest fixturew](https://docs.pytest.org/en/latest/fixture.html)，可以帮组我们对 [core repo](https://github.com/home-assistant/core) 写单元测试更加简单（比如获取 `hass` 实例），但是它们并没有被对外暴露，你可以完全不需要复制/粘贴代码直接进行使用。为了使这些对自定义组件的复用性，你可以下载 [pytest 插件](https://github.com/MatthewFlamm/pytest-homeassistant-custom-component) 可以提供这类特性。

如果你使用 [cookiecutter project template](https://github.com/boralyl/cookiecutter-homeassistant-component) 项目来为 Home Assistant 创建自定义组件，在你的 `requirements.test.txt` 中早已包含了这个依赖。如果需要在已经存在的组件中添加单元测试，你可以通过 pip 安装这个依赖。

```bash
pip install pytest-homeassistant-custom-component
```

你不必去做任何额外的事情，`pytest-homeassistant-custom-component` 插件早已提供了 pytest fixtures 的权限。pytest 会自动获取知道这些，你可以直接在测试中进行使用。其中最有用的当属 `hass`，为我们提供了一个 `hass` 实例，可以用于测试环境的启动。当测试配置流的时候，这也非常有用。看看下面的例子：

```python
async def test_flow_user_step_no_input(hass):
    """Test appropriate error when no input is provided."""
    _result = await hass.config_entries.flow.async_init(
        config_flow.DOMAIN, context={"source": "user"}
    )
    result = await hass.config_entries.flow.async_configure(
        _result["flow_id"], user_input={}
    )
    assert {"base": "missing"} == result["errors"]
```

当 pytest 看到你测试函数的参数之时，它将基于名称和所有被注册的插件进行检查。`pytest-homeassistant-custom-component` 对此进行注册，当测试函数被调用的时候将在合适的时候进行初始化。现在我们可以通过配置流的不同的值来运行不同的步骤，并且断言返回的数据。在特定的 case，如果在配置流程中，用户没有配置组件提供任何输入，我们将测试并展示适当的错误。

另外来自 Home Assistant 非常有用的是，`pytest-homeassistant-custom-component` 提供了 `AsyncMock` 用于模拟从异步函数中返回值。在这个例子中，我们对 `github.getitem` 异步函数进行模拟，扔出一个异常。

```python
from pytest_homeassistant_custom_component.async_mock import AsyncMock, MagicMock

from custom_components.github_custom.sensor import GitHubRepoSensor

async def test_async_update_failed():
    """Tests a failed async_update."""
    github = MagicMock()
    github.getitem = AsyncMock(side_effect=GitHubException)

    sensor = GitHubRepoSensor(github, {"path": "homeassistant/core"})
    await sensor.async_update()

    assert sensor.available is False
    assert {"path": "homeassistant/core"} == sensor.attrs
```

在这个测试中，验证了当我们设置传感器的可用性为 `False`，`async_update` 函数是否抛出了异常。

我建议在 Home Assistant Core 中阅读一些 [platinum 质量等级](https://github.com/home-assistant/core/search?q=platinum&unscoped_q=platinum) 的组件，以获取关于应该测试什么、如何去测试的灵感。写这篇文章时的推荐：

- [Brother Printer](https://github.com/home-assistant/core/tree/dev/tests/components/brother)
- [Daikin AC](https://github.com/home-assistant/core/tree/dev/tests/components/daikin)
- [deCONZ](https://github.com/home-assistant/core/tree/dev/tests/components/deconz)
- [Elgato Key Light](https://github.com/home-assistant/core/tree/dev/tests/components/elgato)
- [Global Disaster Alert and Coordination System (GDACS)](https://github.com/home-assistant/core/tree/dev/tests/components/gdacs)
- [GeoNet NZ Quakes](https://github.com/home-assistant/core/tree/dev/tests/components/geonetnz_quakes)
- [HomematicIP Cloud](https://github.com/home-assistant/core/tree/dev/tests/components/homematicip_cloud)
- [Philips Hue](https://github.com/home-assistant/core/tree/dev/tests/components/hue)
- [Internet Printing Protocol (IPP)](https://github.com/home-assistant/core/tree/dev/tests/components/ipp)
- [National Weather Service (NWS)](https://github.com/home-assistant/core/tree/dev/tests/components/nws)
- [Spain electricity hourly pricing (PVPC)](https://github.com/home-assistant/core/tree/dev/tests/components/pvpc_hourly_pricing)
- [Ubiquiti UniFi](https://github.com/home-assistant/core/tree/dev/tests/components/unifi)
- [VIZIO SmartCast](https://github.com/home-assistant/core/tree/dev/tests/components/vizio)
- [WLED](https://github.com/home-assistant/core/tree/dev/tests/components/wled)

你也可以检查我如何在自己的自定义组件中实现的测试：

- [github-custom-component-tutorial](https://github.com/boralyl/github-custom-component-tutorial/tree/master/tests/)
- [nintendo-wishlist](https://github.com/custom-components/sensor.nintendo_wishlist/tree/master/tests)
- [steam-wishlist](https://github.com/boralyl/steam-wishlist/tree/master/tests)

### 持续集成

[持续集成](https://en.wikipedia.org/wiki/Continuous_integration) 允许你每次向仓库提交的时候进行各种检查（在其他任务中）。在这篇文章中，我将特别介绍 [GitHub Actions](https://github.com/features/actions)，但是你可以使用类似于 [Travis CI](https://travis-ci.org/) 这样的其他服务实现相同的效果。

你的 GitHub actions 将会被放置在仓库根目录结构的 `.github/workflows/` 下。每个工作流都是不同的运行任务，通常是在向 GitHub 推送代码的时候触发。

### Hassfest

[@ludeeus](https://www.github.com/ludeeus) 创建了一个 GitHub action 为你的组件进行验证。（也是超棒的 [Home Assistant Store](https://hacs.xyz/) 的背后实现）。看看在 [Home Assistant Developers Blog](https://developers.home-assistant.io/blog/2020/04/16/hassfest/) 上的文章了解更多信息。

下面是 `.github/workflows/hassfest.yaml` 的内容：

```yaml
name: Validate with hassfest

on:
  push:
  pull_request:
  schedule:
    - cron: "0 0 * * *"

jobs:
  validate:
    runs-on: "ubuntu-latest"
    steps:
      - uses: "actions/checkout@v2"
      - uses: home-assistant/actions/hassfest@master
```

这个本质上是对你自定义组件的合法配置项进行检查。

### Python 构建

在我们 python 构建之中，我们想要在每次推送代码运行所有的单元测试。下面是 `.github/workflows/pythonpackage.yaml` 的内容：

```yaml
name: Python package

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      max-parallel: 4
      matrix:
        python-version: [3.7]

    steps:
      - uses: actions/checkout@v1
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v1
        with:
          python-version: ${{ matrix.python-version }}

      - name: Set PY env
        run: echo "::set-env name=PY::$(python -VV | sha256sum | cut -d' ' -f1)"

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.test.txt
      - name: Run pytest
        run: |
          pytest
```

在每次推送代码时，它将默认会把 python 的版本环境设置为 `3.7`。然后将下载我们所有的测试依赖，最终运行 `pytest` 执行我们的测试。如果测试没问题，构建将会成功完成，并且在你的 GitHub 提交信息之后获得一个绿色的成功检查标记。（这也代表了 `hassfest` 检查也成功了）

### 预提交(Pre-Commit)

[预提交(Pre-Commit)](https://pre-commit.com/) 在提交之前，提供了一个任意数量检查代码的方式。这将帮助去检查一些常见的问题，根据仓库和其他检查对代码进行规范。

如果你使用 cookie-cutter template，在你的生成代码中早已包含了[`.pre-commit-config.yaml`](https://github.com/boralyl/cookiecutter-homeassistant-component/blob/master/%7B%7B%20cookiecutter.domain%20%7D%7D/.pre-commit-config.yaml)，其中包含了大部分 Home Assistant 核心使用的检查。在现有的组件中，可以简单的添加到你自己的项目之中，选用你想要去对代码进行的检查。

由 cookie-cutter template 生成的文件会帮助你的代码和 Home Assistant 标准更加兼容。当你向将组件合并到核心仓库的时候，省去很多麻烦。

开始如果没有的话，在你的仓库根目录添加 `.pre-commit-config.yaml`。然后安装 pre-commit。

```bash
pip install pre-commit
pre-commit install
```

现在，下次你进行提交的时候，它将运行所有的检查来检查你的试图提交，任一检查失败就将失败。一个成功的提交如下面的输出：

```text
$ git commit -a
pyupgrade..........................Passed
black..............................Passed
codespell..........................Passed
flake8.............................Passed
bandit.............................Passed
isort..............................Passed
Check JSON.........................Passed
mypy...............................Passed
```

失败的检查可能像这样：

```text
$ git commit -a
pyupgrade........................(no files to check)Skipped
black............................(no files to check)Skipped
codespell........................Failed
- hook id: codespell
- exit code: 1

README.md:21: recommend  ==> recommend

flake8...........................(no files to check)Skipped
bandit...........................(no files to check)Skipped
isort............................(no files to check)Skipped
Check JSON.......................(no files to check)Skipped
mypy.............................(no files to check)Skipped
```

任何检查的失败都会打断你的提交，你需要对问题进行修复然后再次提交。如果一些原因你想进行提交并跳过检查，可以在提交的时候添加 `--no-verify` 标记。

```bash
git commit -a --no-verify
```

### 结语

在这篇文章中，我们接触了如何在自定义组件中开始单元测试，并将此与 GitHub 工作流的持续集成或者第三方解决方案连接起来。使用这些将会使你的自定义组件不仅更加健壮和无 bug，并且与 Home Assistant 核心代码的标准保持一致。

在下篇文章中，我们将关注于如何在 [github-custom-component-tutorial](https://github.com/boralyl/github-custom-component-tutorial/) 项目中添加 [配置流Config Flow](https://developers.home-assistant.io/docs/config_entries_config_flow_handler)。

## 第三部分：配置流

> 原文链接：<https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_3/>

### 摘要

在这篇文章中，我们将更新自定义组件，使之可以通过 UI 进行配置，通过添加 [配置流](https://developers.home-assistant.io/docs/config_entries_config_flow_handler) 进行实现。我们仍然使用相同的示例项目 [github-component-tutorial](https://github.com/boralyl/github-custom-component-tutorial)。你可以在 [feature/part3](https://github.com/boralyl/github-custom-component-tutorial/compare/feature/part2...feature/part3) 分支查看本篇文章带来的不同。

### 更新 manifest.json

首先，我们需要更新 `manifest.json` 文件。将 `config_flow` 的值设为 `true`，这一步是让 Home Assistant 知道这个组件可以通过配置 UI 添加。

```diff
{
   "codeowners": ["@boralyl"],
-  "config_flow": false,
+  "config_flow": true,
   "dependencies": [],
   "documentation": "https://github.com/boralyl/github-custom-component-tutorial",
   "domain": "github_custom",
```

### 添加配置流

接下来，我们将创建自己的 [config_flow.py](https://github.com/boralyl/github-custom-component-tutorial/blob/master/custom_components/github_custom/config_flow.py) 文件。在这这个文件中，我们将继承 `ConfigFlow` 类，并且定义当用户首次配置组件时所在 UI 展示的不同步骤。

截止本文撰写，通过配置流，拥有需要未知大小的配置值列表的组件并不是最简单的事情。为了绕过这个限制，我决定设计配置流有两个步骤。第一步是问询用户的 GitHub access token 和可选的 enterprise server URL。提交该信息后，用户将进入第二步，该步骤允许他们为其输入存储库和可选名称。为了允许用户添加额外的存储库，我添加了一个复选框，如果选中该复选框将重复第二步。用户可以重复多次去添加仓库，直到他们添加所有为创建传感器的仓库。

### 用户步骤

当用户点击添加按钮和选择 GitHub Custom 集成的时候，我们配置流类的 [async_step_user](https://github.com/boralyl/github-custom-component-tutorial/blob/master/custom_components/github_custom/config_flow.py#L55) 方法将被调用。

![gif](https://aarongodfrey.dev/assets/images/0014_init_flow.gif)

让我们看看那这个方法做了什么。

```python
async def async_step_user(self, user_input: Optional[Dict[str, Any]] = None):
    """Invoked when a user initiates a flow via the user interface."""
    errors: Dict[str, str] = {}
    if user_input is not None:
        try:
            await validate_auth(user_input[CONF_ACCESS_TOKEN], self.hass)
        except ValueError:
            errors["base"] = "auth"
        if not errors:
            # Input is valid, set data.
            self.data = user_input
            self.data[CONF_REPOS] = []
            # Return the form of the next step.
            return await self.async_step_repo()

    return self.async_show_form(
        step_id="user", data_schema=AUTH_SCHEMA, errors=errors
    )
```

在这一步首次被调用的时候，变量 `user_input` 的默认值为 `None`。当用户点击提交按钮的时候，变量的值将被填入一个包含他们输入数据的字典。Home Assistant 将基于你定义的数据结构代表你去做一些基本的验证检查。我添加了一些额外的验证方法，确保 access token 是合法的。如果失败了，我们将为 `auth` 设置基本错误。这个值与 [strings.json](https://github.com/boralyl/github-custom-component-tutorial/blob/master/custom_components/github_custom/strings.json#L4) 中的 errors 对象相关，将展示在此定义的描述。

如果没错误，数据将会被存储在类的 `self.data` 属性。除了存储输入的数据，我也为下一步添加的仓库初始化了一个空列表。最后，我们调用下一步的 `async_step_repo` 方法去推进用户进入第二步的表单，以输入他们所有想监控的仓库。

### 仓库步骤

在用户成功完成初始化步骤之后，[async_step_repo](https://github.com/boralyl/github-custom-component-tutorial/blob/master/custom_components/github_custom/config_flow.py#L74) 方法被调用。这一步是响应式展示输入仓库信息的表单。如果用户选择了 `Add another repo`，我们将在提交之后保存输入的数据并重置表单。

![gif](https://aarongodfrey.dev/assets/images/0014_repo_flow.gif)

这个方法的逻辑和第一步的非常相似。

```python
async def async_step_repo(self, user_input: Optional[Dict[str, Any]] = None):
    """Second step in config flow to add a repo to watch."""
    errors: Dict[str, str] = {}
    if user_input is not None:
        # Validate the path.
        try:
            validate_path(user_input[CONF_PATH])
        except ValueError:
            errors["base"] = "invalid_path"

        if not errors:
            # Input is valid, set data.
            self.data[CONF_REPOS].append(
                {
                    "path": user_input[CONF_PATH],
                    "name": user_input.get(CONF_NAME, user_input[CONF_PATH]),
                }
            )
            # If user ticked the box show this form again so they can add an
            # additional repo.
            if user_input.get("add_another", False):
                return await self.async_step_repo()

            # User is done adding repos, create the config entry.
            return self.async_create_entry(title="GitHub Custom", data=self.data)

    return self.async_show_form(
        step_id="repo", data_schema=REPO_SCHEMA, errors=errors
    )
```

一个关键的不同点是，如果 `add_another` 复选框被选中，我们将返回当前的步骤。当用户完成最后一步时，调用 `async_create_entry` 方法创建我们的 config entry 并在 Home Assistant 中注册。

### 设置 Config Entry

下一件需要做的事情是，通过 config entry 设置我们创建的传感器。在 `__init__.py` 文件，我们定义了 `async_setup_entry` 函数将转发任务到 sensor platform。更多关于这如何工作的细节，我建议你去看非常棒的 [专题文档](https://developers.home-assistant.io/docs/config_entries_index/)。

```python
async def async_setup_entry(
    hass: core.HomeAssistant, entry: config_entries.ConfigEntry
) -> bool:
    """Set up platform from a ConfigEntry."""
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = entry.data

    # Forward the setup to the sensor platform.
    hass.async_create_task(
        hass.config_entries.async_forward_entry_setup(entry, "sensor")
    )
    return True
```

在上面的方法中，我们在 hass 自己的 `DOMAIN` 字段下存储了 config entry 的数据。这样允许我们存储用户多次配置集成的 config entries。可能他们拥有一个 enterprise server 账户为了工作和一个常规的个人账户。他们可以设置两个不同的输入，连链接那些不同的情况。

我们将转发这些设置到 `sensor` platform。在 [sensor.py](https://github.com/boralyl/github-custom-component-tutorial/blob/master/custom_components/github_custom/sensor.py) 中，我们添加了一个接收 config entry 实例，并为组件创建传感器的 `async_setup_entry` 函数。你会注意到这个函数近似等同于下面的 `async_setup_platform` 函数，这个函数被用于从 `configuration.yaml` 设置传感器。唯一的区别是我们从 config entry 实例中获取配置数据。

```python
async def async_setup_entry(
    hass: core.HomeAssistant,
    config_entry: config_entries.ConfigEntry,
    async_add_entities,
):
    """Setup sensors from a config entry created in the integrations UI."""
    config = hass.data[DOMAIN][config_entry.entry_id]
    session = async_get_clientsession(hass)
    github = GitHubAPI(session, "requester", oauth_token=config[CONF_ACCESS_TOKEN])
    sensors = [GitHubRepoSensor(github, repo) for repo in config[CONF_REPOS]]
    async_add_entities(sensors, update_before_add=True)
```

### 翻译

我简要创建了 [strings.json](https://github.com/boralyl/github-custom-component-tutorial/blob/master/custom_components/github_custom/strings.json) 用于解释错误是如何被定义的。这个文件包含了在配置流进程中被使用的字符串。我将 `strings.json` 文件复制到了 `translations` 文件夹下，并将其改为 `en.json` 表示因为翻译。你可以如你所想添加doge翻译文件，可以使用两个字符的 ISO
639-2 语言代码来命名。所有的字段必须和 `strings.json` 保持一致，其值为翻译后的字符串。举个例子，在我的组件里有另外的挪威语翻译：[nb.json](https://github.com/boralyl/steam-wishlist/blob/master/custom_components/steam_wishlist/translations/nb.json)。

获取更多在自定义组件中的翻译信息，查阅 [官方文档](https://developers.home-assistant.io/docs/internationalization/custom_integration/#translation-strings)。

### 单元测试

我想简要说一下如何对配置流进行单元测试。如果你安装和使用了 [pytest-homeassistant-custom-component](https://github.com/MatthewFlamm/pytest-homeassistant-custom-component)，你可以使用一些 pytest fixtures 来简化测试。

让我们看一看如果 GitHub access token 是非法的，如何进行验证并展示错误。

```python
@patch("custom_components.github_custom.config_flow.validate_auth")
async def test_flow_user_init_invalid_auth_token(m_validate_auth, hass):
    """Test errors populated when auth token is invalid."""
    m_validate_auth.side_effect = ValueError
    _result = await hass.config_entries.flow.async_init(
        config_flow.DOMAIN, context={"source": "user"}
    )
    result = await hass.config_entries.flow.async_configure(
        _result["flow_id"], user_input={CONF_ACCESS_TOKEN: "bad"}
    )
    assert {"base": "auth"} == result["errors"]
```

在这个测试中，我们模拟了 `validate_auth` 函数，并使之扔出 `ValueError` 错误。从 `pytest-homeassistant-custom-component` 的 pytest fixture 来的 `hass` 参数，传给我们的测试函数。首先在 `user` 中，我们通过指定 domain 和步骤初始化了一个流。我们接着在流中运行那个步骤并传递用户输入。结果中包含了一个 `errors` 字段，我们断言匹配异常。

### 下一步

通过这部分的代码，现在我们可以通过 UI 来设置和添加仓库，替代 `configuration.yaml` 文件。当你正在开发一个新的工作流，请确保在修改文件和重启 Home Assistant 之时，在浏览器中强制刷新。我注意到浏览器可以缓存信息，导致你看见过期的数据。

在我们的实现中，有一个明显的问题是，不通过初始化流的方式创建一个新的 config entry 的话，没法去移除或者添加新的仓库。虽然可以工作，但是非常不理想的是每次都得重新输入 GitHub access token。在下一篇文章中，我们将使用 [OptionsFlowHandler](https://developers.home-assistant.io/docs/config_entries_options_flow_handler) 去跳出这个限制。
