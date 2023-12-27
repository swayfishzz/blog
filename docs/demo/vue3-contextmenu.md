# Vue3 右键菜单

[vue3-context-menu](https://imengyu.top/pages/vue3-context-menu-docs/) 是一个基于 Vue.js 的可定制化上下文菜单插件。它提供了一个易于使用的 API，使得在 Vue.js 项目中添加上下文菜单变得简单和方便。

<img src="/md/vue3-contextmenu-demo.png" alt="demo"/>

### 安装 vue3-contextmenu

```bash
npm i vue3-contextmenu
```

### 导入项目

在项目中导入 `vue3-contextmenu` 库

```js
//main.js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu).mount('#app')
```

### 开始使用

在组件中使用 `vue3-contextmenu`，示例：

<ContextMenu />

```vue
<template>
  <!-- 使用 .prevent 修饰符阻止默认事件 -->
  <div class="box" @contextmenu.prevent="openMenu">在此处打开右键菜单</div>
</template>

<script setup>
import { h } from 'vue'
import ContextMenu from '@imengyu/vue3-context-menu'
// 图标路径
import questionImg from '@/assets/icon/question.png'
import shareImg from '@/assets/icon/share.png'
import reloadImg from '@/assets/icon/reload.png'

// 定义图标大小
const style = { width: '16px', height: '16px' }

const openMenu = (e) => {
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    closeWhenScroll: false, // 鼠标滚轮滚动时，是否关闭菜单，默认 true
    onClose: (item) => console.log(item), // 关闭回调
    // 使用 items 配置菜单项
    items: [
      {
        label: '点我试试',
        icon: h('img', { src: questionImg, style }), // 使用 VNode 生成图标
        onClick: () => confirm('你要使用这个插件吗？'),
      },
      {
        label: '菜单项1',
        icon: h('img', { src: shareImg, style }),
        disabled: true, // 禁用
      },
      {
        label: '刷新',
        icon: h('img', { src: reloadImg, style }),
        divided: 'down', // 下方显示分割线
        onClick: () => location.reload(),
      },
      {
        label: '菜单项3',
        children: [{ label: '3-1' }, { label: '3-2' }, { label: '3-3' }],
      },
    ],
  })
}
</script>
```

关于更多详细的配置项见 https://imengyu.top/pages/vue3-context-menu-docs/api/ContextMenuInstance.html

<script setup>
import ContextMenu from '../components/vue3-contextmenu.vue'
</script>
