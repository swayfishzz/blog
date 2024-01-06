# 组件

组件是可重用的、独立的 Vue 实例，它可以封装应用程序中特定功能的 HTML、CSS 和 JavaScript 代码。

## 内置组件

Vue.js 内置了一些核心组件，这些组件提供了常见的功能

### Teleport

`<Teleport>` 允许你将组件的内容渲染到 DOM 树中的其他位置，而不受父组件的限制。这对于在应用程序中创建特定的弹出窗口、模态框、弹出菜单等非常有用。

`<Teleport>` 通过 `to` 属性指定一个目标容器，组件的内容将被渲染到这个容器中，而不是父组件的 DOM 结构中

```vue
<template>
  <Teleport to="body">
    这段内容将会被渲染到 body 元素下
  </Teleport>

  <Teleport to="#app" :disabled="someCondition">
    someCondition 为 true 时，将禁用传送功能
  </Teleport>
</template>
```

### Transition

`Transition` 用于在**单个元素或组件**插入、更新和删除时提供动画过渡效果，常用属性有：

- `name`：用于生成过渡时的 CSS 类名，例如 `name: "fade"` 将自动扩展为 `.fade-enter`
- `mode`：设置过渡模式，可以是 `"in-out"`（新元素先进入，旧元素再离开）或 `"out-in"`（旧元素先离开，新元素再进入），默认 `"default"`（新旧元素同时进入、离开）
- `duration`：过渡的持续时间
- `appear`：指定是否在初始渲染时应用过渡效果，默认 `false`

下面是一个点击按钮显示或隐藏一段文字的示例

```vue
<template>
  <Transition name="fade">
    <span v-if="show">拥有动画过渡的文本内容</span>
  </Transition>
  <button @click="toggle">显示/隐藏文本</button>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
const toggle = () => {
  show.value = !show.value
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

### TransitionGroup

`TransitionGroup` 用于在多个元素之间应用过渡效果。通常用于处理 `v-for` 列表中元素的动态增删，使得列表中的元素在插入、更新或删除时具有动画效果。常用属性有：

- `name`：同 `Transition` 属性的 `name`
- `tag`：指定要渲染的元素，默认不会渲染元素
- `appear`：同 `Transition` 属性的 `appear`
- `mode`：同 `Transition` 属性的 `mode`

注意，每个 `<TransitionGroup>` 的子节点必须有[**独立的 key**](https://cn.vuejs.org/guide/essentials/list.html#maintaining-state-with-key)，动画才能正常工作。

```vue
<TransitionGroup tag="ul" name="fade">
	<li v-for="item in list" :key="item.id">
  	{{ item.text }}
  </li>
</TransitionGroup>
```

### KeepAlive

`KeepAlive` 用于缓存动态组件的状态，以避免在切换组件时重新创建和销毁它们。常用属性有：

- `include`：指定哪些组件应该被缓存，可以是字符串、正则或数组
- `exclude`：指定哪些组件不应该被缓存
- `max`：指定缓存的最大组件实例数量，超出此数量的组件将被销毁

它会根据组件的 [`name`](https://cn.vuejs.org/api/options-misc.html#name) 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项

> 使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项

```vue
<KeepAlive :max="5" include="a,b">
	<component :is="currentView" />
</KeepAlive>
```

## 动态组件

动态组件允许你在不同的组件之间进行切换，最常见场景是 Tab 切换。动态组件通过 `<component>` 来渲染，通过属性 `is` 指定导入的组件对象

以下是一个 Tab 切换的例子：

> 在 Vue3 中，官方推荐使用 `shallowRef` 来阻止组件对象的响应式，避免性能开销。不使用时，动态组件可能不会正常加载

```vue
<template>
  <ul>
    <li v-for="(e, i) in tabs" :key="i" @click="change(i)">{{ e.name }}</li>
  </ul>
  <component :is="current" />
  <!-- 使用动态组件 -->
</template>

<script setup>
import { reactive, shallowRef } from 'vue'
import A from './components/A.vue'
import B from './components/B.vue'

// 组件使用 shallowRef 包裹
const tabs = reactive([
  { name: 'A组件', comp: shallowRef(A) },
  { name: 'B组件', comp: shallowRef(B) },
])

const current = shallowRef(A)
const change = (index) => {
  current.value = tabs[index].comp
}
</script>
```

也可以结合 `KeepAlive` 内置组件缓存组件的状态，以避免在切换组件时重新创建和销毁它们

```vue
<template>
  <KeepAlive>
    <component :is="someCondition" />
  </KeepAlive>
</template>
```

## 异步组件

异步组件允许你将组件的加载延迟到需要的时候（懒加载），从而提高应用程序的性能和加载速度。

异步组件可以通过 `defineAsyncComponent` 函数来创建，例如：

```js
import { defineAsyncComponent } from 'vue'

const AboutView = defineAsyncComponent(() => import('@/views/About.vue'))
```

现在，`AboutView` 是一个异步组件，不会在页面加载时加载，只有在第一次被渲染到视图中时才会进行加载。

另外可以在加载异步组件时展示 Loading 效果，以提供更好的用户体验：

```vue
<template>
  <AboutView v-if="isLoaded" />
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const isLoaded = ref(false)

onMounted(() => {
  // 在组件挂载后显示
  nextTick(() => {
    isLoaded.value = true
  })
})
</script>
```

`defineAsyncComponent` 函数可以接受一个配置对象作为参数，以进一步自定义异步组件的行为。

- `loader`：一个返回 `Promise` 的函数，用于异步加载组件。必需项。
- `loadingComponent`：在异步组件加载期间，将会展示这个组件，通常为一个 Loading 效果的组件
- `delay`：`loadingComponent` 出现的延迟时间，默认 200ms
- `errorComponent`：如果异步组件加载出现错误，将会显示这个组件
- `timeout`：用于指定异步组件加载的最长等待时间（默认 `Infinity`），超时会展示 `errorComponent` 组件

```js
import Loading from '@/components/Loading.vue'
import ErrorComp from '@/componets/Error.vue'

const AboutView = defineAsyncComponent({
  loader: () => import('@/views/About.vue'), // 异步加载的组件
  loadingComponent: Loading, // 加载时展示的 loading 组件
  errorComponent: ErrorComp, // 加载失败时展示的组件
  delay: 500, // 展示Loading组件前的延迟，默认200ms
  timeout: 3000, // 设置超时时间，默认 Infinity
})
```

## 全局组件

在 Vue 中，你可以创建全局组件，这些组件可以在整个应用的任何地方使用，无需手动引入。

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import GlobalComponent from './GlobalComponent.vue' // 导入全局组件

const app = createApp(App)
app.component('global-component', GlobalComponent) // 注册全局组件

app.mount('#app')
```
