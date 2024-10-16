# EventEmitter

EventEmitter 是 Node.js 中的一个核心模块，用于处理事件驱动编程。通过 EventEmitter，你可以创建能够监听和触发事件的对象。

## 基本使用

### 创建 EventEmitter 实例

```js
const { EventEmitter } = require('node:events')

const emitter = new EventEmitter()
```

### 绑定事件

使用 `on` 或 `addListener` 绑定监听器。

```js
emitter.on('event-name', () => {
  console.log('事件被触发了！')
})

emitter.addListener('event-name', () => {
  console.log('事件被触发了！')
})
```

使用 `once` 绑定监听器，监听器只会被执行一次，在首次触发后自动移除。

```js
emitter.once('event-name', () => {
  console.log('触发一次后自动移除')
})
```

### 触发事件

使用 emit 方法来触发一个事件。

```js
emitter.emit('event-name')
```

可以传递参数给监听器。

```js
emitter.on('event-name', msg => {
  console.log(msg) // emit 执行后，打印 ‘你好’
})

emitter.emit('event-name', '你好')
```

### 移除监听器

如果不再需要某个监听器，可以使用 `off` 或 `removeListener` 移除它。

```js
const listener = () => console.log('我是监听器')

emitter.on('event-name', listener)
emitter.off('event-name', listener) // 移除

emitter.removeAllListeners() // 移除所有监听器
emitter.removeAllListeners('event-name') // 移除所有 event-name 绑定的监听器
```

## 更多用法

### 最大监听器数量限制

默认情况下，`EventEmitter` 对象对每个事件的最大监听器数量是 10。如果超过这个数量，`EventEmitter` 会发出警告。可以通过 `setMaxListeners` 方法来调整。

```js
emitter.setMaxListeners(20)
```

### 获取事件监听器绑定的数量

使用 `listenerCount` 方法来获取指定事件的监听器数量。

```js{6}
const listener = () => console.log('你好')

emitter.on('event-name', listener)
emitter.on('event-name', listener)

console.log(emitter.listenerCount()) // 2
```

### 获取所有事件名

使用 `eventNames` 方法获取所有的事件名称。

```js
emitter.on('foo', () => {})
emitter.on('bar', () => {})
emitter.on('baz', () => {})

console.log(emitter.eventNames()) // ['foo', 'bar', 'baz']
```

### 获取指定事件的所有监听器

使用 `listeners` 方法来获取指定事件的所有监听器。

```js
const listener1 = () => console.log('Listener 1')
const listener2 = () => console.log('Listener 2')

emitter.on('event', listener1)
emitter.on('event', listener2)

console.log(emitter.listeners('event')) // [ [Function: listener1], [Function: listener2] ]
```
