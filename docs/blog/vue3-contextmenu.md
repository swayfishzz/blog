# Vue3 右键菜单

用于 Vue3 项目的右键菜单库，下面将介绍两款此类型的库：

- [vue3-context-menu](https://imengyu.top/pages/vue3-context-menu-docs)
- [v-contextmenu](https://www.npmjs.com/package/v-contextmenu)

## vue3-context-menu

效果图

<img src="/md/vue3-contextmenu.png" alt="vue3-contextmenu"/>

### 开始

安装 vue3-context-menu

```bash
npm i @imengyu/vue3-context-menu
```

在项目中引入

```js
// main.js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

app.use(ContextMenu)
```

### 使用示例

此示例使用函数形式配置右键菜单，它还支持[组件形式](https://imengyu.top/pages/vue3-context-menu-docs/api/ContextMenu.html)

```vue
<template>
  <!-- 使用 .prevent 修饰符阻止默认事件 -->
  <div @contextmenu.prevent="openMenu">打开右键菜单</div>
</template>

<script setup>
import ContextMenu from '@imengyu/vue3-context-menu'

const openMenu = (e) => {
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    closeWhenScroll: false, // 鼠标滚轮滚动时，是否关闭菜单，默认 true
    onClose: (item) => console.log(item), // 关闭回调
    // 使用 items 配置菜单项
    items: [
      {
        label: '你好',
        // iconFontClass: 'your-font-class', // 可以使用字体图标类名
        onClick: () => alert('你好！')
      },
      {
        label: '菜单项1',
        disabled: true // 禁用
        divided: 'down', // 下方显示分割线
      },
      {
        label: '菜单项3',
        children: [{ label: '3-1' }, { label: '3-2' }, { label: '3-3' }]
      }
    ]
  })
}
</script>
```

## v-contextmenu

效果图

<img src="/md/v-contextmenu.png" alt="v-contextmenu"/>

### 开始

安装 v-contextmenu

```bash
npm i v-contextmenu
```

在项目中引入

```js
import contextmenu from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'

app.use(contextmenu)
```

### 使用示例

与 vue3-context-menu 不同的是：

- 支持横向菜单按钮组
- 不支持函数形式配置

```vue
<template>
  <div v-contextmenu:contextmenu>打开右键菜单</div>

  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item>菜单1</v-contextmenu-item>
    <!-- 菜单分割线 -->
    <v-contextmenu-divider />
    <!-- 按钮组 -->
    <v-contextmenu-item-group>
      <v-contextmenu-item>Github</v-contextmenu-item>
      <v-contextmenu-item disabled>支付宝</v-contextmenu-item>
    </v-contextmenu-item-group>
    <!-- 子菜单 -->
    <v-contextmenu-subitem title="子菜单">
      <v-contextmenu-item>子菜单1</v-contextmenu-item>
      <v-contextmenu-item>子菜单2</v-contextmenu-item>
    </v-contextmenu-subitem>
  </v-contextmenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const {
  directive,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
  ContextmenuSubmenu,
  ContextmenuGroup
} = VContextmenu

const Example = defineComponent({
  directives: { contextmenu: directive },
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuDivider.name]: ContextmenuDivider,
    [ContextmenuSubmenu.name]: ContextmenuSubmenu,
    [ContextmenuGroup.name]: ContextmenuGroup
  }
})

export default Example
</script>
```
