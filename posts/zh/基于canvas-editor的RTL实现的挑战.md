---
title: 基于 canvas-editor RTL 实现的挑战
date: 2024-03-12 18:00
toc: true
tags: [ canvas-editor, canvas, RTL ]
---

## 前言

众所周知，在前端领域实现富文本编辑器是一个深坑，是非常复杂的问题，markdown 编辑器在一定程度上也是富文本编辑器。简要介绍一下，富文本编辑器的实现方式上，一般有以下的实现方案：

- 纯文本：textarea 标签
- 富文本：[contenteditable](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable)
- 富文本：利用 canvas、svg 进行渲染

本篇不讨论这种方案的实现差异，只讨论基于 canvas 的 canvas-editor 的 RTL 实现挑战，内容主要与 canvas 的实操有关。

## RTL 实现的挑战

### 预置概念

由于 canvas 是依赖 `[x, y]` 坐标来绘制图形或文字，但在 `ctx.direction='rtl'` 的模式下，canvas 对于图形和文字的处理并不一致，所以为了简化绘制流程的原理解释，这里定义一些预置概念：

| 概念名称 | 释义                                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 基点坐标 | 指的是绘制 canvas 内容的绝对原点坐标，此坐标决定了 canvas 结构内容绘制的 x, y 轴的基线                                                      |
| 偏移坐标 | 指的是相对于基点的偏移量，根据基点坐标和偏移情况，即可计算出图形和文字的实际坐标                                                            |
| 对称坐标 | 指的是在 RTL 情况下，`ctx.direction='rtl'` 相对的是从基点反方向绘制文字，因此需要更改基点位置，从而实现从行初到行尾的坐标转换 ，其关于基点 y 轴与偏移坐标轴对称             |
| 镜像坐标 | 指的是在 RTL 情况下，`ctx.direction='rtl'` 并不会反方向绘制图形，因此相对于对称坐标需要进行镜像处理，即 **在对称坐标的基础上减去绘制元素的宽度** |

### canvas-editor 的绘制原理

canvas-editor 的绘制原理，总的来说，即:

- 计算画布大小
- 计算减去内边距得到可绘制区域大小
- 计算每行承载元素和元素坐标
- 根据元素坐标逐个绘制文字
- 根据 underline、strikeout 等特殊属性绘制图形

按照现阶段的 canvas-editor 绘制来说，除了文本做了合并优化绘制处理之外，完全可以视为逐个元素绘制

### RTL 的挑战

为 canvas-editor 支持 RTL，是因为目前完全没见过做前端富文本编辑器的可以完美支持 RTL（尤其是基于 canvas 的）。

富文本编辑器无疑是开发里的深坑，即使是相当成熟的商业软件对于 RTL 的支持也很差。在适配上，html dom 可以通过 attribute 的 `dir` 进行适配实现，但是在 canvas 中，无异于是需要自己实现一遍浏览器的 reflow、repaint 机制。

关于 RTL 实现碰到的各种问题，可以参考 [编辑器支持rtl渲染 #451](https://github.com/Hufe921/canvas-editor/issues/451)

目前在 forked 仓库的 [feature/rtl](https://github.com/HerbertHe/canvas-editor/tree/feature/rtl) 分支进行实现。

下面是发现和解决的一些问题：

- 文字样式改变渲染的绘制逻辑造成不正确的排列

> [Date 渲染存在缺陷 #457](https://github.com/Hufe921/canvas-editor/issues/457)

在 Date 渲染和 hyperlink 的渲染中都存在这个问题。源码在 `dateParticle.render` 和 `hyperlinkParticle.render` 的实现中，文本的绘制没有交给 `textParticle.render` 进行完成，而是直接使用 `ctx.fillText` 进行绘制。导致在 RTL 情况下，文本的绘制并没有 LTR 字符连续绘制，而是单个文字绘制；也同样会导致 RTL 和 LTR 混排字符出现问题。

具体的示例和原理，可以参考我的这个PR [refactor: date renderer](https://github.com/Hufe921/canvas-editor/pull/460)

涉及到文本的渲染，在原则上应该全部交给 `textParticle.render` 进行处理，才可以保证对文本内容绘制顺序的可控性。

但这对于实现 Date、hyperlink 等格式文本的合并绘制是远远不够的，这涉及到了 RTL 的绘制位置排序问题。

- RTL 默认绘制的排序

在 `ctx.direction='rtl'` 的情况下，canvas 的绘制顺序是：**总体保持 RTL 顺序，LTR 连续绘制，而标点符号的绘制受下一个字符的类型影响，绘制起始坐标为新的基点坐标。**

但上面的合并文本绘制策略，并不能解决合并后的文本字符串的排序问题。目前 `ctx.fillText` 的样式会因为文本样式的不同而打断文本绘制的进程，不同样式格式的文本是分步绘制的，需要依赖正确的坐标顺序。

因此，在借助 `ctx.direction='rtl'` 进行文本绘制之前，还需要对文本进行重新排序。实现原理为：**将文本按照格式打断分割完成之后，再对绘制的起始点坐标进行重新计算交换，以实现正确的绘制坐标点，从而混合 canvas 的自身绘制顺序进行绘制。**

- RTL 的坐标计算

正如之前所说的，因为 `ctx.direction='rtl'` 根本无法影响图形的绘制，所以文本和非文本的绘制坐标计算是不一致的。**文本的实际坐标**，即之前所说的偏移坐标，通过更改基点坐标的位置实现重置起始点。**但绘制坐标为对称坐标**，为 canvas 自行处理之后的实际绘制位置，是关于基点坐标的 y 轴对称的。

非文本的坐标为 `文本对称坐标 - 文本实际宽度`， canvas 的图形绘制只能通过 LT (Left Top) 点进行绘制。其绘制坐标的位置与文本的位置在 LTR 时存在实际的偏移，需要被纠正计算。

highlight、underline、strikeout 的计算，都是通过这个来进行实现的。

因此也导致了新的问题产生：mousedown 和 command 等的默认操作存在偏差。

- mousedown 等事件的处理

canvas-editor 默认的 mousedown 等鼠标监听事件是通过偏移坐标实现的，但在 RTL 下带来了新的问题。当判断鼠标与文本元素的碰撞检测之时，用的应该是文本的对称坐标，而不是偏移坐标。文本是反向进行绘制的，计算 RTL 下的实际坐标才能精确定位光标的位置，从而进行操作。

- range 的修正

由于在 RTL 下需要对文本进行重新排队绘制，因此原本的 range 记录的方式不再适用。canvas-editor 的 range 通过元素的索引进行实现，在 LTR 的情况下不存在问题；但 RTL 下进行重新排队之后，range 的记录应该为实际的元素及坐标，而非索引，通过索引进行计算会导致错误的元素选区问题。

而 range 的错误选区，会导致后面一系列的绘制问题，依赖 range 的二次操作非常多。

- 上下角标的绘制问题

上下角标应该是强制 LTR 的，需要在文本排序的时候，强制实现 LTR 的绘制渲染。
