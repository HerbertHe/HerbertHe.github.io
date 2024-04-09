---
title: 前端富文本编辑器开发最佳实践
date: 2024-4-1 01:36:12
toc: true
tags: [ 前端, 富文本编辑器, markdown, canvas, for-editor, vditor, canvas-editor ]
---

## 前言

从 2020 年至今，已经参与过数个前端富文本编辑器和渲染器的开发和贡献。前端实现富文本编辑器是一个非常有挑战性的，在不断的实践中得到了很多的经验，因此将目前所获得的经验总结提炼为最佳实践并抛砖引玉。

## 什么是富文本

为了解决富文本编辑器的开发问题，首先需要了解什么是富文本。

富文本(Rich Text) 是一种可以包含各种格式的文本，包括文字、样式、图片、视频、音频、表格、公式等，而并不只是纯文本文字内容。在日常生活中，docx 文档就是最典型的富文本文件；对于我们这些开发者来说，markdown 也同样是富文本。不仅如此，HTML、XML 等标记语言也可以看作是富文本。

所以，针对于富文本本身，我更愿意称将其之为 **结构化文本**。

即：**按照一定的标记结构，将文字和各种素材组合在一起的一种特定文本**。

一般情况下，对于前端富文本编辑器的开发来说，最常见的即是 markdown。

其次，也存在对富文本数据结构的自行实现，比如 canvas-editor。

## 实现流派

目前，前端富文本编辑器的实现流派主要有以下几种：

- 基于 `textarea` 键入，对文本结构分析进行 DOM 渲染，比如：`for-editor`
- 基于 `textarea` 键入，对文本结构分析进行 canvas 渲染，比如：`canvas-editor`
- 基于 `contenteditable` 的属性，对文本进行即时渲染，比如：`Vditor`、`wangEditor`

在实践当中，上面的方式都或多或少存在着不同方面的坑。我将从底层的实现原理上进行分析，并总结其中的问题所在和解决方案。

## 同与不同

### `textarea` 和 `contenteditable`

在渲染结果和工作流程的生命周期上，基于 `textarea` 和 `contenteditable` 的渲染器本质上目标是一致的，都是将富文本的内容渲染成 HTML，并添加上自定义的样式实现富文本的渲染效果。即：

`结构化文本 -> HTML/CSS`

差别在于，`contenteditable` 可以直接向挂载的 DOM 节点直接注入 HTML 的内容，在 **即时渲染(IR)** 和 **所见即所得(WYSIWYG)** 的情况下可能会导致 XSS 的安全性问题。而面对及时的渲染要求，在键入 `iframe` 标签时会重复触发 `GET` 请求，这在 Vditor 的实践过程中均复现过此类问题。因此 `contenteditable` 也并不是完全可以信赖的，在浏览器的实现上也存在 Chrome 和 Firefox 生成 `div` 和 `p` 标签不一致的问题。

而 `textarea` 的渲染流程更复杂一些。由于 `textarea` 本身仅支持纯文本的输入，我们所有获得的文本数据需要先行进行解析，然后再注入到 DOM 节点之中。在后面的实现中，将会对 **纯文本** 到 **富文本** 的完整生命周期进行分析。

### `canvas`

当渲染目标设为 `canvas` 时，其计算的过程更为复杂且并不能完全依赖 `canvas` 进行实现。因为 canvas 过于原始、效果受限，在交互上还需要生成 HTML 处理用户交互。即：

`结构化文本 -> Canvas/HTML/CSS`

## 现有实现的原理分析

在本篇文章中，我将会从底层原理对 `for-editor`、`Vditor` 和 `canvas-editor` 进行分析。

### `for-editor`

> 在线 demo：<https://ibert.me/for-editor-herb/>

`for-editor` 基于 `textarea` 和 `pre` 标签进行实现，`textarea` 作为监听文本输入的容器，并通过这个标签拿到用户的输入内容，用 `pre` 标签撑起 `textarea` 的高度，以实现 `textarea` 的正确尺寸大小设定。

> `textarea` 标签的高度是固定的，随着文本内容的增加会出现滚动条，所以是通过 `pre` 标签与 `textarea` 标签的高度一致来撑起 `textarea` 的高度。

可能比较反常识的是，`for-editor` 并不是通过编译原理对文本进行的解析，而是基于 `marked.js` 通过自行维护正则表达式并自定义渲染器进行的解析渲染。因此，`for-editor` 的维护成本其实是非常高的。

流程：`markdown纯文本 -> marked.js解析渲染 -> HTML -> 通过 React dangerousInnerHTML 插入到 DOM`

### `Vditor`

> 在线 demo：<https://ibert.me/react-vditor>

## 生命周期的最佳实践

## RTL 的艰难挑战
