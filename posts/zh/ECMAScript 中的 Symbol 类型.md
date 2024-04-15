---
title: ECMAScript 中的 Symbol 类型
date: 2024-4-14 18:09:01
toc: true
tags: [ ECMAScript, 规范, symbol, javascript ]
---

[6.1.7]: https://262.ecma-international.org/14.0/#sec-object-type
[realms]: https://262.ecma-international.org/14.0/#realm
[9.3]: https://262.ecma-international.org/14.0/#sec-code-realms

## 写在前面的

ECMAScript 是当前最主流的 JavaScript 语言规范，在日常的开发之中，可能完全不需要去了解规范本身的内容，但了解并理解规范本身的内容对写更好的 javascript 代码有更深远的意义。

本文将基于 ECMAScript-262 语言规范（第14版，2023年6月）的内容，从官方文档中了解自 ECMAScript 2015版(ES6) 开始引入的 Symbol 类型。

> 规范原文：<https://262.ecma-international.org/14.0/#sec-ecmascript-language-types-symbol-type>

## Symbol 类型

*Symbol 类型* 是所有可被用于 Object 属性键的非字符串值的集合。([6.1.7])

每一个可能的 Symbol 值都是唯一的，并且不可变的。

每一个 Symbol 值不可变拥有一个相关联被称为 `[[Description]]` 的值，该值是 **undefined** 或一个字符串。

### 知名的 Symbols

知名的 Symbols 是由 ECMAScript 规范的算法明确引用的内置 Symbol 值。它们通常被用作属性的键，其值作为规范的算法扩展点。除非另有说明，否则这些知名的 symbols 值由所有的 [realms] ([9.3]) 所共享。

在本篇规范中，知名的 symbols 使用 `@@name` 的形式进行表示，“name” 的值是 表1 中所列出的其中之一。

表 1：知名的 Symbols

| 规范名称               | `[[Decription]]`              | 值和目的                                                                                                                                                                                                             |
| ---------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@@asyncIterator`      | `"Symbol.asyncIterator"`      | 一个从对象中返回默认的 AsyncIterator 的方法。由 **for-await-of** 语句调用。                                                                                                                                          |
| `@@hasInstance`        | `"Symbol.hasInstance"`        | 一个用于确定 [构造函数](https://262.ecma-international.org/14.0/#constructor) 对象是否将对象识别为 [构造函数](https://262.ecma-international.org/14.0/#constructor) 的实例之一的方法。由 **instanceof** 运算符调用。 |
| `@@isConcatSpreadable` | `"Symbol.isConcatSpreadable"` | 一个布尔值属性，如果为 true 表明对象应该通过 [Array.prototype.concat](https://262.ecma-international.org/14.0/#sec-array.prototype.concat) 扁平化到它的数组元素                                                      |
| `@@iterator`           | `"Symbol.iterator"`           | 一个为对象返回默认迭代器的方法。由 **for-of** 语句调用。                                                                                                                                                             |
| `@@match`              | `"Symbol.match"`              | 一个将正则表达式与字符串匹配的正则表达式方法。由 [String.prototype.match](https://262.ecma-international.org/14.0/#sec-string.prototype.match) 方法调用。                                                            |
| `@@matchAll`           | `"Symbol.matchAll"`           | 一个返回迭代器的正则表达式方法，用于生成正则表达式与字符串的匹配项。由 [String.prototype.matchAll](https://262.ecma-international.org/14.0/#sec-string.prototype.matchall) 方法调用。                                |
| `@@replace`            | `"Symbol.replace"`            | 一个用于替换与正则表达式匹配字符串的子串的正则表达式方法。由 [String.prototype.replace](https://262.ecma-international.org/14.0/#sec-string.prototype.replace) 方法调用。                                            |
| `@@search`             | `"Symbol.search"`             | 一个返回与正则表达式匹配的索引值的正则表达式方法。由 [String.prototype.search](https://262.ecma-international.org/14.0/#sec-string.prototype.search) 方法调用。                                                      |
| `@@species`            | `"Symbol.species"`            | 一个函数值属性，该属性是用于创建派生对象的构造函数。                                                                                                                                                                   |
| `@@split`              | `"Symbol.split"`              | 一个正则表达式方法用于在与正则表达式匹配的索引处拆分字符串。由 [String.prototype.split](https://262.ecma-international.org/14.0/#sec-string.prototype.split) 方法调用。                                              |
| `@@toPrimitive`        | `"Symbol.toPrimitive"`        | 一个将对象转化为原始值的方法。由 [ToPrimitive](https://262.ecma-international.org/14.0/#sec-toprimitive) 抽象操作调用。                                                                                              |
| `@@toStringTag`        | `"Symbol.toStringTag"`        | 一个被用于为对象创建默认字符串描述的字符串值属性。由内置的 [Object.prototype.toString](https://262.ecma-international.org/14.0/#sec-object.prototype.tostring) 方法访问。                                            |
| `@@unscopables`        | `"Symbol.unscopables"`        | 一个对象值属性，其自己的属性名称和继承的属性名称是从关联对象的 **与** 环境绑定中排除的属性名称。                                                                                                                     |

## 写在后面的

关于 realms 可以参考 Stack Overflow 上面的一篇讨论 [如何理解js的realms](https://stackoverflow.com/questions/49832187/how-to-understand-js-realms)。
