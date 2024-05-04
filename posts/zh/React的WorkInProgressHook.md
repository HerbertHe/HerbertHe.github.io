---
title: React 的 WorkInProgressHook
date: 2024-5-4 14:43:57
toc: true
tags: [ react, hook ]
---

## 前言

React 在数年前全面转向函数式编程，并引入了 hook 的概念。卡颂的 [React 技术揭秘](https://react.iamkasong.com/) 是很多的前端开发者进一步了解 react 的入门资料，但随着 react 的迭代更新，其底层实现可能发生了一些变化。这个本篇文章即是在讨论 `useCallback` 和 `useMemo` 的差异上，去阅读 react 底层实现源码上发现的一些问题。React 的源码很长，将分片去研究 react 的底层实现逻辑。

> 本篇所使用的源码为 2024年5月4日的 react 主分支的实现。

## Hook 类型定义

```typescript
export type Hook = {
  memoizedState: any,
  baseState: any,
  baseQueue: Update<any, any> | null,
  queue: any,
  next: Hook | null,
};
```

## 相关变量声明

```typescript
// The work-in-progress fiber. I've named it differently to distinguish it from
// the work-in-progress hook.

// work-in-progress fiber，区分于work-in-progress hook。
let currentlyRenderingFiber: Fiber = (null: any);


// Hooks are stored as a linked list on the fiber's memoizedState field. The
// current hook list is the list that belongs to the current fiber. The
// work-in-progress hook list is a new list that will be added to the
// work-in-progress fiber.

// Hooks 被存储为 fiber 的 memoizedState 字段中的一个链表。
// current hook 列表是属于 current fiber 的列表。
// work-in-progress hook 列表是一个新的列表，将被添加到 work-in-progress fiber 中。
let currentHook: Hook | null = null;
let workInProgressHook: Hook | null = null;
```

## mountWorkInProgressHook

```typescript
function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,

    baseState: null,
    baseQueue: null,
    queue: null,

    next: null,
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    // 列表中的第一个 hook
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    // 追加到列表的末尾
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}
```

## updateWorkInProgressHook

```typescript
function updateWorkInProgressHook(): Hook {
  // This function is used both for updates and for re-renders triggered by a
  // render phase update. It assumes there is either a current hook we can
  // clone, or a work-in-progress hook from a previous render pass that we can
  // use as a base.
  // 这个函数既用于更新，也用于由渲染阶段更新触发的重新渲染。
  // 它假设有一个可以 clone 的 current hook，或者一个之前渲染的 work-in-progress hook，可以作为基础。
  let nextCurrentHook: null | Hook;
  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate; // WIP Fiber 的 alternate 属性指向 current Fiber
    if (current !== null) {
      nextCurrentHook = current.memoizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    nextCurrentHook = currentHook.next;
  }

  let nextWorkInProgressHook: null | Hook;
  if (workInProgressHook === null) {
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;  // WIP Fiber 的 memoizedState 属性指向 work-in-progress hook
  } else {
    nextWorkInProgressHook = workInProgressHook.next;
  }

  if (nextWorkInProgressHook !== null) {
    // There's already a work-in-progress. Reuse it.
    // 有已经存在的 work-in-progress。复用它。
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;

    currentHook = nextCurrentHook;
  } else {
    // Clone from the current hook.

    if (nextCurrentHook === null) {
      const currentFiber = currentlyRenderingFiber.alternate;
      if (currentFiber === null) {
        // This is the initial render. This branch is reached when the component
        // suspends, resumes, then renders an additional hook.
        // Should never be reached because we should switch to the mount dispatcher first.
        // 这是初始渲染。这个分支在组件挂起、恢复后，再渲染一个额外的 hook 时被触发。
        // 理论上永远不会被触发，因为我们应该先切换到 mount dispatcher。
        throw new Error(
          'Update hook called on initial render. This is likely a bug in React. Please file an issue.',
        );
      } else {
        // This is an update. We should always have a current hook.
        // 这是更新。我们应该总是有 current hook。
        throw new Error('Rendered more hooks than during the previous render.');
      }
    }

    currentHook = nextCurrentHook;

    const newHook: Hook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,

      next: null,
    };

    if (workInProgressHook === null) {
      // This is the first hook in the list.
      // 这是列表中的第一个 hook。
      currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      // 追加到列表的末尾。
      workInProgressHook = workInProgressHook.next = newHook;
    }
  }
  return workInProgressHook;
}
```
