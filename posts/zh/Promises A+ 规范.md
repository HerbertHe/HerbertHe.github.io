---
title: Promises A+ 规范
date: 2024-4-14 11:03:48
toc: true
tags: [ javascript, promise, 规范 ]
---

[3.1]: #_3-注意事项-notes
[3.2]: #_3-注意事项-notes
[3.3]: #_3-注意事项-notes
[3.4]: #_3-注意事项-notes
[3.5]: #_3-注意事项-notes
[3.6]: #_3-注意事项-notes

## 写在前面的

比较反直觉的是，越基础的知识往往是越简单的，例如工学所用的知识是理学探索的进一步演绎。因此在演绎的层面的思想越模糊，就需要去深入去研究底层的规范和原理。

本篇是对 **Promises/A+ 规范** 的内容翻译。因为 javascript 所实现的 promises 互操作性，使得只要符合 **Promises/A+ 规范** 的实现都可以进行相互操作。因此深入理解 **Promises/A+ 规范** 显得尤为重要。

> 规范原文：<https://promisesaplus.com/>

## 规范概述

Promises/A+ 规范是一个为 JavaScript promises 的呼声和可操作性，而制定的一个开放标准——通过实现，为了实现。

*promise* 代表了异步操作的事件结果。与 promise 进行交互最基础的的方式是通过他的 `then` 方法，该方法注册回调函数用于接收 promise 的事件结果，或者 promise 不能被完成的原因(reason)。

规范的细节在于 `then` 方法的行为，为所有符合 Promise/A+ 规范的 promise 实现提供互操作的基础。因此，规范应该非常稳定。然而 Promises/A+ 组织可能偶尔对此规范进行向后兼容的小更改以解决新发现的极端情况，我们仅会在非常小心的思考、讨论和测试之后才会集成大型或者向后不兼容的更改。

