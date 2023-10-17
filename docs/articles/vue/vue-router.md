# Vue3 路由管理

使用 Vue Router 实现前端路由，它是 Vue.js 官方推荐的路由管理器

## 基本使用

### 安装

使用 npm 安装 VueRouter

```bash
npm i vue-router@4
```

### 创建配置

创建一个路由文件，例如：`router/index.js`

```js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home' // vue文件页面
import About from '@/views/About'

const router = createRouter({
  // 创建路由实例
  history: createWebHistory(), // 设置为 history 模式，可传入基础路径作为 baseUrl
  routes: [
    // 映射路由关系
    { path: '/', component: Home },
    { path: '/about', component: About },
  ],
})

export default router // 导出路由实例
```

在你的主应用程序文件（通常是 `main.js`）中，导入路由配置文件并挂载到 Vue 实例中：

```js {3,6}
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router) // 挂载到 Vue 实例

app.$mount('#app')
```

### 组件内使用

可以使用 `<router-link>` 标签来创建路由链接，用于导航到不同的路由页面

```vue
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>
</template>
```

也可以使用编程式导航（JS）来处理

```js
import { useRouter, useRoute } from 'vue-router'

const router = useRouter() // 获取 router 实例
const route = useRoute()

const goHomeView = () => {
  router.push('/') // 使用实例的 push 方法进行导航
  console.log(route) // 当前路由的相关信息
}
```

### router-link

`router-link` 是 VueRouter 提供的用于创建导航连接的全局组件，它为激活状态的链接提供了两个类名：

- **`.router-link-active`**：当前激活的链接的类名
- **`.router-link-exact-active`**：严格匹配当前匹配的链接的类名

可以使用 `active-class` 和 `exact-active-class` 自定义类名

```vue
<template>
  <router-link to="/" active-class="active" exact-active-class="exact-active">Home</router-link>
</template>

<style scoped>
.active {
  /* 设置激活状态的导航颜色 */
  color: blue;
}
.exact-active {
  /* 设置严格匹配时激活状态的导航颜色 */
  font-size: 1.5em;
}
</style>
```

## router 实例

### push 方法

想要导航到不同的 URL，可以使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL。**导航操作都是异步的，都返回一个 Promise**

可以向 `router.push` 方法传递一个字符串或一个对象，进行路由导航：

```js
// 字符串形式
router.push('/user/profile')

// 对象形式
router.push({
  name: 'Profile', // 组件名称，和 path 择一使用
  path: '/user/profile', // 路由路径
  query: { id: 123 }, // 传递的 query 参数
  params: { name: 'jack' }, // 传递的 params 参数，仅在使用 name 属性导航时可用
  hash: '#team', // 传递的 hash 值
})
```

### 其它导航方法

- **`router.replace()`**：唯一与 `router.push()` 不同的是，导航时不会向 history 栈添加新记录
- **`router.forward()`**：导航到 history 栈的下一条记录
- **`router.back()`**：导航到 history 栈的上一条记录
- **`router.go()`**：接受一个数字参数，代表历史堆栈中前进或后退多少步

```js
router.go(1) // 前进页面，同 router.forward()
router.go(-1) // 后退页面，同 router.back()
router.go(3) // 前进 3 条记录
router.go(-100) // 如果没有那么多记录，静默失败
```

### 路由守卫

#### 全局前置守卫

使用 `router.beforeEach` 注册一个全局前置守卫，它会在路由跳转之前执行，可以用来做全局的导航控制、权限验证等操作

参数：

- **`to`**：即将进入的路由，`route` 对象
- **`from`**：从哪个路由进行的导航操作，`route` 对象
- **`next`**：一个函数，调用它以进入 `to` 路由

vue-router 4 已不再推荐使用 `next` 函数控制路由的跳转，你可以通过 return

- `false`：取消当前的导航，地址会重置到 `from` 路由
- 一个路由地址，见下面示例

```js
router.beforeEach((to, from) => {
  if (!isLogin() && to.path !== '/login') {
    // 路由地址，跳转到 login
    return { path: '/login' }
  }
  // 什么都不做，跳转到 to
})
```

#### 全局解析守卫

和 `router.beforeEach` 类似，不同的是，它会在**所有组件内守卫和异步路由组件被解析之后**调用。他可以访问自定义 meta 属性，例如：

```js
router.beforeResolve(async (to) => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```

#### 全局后置守卫

使用 `router.afterEach` 注册一个全局后置守卫，它会在路由跳转之后执行

```js
router.afterEach((to, next) => {
  // ...
})
```

#### 路由配置守卫

可以在定义路由配置时，定义 `beforeEnter` 守卫：

