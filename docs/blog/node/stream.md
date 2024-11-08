# 流

流是用于在 Node.js 中处理流数据的抽象接口。`node:stream` 模块提供了用于实现流接口的 API。

流可以是可读的、可写的、或两者兼而有之。所有的流都是 `EventEmitter` 的实例。

---

Node.js 中有四种基本的流类型：

`Writable`：可以写入数据的流（例如，fs.createWriteStream()）。

`Readable`：可以从中读取数据的流（例如，fs.createReadStream()）。

`Duplex`：Readable 和 Writable 的流（例如，net.Socket）。

`Transform`：可以在写入和读取数据时修改或转换数据的 Duplex 流（例如，zlib.createDeflate()）。

## 可读流 Readable

## 可写流 Writable

## 双工流 Duplex

## 转换流 Transform
