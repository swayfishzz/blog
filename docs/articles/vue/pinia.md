# 状态管理 Pinia
在 Vue3 中，Pinia 作为新的推荐方案来代替 Vuex。与 Vuex 相比，Pinia 不仅提供了一个更简单的 API，也提供了符合组合式 API 风格的 API

## 开始使用

首先，需要在你的项目中安装 Pinia

```bash
npm i pinia
```

在 main.js 中，导入并挂载 Pinia

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia() // 创建 pinia 实例
const app = createApp(App)

app.use(pinia) // 挂载
app.mount('#app')
```

## 定义 Store

使用 `defineStore` 来创建一个 Store，每个 Store 都是一个包含状态和一组用于修改状态的方法的对象。

### 选项式 API

使用 `defineStore` 定义一个选项式 API 风格的仓库，接受如下参数：

- **`id`**：字符串，仓库 id，Pinia 将用它来连接 store 和 devtools
- **`options`**：对象类型，定义了该仓库的配置项
  - **`state`**：包含了 Store 中的数据
  - **`actions`**：定义修改 `state` 的方法
  - **`getters`**：通常是需要二次计算的数据

```js
import { defineStore } from 'pinia'

export const useCountStore = defineStore('counter', {
  // 使用 state 定义状态
  state: () => ({
    count: 0,
  }),
  // 使用 actions 定义修改状态的方法
  actions: {
    increment() {
      this.count++
    },
  },
  // 使用 getters 定义需要二次计算的数据
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

### 组合式 API

使用 `defineStore` 定义一个选项式 API 风格的仓库，接受如下参数：

- **`id`**：字符串，仓库 id
- **`函数`**：该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。

在这个函数中：

- 使用 `ref()` 定义的数据就是 `state` 属性
- 使用 `computed()` 定义的数据就是 `getters`
- 使用 `function()` 定义的数据就是 `actions`

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCountStore = defineStore('counter', () => {
  const count = ref(0) // 仓库的数据
  const double = computed(() => count.value * 2) // 二次计算的数据
  const increment = count.value++ // 修改仓库数据的方法

  return {
    count,
    double,
    increment,
  }
})
```

### 使用 Store

```js
import { storeToRefs } from 'pinia'
import { useCountStore } from '@/store/useCountStore'

const store = useCountStore() // 创建 Store 实例
const { count, doubleCount } = storeToRefs(store) // 将 state，getters 转为 ref 响应式
const { increment } = store // 将 actions 的方法解构
```

## 持久化存储

Pinia 支持插件的扩展，可以下载一些第三方编写的插件使用，以避免重复造轮子。使用 [`pinia-plugin-persistedstate`](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/) 持久化存储数据，它通过一些配置决定是否进行持久化存储。其原理是在页面刷新或卸载时将数据存至 `localStorage` 中，在页面加载时将其取出

### 基本使用

**安装**：在项目中安装 `pinia-plugin-persistedstate` 插件

```bash
npm i pinia-plugin-persistedstate
```

**挂载到 pinia 实例**：

```js
import { createPinia } from 'pinia'
import piniaPersisted from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPersisted)
```

**使用**：在定义仓库时，加入插件指定的配置项

```js
import { defineStore } from 'pinia'

// 选项式 API
defineStore('count', {
  state: () => ({}),
  persist: true, // 添加 persist 选项
})

// 组合式 API
defineStore(
  'count', // 仓库 id
  () => {}, // 仓库数据...
  { persist: true }, // 添加 persist 选项
)
```

### 配置

该插件默认使用 `localStorage` 进行存储，使用仓库 id 作为默认的 key，并且默认持久化整个 state 的数据，我们可以自定义配置，需要将 persist 属性设置为对象形式：

```js
defineStore('count', {
  state: () => ({
    user: { name: '张三', age: 18 },
    job: 'student',
  }),
  persist: {
    key: 'custom-key', // 指定存储的 key
    storage: 'sessionStorage', // 指定存储介质
    paths: ['user.name', 'job'], // 仅存储 user.name 和 job 数据
  },
})
```
