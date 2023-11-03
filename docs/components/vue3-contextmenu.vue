<template>
  <div class="code-view flex-center">
    <!-- 使用 .prevent 修饰符阻止默认事件 -->
    <div class="box flex-center" @contextmenu.prevent="openMenu">在此处打开右键菜单</div>
  </div>
</template>

<script setup>
import { h } from 'vue'
import ContextMenu from '@imengyu/vue3-context-menu'

// 定义图标大小
const style = { width: '16px', height: '16px' }

const openMenu = (e) => {
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    closeWhenScroll: false, // 鼠标滚轮滚动时，是否关闭菜单，默认 true
    onClose: (item) => console.log(item), // 关闭回调
    items: [
      {
        label: '点我试试',
        icon: h('img', { src: '/icon/question.png', style }), // 使用 VNode 生成图标
        onClick: () => confirm('你要使用这个插件吗？'),
      },
      {
        label: '菜单项1',
        icon: h('img', { src: '/icon/share.png', style }),
        disabled: true, // 禁用
      },
      {
        label: '刷新',
        icon: h('img', { src: '/icon/reload.png', style }),
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

<style scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: #e0e1e5;
  border-radius: 5px;
}
</style>
