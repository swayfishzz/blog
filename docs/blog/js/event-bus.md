# EventBus

EventBus 是一种通信机制，基于发布订阅设计模式。它可以在不同模块/组件之间进行通信。

## 实现

核心理念是，在任一程序中发布某一事件，其它订阅了该事件的模块会收到通知，执行绑定的监听器。

```js
class EventBus {
  #eventBus = Object.create(null)

  /**
   * 触发一个事件
   * @param {String} eventName 事件名称
   * @param {...any} args 参数
   */
  emit(eventName, ...args) {
    if (!this.#eventBus[eventName]?.length) return
    for (const listener of this.#eventBus[eventName]) {
      listener(...args)
    }
  }

  /**
   * 为某个事件绑定监听器
   * @param {String} eventName 事件名称
   * @param {Function} listener 事件监听器
   */
  on(eventName, listener) {
    if (!this.#eventBus[eventName]) this.#eventBus[eventName] = []
    this.#eventBus[eventName].push(listener)
  }

  /**
   * 移除事件监听器
   * @param {String} eventName 事件名称
   * @param {Function} [listener] 事件监听器，不传移除 eventName 绑定的所有监听器
   */
  off(eventName, listener) {
    if (!this.#eventBus[eventName]?.length) return
    if (!listener) {
      delete this.#eventBus[eventName]
    } else {
      const index = this.#eventBus[eventName].indexOf(listener)
      index !== -1 && this.#eventBus[eventName].splice(index, 1)
    }
  }
}
```

- `#eventBus`：事件存储器，用于管理事件及监听器。
- `on`：针对某个事件添加监听器，在收到发布时执行绑定的监听器。
- `emit`：发布事件，发布后会执行 #eventBus 中订阅该事件的监听器。
- `off`：移除事件监听。

## 扩展

以上代码即可实现一个事件总线程序，实际开发可以添加额外功能，以获得更好的体验

- 错误处理：在循环调用监听器列表时，进行错误捕获，避免因单个监听器的错误导致后续监听器无法执行。
  ```js
  emit(eventName, ...args) {
    if (!this.#eventBus[eventName]?.length) return
    for (const listener of this.#eventBus[eventName]) {
      try {
        listener(...args)
      } catch(error) {
        console.error(`Error in event handler for ${eventName}:`, error)
      }
    }
  }
  ```
- 仅执行一次的监听器：可以添加 once 方法，用于注册只触发一次的事件监听器。
  ```js
  once(eventName, listener) {
    const onceListener = (...args) => {
      this.off(eventName, onceListener)
      listener(...args)
    }
    this.on(eventName, onceListener)
  }
  ```
- 性能优化：#eventBus 可以使用 Map 结构，对应的事件监听器列表可以使用 Set 结构，在大量的事件和监听器中，提高性能。