```js
const routes = [
  {
    path: '/',
    component: Home,
    beforeEnter((to, from) => {
    	// 进入之前的操作
  	})
  }
]
```

也可以接受一个函数组成的数组，会依次将函数作为守卫钩子，例如：

```js
// 定义函数守卫
const removeHash(to, from) {
  if (to.hash) {
    return { ...to, hash: '' }
  }
}
const removeQuery(to) {
  if (Object.keys(to.query).length) {
    return { ...to, query: {} }
  }
}

const routes = [
  {
    path: '/',
    component: Home,
    beforeEnter: [removeHash, removeQuery] // 使用函数
  }
]
```

#### 组件内守卫

```js
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteLeave(() => {
  // 在导航离开前调用
})

onBeforeRouteUpdate(() => {
  // 在当前路由改变，但是该组件被复用时调用
  // 例如：带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候
})
```

## route 对象

### query 参数

使用 query 参数来传递和接收页面之间的数据

**传递 query 参数**：例如，导航到 `about` 页面时，携带 query 参数

```vue
<template>
  <!-- 使用 router-link 的形式 -->
  <router-link :to="{ path: '/about', query: { id: 123 } }"></router-link>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goAboutView = () => {
  // 使用编程式导航的形式
  router.push({
    path: '/about',
    query: { id: 123 },
  })
}
</script>
```

**接受 query 参数**：在 `about` 页面中，使用以下方式访问 query 参数

```vue
<template>
  <!-- 在模板中，直接使用 $route.query 访问 -->
  {{ $route.query.id }}
</template>

<script setup>
import { useRoute } from 'vue'

const route = useRoute()
console.log(route.query.id) // JS 中访问 query 参数
</script>
```

### params 参数

又叫路径参数，使用冒号 `:` 来表示，可以在添加路由时配置：

```js {5}
import User from '@/view/user.vue'

const routes = [
  {
    path: '/user/:id', // :id 代表动态参数
    component: User,
  },
]
```

此时访问 `/user/jack` 和 `/user/tom` 都会映射到同一个路由

在组件中传递 params 参数：

```js {6}
import { useRouter } from 'vue-router'

const router = useRouter()
router.push({
  path: '/user',
  params: { id: 'jack' },
})
```

User 组件中访问传递的 params 参数：

```vue
<template>
  <!-- 在模板中访问 -->
  <div>{{ $route.params.id }}</div>
</template>

<script>
import { useRoute } from 'vue-router'
// 在 script 中访问
const route = useRoute()
console.log(route.params.id)
</script>
```

### 路由元信息 meta

使用 `meta` 字段来为路由配置添加元信息，以便在路由守卫、组件钩子等地方访问这些信息。路由元信息可以用于实现权限验证、页面标题设置、标识特定路由等场景。

**定义路由元信息**：定义路由配置时，添加 `meta` 元信息：

```js
const routes = [
  {
    path: '/profile',
    component: Profile,
    // 添加自定义信息
    meta: {
      requireAuth: true,
    },
  },
]
```

**守卫内访问**：在路由守卫内可以访问它们，以便满足鉴权的场景：

```js
import { isLogin } from './auth.js' // 判断是否登录

router.beforeEach((to, from) => {
  // 需要鉴权
  if (to.meta.requireAuth && !isLogin()) {
    return { path: '/login' }
  }
})
```

**组件内访问**：

```vue
<template>
  {{ $route.meta.requireAuth }}
</template>

<script setup>
import { useRoute } from 'vue-router'

console.log(useRoute().meta.requireAuth)
</script>
```

## 常见场景

### 路由懒加载

在需要的时候才加载特定路由对应的组件，而不是在初始加载时将所有组件一次性加载。

- 优化初次加载白屏时间：路由懒加载可以减小初始加载的文件大小，从而提高应用的加载速度。
- 优化页面性能：只加载当前页面所需的代码，减少不必要的资源浪费。
- 增加请求数：懒加载会引入额外的网络请求，但通常情况下，带来的性能提升是更有益的。

使用 `import` 函数的动态导入语法来实现路由懒加载。将需要延迟加载的组件用 `import` 导入，并返回一个函数，当该函数被调用时，会动态加载组件。

```js
const routes = [
  {
    path: '/about',
    component: () => import('@/views/About'),
  },
]
```

访问 `/about` 路由时，会动态加载 `About` 组件。

### 404 页面

用户访问未定义的路由，我们可以将用户导航到 NotFound 页面，例如：

```js
const routes = [
  { path: '/', component: Home },

  // 其它路由...

  // 访问未定义的路由时，导航到该路径
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
```
