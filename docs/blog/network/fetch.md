# Fetch 基本使用

fetch 是一种现代的、基于 Promise 的方式来进行网络请求，相对于传统的 XMLHttpRequest 更容易使用

### 请求配置

fetch 至少接收一个参数，即资源路径。它返回一个 Promise，第二个可选参数为一个配置对象，常见的配置有：

```js
fetch('https://example.com', {
  method: 'POST', // GET, POST, PUT, DELETE
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: JSON.stringify({ foo: 'bar' }), // 必须与请求头 'Content-Type' 匹配
})
```

#### 提交 json 数据

需要将请求配置中的 `headers['Content-Type']` 设置为 json 格式，并且将要传输的数据转为 JSON 字符串放在 body 中

```js
const data = { name: '张三', age: 30 }

fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // 设置为 json 格式
  },
  body: JSON.stringify(data), // 将对象转为JSON字符串
}).then((response) => {
  // ···
})
```

#### 提交表单数据

```js
const form = document.querySelector('form')

fetch('/api/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // 设置为表单格式
  },
  body: new FormData(data), // 构建表单的消息体
}).then((response) => {
  // ···
})
```

#### 上传文件

构建一个表单进行上传，浏览器会自动设置相关请求头

```js
const fileInp = document.querySelector('input[type=file]')

const formData = new FormData() // 构建form-data的消息体
formData.append('file', fileInp.files[0]) // 上传单个文件

fetch('/api/upload', {
  body: formData,
  method: 'POST',
}).then((response) => {
  // ···
})
```

#### 上传二进制数据

上传二进制数据时，将 Blob 或 arrayBuffer 数据放在`body`属性里面

```js
let blob = await new Promise((resolve) => canvasElem.toBlob(resolve, 'image/png'))

fetch('/api/image', {
  method: 'POST',
  body: blob,
}).then((response) => {
  // ···
})
```

### 响应数据

服务器返回响应结果后，fetch 会将 promise 兑现为一个 Response 对象，例如：

```js
fetch('https://example.com').then((response) => {
  console.log(response.ok)
  console.log(response.headers)
})
```

常见的 response 属性有：

- **Response.headers**：包含相应完成后的请求头相关信息
- **Response.status**：Response 的状态码（例如 `200` 表示成功）
- **Response.ok**：检查 response 的状态是否在 200 - 299（包括 200 和 299）这个范围内。该属性返回一个布尔值。
- **Response.arrayBuffer()**：返回一个被解析为 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 格式的 Promise 对象
- **Response.blob()**：返回一个被解析为 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 格式的 Promise 对象
- **Response.formData()**：返回一个被解析为 [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) 格式的 Promise 对象
- **Response.json()**：返回一个被解析为 `JSON` 格式的 Promise 对象。
- **Response.text()**：返回一个被解析为字符串格式的 Promise 对象

#### 判断是否请求成功

只有网络错误，或者无法连接时，`fetch()`才会报错，其他情况都不会报错，而是认为请求成功。这就是说，即使服务器返回的状态码是 4xx 或 5xx，`fetch()`也不会报错（即 Promise 不会变为 `rejected`状态）。此时可以通过 response.ok 来判断是否请求成功

#### 请求头操作

Headers 对象提供了以下方法，用来操作标头

- **`Headers.get()`**：根据指定的键名，返回键值。
- `Headers.has()`： 返回一个布尔值，表示是否包含某个标头。
- `Headers.set()`：将指定的键名设置为新的键值，如果该键名不存在则会添加。
- `Headers.append()`：添加标头。
- `Headers.delete()`：删除标头。
- `Headers.keys()`：返回一个遍历器，可以依次遍历所有键名。
- `Headers.values()`：返回一个遍历器，可以依次遍历所有键值。
- `Headers.entries()`：返回一个遍历器，可以依次遍历所有键值对（`[key, value]`）。
- `Headers.forEach()`：依次遍历标头，每个标头都会执行一次参数函数。

例如，要获取响应数据的 Content-Type 属性，我们可以：

```js
fetch('https://example.com').then((response) => {
  console.log(response.headers.get('Content-Type'))
})
```

#### 处理二进制文件

常见场景是，服务器返回了一张图片的二进制数据，此时，我们可以编写以下代码来获取图片

```js
fetch('/api/getimage')
  .then((res) => res.blob())
  .then((data) => {
    const url = URL.createObjectURL(data)
    // 创建一个图片元素并设置其 src 属性
    const img = document.createElement('img')
    img.src = url
    // 将图片元素添加到页面中的某个容器中
    document.body.appendChild(img)
  })
```

#### 多次读取 Response

因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次，例如：

```js
const response = await fetch('/api/data')
const text = await response.text()
const json = await response.json() // 报错，response 已经被读取过
```

使用 Response.clone() 方法可以创建一个 `Response` 对象的克隆，实现多次读取

```js
const resp = await fetch('/api/data')
const respClone = await resp.clone()

const text = await resp.text()
const json = await respClone.json() // 第二次读取克隆的响应数据
```
