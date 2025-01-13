# Server Sent Events

Server Sent Events（SSE）是一种服务器向浏览器推送消息的方法。

HTTP 本质上无法实现服务器主动推送消息，SSE 是基于流的特性来完成的。浏览器识别到响应的内容为流，则不会关闭连接，一直等服务器发送新的消息。SSE 以这种变通的方式实现了服务器向客户端的消息推送。

相比于 WebSocket：

| SSE                        | WebSocket      |
| -------------------------- | -------------- |
| HTTP 协议                  | WebSocket 协议 |
| 可发送字符串数据           | 字符串和二进制 |
| 单向通信: 服务器 -> 客户端 | 双工通信       |

SSE 的优点是更加轻量，配置简单，默认断线重连。

SEE 为单向的连接，所以不能从客户端向服务器发送消息。

::: warning

浏览器有最大并行请求连接数，默认为 6，所以 SSE 会受到最大连接数的限制。

使用 HTTP/2，最大连接数量由客户端和服务器之间协商，默认为 100。

:::


## 连接

客户端需要通过 [`EventSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource) 连接服务器：

```js
new EventSource(url[, options])
```

如果跨域连接时要传递凭证，应将 `withCredentials` 设为 `true`：

```js
new EventSource('/foo', { withCredentials: true })
```

`EventSource` 有如下静态属性：

```js
EventSource.CONNECTING = 0 // 连接中或者重连中
EventSource.OPEN = 1 // 已连接
EventSource.CLOSED = 2 // 连接已关闭
```

**实例属性**

- `readyState`：代表连接状态的数字：CONNECTING（0）、OPEN（1）或 CLOSED（2）。
- `url`：事件源的 url。
- `withCredentials`：是否在跨域时携带 cookie。

**事件**

- `open`： 连接成功时触发
- `error`： 连接出错时触发，两种情况会导致浏览器重新发起连接：一种是时间间隔到期，二是由于网络错误等原因，导致连接出错。
- `message`： 接收到服务器推送的消息时触发。
- `自定义事件`： 接收到服务器自定义的事件时触发。

可以通过实例方法 `close` 关闭连接，该方法会关闭连接并将 readyState 属性设置为 CLOSED。

## 消息格式

服务器收到请求后，需要设置响应头 `Content-Type` 为 `text/event-stream`。

然后以流的格式向客户端推送数据，每条消息由一行或多行文字组成，列出该消息的字段。

每个字段由字段名表示，后面是冒号，然后是该字段值的文本数据。

```
field: content\n
```

`field` 取值如下：

| 值    | 说明                                                                                                                                                   |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data  | 服务器向客户端推送的消息内容，客户端可以用 `message` 事件接收。                                                                                        |
| id    | 每条数据的编号；浏览器收到后，会将 EventSource 实例的 lastEventId 设置该 id。重新连接后，将请求头 Last-Event-ID 设置为该值，以便服务器正确地恢复连接。 |
| event | event 字段可以自定义事件类型，客户端需要使用 `addEventListener` 监听，若不指定，则使用 `message` 事件接收。                                            |
| retry | 连接中断后，浏览器重新发起连接的时间间隔（毫秒）。                                                                                                     |

`content` 为要推送的文本数据。

`\n\n` 表示单条消息的结尾。

此外，还有以冒号开头的行，表示注释。通常，服务器每隔一段时间就会向浏览器发送一个注释，保持连接不中断。

```
: This is a comment
```

下面是一些消息的例子：

```
data: Message 1
id: 1

data: Message 2
data: of two lines
id: 2
```

消息以双换行符 `\n\n` 分隔，要发送一个换行 `\n`，我们可以在要换行的位置立即再发送一个 `data: `

## 示例

以下是一个使用 express 处理 SSE 连接的主要代码

::: code-group

```js [server.js]
let index = 1

app.get('/sse', (req, res) => {
  // 设置响应头
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  // 推送消息
  timer = setInterval(() => {
    res.write(`data: 服务器推送的消息：${index}\nid: ${index}\n\n`)
    index++
  }, 1000)
})
```

```js [client]
const es = new EventSource('http://localhost:3000/sse')

es.addEventListener('open', () => {
  console.log('连接成功')
})

es.addEventListener('message', event => {
  console.log(event.data) // 每隔一秒打印一条服务器的消息
})
```

:::

自定义事件类型

::: code-group

```js [server.js]
res.write(`event: user-msg\ndata: 用户信息的数据\nid:1\n\n`)
```

```js [client]
es.addEventListener('user-msg', event => {
  console.log(event.data)
})
```
