# 常用内置模块

Node.js 内置了许多核心模块，这些模块提供了各种功能

推荐使用 ESM 模块化进行开发

```json
// package.json
{
  "type": "module"
}
```

## fs 文件系统

`fs` 模块用于对文件系统进行操作。它提供了各种方法，可以用于读取、写入、修改、删除文件，操作目录，以及执行其他与文件系统相关的操作。

旧版本 node 中的 fs 模块处理文件时，都是以同步的方式进行，极大影响效率。后来添加了 `fs/promises` 模块，将所有 api 都以 promise 格式处理。推荐使用这种方式。

### 读取文件

`readFile(path[, options])`：读取文件内容。

- `path`：文件路径
- `options`：
  - `encoding`：编码方式。
  - `flag`：标识，node 会根据该值特殊处理，[查看详情](https://nodejs.org/docs/v22.11.0/api/fs.html#file-system-flags)。
  - `signal`：传入 [`AbortController`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 实例的 `signal` 属性，可以中止本次 `readFile`。

> 当 `options` 为字符串时，代表 `encoding`

```js
import { readFile } from 'node:fs/promises'

const filepath = new URL('./package.json', import.meta.url)

const content = await readFile(filepath, 'utf-8')
```

### 新建文件

`writeFile(path, data[, options])`：写入文件内容。

异步地将数据写入文件，如果文件已经存在，则替换该文件

```js
import { writeFile } from 'node:fs/promises'

const filepath = new URL('./1.txt', import.meta.url)

await writeFile(filepath, '今天天气不错', 'utf-8')
```

### 追加文件内容

`appendFile(file, data[, options])`：向文件末尾追加文件内容，文件不存在将创建该文件。

```js
import { appendFile } from 'node:fs/promises'

const filepath = new URL('./1.txt', import.meta.url)

await appendFile(filepath, '\n追加的内容', 'utf-8')
```

### 获取文件/目录信息

`stat(path)`：获取文件或目录的状态信息。

```js
import { stat } from 'node:fs/promises'

const filepath = new URL('./package.json', import.meta.url)

const stat = await stat(filepath)
console.log(stat.size) // 文件大小（字节）
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

在较新的 node 版本中，该 api 已被废弃，未来可能会删除此 api，可以使用 `stat` 来代替，如：

```js
import { stat } from 'node:fs/promises'

/** 辅助函数，判断文件是否存在 */
async function exists(path) {
  try {
    return await stat(path)
  } catch (error) {
    return null
  }
}
```

## path 路径

`path` 模块用于处理文件路径的字符串。它提供了一些方法来处理文件路径，使得在不同操作系统下都可以正确地操作文件路径，包括拼接、解析、规范化等。以下是一些常用的 `path` 模块方法：

### 拼接路径

使用 `join([...paths])` 将各个路径片段连接起来，形成一个标准的文件路径。它会自动处理不同操作系统下的路径分隔符。

```js
import { join } from 'node:path'

const res = join('code', 'project', 'src')
console.log(res) // code\project\src
```

### 解析路径

使用 `resolve([...paths])` 解析各个路径片段，形成一个绝对路径。自动处理相对路径和特殊符号，如 `../`、`./` 等。通常和 `__dirname` 配合使用

```js
import { resolve } from 'node:path'

const path = resolve(__dirname, 'index.js')
console.log(path) // 返回 index.js 所在的绝对路径
```

由于 `__dirname` 在 ESM 下不可用，可使用以下方法达到相同效果：

```js
import { fileURLToPath } from 'node:url'

const path = fileURLToPath(import.meta.url)
console.log(path) // 返回 index.js 所在的绝对路径
```

### 获取文件所在目录

使用 `dirname(p)` 获取文件所在目录，返回路径字符串 `p` 的目录名部分。

```js
import { dirname } from 'node:path'

const p = 'D:\\code\\index.js'
console.log(dirname(p)) // D:\code
```

### 获取文件名

使用 `basename(p, [ext])` 获取文件名，返回路径字符串 `p` 的文件名部分，可以指定扩展名 `ext` 进行过滤。

```js
import { basename } from 'node:path'

const p = 'D:\\code\\index.js'
const res = basename(p, '.js')
console.log(res) // index.js
```

### 获取文件后缀名

使用 `extname(p)` 获取路径字符串 `p` 的文件扩展名部分，包括 `.`

```js
import { extname } from 'node:path'

const p = 'D:\\code\\index.js'
const res = extname(p, '.js')
console.log(res) // .js
```

### 获取路径信息

使用 `parse(p)` 解析路径字符串，返回一个对象，包含文件路径的各个部分（目录、文件名、扩展名等），无论这个路径是否存在。

```js
import { resolve, parse } from 'node:path'
const filepath = resolve('D://code/project/index.js')

console.log(parse(filepath))
// {
//   root: 'D:\\',
//   dir: 'D:\\code\\project',
//   base: 'index.js',
//   ext: '.js',
//   name: 'index'
// }
```

### 标准化分隔符

使用 `normalize(p)` 标准化路径字符串，将其转换为标准的格式，自动处理路径分隔符和特殊符号。返回处理后的路径

```js
import { resolve, normalize } from 'node:path'
const p = resolve('D://code/project\\index.js')

console.log(normalize(p)) // D:\code\project\index.js
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

## EventEmitter

EventEmitter 是 node:events 模块中的一个类，用于处理事件驱动编程。通过 EventEmitter，你可以创建能够监听和触发事件的对象。

### 创建 EventEmitter 实例

```js
import { EventEmitter } from 'node:events'

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
