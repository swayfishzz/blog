# h 函数

h 函数用于创建虚拟 dom 节点（VNode）。

h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”。

当 `<template>` 无法满足个性化的需求时，可以使用 h 函数，它能为你带来完全的 JavaScript 编程能力。

## 函数签名

使用了 [jsDoc](https://www.jsdoc.com.cn/) 来解释函数签名。

```js
/**
 * @param {String | Component} type html 标签字符串或 Vue 组件
 * @param {Object | null} [props] 要传递的属性，html 属性或 Vue 组件 props
 * @param {String | Slot | Slots} [children] 子节点
 * @returns {VNode}
 */
function h(type, props, children) {}
```

## 使用示例

### 原生元素

```js
import { h } from 'vue'

// 除了 type 外，其他参数都是可选的
h('div')
h('div', { id: 'foo' })

// attribute 和 property 都可以用于 prop
// Vue 会自动选择正确的方式来分配它
h('div', { class: 'bar', innerHTML: 'hello' })

// class 与 style 可以像在模板中一样
// 用数组或对象的形式书写
h('div', { class: ['foo', { bar: true }], style: { color: 'red' } })

// 事件监听器应以 onXxx 的形式书写
h('div', { onClick: () => {} })

// children 可以是一个字符串
h('div', { id: 'foo' }, 'hello')

// 没有 prop 时可以省略不写
h('div', 'hello')
h('div', [h('span', 'hello')])

// children 数组可以同时包含 VNode 和字符串
h('div', ['hello', h('span', 'hello')])
```

### 组件

以 [el-input](https://element-plus.org/zh-CN/component/input.html) 为例，下面是一个使用 `template` 模板的例子：

```vue
<template>
  <el-input v-model="keyword" clearable placeholder="请输入..">
    <template #append>
      <el-button :icon="Search" @click="handleSearch" />
    </template>
  </el-input>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const keyword = ref('')
const handleSearch = () => {}
</script>
```

接下来使用 h 函数生成：

> setup 应返回一个函数

```js
import { h, ref } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

export default {
  setup() {
    const keyword = ref('')
    const handlerSearch = () => {}

    return () =>
      h(
        ElInput,
        {
          modelValue: keyword.value,
          'onUpdate:modelValue': value => (keyword.value = value),
          clearable: true,
          placeholder: '请输入..',
        },
        {
          append: () => h(ElButton, { onClick: handlerSearch, icon: Search }),
        },
      )
  },
}
```

下面是是一个根据传入的参数生成标题的例子，这种情况下，使用渲染函数会更加方便。

```js
import { h } from 'vue'

export default {
  props: ['level'], // 传入 1-6 作为标题等级
  setup(props, { slots }) {
    return () => h(`h${props.level}`, slots.default())
  },
}
```

## 使用 JSX

使用 jsx 代替 h 函数是非常省力的方法，jsx 方便、直观、简单。

### 安装

> 以下为 vite 使用方式，其它构建工具请自行查阅。

```bash
npm i @vitejs/plugin-vue-jsx -D
```

在 vite.config.js 中添加：

```js
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  plugins: [vueJsx()],
}
```

### 使用示例

接下来使用 jsx 实现上述 el-input 组件:

```jsx
import { ElInput, ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

export default {
  setup() {
    const keyword = ref('')
    const handlerSearch = () => {}

    return () => (
      <ElInput v-model={keyword.value} clearable placeholder='请输入..'>
        {{
          append: () => <ElButton icon={Search} onClick={handlerSearch} />,
        }}
      </ElInput>
    )
  },
}
```

### 与 ReactJSX 区别

- html 属性可以直接使用 `class/for`，而非 `className/htmlFor`。
- 传递子元素的不同。

  ```jsx
  // 默认插槽
  <MyComponent>{() => 'hello'}</MyComponent>

  // 具名插槽
  <MyComponent>
  {{
    default: () => 'default slot',
    foo: () => <div>foo</div>,
    bar: () => [<span>one</span>, <span>two</span>]
  }}
  </MyComponent>
  ```
