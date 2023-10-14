# Express 常见场景

记录使用 Express 作为后端服务器时的实用场景

## 文件上传

在 Express 应用程序中处理文件上传，可以使用 [`multer`](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md) 中间件，它是一个用于处理文件上传的流行工具

使用 npm 安装 `multer` 模块

```bash
npm i multer
```

在 express 中引入 `multer` 模块，配置文件上传的设置，例如：

```js
const express = require('express')
const multer = require('multer')
const app = express()

// diskStorage: 将文件存储到本地磁盘
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, 'public')) // 指定存储的目录
  },
  filename(req, file, cb) {
    cb(null, file.originalname) // 指定上传文件的文件名
  },
})
const upload = multer({ storage })
```

创建一个路由来处理文件上传请求。在路由处理程序中使用`upload.any()`来处理单/多个文件上传。例如：

```js
app.post('/upload', upload.any(), (req, res) => {
  // req.files 包含上传的文件信息
  // req.body 包含其他表单字段的数据
  const result = req.files.map((f) => `/public/${f.filename}`)
  res.json({ data: result }) // 使用json返回文件的访问路径的数组
})
```

upload 中提供很多函数，用来处理不同场景的文件上传：

- `.single(fieldname)`：处理单文件上传；接受一个以 `fieldname` 命名的文件。这个文件的信息保存在 `req.file`

- `.array(fieldname[, maxCount])`：处理多个文件上传；接受一个以 `fieldname` 命名的文件数组。可以配置 `maxCount` 来限制上传的最大数量。这些文件的信息保存在 `req.files`。

- `.fields(fields)`：处理多个文件上传；接受指定 `fields` 的混合文件。这些文件的信息保存在 `req.files`。例如：

  ```js
  ;[
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 },
  ]
  ```

- `.none()`：只接受文本域

- `.any()`：接受一切上传的文件。文件数组将保存在 `req.files`

在前端可以使用表单的方式进行文件上传，确保 `enctype` 属性设置为`multipart/form-data`，如：

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
  <input type="submit" value="Upload" />
</form>
```

还可以使用 AJAX 的方式，例如：

```js
const fileInp = document.querySelector('input[type=file]')
const btn = document.querySelector('button')
// 文件上传
btn.addEventListener('click', function () {
  // 构建form-data的消息体
  const formData = new FormData()
  for (const file of fileInp.files) {
    formData.append('files', file)
  }
  fetch('/upload', {
    body: formData,
    method: 'POST',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
})
```

## 文件下载

可以使用 [`res.download()` ](https://express.nodejs.cn/en/4x/api.html#res.download)方法实现文件下载功能，例如：

```js
const express = require('express')
const path = require('path')
const app = express()

// 客户端传递文件名，使用 res.download() 发送文件给客户端
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename // 文件名
  const filePath = path.resolve(__dirname, 'download', filename) // 文件路径
  res.download(filePath, filename)
})
```

上述示例中，我们创建了一个路由 `/download/:filename`，当客户端访问该路由时，传递要下载的文件名称，它将触发文件下载操作。`res.download()` 方法会自动设置适当的响应头，以便将文件提供给客户端进行下载

在前端可以使用 `a` 标签触发下载行为，例如：

```html
<a href="localhost:3000/download/avatar.png" download></a>
```

## 图片水印

要在 Express 中为图片添加水印，您可以使用一些 Node.js 的图像处理库，如 `gm`（GraphicsMagick）或 `sharp`。以下是一个使用 `sharp` 库的示例，演示如何在 Express 应用程序中为图片添加水印：

首先，确保您的项目中已经安装了 `sharp` 模块。如果没有安装，可以使用以下命令进行安装

```bash
npm i sharp
```

然后，创建一个 Express 路由，用于处理图片并添加水印

```js
const express = require('express')
const sharp = require('sharp')
const app = express()

