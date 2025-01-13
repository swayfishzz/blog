# 缓存

HTTP 缓存机制通过减少客户端与服务器之间的请求次数，提升了网页加载速度，并减少了网络带宽的消耗。HTTP 缓存可以分为强缓存和协商缓存。

## 强缓存

强缓存是指当客户端发起请求时，如果资源在缓存有效期内，客户端直接从缓存中获取，不需要向服务器发送请求。

通过 HTTP 响应头中的 Cache-Control 来实现。

以下是强缓存流程图：

<img src="/assets/strong-cache.png" alt="strong-cache">

以下是一个示例，演示服务端如何通过响应头 Cache-Control 配置强缓存：

::: code-group

```js [server.js]{7,8}
import express from 'express'

const app = express()

app.get('/foo', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // max-age 指缓存有效期，单位是秒
  res.setHeader('Cache-Control', 'max-age=3600')
  res.send({ data: 'foo' })
})

app.listen(3000, () => {
  console.log('server listening on 3000 port')
})
```

```html [client.html]
<!DOCTYPE html>
<html lang="en">
  <body>
    <script>
      fetch('http://localhost:3000/foo')
    </script>
  </body>
</html>
```

:::

此时请求成功后，在 3600 秒内再次请求该接口，将会得到浏览器缓存的结果，以下是控制台信息：

<img src="/assets/strong-cache-effect.png" alt="strong-cache-effect">

缓存过期后，再次请求该接口，浏览器会向服务器发起请求，请求成功会再次将结果加到缓存中。

## 协商缓存

服务器通过设置一些响应头告诉浏览器该资源需要进行协商缓存，浏览器向服务器发送请求时，会携带协商缓存相关的请求头，由服务器确认缓存是否有效，如果有效，服务器返回 304 响应，浏览器继续使用缓存；如果无效，服务器返回最新的资源。

服务器需要设置以下响应头：

- **Last-Modified**：表示服务器上资源的最后修改时间。
- **ETag**：是资源的唯一标识符（通常是基于文件内容生成的哈希值）。

浏览器请求时，会携带以下请求头进行协商：

- **If-Modified-Since**：上次缓存资源的 Last-Modified 时间。
- **If-None-Match**：上次缓存资源的 ETag。

服务器收到请求后，会比对请求头 If-None-Match 的值与资源的 ETag 是否一致，如果一致，服务器直接返回 304 响应；如果不一致，服务器再将请求头 If-Modified-Since 的值与资源最后修改时间比对，如果一致返回 304，不一致则返回新的资源。

::: tip

根据 [RFC 7232](https://www.rfc-editor.org/rfc/rfc7232#section-2.1) 规定，**ETag** 分为强弱两种格式。

|                                             | 强 ETag                                          | 弱 ETag                                                          |
| ------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| <span style="text-wrap: nowrap">**格式**</span> | `"12345"`                                        | `/W"12345"`                                                      |
| <span style="text-wrap: nowrap">**定义**</span> | 资源的每一个字节都必须完全一致才认为是相同的资源 | 如果资源的语义意义相同，则认为是相同的资源，即使内容有细微的变化 |
| <span style="text-wrap: nowrap">**生成**</span> | 通常由文件内容的哈希值生                         | 通常由文件的最后修改时间和大小生成                               |

:::

以下是协商缓存的流程图：

<img src="/assets/conditional-cache.png" alt="conditional-cache">

以下是一个示例，演示服务端如何配置协商缓存：

> 例如我们在 public 目录下有 1.jpg 资源，使用 express 的 static 中间件可以配置协商缓存

::: code-group

```js [server.js]
import express from 'express'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

const app = express()
const base = dirname(fileURLToPath(import.meta.url))

app.use(
  express.static(resolve(base, 'public'), {
    etag: true, // 启用 ETag
    lastModified: true, // 启动 Last-Modified
  }),
)

app.listen(3000, () => {
  console.log('server listening on 3000 port')
})
```

```html [client.html]
<!DOCTYPE html>
<html lang="en">
  <body>
    <img src="http://localhost:3000/1.jpg" />
  </body>
</html>
```

:::

此时第一次请求成功后，浏览器会拿到 200 的响应结果，第二次请求时，会自动携带 If-Modified-Since 和 If-None-Match 请求头，如果服务器判断该文件未变动，会返回 304 状态码，如下：

<img src="/public/assets/conditional-cache-status.png" alt="conditional-cache-status">

以下是本次请求的请求头与响应头信息：

<img src="/public/assets/conditional-cache-headers.png" alt="conditional-cache-headers">

此时若服务器的 1.jpg 资源发生变动，下次请求时会给浏览器响应 200 状态码，并设置最新的 ETag 和 Last-Modified 响应头。

## 差异

强缓存在设置后，有效期内浏览器直接使用本地缓存中的资源，不会向服务器发起请求，适合变动频率低的资源，如页面 logo、字体文件、js/css 静态资源等；

协商缓存设置后，浏览器的请求每次都会到达服务器，由服务器判断缓存是否有效，适合变动频繁的资源。
