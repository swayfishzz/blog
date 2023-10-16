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

### 判断数据是否为空

如果该值是以下中的一个，即被判定为空：

- `null`
- `undefined`
- `NaN`
- `''`（空字符串）
- `[]`（长度为 0 的数组）
- `{}`（无属性的对象）

```js
/* 判断一个值是否为空 */
const isEmpty = (value) => {
  if (value === null || typeof value === 'undefined') {
    return true
  }
  if (typeof value === 'number' && isNaN(value)) {
    return true
  }
  if (typeof value === 'string' && value === '') {
    return true
  }
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  if (Object.prototype.toString.call(value) === '[object Object]' && Object.keys(value).length === 0) {
    return true
  }
  return false
}
```

另外，还可以提供一个判断数据是否不为空的函数：

```js
/* 判断一个值是否不为空 */
const isNotEmpty = (value) => !isEmpty(value)
```

### 深拷贝

使用递归引用数据类型完成深拷贝，该函数只能对数组和对象进行深拷贝，不能对如 Map、Set 等数据类型深拷贝，若要使用通用类型的深拷贝函数，可以采用 lodash 库的 [cloneDeep](https://www.lodashjs.com/docs/lodash.cloneDeep)

```js
/* 深拷贝 */
const deepClone = (value) => {
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
const sleep = (duration = 500) => {
  return new Promise((resolve) => setTimeout(resolve, duration))
}
```

示例：

```js
async function foo() {
  await sleep(2000)
}
```

### 解析 URL 参数

```js
/* 解析 URL 参数 */
const parseQuery = (url = location.href) => {
  const index = url.indexOf('?')
  const result = {}
  if (index === -1) {
    return result
  }
  const arr = url.substring(index + 1).split('&')
  for (let i = 0; i < arr.length; i++) {
    const q = arr[i].split('=')
    result[q[0]] = q[1]
  }
  return result
}
```

示例：

```js
const url = 'http://example.com/path?key1=value1&key2=value2'
const query = parseQuery(url)
console.log(query) // { key1: 'value1', key2: 'value2' }
```

### 防抖

防抖的核心思想是，在一连串触发事件后，只有当事件停止一段时间后，才执行相应的函数。常用于处理频繁触发的事件（例如窗口大小调整、搜索建议等）。

```js
const debounce = (fn, duration = 100) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, duration)
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
const throttle = (fn, duration = 50) => {
  let isThrottled = false
  return function (...args) {
    if (!isThrottled) {
      fn.apply(this, args)
      isThrottled = true
      setTimeout(() => {
        isThrottled = false
      }, duration)
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
