# HTTP

HTTP（超文本传输协议，Hypertext Transfer Protocol）是五层网络模型中的应用层的一种协议，用于传输超文本和媒体资源。定义了 Web 客户端（如浏览器）和 Web 服务器之间的通信规则。

## 特点

- **无状态**：HTTP 是一个无状态协议，每个请求都是独立的，与之前的请求或后续的请求无关。这意味着服务器不会自动保存任何请求的信息。为了维护会话状态，需要使用 Cookies、Sessions 等机制。
- **简单**：HTTP 消息是纯文本格式的，易于理解和调试。HTTP/1.x 版本中，消息由头部和主体两部分组成。
- **灵活**：HTTP 可以传输任何类型的数据，不限于文本数据，可以通过 Content-Type 头来指定数据类型。

## 请求

HTTP 请求内容由请求行、请求头、请求体组成。

- 请求行：由三部分内容，以空格隔开，分别为 请求方法、资源路径、http 版本，以换行结束
- 请求头：提供关于客户端环境、请求主体和请求本身的信息，若干键值对组成，以回车隔开，双换行结束
- 请求体：要发送给服务器的数据，数据类型对应请求头中 Content-Type 的 MIME 类型

```http
POST /login HTTP/1.1
Host: http://localhost:3000
Content-Type: application/json

{
  "username": "admin",
  "password": "123123",
}
```

> 提示
>
> 1.query 参数中不能包含非 ASCII 码字符，如果有浏览器会自动转为 ASCII 码。
>
> 2.query 参数有最大长度限制，不宜在此位置存放过长的参数。

## 响应

HTTP 请求内容由请求行、请求头、请求体组成。

- 状态行：包括 HTTP 版本、状态码和状态描述。
- 响应头：提供关于服务器和响应主体的信息（如 Content-Type、Content-Length）。
- 响应主体：服务器返回给客户端的数据。

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 137

<html>
  <head><title>Example</title></head>
  <body><p>Hello, World!</p></body>
</html>
```

## 常见请求方法

http 的请求方法本质是相同的，只是语义的不同，人们根据语义来对不同的请求方法进行区分，实际上就连 get 方法也支持添加请求体，只要和服务器协商一致。

- GET：获取数据
- POST：提交数据
- PUT：修改数据
- DELETE：删除数据
- HEAD：获取数据的笼统信息（如大小、类型等）。不返回响应体。

## 常见 HTTP 状态码

状态码由开发服务器的人控制返回，有时候并不完全正确

**1xx（信息性状态码）**

- 100 Continue：服务器收到请求的初始部分，客户端应继续发送请求的其余部分。

**2xx（成功状态码）**

- 200 OK：请求成功。
- 201 Created：请求成功并创建了新的资源。

**3xx（重定向状态码）**

- 301 Moved Permanently：资源永久移动到新位置。
- 302 Found：资源临时移动到新位置。

**4xx（客户端错误状态码）**

- 400 Bad Request：请求无效。
- 401 Unauthorized：需要身份验证。
- 403 Forbidden：服务器拒绝请求。
- 404 Not Found：资源未找到。

**5xx（服务器错误状态码）**

- 500 Internal Server Error：服务器内部错误。
- 502 Bad Gateway：网关或代理服务器收到无效响应。
- 503 Service Unavailable：服务器当前无法处理请求。

## 安全性

HTTP 本身是不安全的，因为传输的数据是明文的。为了保护数据的安全性，可以使用 HTTPS（HTTP Secure），它在 HTTP 基础上增加了 TLS/SSL 加密层，确保数据在传输过程中不会被窃取或篡改。
