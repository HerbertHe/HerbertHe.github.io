---
title: 创建一个unified插件
date: 2024-03-23 21:56:45
toc: true
tags: [ unified, plugin, 翻译, 教程 ]
---

[unified]: https://unifiedjs.com/explore/package/unified/
[retext]: https://unifiedjs.com/explore/project/retextjs/retext/

> 原文 [Creating a plugin with unified](https://unifiedjs.com/learn/guide/create-a-plugin/)

本教程展示了如何为 [retext] 创建一个插件用于检测句子之间的空格数量。这里的概念也适用于 [unified] 的其他语法。

> 在这卡住了？想去看看其他的教程吗？参阅 [support.md](https://github.com/unifiedjs/.github/blob/main/support.md)

## 插件基础

[unified] 插件在几个方面改变了应用处理器(processor) 的工作方式。在这篇教程中，我们将检阅(review) 如何检查语法树。

插件包含两部分： attacher，一个被 `.use` 方法调用的函数；transformer，一个当每次文件被通过语法树和虚拟文件处理时调用的可选函数。

在这个案例中，我们想检查每个被处理文件的语法树，所以我们确实需要指定一个 transformer。

现在你知道了 [unified] 插件的基础组成。开始我们的案例吧！

## 案例

在开始之前，先明确我们需要实现什么样的效果。有以下的文本文件：

```txt
One sentence. Two sentences.

One sentence.  Two sentences.
```

我们想在第二段获得一个警告，说明句子之间应该用一个空格，而不是两个。

下一步，将编写代码来使用我们的插件。

## 配置

让我们配置一个工程。创建文件夹 `example`，进入它，并创建一个新的工程。

```bash
mkdir example
cd example
npm init -y
```

然后，确保这个工程是一个 module，以保证 `import` 和 `export` 的正常工作。通过修改 `package.json` 实现：

```diff
--- a/package.json
+++ b/package.json
@@ -2,6 +2,7 @@
   "name": "example",
   "version": "1.0.0",
   "description": "",
+  "type": "module",
   "main": "index.js",
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
```

确保 `example.md` 文件存在，并且内容如下：

```txt
One sentence. Two sentences.

One sentence.  Two sentences.
```

现在，我们创建一个 `example.js` 文件，将用于处理我们的文本文件，并报告一些发现的问题.

```js
import fs from 'fs'
import {retext} from 'retext'
import {reporter} from 'vfile-reporter'
import retextSentenceSpacing from './index.js'

const buffer = fs.readFileSync('example.md')

retext()
  .use(retextSentenceSpacing)
  .process(buffer)
  .then((file) => {
    console.error(reporter(file))
  })
```

> 不要忘记去 `npm install` 依赖 (`retext`, `vfile-reporter`)！

如果你阅读 [使用 unified](https://unifiedjs.com/learn/guide/using-unified/) 教程，将会发现一些类似的语句。首先，我们加载了依赖项，然后读取了文件。我们使用了将在第二步创建的插件对文件进行处理，最后报告一个致命错误，或者被发现的一些规范化消息。

注意我们直接依赖 [retext]。这个包暴露了一个 [unified] 处理器，并附带了解析器(parser) 和编译器(compiler)。

当运行我们的示例之时（它现在还不能工作）我们希望看到第二段的一条消息，告诉应该用一个空格取代两个空格。

现在我们配置完成了除了插件本身的所有部分。我们将在下一章节进行实现。

## 插件

当我们阅读了插件基础的部分，我们知道了需要一个插件，并且我们的案例需要一个 transformer。让我们开始在插件文件 `index.js` 中创建他们吧：

```js
export default function retextSentenceSpacing() {
  return (tree, file) => {
  }
}
```

首先要做的事情是，我们需要检查 `tree` 的数据样式。可以使用名为 [unist-util-visit](https://unifiedjs.com/explore/package/unist-util-visit/) 的工具帮助我们递归树结构。现在让我们添加它。

```diff
--- a/index.js
+++ b/index.js
@@ -1,4 +1,9 @@
+import {visit} from 'unist-util-visit'
+
 export default function retextSentenceSpacing() {
   return (tree, file) => {
+    visit(tree, 'ParagraphNode', (node) => {
+      console.log(node)
+    })
   }
 }
```

> 不要忘了去 `npm install` 这个工具！

如果我们现在使用 Node.js 运行我们的示例，正如下面展示的，将看见在我们的示例中的两个段落调用了观察者(visitor)：

```bash
node expample.js
```

```txt
{
  type: 'ParagraphNode',
  children: [
    { type: 'SentenceNode', children: [Array], position: [Object] },
    { type: 'WhiteSpaceNode', value: ' ', position: [Position] },
    { type: 'SentenceNode', children: [Array], position: [Object] }
  ],
  position: {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 1, column: 29, offset: 28 }
  }
}
{
  type: 'ParagraphNode',
  children: [
    { type: 'SentenceNode', children: [Array], position: [Object] },
    { type: 'WhiteSpaceNode', value: '  ', position: [Position] },
    { type: 'SentenceNode', children: [Array], position: [Object] }
  ],
  position: {
    start: { line: 3, column: 1, offset: 30 },
    end: { line: 3, column: 30, offset: 59 }
  }
}
no issues found
```

输出内容展示了段落包含两种类型的节点(nodes)：`SentenceNode` 和 `WhiteSpaceNode`。后者是我们想要去检查的，但是前者是重要的，因为在这个插件中我们只想在句子之间的地方警告空白空格。（不过，这可能是另一个可以实现的插件）

现在循环每个段落的子节点。只检查句子之间的空白空格。我们使用一个小工具来检查节点的类型：[`unist-util-is/`](https://unifiedjs.com/explore/package/unist-util-is/)。

```diff
--- a/index.js
+++ b/index.js
@@ -1,9 +1,20 @@
 import {visit} from 'unist-util-visit'
+import {is} from 'unist-util-is'

 export default function retextSentenceSpacing() {
   return (tree, file) => {
     visit(tree, 'ParagraphNode', (node) => {
-      console.log(node)
+      const children = node.children
+
+      children.forEach((child, index) => {
+        if (
+          is(children[index - 1], 'SentenceNode') &&
+          is(child, 'WhiteSpaceNode') &&
+          is(children[index + 1], 'SentenceNode')
+        ) {
+          console.log(child)
+        }
+      })
     })
   }
 }
```

> 不要忘记去 `npm install` 这个工具！

如果现在运行我们的示例，我们将会看到仅句子之间的空白空格被记录。

```bash
node example.js
```

```txt
{
  type: 'WhiteSpaceNode',
  value: ' ',
  position: Position {
    start: { line: 1, column: 14, offset: 13 },
    end: { line: 1, column: 15, offset: 14 }
  }
}
{
  type: 'WhiteSpaceNode',
  value: '  ',
  position: Position {
    start: { line: 3, column: 14, offset: 43 },
    end: { line: 3, column: 16, offset: 45 }
  }
}
no issues found
```

最后，我们在为第二个空白空格添加警告，表示它实际拥有字符超过了所需的。我们使用 [`file.message()`](https://unifiedjs.com/explore/package/vfile/#vfilemessagereason-position-origin) 方法将文件和消息联系在一起。

```diff
--- a/index.js
+++ b/index.js
@@ -12,7 +12,12 @@ export default function retextSentenceSpacing() {
           is(child, 'WhiteSpaceNode') &&
           is(children[index + 1], 'SentenceNode')
         ) {
-          console.log(child)
+          if (child.value.length !== 1) {
+            file.message(
+              'Expected 1 space between sentences, not ' + child.value.length,
+              child
+            )
+          }
         }
       })
     })
```

如果我们现在最后一次运行示例，我们将看见问题的一条警告消息。

```txt
$ node example.js
3:14-3:16  warning  Expected 1 space between sentences, not 2

⚠ 1 warning
```

## 进一步练习

在句子之间的一个空格并不适用于所有人。这个插件接收想要的空格数量，来替代硬编码 `1`。

如果你想要警告句子之间的缩进或者新行，也可以创建一个插件？

如果你还没准备好，可以看看 [学习章节](https://unifiedjs.com/learn/) 的其他文章。
