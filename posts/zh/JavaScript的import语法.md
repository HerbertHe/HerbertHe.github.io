---
title: JavaScript的import语法
date: 2024-4-12 22:38:26
toc: true
tags: [ javascript, import ]
---

## 写在前面的

*dynamic import* 是一个熟悉但却有点不太被注意的语法，在按需动态加载的场景下，常常被用来进行异步加载优化。MDN 暂无对这部分的中文技术文档，本篇为 MDN 此部分技术文档的翻译，同样为自己更好理解这部分语法的特性进行备用。

## import()

`import()` 语法，通常被称作 `dynamic import`，它是一个类函数表达式，允许异步和动态加载 ECMAScript 模块到一个潜在的非模块化(non-module) 环境中。

与 [声明式导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 不同，dynamic import 只在被需要的时候被计算，并允许更大的句法灵活性。

## 语法

```javascript
import(moduleName)
```

`import()` 的调用非常类似于一个函数调用，但是 `import` 本身是一个关键字，并不是一个函数。你不能用类似 `const myImport=import` 的语句进行别名，否则将会抛出一个 [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)

### 参数

`moduleName`

导入的模块来源。标识符的计算是由主机指定的，但是总遵循着与静态 [import 声明](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 一致的算法。

### 返回值

返回一个状态为 fulfilled，值为 [模块命名空间对象(module namespace object)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#module_namespace_object) 的 promise：一个包含从 `moduleName` 所有导出的对象。

`import()` 的计算从不会同步抛出错误，`moduleName` 是 [被强制要求为字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion)，如果抛出错误，则 promise 的状态为 reject 并且值为被抛出的错误。

### 描述

import 声明语法 (import something from "somewhere") 是静态的，并且总是在加载的时候才会计算导入的模块结果。Dynamic imports 允许绕过 import 声明的句法强制，并在需要的时候才加载模块。下面是你可能需要使用 dynamic import 的理由：

- 当静态导入严重拖慢了代码的加载速度或者增加程序内存使用，那么加载缓慢可能即是与导入的代码相关，你可以在之后需要的时候再进行导入。
- 当导入的模块在加载之时并不存在。
- 当 import 标识符需要被动态构造。（静态导入只支持静态标识符。）
- 当模块的导入有副作用，并且你只想在受控的情况下才需要这些副作用。（并不建议在模块中有任何副作用，但是有些时候你无法控制模块的依赖。）
- 当在非模块环境中（例如：`eval` 或者 script 文件）。

只有在必要的时候再使用 dynamic import，静态形式非常适合加载初始化依赖，并且可以更加容易在静态分析工具和 [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) 中受益。

如果你的文件并不是如模块化运行的（在 HTML 文件中引用，script 标签必须有 `type="module"` 属性），你将无法使用静态声明，但是异步动态导入语法仍然可用，并且运行你将模块导入非模块环境中。

动态模块导入并不是在所有的执行上下文中都被允许。举个例子，`import()` 可以被用于主线程、shared worker，或者 dedicated worker，但是当在 [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 或者 [worklet](https://developer.mozilla.org/en-US/docs/Web/API/Worklet) 中被调用的时候会报错。

### 模块命名空间对象

**模块命名空间对象** 是用于描述从模块中所有导出的对象。当模块被计算的时候，它就会被创建为一个静态对象。有两种从模块访问命名对象的方法：通过 [命名空间导入 namespace import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import) (`import * as name from moduleName`)，或者通过 dynamic import 导入 fulfill 的值。

模块命名空间对象是一个有 [`null` 原型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects) 的 [sealed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed) 对象。这也就意味着对象的所有字符串字段键与模块的导出有关，并且不存在额外的字段键。所有的键按字典顺序是 [可被枚举的](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。（举个例子，[`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description) 的默认行为），默认导出可以通过 `default` 键进行调用。另外，模块命名空间对象有一个 [`@@toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性值为 `"Module"`，被用于 [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)。

字符串属性是不可被配置的(non-configurable) 和 可写的(writable)，当你使用 [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors) 获取他们的描述符的时候。所以，他们是有效只读的，因为你不能将属性赋予新的值。与之相对应的是，静态导入创建 "[live bindings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#imported_values_can_only_be_modified_by_the_exporter)"——值可以被导出他们的模块重新赋值，但是不能被导入模块赋值。可写的属性反应了值被修改的可能性，因为不可被配置和不可被写的属性一定是常量。举个例子，你可以对导出的变量值进行重新赋值，新的值将会被模块命名空间对象所观察到。

每个模块标识符都与唯一的模块命名空间对象相关，下面的代码通常是正确的：

```javascript
import * as mod from "/my-module.js";

import("/my-module.js").then((mod2) => {
    console.log(mod === mod2); // true
});
```

除了一种奇异的情况：因为 promise 永远不会被 fulfilled 为一个 [thenable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables)，如果 `my-module.js` 模块导出了一个函数叫做 `then()`，函数将会自动在 dynamic import 的 promise 被 fulfilled 的时候被调用，作为 [promise resolution](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise#the_resolve_function) 进程的一部分。

```javascript
// my-module.js
export function then(resolve) {
    console.log("then() called");
    resolve(1);
}
```

```javascript
// main.js
import * as mod from "/my-module.js";

import("/my-module.js").then((mod2) => {
    // Logs "then() called"
    console.log(mod === mod2); // false
});
```

::: danger WARNING
注意：不要从模块中导出一个叫做 `then()` 的函数。这会导致在动态导入的时候与静态导入的行为不一致。
:::

## 示例

### 仅为副作用导入一个模块

```javascript
(async () => {
    if (somethingIsTrue) {
        // import module for side effects
        await import("/modules/my-module.js");
    }
})
```

如果你的项目使用导出的 ESM 包，你也可以仅为了副作用导入他们。将仅会在包导入的入口文件（或者导入的文件）运行这些代码。

### 导入默认

你需要解构返回的对象，并且对 "default" 键进行重命名。

```javascript
(async () => {
    if (somethingIsTrue) {
      const {
        default: myDefault,
        foo,
        bar,
      } = await import("/modules/my-module.js");
  }
})();
```

### 根据用户的动作响应时导入

这个例子展示了如何基于用户的动作来向页面加载功能，这个例子是按钮点击，在模块中调用功能。这并不是实现功能的唯一方式。`import()` 函数也支持 `await`。

```javascript
const main = document.querySelector("main");
for (const link of document.querySelectorAll("nav > a")) {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    import("/modules/my-module.js")
      .then((module) => {
        module.loadPageInto(main);
      })
      .catch((err) => {
        main.textContent = err.message;
      });
  });
}
```

### 基于环境导入不同的模块

在例如服务端渲染的处理中，你可与需要在服务端或者浏览器端加载不同的逻辑，因为他们有着不同的全局环境或者模块（举个例子，浏览器代码有访问如 `document` 和 `navigator` 的 web APIs 权限，而服务端代码有当问服务器文件系统的权限）。你可以通过控制 dynamic import 来实现。

```javascript
let myModule;

if (typeof window === "undefined") {
  myModule = await import("module-used-on-server");
} else {
  myModule = await import("module-used-in-browser");
}
```

### 非文本 (non-literal) 标识符导入模块

Dynamic import 运行任何表达式作为模块标识符，并不一定非要是字符串文本。

这里，我们导入了10个模块，`/modules/module-0.js`、`/modules/module-1.js` 等等，同时，调用了每个模块导出的 `load` 函数。

```javascript
Promise.all(
  Array.from({ length: 10 }).map(
    (_, index) => import(`/modules/module-${index}.js`),
  ),
).then((modules) => modules.forEach((module) => module.load()));
```
