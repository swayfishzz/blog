# nprogress

[NProgress](https://www.npmjs.com/package/nprogress) 是一个轻量级的 JavaScript 库，用于在网页加载时显示进度条。它适用于 Ajax 请求或页面加载等场景，提供了简单而灵活的进度条效果。以下是使用 NProgress 的基本步骤：

```bash
npm i nprogress
```

### 基本用法

在项目中引入 NProgress

```js
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
```

在需要显示进度条的地方开始和结束加载时，调用 NProgress 的 `start` 和 `done` 方法：

```javascript
// 开始加载时调用
NProgress.start()

// 结束加载时调用
NProgress.done()
```

### 定制进度条

通过 NProgress 提供的一些方法来定制进度条的外观和行为：

```javascript
NProgress.configure({
  showSpinner: false, // 关闭右上角圆形加载器，默认 true
  color: '#ff0000', // 设置进度条颜色
  height: 5, // 设置进度条高度
  speed: 500 // 自定义动画速度，默认是 200 毫秒
})
```

### 结合 Vue Router

下面为一个在路由前置钩子中加载进度条，路由加载完成后关闭的例子

```js
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

router.beforeEach((to, from) => {
  NProgress.start() // 跳转前开始加载进度条
})

router.afterEach((to, next) => {
  NProgress.done() // 加载后关闭
})
```
