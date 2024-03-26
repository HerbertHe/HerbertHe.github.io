---
title: 如何使用TypeScript操作语法树
date: 2024-3-26 17:16:44
toc: true
tags: [ unified, 语法树, TypeScript, unist ]
---

[unist]: https://github.com/syntax-tree/unist
[unified]: https://unifiedjs.com/explore/package/unified/
[mdast]: https://github.com/syntax-tree/mdast
[hast]: https://github.com/syntax-tree/hast
[xast]: https://github.com/syntax-tree/xast#readme

> 原文链接：<https://unifiedjs.com/learn/guide/syntax-trees-typescript/>

本教程将向你介绍 TypeScript 使用 [unist] 和 [unified]。

## 基础

所有的 [unified] 语法树都是基于 [unist](**uni**versal **s**yntax **t**ree)。可用的核心类型包只包含类型：[`@types/unist`](https://www.npmjs.com/package/@types/unist)。主要的类型是 `节点(Node)`，其他的都继承于此。`字面量(Literal)` 和 `父节点(Parent)` 这些更具体的类型也是继承于 `节点(Node)`。

由 [unist] 提供的类型为抽象接口(Abstract Interfaces)，通常情况下，你需要根据所使用的语言来选择更加实用的接口。[unified] 所支持的每种语言，例如：markdown、HTML 和 XML 都有他们自己继承于 `unist` 的语法树标准。

让我们一起来看看。

## unist

### `节点(Node)`

`节点(Node)` 是语法树的句法单位。每个节点都继承于 `节点(Node)`（有时候是 `字面量(Literal)` 或者 `父节点(Parent)`）。并且设置 `type` 为一个 [字符串字面量(string literal)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)。这个类型字段用于告诉我们节点内容的类型是什么。这个字段唯一标识一种内容，在 TypeScript 中，被称为 [可辨识联合/可区分联合(discriminated union)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)。举个在 ，markdown([mdast]) 中的例子：`Node` 被继承用于一些节点 `Heading` 或 `Link`，以取代使用 `type` 字段设置为 `heading` 和 `link`。

一个节点可以可选地包含一个 `Data` 接口于 `data` 字段。这是一个对象用于存储额外的原始数据，并不是节点的标准，但在生态中被定义（工具类(utilities)和插件(plugins)）。

当从文件中解析语法树时，会包含坐标信息：一个 `Position` 接口于 `position` 字段，这用于描述节点在源文件中的位置。

```typescript
/**
 * Syntactic units in unist syntax trees are called nodes.
 */
interface Node {
  /**
   * The variant of a node.
   */
  type: string

  /**
   * Information from the ecosystem.
   */
  data?: Data | undefined

  /**
   * Location of a node in a source document.
   * Must not be present if a node is generated.
   */
  position?: Position | undefined
}

/**
 * Information associated by the ecosystem with the node.
 * Space is guaranteed to never be specified by unist or specifications
 * implementing unist.
 */
export interface Data {
  [key: string]: unknown
}

/**
 * Location of a node in a source file.
 */
export interface Position {
  /**
   * Place of the first character of the parsed source region.
   */
  start: Point

  /**
   * Place of the first character after the parsed source region.
   */
  end: Point

  /**
   * Start column at each index (plus start line) in the source region,
   * for elements that span multiple lines.
   */
  indent?: number[] | undefined
}

```

### `字面量(Literal)`

`字面量(Literal)` 继承于 `节点(Node)`，并添加了一个 `value` 属性。举个例子，一个 markdown `Code` 节点继承 `Literal`，并设置 `value` 为 `string`。

```typescript
/**
 * Nodes containing a value.
 */
export interface Literal extends Node {
  value: unknown
}
```

### `父节点(Parent)`

`父节点(Parent)` 继承于 `节点(Node)`，并添加了一个 `子节点(children)` 属性。子节点代表其他内容在 `父节点(Parent)` 内部，或者就是这个节点的一部分。

```typescript
/**
 * Nodes containing other nodes.
 */
export interface Parent extends Node {
  /**
   * List representing the children of a node.
   */
  children: Node[];
}
```

### 在项目中拉取 unist

安装：

```bash
npm install --save-dev @types/unist
```

在一个 TypeScript 文件中导入类型，如下：

```typescript
import type { Node, Literal, Parent } from 'unist'
```

在 [JSDoc TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html) 导入类型，如下：

```typescript
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Literal} Literal
 * @typedef {import('unist').Parent} Parent
 */
```

## mdast(markdown)

[mdast] (**m**arkdown **a**bstract **s**yntax **t**ree) 继承于 [unist]，并且为 markdown 具像化类型，例如 `Heading` `Code` `Link` 等。这些具像化的类型包含了一个完整的节点列表。这些类型可以通过一个类型包进行使用。[`@types/mdast`](https://www.npmjs.com/package/@types/mdast)。

安装：

```bash
npm install --save-dev @types/mdast
```

在一个 TypeScript 文件中导入类型，如下：

```typescript
import type { Heading, Code, Link } from 'mdast'
```

在 [JSDoc TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html) 导入类型，如下：

```typescript
/**
 * @typedef {import('mdast').Heading} Heading
 * @typedef {import('mdast').Code} Code
 * @typedef {import('mdast').Link} Link
 */
```

## hast(HTML)

[hast] (**h**ypertext **a**bstract **s**yntax **t**ree) 继承于 [unist]，并且为 HTML 具像化类型，例如 `Element` `Comment` `DocType` 等。这些具像化的类型包含了一个完整的节点列表。这些类型可以通过一个类型包进行使用。[`@types/hast`](https://www.npmjs.com/package/@types/hast)。

安装：

```bash
npm install --save-dev @types/hast
```

在一个 TypeScript 文件中导入类型，如下：

```typescript
import type { Element, Comment, DocType } from 'hast'
```

在 [JSDoc TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html) 导入类型，如下：

```typescript
/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Comment} Comment
 * @typedef {import('hast').DocType} DocType
 */
```

## xast(XML)

[xast] (e**x**tensible **a**bstract **s**yntax **t**ree) 继承于 [unist]，并且为 XML 具像化类型，例如 `Element` `CData` `Instruction` 等。这些具像化的类型包含了一个完整的节点列表。这些类型可以通过一个类型包进行使用。[`@types/xast`](https://www.npmjs.com/package/@types/xast)。

安装：

```bash
npm install --save-dev @types/xast
```

在一个 TypeScript 文件中导入类型，如下：

```typescript
import type { Element, CData, Instruction } from 'xast'
```

在 [JSDoc TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html) 导入类型，如下：

```typescript
/**
 * @typedef {import('xast').Element} Element
 * @typedef {import('xast').CData} CData
 * @typedef {import('xast').Instruction} Instruction
 */
```

## 总结

- [unified] 提供了不同语言的语法树类型
- 这些类型可以被 TypeScript 和 JSDoc 项目导入

## 进一步

- [学习使用 TypeScript 遍历语法树](https://unifiedjs.com/learn/recipe/tree-traversal-typescript/)
- [学习压缩节点](https://unifiedjs.com/learn/recipe/narrow-node-typescript/)
- [学习构建语法树](https://unifiedjs.com/learn/recipe/build-a-syntax-tree/)
