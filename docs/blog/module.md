# 模块化

模块化是为了解决在大型、复杂的应用程序中代码组织、维护和重用的问题。

## 模块化标准

JavaScript 历史上一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，这对开发大型的、复杂的项目形成了巨大障碍。

早先，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。

**CommonJS：** CommonJS 提出了模块的定义、导出和导入规范，Node.js 就是基于 CommonJS 模块系统构建的。

**AMD：** AMD 是为了解决在浏览器端异步加载模块的问题而产生的标准，随着 ES Module 的问世，已逐渐式微。RequireJS 是一个实现 AMD 的著名库。

**ESM：** ESM（ECMAScript Module）是 es6 引入的官方的模块系统。是项目开发中最为常用的模块化标准

## CommonJS

CommonJS 是非常流行的 JS 模块化标准，这得益于 Node 宿主环境，Node 应用采用 CommonJS 模块规范。

CommonJS 规范每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

### 导出（module）

每个模块，都有一个`module`对象，代表当前模块。它有以下属性

- `module.id` 模块的识别符，通常是带有绝对路径的模块文件名。
- `module.filename` 模块的文件名，带有绝对路径。
- `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
- `module.parent` 返回一个对象，表示调用该模块的模块。
- `module.children` 返回一个数组，表示该模块要用到的其他模块。
- **`module.exports`** 表示模块对外导出的值。

使用 `module.exports` 来向外导出一个变量、函数或对象

```js
// user.js
const name = 'Tom'
const sayHello = () => console.log('Hello, I am Tom')

module.exports = { name, sayHello }
```

### 导入（require）

使用 `require` 加载一个模块

- `require()`: 加载外部模块
- `require.resolve()`：将模块名解析到一个绝对路径
- `require.main`：指向主模块
- `require.cache`：指向所有缓存的模块
- `require.extensions`：根据文件的后缀名，调用不同的执行函数

```js
const user = require('./user.js')

console.log(user.name)
user.sayHello()
```

模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

## ES Module

ESM（ECMAScript Module）是 ECMAScript 在语言层面实现的模块化标准，不同于其它的社区标准

### 导出（export）

通过 `export` 关键字导出一个变量（如变量、函数、类等）

```js
// user.js
export const name = '张三'

export const sayHello = () => {
  alert('你好，我是张三')
}
```

也可以将他们放在一个对象中在进行导出，两种方式的效果都是一样的，二者都是很常见的导出方式

```js
// user.js
const name = '张三'
const sayHello = () => {
  alert('你好，我是张三')
}

export { name, sayHello } // 通过对象导出
```

### 导入（import）

使用 `import` 关键字可以加载 `export` 导出的变量等

```js
import { name, sayhello } from './user.js' // 导入 user.js 中导出的 name 变量
```

**重命名导入的模块：** 使用 as 关键字可以为导入的变量重新命名，如：

```js
import { name as customName } from './user.js'
```

**提升效果：** import 导入语句会提升到整个模块的头部，首先执行。

```js
console.log(name) // '张三'
import { name } from './user.js'
```

**加载模块：** import 会将加载的模块执行一次，所以当只需要执行某个模块时，可以：

```js
import './init.js' // 将 init.js 执行一次
```

**整体导入：** 导入时，使用 `*` 指定一个对象，该模块的导出值都会加载在这个对象上

```js
import * as user from './user'

console.log(user.name)
user.sayHello()
```

### 默认导出

使用 `export default` 将一个模块进行默认导出，一个模块只能有一个默认导出

```js
// foo.js
export default function () {
  console.log('foo模块')
}
```

导入时，需要自定义一个名称接收默认导出的模块

```js
import foo from './foo.js'

foo() // 'foo模块'
```

想使用默认导出的同时，使用其它导出的变量，可以：

```js
import _, { cloneDeep, isEqual } from 'lodash'
```

### 复合写法

在一个模块中，导出另一个模块的内容，可以简写为：

```js
export { cloneDeep, isEqual } from 'lodash'
```

需要注意的是：`cloneDeep`和`isEqual`实际上并没有被导入当前模块，所以当前模块不能直接使用`cloneDeep`和`isEqual`。

**复合写法的默认导出**

```js
// 将 lodash 的默认导出向外导出为 _ 变量
export { default as _ } from 'lodash'

// 当前模块的默认导出为 lodash 的 cloneDeep 模块
export { cloneDeep as default } from 'lodash'
```

### 动态加载模块

使用 `import()` 函数动态加载模块，他返回一个 Promise

```js
// 根据条件选择需要加载哪个模块
if (Math.random() > 0.5) {
  import('./foo.js')
    .then((module) => {
      // Load Success
    })
    .catch((err) => {
      // Load Fail
    })
}
```

为了代码的清晰，建议使用 `async/await` 的形式接收 Promise

```js
const module = await import('./foo.js')
```

### import.meta

返回当前模块的元信息对象，该对象的各种属性就是当前运行的脚本的元信息。具体包含哪些属性，标准没有规定，由各个运行环境自行决定。

**import.meta.url：** 是一个只读的字符串属性，包含了当前模块文件的 URL 路径

```js
console.log(import.meta.url)
```

Node.js 环境中，`import.meta.url`返回的总是本地路径，即`file:URL`协议的字符串，比如`file:///d:/Code/foo.mjs`。

## 加载 ES Module

### 浏览器

使用 `<script>` 标签引入加载 js 时，默认是同步加载，即遇到 `<script>` 标签，浏览器就停止渲染，将当前的 js 文件下载完并运行后，再继续渲染。

```html
<script src="./foo.js"></script>
```

此外，还有两种异步加载的方式：`defer` 和 `async`，浏览器遇到这两个属性的`<script>`时，就会下载文件，但不会等待它下载完成和执行，而是继续渲染

```html
<script src="./foo.js" defer></script>
<script src="./foo.js" async></script>
```

- **defer：** 等到整个页面的 DOM 结构完全生成，以及其他脚本执行完成，才会执行

- **async：** 下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染

`defer`是**渲染完再执行**，`async`是**下载完就执行**。如果有多个`defer`脚本，会按照它们在页面出现的顺序加载，而多个`async`脚本是不能保证加载顺序的。

**加载 ES Module 模块**

需要将 `<script>` 标签添加 `type="module"` 属性

```html
<script src="./foo.js" type="module"></script>
```

对于带有`type="module"`的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的`defer`属性。

也可以为 ES Module 模块开启 `async` 属性，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。使用了`async`属性，模块就不会按照在页面出现的顺序执行

### Node.js

CommonJS 模块是 Node.js 专用的模块化标准，与 ES Module 模块不兼容。

从 Node.js v13.2 版本开始，Node.js 开始支持 ESM，它要求 ES Module 模块采用 `.mjs` 文件后缀名

```js
// foo.mjs
export const name = 'Tom'
```

也可以指定 `package.json` 中的 `type` 字段

```json
{
  "type": "module"
}
```

- 设置为 `module` 后，该项目的 JS 脚本，就被解释成 ES Module 模块，而无需设置 `.mjs` 文件后缀名。

  此时，如果要使用 CommonJS 标准，需要将文件后缀名改为 `.cjs`

- 设置为 `commonjs` 或不设置 `type` 字段，该项目的 JS 脚本，就被解释成 CommonJS 模块
