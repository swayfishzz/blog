# Node 全局对象

## global

全局命名空间对象，所有全局变量和函数都是它的属性。例如可以通过 `global.console` 访问 `console` 对象。

## process

提供有关进程的信息和控制。它是 `EventEmitter` 的实例。

- `argv`：包含命令行参数的数组，第一项为 node 的安装路径，第二项为执行 node 的 js 的文件路径，后续项为传入的参数。
  ```bash
  node index.js one two=foo three
  ```
  ```js
  console.log(process.argv)
  // [
  // 'C:\\Program Files\\nodejs\\node.exe',
  // 'D:\\index.js',
  // 'one',
  // 'two=foo',
  // 'three'
  // ]
  ```
- `env`：包含本机的环境变量的对象。
- `platform`：代表操作系统平台的字符串，如：`'linux'`、`'win32'`等。
- `version`：代表 nodejs 版本的字符串。
- `cwd()`：返回执行 node.js 的终端路径。
- `nextTick(cb)`：当前堆栈上的操作运行后执行 cb，在任何 I/O 发生之前。总是在微任务队列之前处理。
- `kill(pid)`：通过进程 id 杀死进程。
- `memoryUsage()`：返回进程的内存使用情况（单位：字节）。
- `on('beforeExit', cb)`：事件循环无任务时触发。显示调用的 `process.on('exit')` 不会触发此事件。
- `on('exit', cb)`：显示调用或事件循环无任务时触发。
- `on('unhandledRejection', (reason, promise) => {})`：`Promise` 被拒绝且未 `catch` 时触发。

## 其它

- `__dirname`：当前模块的目录名，ESM 中不可用。ESM 可用以下方法实现：

  ```js
  import { dirname } from 'node:path'
  import { fileURLToPath } from 'node:url'

  dirname(fileURLToPath(import.meta.url))
  ```

- `__filename`：当前模块的文件名，ESM 中不可用。ESM 可用以下方法实现：

  ```js
  import { fileURLToPath } from 'node:url'

  fileURLToPath(import.meta.url)
  ```

- `queueMicroTask(cb)`：将 cb 加入微队列等待执行。
- `structuredClone(value)`：使用[结构化克隆算法](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)对 value 进行深拷贝。
- `console`：控制台对象，如 `log`、`warn`、`error`、`time`、`timeEnd`、`trace` 等。