// 中间件，用于处理图片并添加水印
app.get('/preview', async (req, res) => {
  try {
    const imagePath = '/path/to/your/image.jpg' // 要处理的图片路径
    const watermarkPath = '/path/to/your/watermark.png' // 水印图片路径
    // 使用 sharp 打开要处理的图片
    const image = sharp(imagePath)
    // 使用 composite 方法添加水印
    const watermarkedImage = await image.composite([
      {
        input: watermarkPath,
        gravity: 'southeast', // 水印位置（可根据需要调整）
        blend: 'over', // 混合模式
      },
    ])
    // 将处理后的图片输出到响应
    watermarkedImage.toBuffer((err, data) => {
      res.setHeader('Content-Type', 'image/jpeg') // 替换为实际图片类型
      res.send(data)
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000, () => {
  console.log('Express应用正在监听3000端口。')
})
```

上述示例中，将水印图片添加在原图片的右下角（southeast），效果如下：

<table style="text-align: center;width: 100%;">
  <tr>
    <td>原图</td>
    <td>水印图</td>
    <td>含水印（右下角）</td>
  </tr>
  <tr>
    <td><img src="/md/origin.png" alt="origin" style="zoom: 50%; object-fit: contain" /></td>
    <td><img src="/md/watermark.png" alt="watermark" style="zoom: 67%; object-fit: contain" /></td>
    <td><img src="/md/target.png" alt="target" style="zoom: 50%; object-fit: contain" /></td>
  </tr>
</table>

客户端接收 express 发送的处理后的图片数据：

```js
fetch('/getimage')
  .then((res) => res.arrayBuffer())
  .then((data) => {
    // data 包含图像的二进制数据
    const blob = new Blob([data], { type: 'image/jpeg' }) // 替换为实际的图像类型
    const url = URL.createObjectURL(blob)
    // 创建一个图片元素并设置其 src 属性
    const img = document.createElement('img')
    img.src = url
    // 将图片元素添加到页面中的某个容器中
    document.getElementById('image-container').appendChild(img)
  })
```

实际开发中，替换示例中的 `/getimage` 路径为实际服务器的路径，并根据图像的实际类型（例如，'image/jpeg'、'image/png' 等）调整 Blob 对象的类型

## 图片防盗链

图片防盗链（Image Hotlinking Protection）是一种网站安全措施，用于阻止其他网站或域名上的内容（通常是图片）在未经授权的情况下直接链接到自己的网站上。可能会导致以下问题：

1. 带宽消耗：其他网站消耗您的服务器带宽，而您需要为这些带宽费用付款。
2. 资源盗用：其他网站可能未经授权使用您的图片，这可能侵犯您的知识产权。
3. 数据传输成本：如果您的网站受到大量盗链攻击，可能会导致不必要的数据传输成本

为了防止图片盗链，网站管理员可以实施图片防盗链保护措施，例如，检查请求的 Referer 头部：服务器可以检查请求头中的 Referer 字段，该字段表示请求的来源。如果请求的 Referer 不在白名单内，服务器可以拒绝提供图片或采取其他适当的措施。

我们可以编写一个 Express 中间件来防止图片盗链，检查请求的 Referer 头部，并与允许的域名进行比较。如果请求的 Referer 不在白名单内，可以发送适当的响应，例如返回 403 禁止访问或者重定向到其他页面。例如：

```js
const express = require('express')
const app = express()
const port = 3000

// 允许访问的域名列表
const allowedDomains = ['http://example.com', 'https://example.net']
// 图片防盗链中间件
const preventHotlinking = (req, res, next) => {
  const referer = req.get('Referer')
  if (referer && allowedDomains.every((domain) => !referer.includes(domain))) {
    // 如果 Referer 存在且不在白名单内，返回 403 禁止访问
    return res.status(403).send('Forbidden')
  }
  // 否则，继续处理请求
  next()
}
// 使用图片防盗链中间件
app.use('/images', preventHotlinking)
// 静态文件中间件，用于提供图片
app.use('/images', express.static('public/images'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
```

## 生成二维码

可以使用现有的第三方库，例如 [`qrcode`](https://www.npmjs.com/package/qrcode)，它支持浏览器端、NodeJS 使用

```bash
npm i qrcode
```

在 express 中配置一个路由，使用 qrcode 将字符串内容转为二维码图片

```js
const express = require('express')
const QRCode = require('QRCode')
const app = express()

app.get('/qrcode/:text', (req, res) => {
  const text = req.params.text
  // 将 text 生成二维码图片
  QRCode.toFile(
    './code.png',
    text,
    {
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    },
    function (err) {
      if (err) throw err
      console.log('QR Code generated!')
    },
  )
  res.send('QR Code generated!')
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
```

以上是 Express 的常见应用场景。
