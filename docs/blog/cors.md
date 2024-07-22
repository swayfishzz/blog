# CORS

## 同源策略

同源策略（Same-Origin Policy）是浏览器端独有的一套安全机制，当两个不同的源（即协议、域名、端口不同）进行通信时，同源策略会对此次通信做出不同程度的限制。它的主要目的是保护用户的数据不被恶意网站窃取。

### 定义

只有当两个 URL 具有相同的协议（scheme）、域名（host）和端口（port）时，它们才被认为是同源的。

### 影响

1. **XMLHttpRequest 和 Fetch**：只能向同源的 URL 发送请求。
2. **DOM 访问**：只能访问同源的页面 DOM。
3. **Cookie、LocalStorage 和 IndexedDB**：只能在同源的上下文中访问。
4. **iframe 和嵌入**：嵌入的内容如果不是同源的，访问受到限制。

## 使用 CORS 进行跨域

尽管同源策略是一项重要的安全机制，但有时需要跨域访问。

以下只说明 AJAX 跨域的情况，既 XMLHttpRequest 和 Fetch 进行网络通信时产生的跨域问题。

CORS（Cross-Origin Resource Sharing）是目前比较流行、浏览器也比较推荐的一种方案；它需要服务器的配合，通过设置适当的 HTTP 响应头来允许来自特定源的请求。

### 简单请求（Simple Request）

- 请求方法为 `GET`、`POST`、`HEAD`之一。
- `Content-Type` 为以下几个 MIME 类型之一：`text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`。
- 不含自定义请求头，详情见 [W3C](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)。

若服务器允许该请求跨域，需要在响应头的 `Access-Control-Allow-Origin` 字段中包含该请求的 Origin ，如：

```http
Access-Control-Allow-Origin: 客户端的 Origin
```

### 预检请求（Preflight Request）

不符合简单请求的条件就是预检请求。此时浏览器会先向服务器发送一个 `OPTIONS` 预检请求，此次请求包含 Origin（源）、Access-Control-Request-Method（请求方法）、Access-Control-Request-Headers（请求头）。如：

```http
OPTIONS /data HTTP/1.1
Origin: http://localhost:8080
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-Custom-Header
```

若服务器允许该 Origin 跨域，需要响应对应的字段，如：

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 3600
```

预检请求通过后，浏览器会发送实际请求。

### 请求头说明

- **`Origin`**: 包含请求发起方的源（协议+域名+端口），用于告诉服务器请求来自哪个源。
- **`Access-Control-Request-Method`**：在预检请求中，用于告诉服务器将使用的 HTTP 方法（如 GET、POST 等）。
- **`Access-Control-Request-Headers`**：在预检请求中，用于告诉服务器将使用的自定义头。

### 响应头说明

- **`Access-Control-Allow-Origin`**：指定允许访问资源的源。
- **`Access-Control-Allow-Methods`**：指定允许的 HTTP 方法。
- **`Access-Control-Allow-Headers`**：指定允许的自定义头。
- **`Access-Control-Allow-Credentials`**：指示是否可以在请求中使用凭据（如 Cookies 和 HTTP 认证信息）。
- **`Access-Control-Expose-Headers`**：允许浏览器访问的响应头。
- **`Access-Control-Max-Age`**：指定预检请求的结果可以缓存多长时间（秒）。

### 注意事项

**cookie**

默认 AJAX 跨域时不会携带 cookie，若服务器需要获取请求的 cookie 就会得到空值，需在 XHR 或 Fetch 中进行配置。

```js
// xhr
var xhr = new XMLHttpRequest()
xhr.withCredentials = true

// fetch
fetch(url, {
  credentials: 'include',
})
```

对于携带 cookie 的请求，服务器需要设置响应头 `Access-Control-Allow-Credentials` 为 true，否则此次跨域请求将会被拒绝。

**客户端访问响应头**

AJAX 进行跨域时，客户端不能获取自定义的响应头，需要服务器设置 `Access-Control-Expose-Headers` 加入允许访问的响应头。

```http
Access-Control-Expose-Headers: authorization, a, b
```
