---
title: Leetcode-215-数组中的第K个最大元素
date: 2021-03-23 15:44:51
toc: true
tags: [ 算法, 面试 ]
categories: [ Leetcode ]
---

## 数组中的第K个最大元素

题见: [数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

## 破题

题目意思就是排序之后, 然后找到第几大的数字(不去重)

<!-- more -->

## 题解

其实整个题就两部分, 一个是排序, 另一个是取值

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const afterSorted = nums.sort((a, b) => b - a)  // 先从大到小排序(不去重)
    return afterSorted[k - 1]  // 再返回值
}
```

> 需要注意的是, js的`sort()`函数排序是首字符的ASCII码, 如果数字超过个位数那排的结果是错的

从大到小排

```js
sort((a, b) => b - a)
```

从小到大排

```js
sort((a, b) => a - b)
```
