# JS 工具函数

## lodash-es

[lodash-es](https://www.npmjs.com/package/lodash-es) 是 lodash 的 ESM 版本，支持了构建工具的 [tree shaking](https://webpack.docschina.org/guides/tree-shaking/) 功能。

常用函数：

- `throttle`：节流。
- `debounce`：防抖。
- `once`：创建一个只执行一次的函数。
- `pick`：从对象挑选中挑选若干属性。
- `groupBy`：分组。
- `get`：安全获取一个对象的属性，例如：`get(obj, 'a.b[0].c')`。

## radash

lodash 对于现代 web 开发已经稍显老旧，很多函数随着 ES 版本不断更新已经不再被需要，对于新版 ES 的功能也没有更好的支持。

[radash](https://www.radash.wiki/) 是一个零依赖、模块化、高性能的 JS/TS 实用工具库，去除了 lodash 中已经过时的函数，新增了很多呼声较高的实用函数，对现代 web 开发更友好。

常用函数：

- `throttle`：节流。
- `debounce`：防抖。
- `pick`：从对象挑选中挑选若干属性。
- `get`：安全获取一个对象的属性，例如：`get(obj, 'a.b[0].c')`。
- `tryit`：将函数转为错误优先的函数。
  ```js
  import { tryit } from 'radash'
  const [err, data] = await tryit(axios.get)('/users')
  ```
- `retry`：对异步函数添加重试功能。
  ```js
  import { retry } from 'radash'
  // getServerData 请求失败，自动重试，最大重试次数为 5
  await retry({ times: 5 }, getServerData)
  ```
- `guard`：若异步函数出错，返回 undefined。
  ```js
  import { tryit } from 'radash'
  const data = (await guard(getServerData)) ?? []
  ```

## xijs

[xijs](https://www.npmjs.com/package/xijs) 是一个偏向处理业务的工具库。

常用函数：

- `transformTree`：数组转树。
- `transformArray`：树转数组。
- `hex2rgba`：HEX 颜色转 rgb 格式。
- `url2obj`：url 的 query 参数转为对象。
- `regexp`： 常用正则表达式。

  ```js
  import { regexp } from 'xijs'

  regexp('phoneRegexp', '13322223333') // 验证手机号
  regexp('emailRegexp', 'foo@bar.com') // 验证邮箱
  regexp('idRegexp', '12343414314134') // 验证身份证号
  // ···
  ```

## 其它

### 随机数

```js
/* 返回 [min, max) 间的随机整数 */
const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)
```

### 随机颜色

```js
/**
 * 获取随机颜色
 * @param {'rgb' | 'hex'} type 返回的颜色格式
 */
const getRandomColor = (type = 'rgb') => {
  if (type === 'rgb') {
    return `rgb(${getRandom(0, 256)},${getRandom(0, 256)},${getRandom(0, 256)})`
  } else {
    return (
      '#' +
      parseInt(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
    )
  }
}
```

### 异步等待指定时长

```js
const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))
```

### 格式化容量

```js
/**
 * 格式化尺寸单位
 * @param {Number} kb
 * @returns {String}
 */
const formatSize = kb => {
  const units = ['KB', 'MB', 'GB', 'TB', 'PB']
  let unitIndex = 0
  while (kb >= 1024 && unitIndex < units.length - 1) {
    kb /= 1024
    unitIndex++
  }
  return `${kb.toFixed(2)} ${units[unitIndex]}`
}
```

### 格式化日期

```js
/**
 * 格式化日期
 * @param {Date|String|Number} [date] 日期对象、时间戳或日期字符串
 * @param {String} [format]
 * @example
 *  formatDate(999999999999) // 2001-09-09 09:46:39
 *  formatDate(new Date(999999999999), 'yyyy年MM月dd日 HH时mm分ss秒') // '2001年09月09日 09时46分39秒'
 * @returns
 */
const formatDate = (date = new Date(), format = 'yyyy-MM-dd HH:mm:ss') => {
  const d = date instanceof Date ? date : new Date(date)
  const tactics = {
    yyyy: d.getFullYear(),
    MM: d.getMonth() + 1,
    dd: d.getDate(),
    HH: d.getHours(),
    mm: d.getMinutes(),
    ss: d.getSeconds(),
  }
  return format.replace(/(yyyy|MM|dd|HH|mm|ss)/g, char => tactics[char].toString().padStart(2, '0'))
}
```

### 颜色混合

类似 sass 的 mix 函数。

```js
const blendColors = (color1, color2, ratio) => {
  ratio = Math.max(0, Math.min(1, ratio)) // Clamp ratio between 0 and 1
  const hex = c => {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }
  const r = Math.ceil(parseInt(color1.substring(1, 3), 16) * ratio + parseInt(color2.substring(1, 3), 16) * (1 - ratio))
  const g = Math.ceil(parseInt(color1.substring(3, 5), 16) * ratio + parseInt(color2.substring(3, 5), 16) * (1 - ratio))
  const b = Math.ceil(parseInt(color1.substring(5, 7), 16) * ratio + parseInt(color2.substring(5, 7), 16) * (1 - ratio))
  return `#${hex(r)}${hex(g)}${hex(b)}`
}
```

### 将字符串下载为 .txt

通过使用 Blob 对象和创建一个下载链接来实现文件的下载。

```js
/**
 * 将文本内容下载为 .txt 文件
 * @param {String} text 文本内容
 * @param {String} [filename] 文件名
 */
const downloadTxt = (text, filename = 'file') => {
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
```
