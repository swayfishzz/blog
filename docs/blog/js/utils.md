# 工具函数

在开发中，经常会将一些常用的代码块、功能块进行封装，为的是更好的复用。此文章收录一些常用的功能函数，之后遇到的也会加入进来

### 获取随机数

```js
/* 返回 [min, max) 间的随机整数 */
const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)
```

示例：

```js
getRandom(0, 10) // 2
getRandom(0, 10) // 9
```

### 获取随机颜色

```js
/**
 * 获取随机颜色
 * @param {Boolean} isRGB rgb格式
 */
const getRandomColor = isRGB => {
  if (isRGB) {
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

### 判断数据是否为空

如果该值是以下中的一个，即被判定为空：

- `null`
- `undefined`
- `NaN`
- `''`（空字符串）
- `[]`（长度为 0 的数组）
- `{}`（无属性的对象）
- 空 Map
- 空 Set

```js
/* 判断一个值是否为空 */
const isEmpty = value => {
  if (value === 0) return false
  if (!value) return true
  const type = Object.prototype.toString.call(value).slice(8, -1)
  if (type === 'Object' && Object.keys(value).length === 0) return true
  if (type === 'Map' && value.size === 0) return true
  if (type === 'Set' && value.size === 0) return true
  return false
}
```

另外，还可以提供一个判断数据是否不为空的函数：

```js
/* 判断一个值是否不为空 */
const isNotEmpty = value => !isEmpty(value)
```

### 深拷贝

使用递归引用数据类型完成深拷贝，该函数只能对数组和对象进行深拷贝，不能对如 Map、Set 等数据类型深拷贝，若要使用通用类型的深拷贝函数，可以采用 lodash 库的 [cloneDeep](https://www.lodashjs.com/docs/lodash.cloneDeep)

```js
/* 深拷贝 */
const deepClone = value => {
  if (value === null || typeof value !== 'object') {
    return value
  }
  let result = Array.isArray(value) ? [] : {}
  for (const key in value) {
    result[key] = deepClone(value[key])
  }
  return result
}
```

### 阻塞程序运行

```js
/* 阻止 JS 运行，默认 500 毫秒*/
const delay = (duration = 500) => {
  const start = Date.now()
  while (true) {
    const now = Date.now()
    if (now - start >= duration) {
      break
    }
  }
}
```

示例：

```js
console.log(1) // 输出 1
delay(2000)
console.log(2) // 两秒钟后，输出 2
```

### 异步等待一段时间

```js
const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))
```

示例：

```js
async function foo() {
  await delay(2000)
}
```

### 解析 URL 参数

```js
/**
 * 解析url参数
 * @param {String} url
 * @example
 *  parseQuery('https://www.baidu.com?wd=mdn&lang=zhCn')
 *  // -> { wd: 'mdn', lang: 'zhCn' }
 * @returns {Object}
 */
const parseQuery = (url = location.href) => {
  const res = {}
  const params = new URL(url).searchParams
  for (const [k, v] of params) {
    res[k] = decodeURIComponent(v)
  }
  return res
}
```

### 防抖

防抖的核心思想是，在一连串触发事件后，只有当事件停止一段时间后，才执行相应的函数。常用于处理频繁触发的事件（例如窗口大小调整、搜索建议等）。

```js
const debounce = (func, delay) => {
  let timerId
  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
```

使用示例：

```js
// 使用防抖
const debouncedFn = debounce(function () {
  // 这里放置你要执行的函数代码
}, 300) // 延迟300毫秒执行

// 绑定事件
element.addEventListener('input', debouncedFn)
```

### 节流

节流的核心思想是，无论事件触发多频繁，都只在固定时间间隔内执行一次函数。常用于需要限制函数执行速率的情况（例如滚动事件、按钮点击等）。

```js
const throttle = (func, interval) => {
  let lastExecTime = 0
  return (...args) => {
    const now = Date.now()
    if (now - lastExecTime >= interval) {
      func(...args)
      lastExecTime = now
    }
  }
}
```

使用示例：

```js
// 使用节流
const throttledFn = throttle(function () {
  // 这里放置你要执行的函数代码
}, 300) // 间隔300毫秒执行一次

// 绑定事件
element.addEventListener('scroll', throttledFn)
```

### 求两数组交集、并集、差集

```js
/**
 * 求两个数组的交集
 * @param {Array} arr1
 * @param {Array} arr2
 * @example
 *  crossArr([1, 2, 3], [3, 4, 5]) -> [3]
 */
const crossArr = (arr1, arr2) => Array.from(new Set(arr1.filter(item => arr2.includes(item))))

/**
 * 求两个数组的并集
 * @param {Array} arr1
 * @param {Array} arr2
 * @example
 *  crossArr([1, 2, 3], [3, 4, 5]) -> [ 1, 2, 3, 4, 5 ]
 */
const unionArr = (arr1, arr2) => Array.from(new Set([...arr1, ...arr2]))

/**
 * 求两个数组的差集（没有相交的部分）
 * @param {Array} arr1
 * @param {Array} arr2
 * @example
 *  crossArr([1, 2, 3], [3, 4, 5]) -> [ 1, 2, 4, 5 ]
 */
const diffArr = (arr1, arr2) =>
  Array.from(new Set(unionArr(arr1, arr2).filter(item => !crossArr(arr1, arr2).includes(item))))
```

### 提取对象指定属性

```js
const pick = (obj, ...props) => {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => props.includes(k)))
}
```

示例

```js
const foo = { a: 1, b: 2, c: 3 }

