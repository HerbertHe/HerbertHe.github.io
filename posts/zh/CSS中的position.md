---
title: CSS中的position
date: 2020-07-09 19:23:39
toc: true
tags: [ CSS, 前端 ]
---

## position

CSS的position属性用于元素的定位，可以实现下拉列表、提醒框等样式。分为：`absolute` `fixed` `relative` `static` 和 `sticky`

<!-- more -->

## static

`static`为默认值，不脱离文档流，并且`TRBL`属性不起作用。

## relative

`relative`相对定位，与`static`不同。`relative`的`TRBL`属性相对于*原本元素所在位置*进行定位，与`absolute`不同

## absolute

`absolute`绝对定位，如果其父组件的position属性为`relative`，则其`top` `right` `bottom` `left`属性相对于父组件定位，如果不是则相对于全局定位，脱离文档流。

## fixed

`fixed`与`absolute`不同，`fixed`为相对可视窗口的定位，无论窗口如何滚动，`fixed`定位的位置不会因此发生改变。但是，最好不用跟`<input/>`元素放在一起使用，当`fixed`作为footer元素固定在底部时，会导致移动端阻挡输入框的问题。

## sticky

`sticky`属性类似于`relative`和`fixed`的结合，超出目标区域时与`fixed`相同。需要指定`TRBL`属性之一使之生效。
