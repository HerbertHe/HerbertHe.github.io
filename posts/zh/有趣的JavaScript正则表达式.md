---
title: 有趣的JavaScript正则表达式
date: 2021-04-11T16:32:35+08:00
toc: true
tags: [ JavaScript ]
---

## 正则表达式

正则表达式被广泛用于文本的提取和测试, 相比于编译原理来说它足够的简单; 而相较于字符匹配来说, 又足够的功能强大。著名的markdown解析器 `marked.js` 即是使用来进行解析的, 然后生成markdown语法树进行渲染。而且正则表达式被绝大多数的高级编程语言支持, 除了实现的程度和实现的方法不太一致之外, 均可以得到很好的通用。

正则表达式上手较为容易而且写法各异, 但想精通比较困难, 如何快速上手和提高正则的执行效率就不赘述了。

## 有趣的JavaScript正则表达式

与匹配相关的JavaScript相关函数主要是 `String.prototype.match()`、`RegExp.prototype.test()` 和 `RegExp.prototype.exec()`

相关MDN文档如下:

- [String.prototype.match()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [RegExp.prototype.test()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
- [RegExp.prototype.exec()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

## 一个有趣的"BUG"

下述代码节选自 [OLEX](https://github.com/HerbertHe/olex/blob/main/src/core/lex/lexer.ts#L14)

```ts
const tex = `\\documnetclass{article}\n\\usepackage{sdfsfsdf}\n\\usepackage{9ubb}\n\\usepackage{example}`

const usepackageRegex = /\\usepackage\s*(\[([a-zA-Z0-9 ]+)\])?\s*\{([a-zA-Z0-9\-]+)\}/g

export const PackageChecker = (
    tex: string,
    packages: PackagesType
): PackageCheckerType => {
    if (!usepackageRegex.test(tex)) {
        // 没使用额外的包
        return [true, "", tex]
    }

    // 注意上面会改变lastIndex的位置, 需要进行重置

    // ---- 注意这里 Attention Here ----
    // usepackageRegex.lastIndex = 0

    const packsSet = new Set([...packages.keys()])

    let pack

    while ((pack = usepackageRegex.exec(tex)) !== null) {
        console.log(pack)  // 注意这里的打印值
        if (!packsSet.has(pack[3])) {
            return [false, pack[3], tex]
        }
    }

    return [true, "", tex.replace(usepackageRegex, "")]
}
```

> 上述的注意打印值的部分输出的结果会是什么呢？第一次全局匹配的结果是 `\\usepackage{sdfsfsdf}` 还是 `\\usepackage{9ubb}`？这是个问题。

如果把注意部分注释掉的代码, 取消注释结果又是什么呢？

因此就引出了一个非常值得注意的正则表达式属性 `lastIndex`, 而 `test()` 和 `exec()` 均会改变 `lastIndex`的值。这个属性可以理解为正则表达式匹配的指针, 下一次的匹配是从 `lastIndex` 的值开始的。在上述的代码中, 使用了 `test()` 方法逻辑对函数执行效率进行提高, 因此下面的匹配使用 `exec()` 的结果中, **匹配从 `\\usepackage{9ubb}` 开始!**

为了得到正确的结果, 则必须对 `lastIndex` 的值进行重置

## 拓展 —— 全局匹配结果的问题

JavaScript中为了匹配特定字符串的特定匹配分组的值, 只能采取循环 `exec()` 的方式, 因为匹配不到之时返回的结果为 **null**

因此我们可以通过下面的方法, 来全局匹配文本的特定部分

```ts
const tex = `\\documnetclass{article}\n\\usepackage{sdfsfsdf}\n\\usepackage{9ubb}\n\\usepackage{example}`

const usepackageRegex = /\\usepackage\s*(\[([a-zA-Z0-9 ]+)\])?\s*\{([a-zA-Z0-9\-]+)\}/g

let pack

while ((pack = usepackageRegex.exec(tex)) !== null) {
    console.log(pack)  // 注意这里的打印值
}
```
