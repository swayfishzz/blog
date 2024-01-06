# luxon

[luxon](https://luxon.nodejs.cn/) 是一个强大的、现代的、且友好的 JavaScript 日期和时间封装器。

```bash
npm i luxon
```

## 基础用法

### 创建日期时间对象

使用 `DateTime` 类来创建日期时间对象：

```js
const now = DateTime.now()
console.log(now.toISO()) // 输出当前日期和时间的 ISO 字符串
```

### 解析日期时间字符串

你可以使用 `DateTime.fromISO` 方法来解析 ISO 格式的日期时间字符串：

```js
const dt = DateTime.fromISO('2024-01-07T12:00:00.000Z')
console.log(dt.toISO()) // 输出解析后的日期和时间的 ISO 字符串
```

### 格式化日期时间

使用 `toFormat` 方法来格式化日期时间：

```js
const formatted = now.toFormat('yyyy-MM-dd HH:mm:ss')
console.log(formatted) // 输出类似于 "2024-01-07 12:00:00" 的字符串
```

### 进行日期时间运算

Luxon 提供了丰富的方法来进行日期时间运算：

```js
const futureDate = now.plus({ days: 7, hours: 3 })
console.log(futureDate.toISO()) // 输出将来日期时间的 ISO 字符串

const diff = futureDate.diff(now)
console.log(diff.as('hours')) // 输出两个日期时间之间的小时差
```

### 时区处理

Luxon 支持时区处理，可以在创建日期时间对象时指定时区：

```js
const dtWithTimeZone = DateTime.now().setZone('America/New_York')
console.log(dtWithTimeZone.toISO()) // 输出带有时区信息的 ISO 字符串
```
