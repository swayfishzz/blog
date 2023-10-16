# 组件通信

在 Vue 中，组件之间的通信是一个常见的需求。Vue 提供了多种方式来实现组件之间的通信

## 父子组件通信

### 属性传递（props）

父组件通过属性传递数据给子组件

```vue
<!-- parent.vue -->
<template>
  <h2>Parent</h2>
  <!-- 通过属性给子组件传递数据 -->
  <child-comp :message="value"></child-comp>
</template>
<script setup>
import { ref } from 'vue'
const value = ref('父组件的数据')
</script>
```

子组件可以通过 `defineProps` 接收父组件的数据

```vue
<!-- child.vue -->
<template>
  {{ message }}
</template>

<script setup>
// 接收数据
const props = defineProps({
  message: String,
})
</script>
```

### 自定义事件

子组件可以通过自定义事件向父组件传递数据

- 可以在模板内直接使用 `$emit` 来抛出事件
- 还可以在 `<script setup>` 中使用编译器宏 `defineEmits`，它返回一个等同于 `$emit` 方法的 `emit` 函数。可以使用 `emit` 函数抛出事件

```vue
<!-- child.vue -->
<template>
  <button @click="sendData">发送数据</button>
  <!-- 或 -->
  <button @click="$emit('confirm', 'Hello')">发送数据</button>
</template>

<script setup>
const emit = defineEmits(['confirm'])
const sendData = () => {
  emit('confirm', 'Hello')
}
</script>
```

父组件通过在子组件上使用 `@confirm` 来监听子组件触发的自定义事件

```vue
<template>
  <!-- 监听子组件事件 -->
  <child @confirm="handleChildData" />
</template>

<script setup>
import child from './child.vue'

const handleChildData = (data) => {
  console.log(data)
}
</script>
```

### 使用 v-model

`v-model` 可以在父子组件之间进行数据的双向绑定和同步，使用它可以在子组件中通过特定的事件来更新父组件的数据，例如：

父组件 `ParentComponent`：

```vue
<template>
  <!-- 通过 v-model 传递 title 数据 -->
  <ChildComponent v-model="title" />
  <!-- 等同于 -->
  <ChildComponent 
    :modelValue="title" 
    @update:modelValue="(newVal) => (title = newVal)" />
</template>

<script setup>
import { ref } from 'vue'
const title = ref('Hello!')
</script>
```

子组件 `ChildComponent`：

```vue
<template>
  {{ modelValue }}
  <button @click="updateData">修改</button>
</template>

<script setup>
defineProps(['modelValue']) // 接受属性
const emit = defineEmits(['update:modelValue']) // 定义事件

const updateData = () => {
  emit('update:modelValue', '你好！')
}
</script>
```

使用 `v-model` 还可以绑定多个数据进行组件通信，例如：

```vue
<!-- Parent.vue -->
<template>
  <!-- 为 v-model 添加参数 -->
  <Child v-model:first-prop="first" v-model:second-prop="second" />
</template>

<!-- Child.vue -->
<script setup>
defineProps(['firstProp', 'secondProp']) // 定义父组件传递的属性
const emit = defineEmits(['update:firstProp', 'update:secondProp']) // 定义更新的事件

setTimeout(() => {
  emit('update:firstProp', 'FIRST') // 将父组件数据改为大写
  emit('update:secondProp', 'SECOND')
}, 2000)
</script>
```

### defineExpose/ref

子组件通过 `defineExpose` 函数对外暴露数据，父组件在子组件上添加 `ref` 引用就可以调用子组件暴露的数据

子组件 `ChildComponent.vue`

```vue
<template>子组件</template>

<script setup>
import { ref } from 'vue'
// 暴露数据
defineExpose({
  a: 1,
  b: ref(2),
  c: () => {
    alert('Hello')
  },
})
</script>
```

父组件 `ParentComponent.vue`

```vue
<template>
  <!-- 为子组件添加 ref 标记 -->
  <ChildComponent ref="child" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChildComponent from './Child.vue'

// child.value 是 <Child /> 组件的实例
const child = ref(null)

onMounted(() => {
  console.log(child.value.a) // 1
  console.log(child.value.b) // 2
  child.value.c() // 浏览器弹出 'Hello'
})
</script>
```

## 多级组件通信

### provide/inject

- `provide` 使祖先组件可以向其后代组件注入数据，无论这个组件的层级有多深
- `inject` 用于声明祖先组件注入的属性

祖先组件

```js
import { ref, reactive, provide } from 'vue'

const user = reactive({ name: '张三', age: 18 })
const count = ref(0)

provide('user', user) // 提供数据
provide('count', count)
```

后代组件

```js
import { inject } from 'vue'

const user = inject('user') // 注入当前组件中
const count = inject('count')
user.name = '李四'
count.value = 1
```

通过上述示例，我们可以发现，后代组件是可以更新祖先组件的数据的，而 vue 官方建议**将数据的变更保持在祖先组件内**，如果想要在后代组件中修改 `provide` 的数据，推荐在祖先组件中提供一个可以修改数据的函数，一起提供给后代组件，确保数据的状态和变更都内聚在一个组件，使其更易维护：

祖先组件：

```js
import { ref, reactive, provide } from 'vue'

const count = ref(0)
const updateCount = (n) => {
  count.value = n
}

provide('count', { count, updateCount }) // 提供数据和修改的函数
```

后代组件：

```js
import { inject } from 'vue'

const { count, updateCount } = inject('count')
setTimeout(() => {
  updateCount(5)
}, 1500)
```

### mitt

`mitt` 是一个简单而强大的 JavaScript 事件总线库，用于在应用程序的不同部分之间进行事件通信。对于 Vue、React、原生 JavaScript 或任何其他框架都是通用的。

使用 npm 安装它

```bash
npm i mitt
```

#### 创建一个 mitt 实例

在一个独立的文件中创建一个 mitt 实例，例如 `mitt.js`：

```js
import mitt from 'mitt'
const emitter = mitt()
export default emitter
```

#### 发送事件

在任意组件中使用 `mitt.emit` 触发一个事件

```js
import mitt from './mitt'

mitt.emit('handleMessage', { message: '这是来自发送方的数据' })
```

#### 监听事件

使用 `mitt.on` 方法来监听事件，使用 `mitt.off` 方法来取消事件监听

```js
import { onUnMounted } from 'vue'
import mitt from './mitt'

// 事件处理函数
const handler = (data) => {
  alert(data.message)
}

// 监听事件
mitt.on('handleMessage', handler)

// 取消事件监听
onUnMounted(() => {
  mitt.off('handleMessage', handler)
})
```

### pinia

`pinia` 是一个基于 Vue 3 的状态管理库，用于管理应用程序的全局状态。将会在[状态管理 Pinia](/articles/vue/pinia)中详细介绍
