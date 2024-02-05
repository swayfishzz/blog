# lodash

[Lodash](https://www.lodashjs.com/) 是一个一致性、模块化、高性能的 JavaScript 实用工具库。

推荐使用 [lodash-es](https://www.npmjs.com/package/lodash-es)，它是基于 ESM 实现的，利于构建工具的 [tree shaking](https://webpack.docschina.org/guides/tree-shaking/)（摇树优化）

```bash
npm i lodash-es
```

### random

获取随机数，random(lower, upper, floating)

- lower：最小值
- upper：最大值
- floating：是否返回浮点数

```js
import { random } from 'lodash-es'

const n = random(0, 10)
console.log(n) // 0 ~ 10之间的随机数
```

### cloneDeep

深拷贝

```js
import { cloneDeep } from 'lodash-es'

const foo = [{ a: 1 }, { b: 2 }]
const bar = cloneDeep(foo)

console.log(foo === bar) // false
```

### isEqual

执行深比较来确定两者的值是否相等。（不支持函数和 DOM 节点的比较）

```js
import { isEqual } from 'lodash-es'

const foo = { a: 1 }
const bar = { a: 1 }

console.log(isEqual(foo, bar)) // true
console.log(foo === bar) // false
```

### debounce

创建一个防抖函数

> 防抖的核心思想是，在一连串触发事件后，只有当事件停止一段时间后，才执行相应的函数。常用于处理频繁触发的事件（例如窗口大小调整、搜索建议等）。

```js
import { debounce } from 'lodash-es'

window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth) // 打印当前视口宽度
  }, 100)
)
```

### throttle

创建一个节流函数

> 节流的核心思想是，无论事件触发多频繁，都只在固定时间间隔内执行一次函数。常用于需要限制函数执行速率的情况（例如滚动事件、按钮点击等）。

```js
import { throttle } from 'lodash-es'

window.addEventListener(
  'resize',
  throttle(() => {
    console.log('scroll!')
  }, 100)
)
```
