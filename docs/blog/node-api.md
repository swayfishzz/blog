# 常用内置模块

Node.js 内置了许多核心模块，这些模块提供了各种功能

## fs 文件系统

`fs` 模块用于对文件系统进行操作。它提供了各种方法，可以用于读取、写入、修改、删除文件，操作目录，以及执行其他与文件系统相关的操作。

> fs 模块中提供了许多结尾为 Sync 的方法，这些一般是同步方法，使用同步方法会造成 js 运行阻塞，大大影响 js 的运行效率，所以，一般我们都使用异步的方法

### 读取文件

这里仅使用异步方法读取文件：`fs.promises.readFile()`，诸如回调形式 `fs.readFile()` 或同步方式 `fs.readFileSync()` 不做描述

`fs.promises.readFile(path, options)`：返回一个 Promise，异步地读取文件内容。

```js
const fs = require('fs')
const path = require('path')

const filepath = path.resolve(__dirname, 'test.txt')

fs.promises
  .readFile(filepath, 'utf-8')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```

### 新建文件

`fs.promises.writeFile(file, data, options)`：返回一个 Promise，异步地写入文件内容。

异步地将数据写入文件，如果文件已经存在，则替换该文件

```js
const fs = require('fs')
const path = require('path')

const filepath = path.resolve(__dirname, 'test.txt')

fs.promises
  .writeFile(filepath, '今天天气不错', 'utf-8')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(data)
  })
```

### 追加文件内容

`fs.promises.appendFile(file, data, options)`：返回一个 Promise，异步地向文件末尾追加文件内容

```js
const fs = require('fs')
const path = require('path')

const filepath = path.resolve(__dirname, 'test.txt')

fs.promises
  .appendFile(filepath, '\n追加的内容', 'utf-8')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```

### 获取文件/目录信息

`fs.promises.stat(path)`：返回一个 Promise，异步地获取文件或目录的状态信息。

```js
const fs = require('fs')
const path = require('path')

const filepath = path.resolve(__dirname, 'package.json')

fs.promises.stat(filepath).then(stat => {
  console.log(stat.size) // 文件大小（字节）
})
```

返回一个 `fs.Stats` 对象，该对象包含了关于文件或目录的各种属性和元数据。以下是 `fs.Stats` 对象的一些常用属性和它们的含义：

- `stats.isFile()`：返回一个布尔值，表示当前路径是否指向一个文件
- `stats.isDirectory()`：返回一个布尔值，表示当前路径是否指向一个目录
- `stats.isSymbolicLink()`：返回一个布尔值，表示当前路径是否指向一个符号链接（软链接）
- `stats.size`：文件的大小，以字节为单位
- `stats.atime`：文件的访问时间（access time），表示文件最后一次被访问的时间戳
- `stats.mtime`：文件的修改时间（modification time），表示文件最后一次被修改的时间戳
- `stats.ctime`：文件的变更时间（change time），表示文件元数据（例如权限或所有者）最后一次发生变更的时间戳
- `stats.birthtime`（仅在部分系统上可用）：文件的创建时间（birth time），表示文件创建的时间戳

### 检查文件/目录是否存在

在之前的 node 版本中，提供了`fs.exists(path, callback)`判断指定路径的文件或目录是否存在

在较新的 node 版本中，该 api 已被废弃，未来可能会删除此 api，可以使用 `fs.promises.stat()` 来代替，如：

```js
const fs = require('fs')

/** 辅助函数，判断文件是否存在 */
async function exists(path) {
  try {
    return await fs.promises.stat(path)
  } catch (error) {
    return null
  }
}
```

## path 路径

`path` 模块用于处理文件路径的字符串。它提供了一些方法来处理文件路径，使得在不同操作系统下都可以正确地操作文件路径，包括拼接、解析、规范化等。以下是一些常用的 `path` 模块方法：

### 拼接路径

使用 `path.join([...paths])` 将各个路径片段连接起来，形成一个标准的文件路径。它会自动处理不同操作系统下的路径分隔符。

```js
const path = require('path')

const res = path.join('code', 'project', 'src')
console.log(res) // code\project\src
```

### 解析路径

使用 `path.resolve([...paths])` 解析各个路径片段，形成一个绝对路径。自动处理相对路径和特殊符号（`..`、`.`）。通常和 `__dirname` 配合使用

```js
const path = require('path')

console.log(__dirname) // D:\\code\project\src
const res = path.resolve(__dirname, '../', 'index.js')
console.log(res) // D:\\code\project\index.js
```

### 获取文件所在目录

使用 `path.dirname(p)` 获取文件所在目录，返回路径字符串 `p` 的目录名部分。

```js
const path = require('path')

const p = 'D:\\code\\index.js'
console.log(path.dirname(p)) // D:\code

```

### 获取文件名

使用 `path.basename(p, [ext])` 获取文件名，返回路径字符串 `p` 的文件名部分，可以指定扩展名 `ext` 进行过滤。

```js
const path = require('path')

const p = 'D:\\code\\index.js'
const res = path.basename(p, '.js')
console.log(res) // index.js
```

### 获取文件后缀名

使用 `path.extname(p)` 获取路径字符串 `p` 的文件扩展名部分，包括 `.`

```js
const path = require('path')

const p = 'D:\\code\\index.js'
const res = path.extname(p, '.js')
console.log(res) // .js
```

### 获取路径信息

使用 `path.parse(p)` 解析路径字符串，返回一个对象，包含文件路径的各个部分（目录、文件名、扩展名等），无论这个路径是否存在。

```js
const path = require('path')
const filepath = path.resolve('D://code/project/index.js')

console.log(path.parse(filepath))
// {
//   root: 'D:\\',
//   dir: 'D:\\code\\project',
//   base: 'index.js',
//   ext: '.js',
//   name: 'index'
// }
```

### 标准化分隔符

使用 `path.normalize(p)` 标准化路径字符串，将其转换为标准的格式，自动处理路径分隔符和特殊符号。返回处理后的路径

```js
const path = require('path')
const p = path.resolve('D://code/project\\index.js')

console.log(path.normalize(p)) // D:\code\project\index.js
```

## url 网址

`url` 模块用于解析和格式化 URL（Uniform Resource Locator）。它提供了一些方法来处理 URL 字符串，使得在处理 URL 地址时更加方便和可靠。以下是一些常见的 `url` 模块方法：

### 解析 url 地址

使用 `new URL()` 构造函数来处理 URL 解析

```javascript
const url = 'https://www.example.com/path?key=value'
const result = new URL(url)

console.log(result)
// {
//   href: 'https://www.example.com/path?key=value',
//   origin: 'https://www.example.com',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'www.example.com',
//   hostname: 'www.example.com',
//   port: '',
//   pathname: '/path',
//   search: '?key=value',
//   searchParams: URLSearchParams { 'key' => 'value' },
//   hash: ''
// }

console.log(result.searchParams.get('key')) // 'value'
```

Node.js 的核心模块提供了丰富的功能，涵盖了许多常见的编程任务。可以在 Node.js 的官方文档中找到更详细的信息和用法示例