历史上，Promises/A+ 澄清了更早期的 [Promises/A 提案](http://wiki.commonjs.org/wiki/Promises/A) 行为条款，并进一步拓展覆盖 **事实上的(de facto)** 行为，并且移除了未规定的或者有问题的部分。

最终，Promises/A+ 的核心规范并没有处理如何去创建(create)、完成(fulfill)，或者拒绝(reject) promises，取而代之地，选择关注于提供了一个互操作的 `then` 方法。在未来的配套规范的工作中可能会涉及到这些部分。

## 1. 术语(Terminology)

- 1.1. "promise" 是一个有符合本规范的 `then` 方法的对象或者函数。
- 1.2. "thenable" 是一个定义 `then` 方法的对象或者函数。
- 1.3. "value" 是任意合法的 JavaScript 值（包含 `undefined`、一个 thenable 或者一个 promise）。
- 1.4. "exception" 是一个使用 `throw` 语句抛出的值。
- 1.5. "reason" 是一个表明为什么 promise 被拒绝(rejected) 的值。

## 2. 规定(Requirements)

### 2.1. Promise 状态(State)

promise 必须是三种状态中的一种：pending、fulfilled 或 rejected。

- 2.1.1. 当 pending 时，promise：
  - 2.1.1.1. 可能被转变到 fulfilled 或 rejected 状态。
- 2.1.2. 当 fulfilled 时，promise：
  - 2.1.2.1. 不能被转变为任何其他的状态。
  - 2.1.2.2. 必须有一个不可变的值。
- 2.1.3. 当 rejected 时，promise：
  - 2.1.3.1. 不能被转变为任何其他的状态。
  - 2.1.3.2. 必须有一个不可变的原因(reason)。

这里，“必须不可变”意味着不可变同一性（例如，`===`），但是并不意味着深层不变性。

### 2.2. `then` 方法

promise 必须提供一个 `then` 方法去获取它当前本身，或者事件结果，或者原因(reason)。

promise 的 `then` 方法接收两个参数：

```javascript
promise.then(onFulfilled, onRejected)
```

- 2.2.1. `onFulfilled` 和 `onRejected` 都是可选参数：
  - 2.2.1.1. 如果 `onFulfilled` 不是一个函数，则忽略。
  - 2.2.1.2. 如果 `onRejected` 不是一个函数，则忽略。
- 2.2.2. 如果 `onFulfilled` 是一个函数：
  - 2.2.2.1. 必须在 `promise` 被完成之后调用，并且 `promise` 的值作为它的第一个参数。
  - 2.2.2.2. 不能在 `promise` 被完成之前调用。
  - 2.2.2.3. 不能被调用超过一次。
- 2.2.3. 如果 `onRejected` 是一个函数：
  - 2.2.3.1 必须在 `promise` 被拒绝之后调用，并且 `promise` 的原因作为它的第一个参数。
  - 2.2.3.2. 不能在 `promise` 被拒绝之前调用。
  - 2.2.3.3. 不能被调用超过一次。
- 2.2.4. `onFulfilled` 或者 `onRejected` 不能被调用，直到 [执行上下文](https://es5.github.io/#x10.3) 栈仅包含平台代码。[3.1]
- 2.2.5 `onFulfilled` 和 `onRejected` 必须作为函数被调用。（例如，不能有 `this` 的值）[3.2]
- 2.2.6. `then` 可能被同一个 promise 调用多次。
  - 2.2.6.1 如果/当 `promise` 被完成，所有的各自 `onFulfilled` 回调必须按照他们本来 `then` 的顺序执行。
  - 2.2.6.2 如果/当 `promise` 被拒绝，所有的各自 `onRejected` 回调必须按照他们本来 `then` 的顺序执行。
- 2.2.7. `then` 必须返回一个 promise [3.3]。

  ```javascript
  promise2 = promise1.then(onFulfilled, onRejected);
  ```

  - 2.2.7.1. 如果 `onFulfilled` 或者 `onRejected` 返回了一个值 x，运行 Promise 处理程序 `[[Resolve]](promise2, x)`。
  - 2.2.7.2. 如果 `onFulfilled` 或者 `onRejected` 抛出了一个异常 e，`promise2` 必须被拒绝，并拒绝原因为 e。
  - 2.2.7.3. 如果 `onFulfilled` 不是一个函数，并且 `promise1` 被完成，`promise2` 必须被完成，并拥有与 `promise1` 相同的值。
  - 2.2.7.4. 如果 `onRejected` 不是一个函数，并且 `promise1` 被拒绝，`promise2` 必须被拒绝，并拥有与 `promise1` 相同的原因。

### 2.3. Promise 处理程序(Resolution Procedure)

**promise 处理程序(resolution procedure)** 是一个获取 promise 和值的抽象操作，我们将其表示为 `[[Resolve]](promise, x)`。如果 `x` 是一个 thenable，它将尝试去使 `promise` 采用 `x` 状态，在设想的情况下，`x` 的行为至少是类 promise 的。否则，完成 promise 并且值为 `x`。

thenable 的处理允许 promise 实现互操作，只要他们暴露了一个 Promises/A+ 兼容的 `then` 方法。也允许 Promises/A+ 实现去 “同化” 带有 reasonable `then` 方法的非兼容实现。

运行 `[[Resolve]](promise, x)`，执行以下步骤：

- 2.3.1. 如果 `promise` 和 `x` 引用同一个对象，则拒绝(reject) promise 并以 `TypeError` 作为原因(reason)。
- 2.3.2. 如果 `x` 是一个 promise，则采用它的状态[3.4]：
  - 2.3.2.1. 如果 `x` 在 pending，`promise` 必须保持 pending 直到 `x` 被完成或拒绝。
  - 2.3.2.2. 如果/当 `x` 被完成，则以相同的值完成 `promise`。
  - 2.3.2.3. 如果/当 `x` 被拒绝，则以相同的原因拒绝 `promise`。
- 2.3.3. 否则，如果 `x` 是一个对象或者函数，
  - 2.3.3.1. 让 `then` 为 `x.then`。[3.5]
  - 2.3.3.2. 如果检索 `x.then` 的属性值抛出了一个异常 `e`，则拒绝 `promise` 并以 `e` 作为原因。
  - 2.3.3.3. 如果一个 `then` 是一个函数，调用它并且 `x` 作为 `this`，第一个参数 `resolvePromise`，第二个参数 `rejectPromise`，并且：
    - 2.3.3.3.1. 如果/当 `resolvePromise` 被调用并且值为 `y`，则运行 `[[Resolve]](promise, y)`。
    - 2.3.3.3.2. 如果/当 `rejectPromise` 被调用并且值为 `r`，则拒绝 `promise` 并以 `r` 作为原因。
    - 2.3.3.3.3. 如果 `resolvePromise` 和 `rejectPromise` 都被调用，或者以相同的参数被多次调用，首次调用被优先采纳，并且忽略剩余的调用。
    - 2.3.3.3.4. 如果调用 `then` 方法抛出了一个异常 `e`，
      - 2.3.3.3.4.1. 如果 `resolvePromise` 或者 `rejectPromise` 已经被调用，则忽略。
      - 2.3.3.3.4.2. 否则，拒绝 `promise` 并以 `e` 作为原因。
  - 2.3.4.4. 如果 `then` 不是一个函数，则以 `x` 作为值完成 `promise`。
- 2.3.4. 如果 `x` 不是一个对象或者函数，则以 `x` 作为值完成 `promise`。

如果 promise 被处理为一个 thenable，并且参与了一个循环 thenable 链，比如 `[[Resolve]](promise, thenable)` 递归性质事件造成 `[[Resolve]](promise, thenable)` 被再次调用，根据上面的算法将会导致无限递归。实现时被鼓励的，但并不是强制的，去检测这样的递归，并且拒绝 promise 并以一个信息化的 `TypeError` 作为原因。[3.6]

## 3. 注意事项(Notes)

- 3.1. 这里 “平台代码” 意味着引擎、环境和 promise 的实现代码。在实践中，规定确保 `onFulfilled` 和 `onRejected` 被异步执行，在事件循环中 `then` 被调用之后，并且使用一个新的栈。可以通过例如 `setTimeout` 或者 `setImmediate` 等 “宏任务” 机制，或者使用 `MoutationObserver` 或者 `process.nextTick` 等 “微任务” 机制来进行实现。自 promise 实现作为平台代码开始，当处理函数被调用之时，它本身就可能包含一个任务队列(task-scheduling queue) 或者 “蹦床(trampoline)”。
- 3.2. 那是，在严格模式，`this` 的值在里面为 `undefined`；在非严格模式下，它的值为全局对象。
- 3.3. 实现可能允许 `promise2 === promise1`，提供实现所有的规定。每种实现必须指明是否产生 `promise2 === promise1` 并且在何种控制之下。
- 3.4. 通常情况下，如果来源于当前实现，仅需要知道 `x` 是正确的 promise。该条款允许使用特定于实现的方法来采用已知符合 promise 的状态。
- 3.5. 开始处理存储 `x.then` 的引用，然后测试引用，接着调用引用，避免多次访问 `x.then` 属性。这些措施对于确保访问属性的一致性非常重要，在多次检索中的值可以发生改变。
- 3.6. 实现 *不* 应该对 thenable 链的深度有任何限制，并且假设超过该限制，递归是无限的。只有正确的循环才会导致 `TypeError`；如果遇到无限条不同的 thenables 链，递归永远是正确的行为。
