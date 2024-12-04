# 实践场景

## VueUse

[VueUse](https://www.vueusejs.com/) 是一款基于组合式 API 的函数集合。

- `useStorage`：响应式的 LocalStorage/SessionStorage。
- `useWindowSize`：响应式获取窗口尺寸。
- `useClipboard`：提供剪切、复制和粘贴与异步读写系统剪贴板的能力，读取剪切板内容需要授权。
- `useCssVar`：操作 css 变量。
- `useDark`：响应式暗黑模式。
- `useEventListener`：在挂载时使用 addEventListener 注册，在卸载时自动使用 removeEventListener 。
- `useFavicon`：响应式操作页面的 favicon 图标。
- `useFullscreen`：操作网页进入/退出全屏模式。
- `onClickOutside`：监听元素外部的点击事件，对模态框和下拉菜单很有用。
- `onLongPress`：监听元素的长按事件。
- `useRefHistory`：跟踪 ref 的更改历史，提供撤消和重做功能。
- `watchThrottled`：节流 watch。
- `watchDebounced`：防抖 watch。
- ...

## v-resize 指令

使用 ResizeObserver 监听元素的尺寸变化，变化后运行传入的函数。

```js
import { throttle } from 'lodash'

export default {
  mounted(el, binding) {
    const throttleDelay = binding.arg || 100 // 默认节流时间为100ms，可以通过指令参数传递
    const callback = throttle(binding.value, throttleDelay)

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        callback(entry.contentRect)
      }
    })

    resizeObserver.observe(el)
    el._resizeObserver = resizeObserver
  },
  unmounted(el) {
    if (el._resizeObserver) {
      el._resizeObserver.disconnect()
      delete el._resizeObserver
    }
  },
}
```

使用

```vue
<template>
  <div v-resize="handleResize"></div>
  <!-- 自定义节流时间 -->
  <div v-resize:200="handleResize"></div>
</template>

<script setup>
import vResize from '@/directives/v-resize.js'

const handleResize = rect => {
  console.log(rect.width, rect.height)
}
</script>
```

## nProgress

[nProgress](https://ricostacruz.com/nprogress/) 是一款轻量级的页面加载进度条库，在 Vue 中，通常与 VueRouter 结合使用。

```js
import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 关闭右上角圆环加载器
nProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

router.beforeEach((to, from) => {
  nProgress.start() // 进度条开始加载
})

router.afterEach((to, from) => {
  nProgress.done() // 进度条结束加载
})

export default router
```

## Axios 配置

[Axios](https://www.axios-http.cn/) 是一个用于网络请求的库，它基于 Promise 对于 XMLHttpRequest 进行了封装，可以在浏览器和 Node.js 环境使用。

在 Vue 中，常常会使用它的[拦截器](https://www.axios-http.cn/docs/interceptors)，来对整个项目的网络请求进行封装，例如：请求时携带 token、响应时处理错误等。

```js
import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // 基本请求路径
  timeout: 5000, // 请求超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      // Authorization 为自定义的请求头，开发时需以自己项目来决定
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error),
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 此 res 为后端手动封装的消息格式，开发时需以自己项目决定
    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(res.msg ?? '请求失败！')
      return Promise.reject(res)
    }
    return res
  },
  error => {
    ElMessage.error(error.msg ?? '请求失败！')
    return Promise.reject(error)
  },
)

export default instance
```

## SortableJS 排序

[SortableJS](https://sortablejs.com/) 是一个功能强大的 JavaScript 拖拽库。

常用配置项

> 查看[完整配置项](https://sortablejs.com/options)

```js
new Sortable(table, {
  disabled: false, // 为true时禁用排序功能
  animation: 150, // 排序动画持续时长（ms）
  draggable: '.item', // 允许拖拽的项目类名
  ghostClass: 'sortable-ghost', // 自定义拖拽时的样式类
  chosenClass: 'sortable-chosen', // 自定义选中时的样式类

  onStart(event) {}, // 拖动开始时触发
  onEnd(event) {
    // 拖动结束时触发
    event.from // 拖动开始时的列表容器
    event.to // 拖动结束后的列表容器
    event.oldIndex // 拖动开始前的索引
    event.newIndex // 拖动结束后的索引
  },
})
```

以下是一个结合 [el-table](https://element-plus.gitee.io/zh-CN/component/table.html) 的示例。

```vue
<template>
  <el-table ref="tableRef" :data="tableData" row-key="id">
    <el-table-column type="index" label="序号" />
    <!-- 为可拖动排序的列设置类名 -->
    <el-table-column label="排序" width="60" class-name="drag-cell">
      <el-icon :size="16"><Rank /></el-icon>
    </el-table-column>
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
  </el-table>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Sortable from 'sortablejs'

const tableRef = ref()
const tableData = reactive([
  { id: 1, name: '张三', age: 20 },
  { id: 2, name: '李四', age: 21 },
  { id: 3, name: '王五', age: 22 },
  { id: 4, name: '赵六', age: 19 },
  { id: 5, name: '陈七', age: 20 },
])

onMounted(() => {
  const table = tableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
  new Sortable(table, {
    draggable: '.drag-cell', // 允许拖拽的元素类名
    // 结束拖拽时触发
    onEnd: event => {
      // 删除被拖动的元素
      const moveRow = tableData.splice(event.oldIndex, 1)[0]
      // 添加到新的位置
      tableData.splice(event.newIndex, 0, moveRow)
    },
  })
})
</script>
```

## ElementPlus 动态修改主题色

ElementPlus 主题色是由一个主色和几个辅色组成，辅色用于元素 hover、active、disabled 等效果。在控制台可以看到它们的 css 变量名和值。

```css
:root {
  --el-color-primary: #409eff;
  --el-color-primary-light-3: #79bbff;
  --el-color-primary-light-5: #a0cfff;
  --el-color-primary-light-7: #c6e2ff;
  --el-color-primary-light-8: #d9ecff;
  --el-color-primary-light-9: #ecf5ff;
  --el-color-primary-dark-2: #337ecc;
}
```

通过设置 css 变量改变主题色，用函数生成辅色变量，即可完成修改主题色。

其中，辅色中 light 代表与白色混合，dark 代表与黑色混合，后面的数字就代表需要混合的比率。

按比率混合颜色的函数：

```js
/**
 * 按比率混合两种颜色，类似 sass 的 mix 函数
 * @param {String} color1 十六进制颜色
 * @param {String} color2 十六进制颜色
 * @param {Number} ratio 比例 0-1
 * @returns {String} 混合后的十六进制颜色
 */
export const blendColors = (color1, color2, ratio) => {
  ratio = Math.max(0, Math.min(1, ratio))
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

示例代码：

```vue
<template>
  <el-color-picker v-model="primaryColor" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { blendColors } from '@/utils'

const primaryColor = ref('#409eff') // 默认项目主题色

watch(primaryColor, color => {
  // 修改主题色，将变量修改到 body 上，优先级大于 :root 选择器，ElementPlus 组件就会使用 body 中的变量
  document.body.style.setProperty('--el-color-primary', color)
  // 修改 dark 辅色
  document.body.style.setProperty('--el-color-primary-dark-2', blendColors('#000000', color, 0.2))
  // 循环修改剩余的 light 辅色
  ;[3, 5, 7, 8, 9].forEach(level => {
    const computedColor = blendColors('#ffffff', color, level / 10)
    document.body.style.setProperty('--el-color-primary-light-' + level, computedColor)
  })
})
</script>
```
