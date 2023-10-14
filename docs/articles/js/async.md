# 异步编程

异步编程是一种编程模式，用于处理那些不会立即返回结果的操作。在 JavaScript 中，异步编程非常常见，因为它通常用于处理网络请求、文件读写、定时任务等涉及到时间延迟的操作。

异步编程的目标是使程序能够继续执行其他任务，而不必等待耗时的操作完成

## Promise

Promise 是 JavaScript 中用于处理异步操作的一种机制，Promise 最早起源于社区，该社区制定了一套规范，名为 [Promise A+规范](https://promisesaplus.com/)，随后 ES6 中根据该规范设计了 [Promise 构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。它提供了更清晰、更可维护的方式来处理异步代码。Promise 可以表示一个异步操作的状态，可以是未完成、已完成或失败，以及异步操作的结果。

### 基本使用

使用 Promise，可以更容易地组织和管理异步代码，以避免回调地狱（Callback Hell）和提高代码的可读性

Promise 有三种状态：

- **Pending（_待定_）：** 初始状态，既没有被兑现，也没有被拒绝。
- **Fulfilled（_已兑现_）：** 意味着操作成功完成。
- **Rejected（_已拒绝_）：** 意味着操作失败。

如果一个 Promise 已经被兑现或拒绝，即不再处于待定状态，那么则称之为已*敲定（settled）*。

示例：

```js
// 创建一个 Promise 对象
const myPromise = new Promise((resolve, reject) => {
  // 异步操作，成功时调用 resolve，失败时调用 reject
  // 例如，模拟一个异步的网络请求
  setTimeout(() => {
    if (Math.random() > 0.5) {
      // 可能成功或失败
      resolve('成功的数据')
    } else {
      reject('失败的数据')
    }
  }, 1000) // 模拟1秒的延迟
})

// 处理 Promise 的状态
myPromise.then(function (data) {
  // 在异步操作成功时执行，获取到成功的结果
  console.log('成功：' + data)
}).catch(function (reason) {
  // 在异步操作失败时执行，获取到失败的原因
  console.error('失败：' + reason)
})
```

在这个示例中，我们创建了一个 Promise 对象，它模拟了一个异步操作（这里使用了 `setTimeout` 来模拟延迟）。当异步操作成功时，我们调用 `resolve`，传递成功的数据；当异步操作失败时，我们调用 `reject`，传递失败的原因。然后，我们使用 `.then()` 方法来处理成功的情况，使用 `.catch()` 方法来处理失败的情况

Promise 还支持链式调用，每个 `.then()` 又返回一个新的 Promise 对象，这个对象可被用于链式调用，例如：

```js
asyncFunction1()
  .then(asyncFunction2)
  .then(asyncFunction3)
  .catch(errorFunction)
```

这种方式可以让异步代码更具可读性和可维护性

### 静态方法

Promise 构造函数具有一些静态方法，通常用于处理多个 Promise 实例或执行一些与异步操作相关的任务。

#### Promise.resolve()

返回一个已兑现状态的 promise 对象，若参数本身是一个 promise，它将原样返回。

```js
const foo = Promse.resolve(100)
foo.then((res) => {
  console.log(res) // 100
})
```

通常，如果你不知道一个值是否是 Promise，那么最好使用 [`Promise.resolve(value)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 将其转换成 Promise 对象，并将返回值作为 Promise 来处理

#### Promise.reject()

返回一个已拒绝状态的 Promise 对象

```js
const bar = Promise.reject('出错了！')
bar.catch((err) => {
  console.log(err) // "出错了！"
})
```

### 并发

`Promise` 类提供了四个静态方法来促进异步任务的并发，以下四个方法都接受一个可迭代对象（通常是一个数组）作为参数，返回一个新的 Promise 对象

#### Promise.all()

在**所有**传入的 Promise 都被兑现时兑现；在**任意一个** Promise 被拒绝时拒绝。

```js
const p1 = Promise.resolve('p1的值')
const p2 = Promise.resolve('p2的值')

Promise.all([p1, p2]).then((res) => {
  console.log(res) // ['p1的值', 'p2的值']
})
```

#### Promise.allSettled()

在**所有**的 Promise 都被敲定时兑现。

```js
const p1 = Promise.resolve('p1的值')
const p2 = Promise.reject('p2的值')

Promise.allSettled([p1, p2]).then((res) => {
  console.log(res)
})
// [
//   { status: 'fulfilled', value: 'p1的值' },
//   { status: 'rejected', reason: 'p2的值' }
// ]
```

#### Promise.any()

在**任意一个** Promise 被兑现时兑现；仅在**所有**的 Promise 都被拒绝时才会拒绝。

#### Primise.race()

在**任意一个** Promise 被敲定时敲定，并采用第一个敲定的 Promise 的结果或原因

## async/await

`async/await` 是一种更现代的异步编程模式，相对于传统的回调函数和 Promise 链，它更容易理解和维护。它使得异步代码更具可读性，并且可以更容易地处理错误。它是 ES7 推出的更易于编写异步程序的关键字

### async

async 用于将函数声明为异步函数，返回一个 Promise 对象，该 Promise 的结果将根据异步函数的返回值来决定

```js
async function fetchData() {
  const data = await fetch('https://example.com/api/data')
  return await data.json()
}
// 也可以使用箭头函数
const fetchMoreData = async () => {
  const data = await fetch('https://example.com/api/data')
  return await data.json()
}
```

### await

`await` 用于等待一个 Promise 对象的兑现（fulfilled）状态，并获取其结果。它只能在被标记了 async 的函数中使用。

使用 `await` 可以将异步操作的代码写得更像同步代码，而不需要使用回调函数。

```js
async function fetchData() {
  const name = await getName() // 等待 getName 异步函数的结果
  return await getInfoByName(name) // 使用getName的结果去请求更多信息
}
```

### 错误处理

可以使用 `try...catch` 块来捕获异步函数中的错误。当使用 `await` 等待 Promise 解决时，如果 Promise 进入了拒绝状态，它会抛出一个异常，可以通过 `catch` 来捕获并处理。

```js
async function example() {
  try {
    const result = await someAsyncFunction()
    return result
  } catch (error) {
    console.error(error)
  }
}
```

也可以使用 `unhandledrejection` 事件监听错误，这个事件会在 Promise 被拒绝且没有被处理时触发。

```js
window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise:', event.promise)
  console.error('Reason:', event.reason)
  // 在这里可以添加其他错误处理逻辑，比如日志记录或通知
})
```

这样，当某个 Promise 被拒绝但没有被处理时，浏览器会触发 `unhandledrejection` 事件，并且你可以在事件处理程序中执行相应的错误处理操作。

## 回调模式

通过将一个函数（回调函数）作为参数传递给异步操作，以便在操作完成时调用该函数

回调模式的主要优点是它的简单性和可用性。但随着代码复杂性的增加，回调模式可能会导致回调地狱（Callback Hell），使代码难以理解和维护

```js
function fetchData(url, callback) {
  // 模拟异步操作，例如发起网络请求
  setTimeout(() => {
    const data = '这是从服务器获取的数据'
    callback(data)
  }, 1000)
}

// 调用异步函数，传递回调函数
fetchData('https://example.com/api/data', function (data) {
  console.log(data) // '这是从服务器获取的数据'
})
```
