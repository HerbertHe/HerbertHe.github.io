---
title: "从React视角学习Svelte(一)"
date: 2021-05-21T22:55:58+08:00
toc: true
tags: [Svelte, 前端框架]
---

## 写在前面

因为自己做前端最近一直使用的都是React, 所以将以React的视角来学习Svelte。就自己使用Vue、React及其衍生框架的经验来说, 不同的前端框架有着类似的概念, 当熟悉一个框架之时往往更加容易进行其他框架的学习。React宣称自己是一个`library`, Vue是`Framework`, 而Svelte是一个`compiler`。React、Vue和Svelte在实现上还是有很多的差异的, 写法有相似之处也有一些差异的地方。

本篇文章是跟着Svelte的官方教程而来, 官方提供了交互的教程对于学习来说很友好。

- 附上官方教程地址: [Svelte Tutorial](https://svelte.dev/tutorial/basics)

> Svelte涉及到了很多ES6的原生语法, 请在此之前了解ES6常用的基础语法, 比如解构赋值, 展开/剩余参数, ES Module...

本篇所有的概念基本上全部为自己总结, 与官方表述和第三方翻译可能会有出入, 顺序也跟官方并不太一样。

## 基础结构

Svelte的文件结构跟Vue类似, 但并不太一样, 由标签和Svelte自定义的代码特性块构成。在后面会具体解释Svelte自定义的代码特性块。

```html
<script>
    let name = "Hello World!"
    let show = false
</script>

<style>
    div {
        color: red;
    }
</style>

<div>{name}</div>

{#if show}
    <p>哎，我出来了~</p>
{:else}
    <p>哎，它不见了~</p>
{/if}
```

上面的栗子跟普通HTML并没有什么太大区别。与Vue相比, HTML(布局)的部分不需要写在标签`<template></template>`里面, 直接往下排就好了。

## 动态数据

在上面的栗子也可以看到使用`{}`包裹变量来渲染的表示方式, 在此称为动态数据。无论是Vue、React还是小程序均存在这类的数据动态渲染的方式。无论是attribute还是props, 都可以以此来赋值数据。

```html
<img src={src} />
```

## Svelte自定义的代码特性块

Svelte通过自定义的特性块实现了原生HTML没有的一些特性, 例如: 条件渲染、遍历之类的。在Vue里可以通过`v-if`这种自定义属性实现条件渲染, 在React里可以通过`{condition && <p>啦啦啦啦~</p>}`进行条件渲染。在Svelte的条件渲染, 如下面的栗子:

- `if`块

> 做条件渲染使用, 其中`else-if`块和`else`块均可省略

```html
{#if condition}
    <p>条件一看我~</p>
{:else if condition1}
    <p>条件二看我~</p>
{:else}
    <p>不然你看我！</p>
{/if}
```

Svelte的实现类似于[ejs](https://github.com/mde/ejs), 不过有着明显的区别。可以看到不同的块的起始标识符并不一致, 记起来其实比较简单。`#`表示开始块, `:`表示持续块, `/`表示结束块; 持续块可以省略。

- `each`块

> each块用于遍历数据渲染DOM结构

```html
{#each variables as variable, index}
    <p>{variable}</p>
{/each}
```

> 第一个参数为数组成员, 第二个参数为索引index

当然, 在each块里也可以使用解构赋值

```html
<script>
    let cats = [
        {name: "黑猫", id: "black"},
        {name: "白猫", id: "white"}
    ]
</script>

{#each cats as {name, id}}
    <p>{name}: {id}</p>
{/each}
```

- `await`块

> await块用于promise数据渲染, 具体可以参考ES6的Promise的部分。用法大同小异, 可以理解为HTML的Promise数据驱动赋能~

```html
{#await promise}
    <p>等待数据中~</p>
{:then number}
    <p>数字是{number}~</p>
{:catch error}
    <p>哎呀我出错了~{error.message}</p>
{/await}
```

> `catch`块可以省略

```html
{#await promise then value}
    <p>哎我有值~ {value}</p>
{/await}
```

## Reactivity

中文文档翻译成了**反应性能力**, 但是在知乎看到很多大V直接用英文来表示。为了减少阅读和理解障碍, 直接就不翻译好了。

其实Reactivity表示的意思, 就是数据驱动页面更新这么个机制, 以官网栗子:

```html
<script>
    let count = 0;

    function handleClick() {
        count += 1;
    }
</script>

<button on:click={handleClick}>
    Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

> `on:click`在这跟原生DOM的事件监听没啥区别, 后面再详述Svelte的事件系统。

当点击事件`handleClick()`触发, count数据加一发生改变。在HTML中因为有`{count}`这个数据绑定机制, 则自动更新这部分的视图。这就是所说的**Reactivity**, 数据驱动视图更新。

但是需要注意的是, Svelte**只监听赋值**的过程, 而非数据改变就会触发。

```html
<script>
    let array = []
    function append(val) {
        // array.push(val) ❌
        array = [...array, val] // ✔
    }
</script>
```

> 此外, **引用类型属性更新**并**不会**触发Reactivity, `obj.name`赋值不能触发`obj`这玩意儿监听, 除非来个`obj = obj`

## Reactivity声明

因为存在动态数据依赖某更新数据的依赖情况, 所以声明更新**动作**会比较重要。

```html
<script>
    let number = 1
    let double
    $: double = number * 2

    function handleClick() {
        number += 1;
    }
</script>

<button on:click={handleClick}>{number} 数字的两倍是 {double}</button>
```

> 当number更改的时候, `$: double = number * 2`这个Reactivity语句就会执行

当然可以定义一组动作, 也可以不是赋值操作

```html
<script>
    $: {
        console.log(`我数大了! ${number}`)
        alert(`我弹弹弹！${number}`)
    }
</script>
```

## 组件化和Props

跟Vue和React一样, Svelte的一个文件也是一个组件, 以`.svelte`后缀结尾, 可以导入和封装组件。

为了避免样式污染, Svelte的style样式作用域在组件内。

```html
<!-- Nested.svelte -->
<script>
    export let name = "Nested"
</script>

<p>Hello {name}!</p>
```

```html
<!-- App.svelte -->
<script>
    import Nested from "./Nested.svelte"
</script>

<Nested name="App" />
```

上面的过程, 熟悉React的看看就懂了。不同的是, Svelte更像是数据驱动的, 只需要`export`这个操作就可以自定义组件属性了, 而React设计却一直贯彻的是单向数据流(在后面的事件监听部分, 更可以体会与React的设计差别)。组件内部可以赋值默认值, 并且支持类ES6的展开运算(React也支持)`<Nested {...props} />`。Svelte官网说可以通过`$$props`拿到props的数据, 但是因为优化的原因不建议用。

## 事件监听

Svelte通过`on:事件名`这个API进行事件监听, 跟Vue的`v-on:`和React的小驼峰命名法事件一样。

### 行内事件处理

```html
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
    The mouse position is {m.x} x {m.y}
</div>
```

> Svelte官方特别表示, 其他框架都建议不要使用行内事件处理, 因为性能优化的一些原因, **但对于Svelte来说不存在这个问题**

### 事件修饰

```html
<script>
    function handleClick() {
        alert('no more alerts')
    }
</script>

<button on:click|once={handleClick}>
    Click me
</button>
```

> 那个`once`就是事件修饰符, 可用的修饰符如下, 并且事件修饰可以并列

|      事件       |
| :-------------: |
| preventDefault  |
| stopPropagation |
|     passive     |
|     capture     |
|      once       |
|      self       |

### 组件事件

### 事件转发

## 绑定

> 未完待续~
