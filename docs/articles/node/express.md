# Express

Express 是一个流行的 Node.js 框架，用于构建 Web 应用程序和 API

中文文档：https://express.nodejs.cn/en/4x/api.html

## 开始

首先，选择一个目录用来存放 express 相关的文件

使用 npm 安装 express

```bash
npm i express
```

创建 express 应用程序，在项目目录下新建一个 js 文件（例如： app.js），使用以下代码初始化 express

```js
const express = require('express')
const app = express()
const port = 3000 // 指定应用程序运行的端口号

// 定义路由和处理程序
app.get('/', (req, res) => {
  res.send('<h1>Hello, Express!</h1>')
})

// 启动服务器
app.listen(port, () => {
  console.log(`Express应用程序正在监听端口 ${port}`)
})
```

在命令行界面中，使用以下代码来运行 express 应用程序

```bash
node app.js
```

如果想要在改动代码后自动运行 express，可以安装 `nodemon` 工具，使用它来运行 express

```bash
npm i nodemon -g # 安装 nodemon
nodemon app.js # 使用 nodemon 运行程序
```

打开 Web 浏览器，并访问 http://localhost:3000，能够看到应用程序返回的"Hello, Express!"消息

## 请求与响应

在 Express 中，`req` 和 `res` 是处理路由时最常用的两个对象，它们分别代表了请求（request）和响应（response）

### 请求对象 Request

`req`（request） 对象表示 HTTP 请求，包含了来自客户端的所有请求信息，例如请求的 URL、HTTP 方法、请求头、查询参数、请求体等。可以使用 `req` 对象来访问客户端发送的数据，例如表单数据、URL 参数等

例如：

```js
// -> http://localhosot:3000/user/3?name=jack

app.get('/user/:id', (req, res) => {
  console.log(req.headers['host']) // 获取请求头的host "localhosot:3000"
  console.log(req.params.id) // 获取路径参数id "3"
  console.log(req.query.name) // 获取url参数name "jack"
  console.log(req.path) // 获取请求路径 "/user/3"
})
```

常见的属性和方法

- `req.params`：包含路由中的参数信息，如路径参数。
- `req.query`：包含查询参数的对象。
- `req.body`：包含请求体中的数据（需要中间件支持，如`body-parser`或`express.json`）。
- `req.method`：包含 HTTP 请求方法，如 GET、POST 等。
- `req.path`：包含请求路径部分。
- `req.headers`：包含请求头信息的对象。

### 响应对象 Response

`res`（response） 对象用于构建和发送响应给客户端，包括设置响应头、响应体、状态码等。可以使用 `res` 对象来向客户端发送各种数据，如 HTML、JSON、文件等

例如：

```js
app.get('/api/data', (req, res) => {
  res.setHeader('some-header', 'some-value') // 设置请求头
  res.send([2, 3, 4]) // 向客户端发送数据
  res.status(200).json({ name: 'jack' }) // // 设置状态码为200，并发送JSON响应
  res.redirect(302, 'www.baidu.com') // 以302状态码重定向，不写状态码默认301
})
```

常见的属性和方法

