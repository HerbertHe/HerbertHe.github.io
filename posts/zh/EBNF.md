---
title: EBNF
date: 2021-10-27 00:30:59
tags: [ 编译原理, EBNF ]
toc: true
categories: [ 语言 ]
---

## 扩展巴科斯范式

> 参考来源 [Wikipedia](https://zh.wikipedia.org/wiki/%E6%89%A9%E5%B1%95%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F)

一种表达形式语言文法的代码, EBNF 定义了把各符号序列分别指派非终结符的**产生规则**

```ebnf
digit excluding zero = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
digit = "0" | digit excluding zero;
```

定义左端非终结符 *digit*。竖杠表示可供选择, 终结符被 `"` 包围, 最后跟着 `;` 作为终止字符。

产生规则还可以包括由逗号分隔的一序列 *终结符* 或 *非终结符*

```ebnf
twelve = "1", "2";
two hundred one = "2", "0", "1";
three hundred twelve = "3", twelve;
twelve thousand two hundred one = twelve, two hundred one;
```

可以 **省略** 或 **重复** 的表达式可以通过花括号 `{...}` 表示: (大概相当于正则表达式的 `*`)

```ebnf
natural number = digit excluding zero, { digit };
```

在这种情况下, 字符串 1, 2, ..., 10, 12345, ... 都是正确的表达式。表示这种情况, 于花括号内设立的所有东西 *可以重复任意次*, 包括根本不出现。

可选项可以通过方括号 `[...]` 表示: (大概相当于正则表达式的 `?`)

```ebnf
integer = "0" | ["-"], natural number;
```

integer 是一个 *零(0)* 或可能 *前导可选的负号* 的一个自然数。

EBNF 还包括描述 **指定次数的重复**, 和 **排除产生的某部分** 或向 EBNF 文法 **插入注释** 的语法。

## 符号表

| 用途 | 符号表示 |
| :--- | :---: |
| 定义 | `=` |
| 串接 | `,` |
| 终止 | `;` |
| 分隔 | `\|` |
| 可选 | `[...]` |
| 重复 | `{...}` |
| 分组 | `(...)` |
| 双引号 | `"..."` |
| 单引号 | `'...'` |
| 注释 | `(*...*)` |
| 特殊序列 | `?...?` |
| 除外 | `-` |

## 约定

1. 使用如下约定:
   - EBNF 的每个元标识符否被写为 *连字号* 连接起来的一个或多个字；
   - 结束于 "-symbol" 的元标识符是 EBNF 的终结符的名字。
2. 表示 EBNF 的每个操作符的正常字符和它所蕴涵的 ***优先级***(顶部为**最高**优先级)为:

   ```text
   * repetition-symbol
   - except-symbol
   , concatenate-symbol
   | definiton-separator-symbol
   = defining-symbol
   ; terminator-symbol
   ```

3. 下列 *括号对* **超越** 正常优先级:

    ```text
    ‘first-quote-symbol  first-quote-symbol’
    "second-quote-symbol  second-quote-symbol"
    (*start-comment-symbol  end-comment-symbol*)
    (start-group-symbol  end-group-symbol)
    [start-option-symbol  end-option-symbol]
    {start-repeat-symbol  end-repeat-symbol}
    ?special-sequence-symbol  special-sequence-symbol?
    ```

举例:

```ebnf
aa = "A";
bb = 3 * aa, "B";
cc = 3 * [aa], "C";
dd = {aa}, "D";
ee = aa, {aa}, "E";
ff = 3 * aa, 3 * [aa], "F";
gg = {3 * aa}, "D";
```

定义的终结字符串:

```text
aa: A
bb: AAAB
cc: C AC AAC AAAC
dd: D AD AAD AAAD ...
ee: AE AAE AAAE AAAAE ...
ff: AAAF AAAAF AAAAAF AAAAAAF
gg: D AAAD AAAAAAD ...
```

## EBNF & BNF

> BNF 有 **可选项** 和 **重复** 不能直接表达的问题。

可选项:

```ebnf
signed number = [sign, ] number;
```

BNF 风格:

```bnf
signed number = sign, number | number;
```

or

```ebnf
signed number = optional sign, number;
optional sign, = ε | sign, ; (*使用ε来清晰的指示空产生式*)
```

重复:

```ebnf
number = { digit } digit;
```

BNF风格:

```bnf
number = digit | number digit;
```

## EBNF 较 BNF 的优点

BNF 的缺陷:

- BNF 自身使用了符号(`<`, `>`, `|`, `::=`), 定义会产生误解。
- BNF 语法在一行只能表示一个规则。

EBNF 解决了这些问题:

- 终结符被严格包围在引号 (`"..."` 或 `'...'`) 中。给非终结符的尖括号 (`"<...>"`) 可以省略。
- 通常使用终止字符 **分号** 结束一个规则。

进一步提供了定义 **重复次数**, **排除法选择** 和 **注释** 等增强机制。

原理上, EBNF 任何文法都可以用 BNF 表达。

EBNF 已经被 ISO 以 *ISO/IEC 14977:1996(E)* 标准化。

在某些场合任何扩展的 BNF 都被称为 EBNF。例如 W3C 使用 [one EBNF](https://web.archive.org/web/20031203082847/http://www.w3c.org/TR/REC-xml#sec-notation) 来规定 XML。

## 扩展

根据 ISO 14977 标准, 提供了两个设施来扩展 EBNF。其一, 是指 EBNF 文法部分的特殊序列, 它是问号内包围内的任意文本, **其解释超出了 EBNF 标准的范围**。

```ebnf
space = ?US-ASCII character 32?
```

其二, **圆括号** 在 EBNF 中不能放置到紧跟标识符之后。

```ebnf
something = foo (bar); (*无效*)
```

EBNF 的扩展可以使用这种表示法。
