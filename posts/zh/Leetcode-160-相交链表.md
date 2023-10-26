---
title: Leetcode-160-相交链表
date: 2021-03-25 18:51:59
toc: true
tags: [ 算法, 面试 ]
categories: [ Leetcode ]
---

## 相交链表

题目: [相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

## 破题

一开始面对这题, 第一反应就是暴力去解题了。看了一眼题解, 双指针的解法特别的优雅。

如果两个单链表有相同节点的话, 那两个链表的指针必然 **headA --> headB** 和 **headB --> headA** 过程中有相遇, 相遇的时候节点就是交叉的节点。

举个栗子

```js
const headA = [4, 1, 8, 4, 5]

const headB = [5, 0, 1, 8, 4, 5]

// pA: 4 -> 1 -> 8 -> 4 -> 5 -> null -> 5 -> 0 -> 1 -> 8 -> 4 -> 5 -> null
// pB: 5 -> 0 -> 1 -> 8 -> 4 -> 5 -> null -> 4 -> 1 -> 8 -> 4 -> 5 -> null
```

## 题解

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (headA === null || headB === null) return null
    let pA = headA, pB = headB
    while(pA !== pB) {
        pA = pA === null ? headB : pA.next
        pB = pB === null ? headA : pB.next
        console.log("pA", pA)
        console.log("pB", pB)
    }
    return pA
};

// 控制台输出:
// pA [1,8,4,5]
// pB [6,1,8,4,5]
// pA [8,4,5]
// pB [1,8,4,5]
// pA [4,5]
// pB [8,4,5]
// pA [5]
// pB [4,5]
// pA null
// pB [5]
// pA [5,6,1,8,4,5]
// pB null
// pA [6,1,8,4,5]
// pB [4,1,8,4,5]
// pA [1,8,4,5]
// pB [1,8,4,5]
// pA [8,4,5]
// pB [8,4,5]
```
