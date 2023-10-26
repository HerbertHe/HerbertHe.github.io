---
title: Leetcode-3-无重复字符的最长子串
date: 2021-03-23 16:07:21
toc: true
tags: [ 算法, 面试 ]
categories: [ Leetcode ]
---

## 无重复字符的最长子串

题目: [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

## 破题

### 自己想的解法

其实整个流程大概分为两步

1. 分割字符, 构成字符集
2. 根据字符集遍历, 然后组合出子串

<!-- more -->

处理的临界情况为

- 处理字符串长度为零的情况

```js
// 在js中下面的处理都可以
if (!s)  // 这是利用了js的 !"" === false的特性

if (s.length === 0)
```

- 处理字符串都是相同的字符

```js
// 这里利用了es6的Set集合这一特性
[...new Set(s.split(""))].length === 1
// s ---> 字符数组 ---> Set去重 ---> 去重之后的数组长度
```

- `strBin`为所有字串的"桶"
  - 所有的单字符都是子串, 扔到桶里去
  - 遍历越界时, 将之前组合的子串, 扔到桶里去
  - 每次字符桶里已经有字符了, 把之前的组合子串扔到桶里去
  - 遍历当前字符连续个数大于1时, 把之前的子串组合当前字符扔到桶里去

- 返回`strBin`按照子串长度排序, 从而得到最后的答案

### 滑动窗口解法

本质上来说, 跟自己想的解法没太大的区别, 但是滑动窗口把检查重复和遍历这些事情放在一起做了

[官方题解](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/wu-zhong-fu-zi-fu-de-zui-chang-zi-chuan-by-leetc-2/)的分析流程为:

- 以 (a)bcabcbb 开始的最长字符串为 (abc)abcbb；
- 以 a(b)cabcbb 开始的最长字符串为 a(bca)bcbb；
- 以 ab(c)abcbb 开始的最长字符串为 ab(cab)cbb；
- 以 abc(a)bcbb 开始的最长字符串为 abc(abc)bb；
- 以 abca(b)cbb 开始的最长字符串为 abca(bc)bb；
- 以 abcab(c)bb 开始的最长字符串为 abcab(cb)b；
- 以 abcabc(b)b 开始的最长字符串为 abcabc(b)b；
- 以 abcabcb(b) 开始的最长字符串为 abcabcb(b)。

分析流程:

- 遍历字符串
- 以当前的字符为起始, 向后遍历找到无重复的子串

## 题解

### 自行实现的版本

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    // 处理字符串长度为零
    if (s.length === 0) return 0

    // 处理字符串都相同字母的情况
    if ([...new Set(s.split(""))].length === 1) {
        return 1
    }

    // 存储字符集个数
    let charList = []
    let pos = 0 // 字符集指针
    let sum = 0 // 字符指针
    for (let i = 0; i < s.length; i++) {
        if (i === 0) {
            charList.push([s[i], 1])
        } else if (s[i] === s[i - 1] && s[i - 1] !== undefined) {
            // 存储
            charList[pos][1] += 1
        } else {
            charList.push([s[i], 1])
            pos += 1
        }
        sum = i + 1
    }

    // 子串收集桶
    let strBin = []
    pos = 0

    // 无法处理单字母emmmm
    while (!!charList[pos]) {
        // 字符桶
        let bin = []
        let strTmp = ""
        for (let i = pos; i <= charList.length; i++) {
            if (i === pos) {
                // 初始化遍历
                strTmp = charList[pos][0]
                bin.push(charList[pos][0])
                strBin.push([charList[pos][0], 1])
            } else if (!charList[i]) {
                strBin.push([strTmp, strTmp.length])
                break
            } else if (bin.includes(charList[i][0])) {
                strBin.push([strTmp, strTmp.length])
                break
            } else if (charList[i][1] > 1) {
                strTmp += charList[i][0]
                strBin.push([strTmp, strTmp.length])
                break
            } else {
                // 记录
                bin.push(charList[i][0])
                strTmp += charList[i][0]
            }
        }
        pos += 1
    }

    return strBin.sort((a, b) => b[1] - a[1])[0][1]
};
```

### 滑动窗口

官方题解的js版本为:

```js
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};
```