pick(foo, 'a', 'b') // { a: 1, b: 2 }
pick(foo, 'a', 'c') // { a: 1, c: 3 }
```

### 格式化尺寸单位

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

示例

```js
console.log(formatSize(556677)) // 543.63 MB
```

### 模糊搜索

```js
/**
 * @param {Array} list 要模糊搜索的数组
 * @param {String} keyword 用户输入的关键字
 * @param {String} prop 根据此属性名模糊搜索
 * @returns {Array}
 */
const fuzzyQuery = (list, keyword, prop) => {
  const reg = new RegExp(keyword)
  const arr = []
  for (let i = 0; i < list.length; i++) {
    if (reg.test(list[i][prop])) {
      arr.push(list[i])
    }
  }
  return arr
}
```

示例：

```js
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '张三丰' },
]

console.log(fuzzyQuery(users, '张', 'name'))
// [ { id: 1, name: '张三' }, { id: 4, name: '张三丰' } ]
```

### 数组对象去重

```js
/**
 * @param {Array} arr 要去重的数组
 * @param {String} [key="id"] 根据该属性去重
 * @returns {Array}
 */
const uniqueByProp = (arr, key = 'id') => {
  if (!arr?.length) return []
  const values = []
  return arr.filter(e => !values.includes(e[key]) && values.push(e[key]))
}
```

示例：

```js
const users = [
  { name: '张三', age: 18 },
  { name: '张三', age: 19 },
  { name: '李四', age: 20 },
  { name: '李四', age: 21 },
  { name: '王五', age: 22 },
  { name: '王五', age: 23 },
]

const result = uniqueByProp(users, 'name')
console.log(result)
```

### 生成 UUID

```js
/**
 * @returns {String}
 */
const createUUID = () => {
  const temp_url = URL.createObjectURL(new Blob())
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url) //释放这个url
  return uuid.substring(uuid.lastIndexOf(':') + 1)
}
```

示例：

```js
const id = createUUID()
console.log(id) // 02ca0781-fdcf-4b86-b6e4-3e01adfbc978
```

### 滚动到指定元素位置

```js
const smoothScroll = element => {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth',
  })
}
```

示例：

```js
smoothScroll('#container') // 平滑滚动至 #container 元素
```

### 按比率混合颜色

类似 `scss` 的 `mix` 函数。

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

示例

```js
const color1 = '#FF0000' // Red
const color2 = '#0000FF' // Blue
const blendedColor = blendColors(color1, color2, 0.5) // Mix with a 50/50 ratio
console.log(blendedColor) // Output: "#800080" (Purple)
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

### 将文本内容下载为 .txt 文件

通过使用 `Blob` 对象和创建一个下载链接来实现文件的下载。

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

// 示例
downloadTxt('天气不错', '日记')
```

同理，如果要下载 json 文件只需配置 `Blob` 对象的 `type` 为 `application/json` 即可。

```js {2}
const downloadJson = (json, filename = 'file') => {
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

// 示例
const userInfo = {
  name: '张三',
  age: 18,
  hobbies: ['唱', '跳', 'rap', '篮球'],
}

downloadJson(userInfo, '用户信息')
```
