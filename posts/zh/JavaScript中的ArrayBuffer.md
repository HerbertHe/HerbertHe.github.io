---
title: JavaScript中的ArrayBuffer
toc: true
tags: [ ArrayBuffer, JavaScript, ES6 ]
categories: []
date: 2021-11-17T01:16:10+08:00
---

## 写在前面的

在尝试用国密算法实现 jwt 的时候, 发现可以使用的库很少, 便根据 jwt 的生成规则和国密 SM3 算法自行参考实现。SM3 是国密算法中的哈希散列算法, 生成单向指纹校验数据有着重要的意义。在生成 jwt 的指纹部分, 尝试使用 HMACSM3 替代掉 HMACSHA256算法。

HMACSM3 可用的 JavaScript 库确实没发现, 参考了 Java 版本进行自行实现。其中涉及到了二进制数据的位运算, 并且 [byte-fe/gm-crypto](https://github.com/byte-fe/gm-crypto) 中的 SM3 的返回值类型为 `ArrayBuffer`, 因此觉得研究此 ES6 的新内置对象很有意义。

## 关于 ArrayBuffer

在 MDN 中, 对于 `ArrayBuffer` 对象表述为表示通用的、固定长度的原市二进制数据缓冲区, **在其他语言中被称为"byte array(字节数组)"**

在 golang 中, byte array 和 string 的类型转化很常见。byte array在不同语言中均有用处, 可以提高程序计算的性能。

JavaScript 的 `ArrayBuffer` 设计目的也同样如此, 需要注意的这又是一个 *array-like* object, 使用 TypedArray or DataView 对象进行操作。

## 语法

> new ArrayBuffer(length)

- 参数

| 参数     | 描述                                      |
| -------- | ----------------------------------------- |
| `length` | 要创建的 `ArrayBuffer` 的大小, 单位为字节 |

- 返回值

一个指定大小的 `ArrayBuffer` 对象, 其内容被初始化为 0

- 异常

如果 `length` ＞ [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) (≥2**53) 或为 负数, 会抛 RangeError 异常。

## 属性

- `ArrayBuffer,length`

ArrayBuffer 构造函数的 length 属性, 其值为 1

- `ArrayBuffer.prototype.byteLength`

只读, 表示 `ArrayBuffer` 的 byte 大小, 在 ArrayBuffer 构造完成时生成, 不可更改。

## 方法

- `ArrayBuffer.isView(arg)`

如果参数是 ArrayBuffer 的视图实例则返回 `true`, 例如 TypedArray or DataView 对象；否则返回 `false`

- `ArrayBuffer.transfer(oldBuffer [, newByteLength])` ***实验性***

返回一个新的 ArrayBuffer 对象, 其内容取自 `oldBuffer` 中的数据, 并根据 `newByteLength` 的大小对数据进行截取或补 0

## 兼容性

就让 IE 消失于世间吧~
