# AJAX

没有 Ajax 时，web 应用依靠表单来提交一些数据，而每次提交表单，服务器处理后就会返回一个新的 html 页面，这两个前后的 html 页面的大部分内容都是相同的，无疑增加了带宽的消耗。

Ajax（Asynchronous JavaScript and XML - 异步的 JavaScript 与 XML）是一个浏览器端的技术，目的在于能在不更新整个页面的前提下维护数据。虽然名称含 XML，但数据格式也可以由 JSON 代替。

浏览器提供了两种用于实现 Ajax 技术的 API：`fetch` 和 `XMLHttpRequest`。

## Fetch

[Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) 是一种用于在浏览器中进行网络请求的现代方法。它提供了一个简单而强大的接口，用于发送 HTTP 请求并处理响应。

示例：

```js
fetch('/api', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ foo: 'bar' }), // 请求体
}).then(res => {
  res.ok // 请求是否成功
  res.headers // 请求头内容
  res.json() // 将结果解析为 json 对象，返回 Promise
  res.text() // 将结果解析为字符串，返回 Promise
})
```

### 请求

第一个参数为要请求的资源地址，默认为 `GET` 请求。

```js
fetch('/api')
```

第二个参数为一个可选的配置对象。

```js
fetch('/api', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/css',
  },
})
```

- `method`：请求方法，GET、POST、PUT、DELETE 等，默认 GET。
- `mode`：要使用的模式，如 cors、no-cors 或 same-origin。
- `cache`：配置请求缓存，default、no-store、reload、no-cache、force-cache 和 only-if-cached。
- `credentials`：如何处理 cookie 凭据，omit 包含 cookie；same-origin 同源携带 cookie；include 同源和跨域都包含 cookie。
- `headers`：请求标头，如 Content-Type 等，可自定义添加。
  - `Content-Type`：资源的 [MIME 类型](https://www.iana.org/assignments/media-types/media-types.xhtml)。
- `body`：消息体，如 JSON、字符串、Blob、ArrayBuffer、FormData 等，需要与请求头中的 Content-Type 匹配。
- `redirect`：控制如何处理重定向，follow 跳转到重定向的地址；error 不跳转重定向页面并显示错误；[manual](https://fetch.spec.whatwg.org/#concept-request-redirect-mode) 手动处理。
- `referrer`：发起请求的客户端的信息，一般为一个 url。
- `signal`：AbortSignal 实例，用来中止 fetch 请求。

### 响应

fetch 返回一个 Promise 对象，该 Promise 兑现后返回一个 [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象。

```js
const response = await fetch('/api')

response.ok // 是否成功
response.headers // 响应头信息
```

Response 对象的常用属性和方法：

- `headers`：本次请求的响应头信息
  - `get()`：根据键名返回对应的值
  - `has()`：判断是否有某个标头
  - `set()`：设置标头，若没有会新增
  - `delete()`：根据键名删除标头
  - `keys()`：返回键名的遍历器
  - `values()`：返回键值的遍历器
  - `entries()`：返回键值对的遍历器
  - `forEach()`：为每个标头执行一次传入的函数
- `ok`：布尔值，代表本次请求是否成功（http 状态码 200 - 299 之间）
- `body`：[ReadableStream](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 可读的数据字节流
- `redirected`：本次请求是否来自一个重定向
- `status`：状态码，如 200、404 等
- `statusText`：状态码的文本描述，如 200 为 ok
- `type`：类型，如 basic、cors
- `url`：url 地址
- `json()`：返回一个被解析为 JSON 格式的 Promise 对象
- `text()`：返回一个被解析为字符串格式的 Promise 对象
- `formData()`：返回一个被解析为 FormData 格式的 Promise 对象
- `blob()`：返回一个被解析为 Blob 格式的 Promise 对象
- `arrayBuffer()`：返回一个被解析为 ArrayBuffer 格式的 Promise 对象
- `clone()`：创建该 Response 对象的克隆，以上方法皆只能被读取一次，使用 clone() 方法可以创建克隆并再次读取

### 中止请求

中止 fetch 的请求，需要用到 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 对象。

```js
const controller = new AbortController()

fetch('/api', { signal: controller.signal })

// 在之后的某个时刻调用 abort 方法中止请求
controller.abort()
```

## XMLHttpRequest

[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 是最早用于实现 Ajax 的技术之一。现在已经不推荐使用它来实现 ajax 交互，因为它的操作过程较为繁琐，推荐使用 Fetch。

```js
// 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest()

// 使用 open 指定请求的方法、URL
xhr.open('GET', '/api')

// 通过 send 方法发送请求
xhr.send()

// 在 onreadystatechange 事件中处理服务器响应
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}
```

XMLHttpRequest 进行网络请求的操作过程过于繁琐，通常会使用第三方库来完成网络通信，比如 axios。
