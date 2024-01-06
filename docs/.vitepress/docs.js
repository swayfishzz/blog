export default [
  {
    text: 'HTML',
    collapsed: false,
    items: [
      { text: 'DOM 操作', link: '/html/dom' },
      { text: '自定义属性', link: '/html/custom-attr' },
      { text: '事件处理', link: '/html/event' },
      { text: '拖拽 API', link: '/html/draggable' },
      { text: 'localStorage', link: '/html/localStorage' },
      { text: 'Fetch 基本使用', link: '/html/fetch' },
    ],
  },
  {
    text: 'JS',
    collapsed: false,
    items: [
      { text: 'this', link: '/js/this' },
      { text: '模块化', link: '/js/module' },
      { text: '异步编程', link: '/js/async' },
      { text: '工具函数', link: '/js/utils' },
      { text: '正则表达式', link: '/js/RegExp' },
    ],
  },
  {
    text: 'Vue',
    collapsed: false,
    items: [
      { text: 'Vite 基本使用', link: '/vue/vite' },
      { text: '内置组件', link: '/vue/component' },
      { text: '组件通信', link: '/vue/component-communicate' },
      { text: '状态管理 Pinia', link: '/vue/pinia' },
      { text: '路由管理 VueRouter', link: '/vue/vue-router' },
      { text: 'CSS 功能', link: '/vue/css' },
      { text: '自动引入依赖', link: '/vue/auto-import-util' },
    ],
  },
  {
    text: '库',
    collapsed: false,
    items: [
      { text: 'lodash', link: '/package/lodash' },
      { text: 'luxon', link: '/package/luxon' },
      { text: 'nprogress', link: '/package/nprogress' },
      { text: 'sortablejs', link: '/package/sortablejs' },
      { text: 'Vue3 右键菜单', link: '/package/vue3-contextmenu' },
    ],
  },
  {
    text: 'Node.js',
    collapsed: false,
    items: [
      { text: '使用 nvm 管理 node', link: '/node/nvm' },
      { text: 'npm 包管理器', link: '/node/npm' },
      { text: '常用内置模块', link: '/node/module' },
      { text: 'Express 基本使用', link: '/node/express' },
      { text: 'Express 常见场景', link: '/node/express-scene' },
    ],
  },
]