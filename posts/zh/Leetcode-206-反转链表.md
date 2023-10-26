---
title: Leetcode-206-反转链表
date: 2021-03-23 15:31:27
toc: true
tags: [ 算法, 面试 ]
categories: [ Leetcode ]
---

## 反转链表

题见: [反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

## 破题

```text
输入: 1 -> 2 -> 3 -> 4 -> 5 -> NULL
输出: 5 -> 4 -> 3 -> 2 -> 1 -> NULL
```

<!-- more -->

注释给的定义为

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
```

题解中给的遍历很好理解, 即把`next`指向上一个, 而当前的节点是下一个的上一个节点, 需要定义一个变量`prev`储存为下一个节点使用的上一个节点(也就是当前节点), 最后的返回值必定为最后保存的`prev`(此时迭代已经越界)

## 题解

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null
    let curr = head  // 初始化当前节点
    while(curr) {
        const next = curr.next  // 储存下一个节点, 需要反转
        curr.next = prev  // 反转链表
        prev = curr  // 保存反转之后的链表
        curr = next  // 继续迭代
    }
    // 返回最后的最前
    return prev
}
```