- `res.send(data)`：向客户端发送数据，可以是文本、HTML、JSON 等。
- `res.json(data)`：向客户端发送 JSON 响应。
- `res.status(code)`：设置响应的 HTTP 状态码。
- `res.header(name, value)`：设置响应头。
- `res.redirect(url)`：将客户端重定向到另一个 URL。
- `res.sendFile(path)`：发送文件作为响应。
- `res.end()`：结束响应。用于在没有任何数据的情况下快速结束响应。 如果你需要用数据响应，请改用 [res.send()](https://express.nodejs.cn/en/4x/api.html#res.send) 和 [res.json()](https://express.nodejs.cn/en/4x/api.html#res.json) 等方法。

## 中间件

[Express 中间件](https://express.nodejs.cn/en/guide/using-middleware.html) 是一个重要的概念，它允许在请求到达路由函数之前或之后执行一些功能。

Express 中间件是一个函数，它接收三个参数：`req`（请求对象）、`res`（响应对象）、`next`（一个回调函数）。中间件函数可以执行任何任务，然后通过调用`next`来将控制权传递给下一个中间件或路由函数。

> 若要捕获错误，需要四个参数，`(err, req, res, next)`

可以在 Express **全局** 或 **路由** 中应用中间件。应用在路由之前或之后的中间件可以用于全局任务（例如身份验证检查），而路由级别的中间件仅对特定路由生效。

```js
const express = require('express')
const app = express()

// 使用 app.use 即可将一个函数作为全局中间件使用
app.use((req, res, next) => {
  console.log(`一个${req.method}请求来了，请求路径为${req.path}`)
  next() // 将控制权传递给下一个中间件或路由函数
})

app.listen(3000, () => {
  console.log('Express应用程序正在监听3000端口')
})
```

### 内置中间件

Express 提供了一些内置的中间件，可以通过`app.use()`方法轻松启用

#### express.static()

`express.static` 可以将指定目录下的静态文件（如 HTML、CSS、JavaScript、图像等）直接提供给客户端，而不需要编写额外的路由来处理这些文件。它使你能够轻松地提供静态资源。

以下是一个使用 `express.static()` 中间件的示例

```js
const express = require('express')
const path = require('path')
const app = express()

// 将public目录作为静态资源地址
const staticDir = path.resolve(__dirname, 'public')
app.use(express.static(staticDir)) // 应用中间件

app.listen(3000, () => {
  console.log('Express应用程序正在监听3000端口')
})
```

现在，Express 应用程序将可以提供 "public" 目录中的静态文件。例如，在 "public" 目录下有一个名为 "index.html" 的文件，客户端可以通过访问 http://localhost:3000/index.html 来访问该文件。

当找不到文件时，它不会发送 404 响应，而是调用 `next()` 以继续下一个中间件

#### express.json()

用于解析传入请求的 JSON 数据。常用于接收客户端 JSON 格式的数据（application/json），例如通过 POST 或 PUT 请求发送的数据。

当客户端发送包含 JSON 数据的请求时，`express.json()` 中间件会将 JSON 数据解析为 JavaScript 对象，并将其添加到 `req.body` 中，以便在路由函数中访问。

以下是一个使用 `express.json()` 中间件的示例

```js
const express = require('express')
const app = express()

// 应用中间件
app.use(express.json())

// 模拟携带 json 数据的 post 请求
app.post('/api/data', (req, res) => {
  const jsonData = req.body // 从请求体中获取JSON数据
  // 处理jsonData...
  res.status(200).json({ message: '接收并处理JSON数据。' })
})

app.listen(3000, () => {
  console.log('Express应用程序正在监听3000端口')
})
```

现在，Express 应用程序将能够正确解析传入请求中的 JSON 数据，并在路由函数中使用它

#### express.urlencoded

用于解析传入请求的 URL 编码表单数据。常用于接收客户端表单数据（application/x-www-form-urlencoded），它会将表单数据转为 JS 对象，并添加到 `req.body` 中

以下是一个使用 `express.urlencoded()` 中间件的示例

```js
const express = require('express')
const app = express()

// 应用中间件
app.use(express.urlencoded({ extended: true }))

// 模拟携带 form 表单数据的 post 请求
app.post('/api/form', (req, res) => {
  const formData = req.body // 从请求体中获取表单数据
  // 处理formData...
  res.status(200).send('接收并处理表单数据。')
})

app.listen(3000, () => {
  console.log('Express应用程序正在监听3000端口')
})
```

### 自定义中间件

可以编写自己的自定义中间件函数，以满足应用程序的特定需求。自定义中间件函数可以执行任何任务，例如验证用户、记录请求、修改请求或响应等

下面是一个示例，演示如何创建一个自定义中间件来处理 Express 应用程序中的错误。这个中间件将捕获应用程序中的错误，并向客户端发送适当的错误响应。

> 错误处理中间件总是需要四个参数。 你必须提供四个参数以将其标识为错误处理中间件函数。 即使你不需要使用 `next` 对象，你也必须指定它来维护签名。 否则，`next` 对象将被解释为常规中间件，无法处理错误。

```javascript
const express = require('express')
const app = express()

// 自定义中间件函数，用于处理错误
const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ msg: '出现了一些错误!' })
}

// 模拟一个会触发错误的路由函数
app.get('/error', (req, res, next) => {
  try {
    ''.forEach() // 模拟一个错误
  } catch (error) {
    next(error)
  }
})

// 使用自定义错误处理中间件
app.use(errorHandler)

app.listen(3000, () => {
  console.log('Express应用程序正在监听3000端口')
})
```

当访问 `http://localhost:3000/error` 时，服务器会触发错误，然后 `errorHandler` 中间件会捕获并处理它，向客户端发送一个包含错误信息的 HTTP 500 响应。

这个示例演示了如何创建一个自定义中间件来处理 Express 应用程序中的错误，并可以根据需要扩展中间件来处理不同类型的错误情况。这对于捕获和处理应用程序中的异常情况非常有用，以确保应用程序保持稳定和可靠。

### 第三方中间件

第三方中间件是由独立开发者或团队创建并维护的中间件，这些第三方中间件提供了各种功能，如身份验证、日志记录、数据验证、安全性增强等

以下是一些常见的第三方中间件的示例：

#### body-parser

用于解析请求体的中间件，它支持解析 JSON、URL 编码和多部分表单数据。您可以使用它来访问 POST 请求中的数据。示例：

```javascript
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // 解析JSON数据
app.use(bodyParser.urlencoded({ extended: true })) // 解析URL编码数据
```

#### helmet

它是一个安全性增强的中间件，用于设置 HTTP 标头，以防止一些常见的 Web 安全漏洞。它有助于提高 Express 应用程序的安全性。示例：

```javascript
const helmet = require('helmet')
app.use(helmet())
```

#### morgan

一个 HTTP 请求日志记录中间件，它可以记录每个请求的信息，例如请求方法、URL、响应状态码等。示例：

```javascript
const morgan = require('morgan')
app.use(morgan('dev')) // 使用"dev"格式的日志记录
```

#### cookie-parser

用于解析和处理 HTTP 请求中的 cookie 数据。它可用于处理用户身份验证和会话管理。

- 使用 `req.cookies.someCookie` 获取客户端发送的 cookie 数据

- 使用 `res.cookie()` 设置 cookie

  ```javascript
  const cookieParser = require('cookie-parser')
  app.use(cookieParser())

  app.get('/', (req, res) => {
    // 获取 cookie
    const token = req.cookies.token
    // 设置 cookie
    res.cookie('cookie-key', 'cookie-value', {
      maxAge: 24 * 3600 * 1000, // 24 小时，单位毫秒
      httpOnly: true,
    })
  })
  ```

#### passport

它是一个非常强大的身份验证中间件，它支持多种身份验证策略，如本地策略、OAuth、OpenID 等。它用于处理用户身份验证和授权。示例：

```javascript
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())
```

#### express-async-errors

上面自定义中间件章节中，已写过一个错误处理中间件，它并不能处理异步错误，所以还需使用此中间件。

它可以在 Express 应用程序中更轻松地处理异步操作中的错误，我们就不用每个异步函数都去加 `try/catch`，其原理是将 `express` 里面的中间全部包裹上一层 `try/catch`。

示例：

```js
const express = require('express')
require('express-async-errors') // 引入 express-async-errors 模块即可
```

此时，若错误发生，我们自定义的错误处理的中间件就可以捕获到

使用第三方中间件可以大大简化开发过程，因为它们提供了现成的解决方案，使您能够更快地构建功能丰富的应用程序。要使用第三方中间件，只需在应用程序中安装它们，然后按照它们的文档进行配置和使用。

## 路由

路由将请求的 URL 与路由函数相关联，以定义在特定 URL 上执行的操作

可以将相关的路由组织成路由组，以便更好地管理和维护应用程序的路由。Express 中使用`express.Router`来创建路由组。例如：

```js
const express = require('express')
const app = express()
const router = express.Router()

router.get('/:id', (req, res) => {
  // 处理获取单个用户的请求
})
router.post('/', (req, res) => {
  // 处理新增用户的请求
})

app.use('/api/user', router) // 将路由组添加到"/api/user"下

app.listen(3000, () => {
  console.log('Express应用程序正在监听3000端口')
})
```

使用`app.use()`将这个路由组添加到应用程序的`/api`路径下

以上内容即为 Express 的入门指南，下一步将例举常见的应用场景，以构建更丰富的应用程序