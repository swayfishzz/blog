export default [
  {
    text: '浏览器',
    collapsed: false,
    items: [
      { text: 'DOM 操作', link: '/blog/browser/dom' },
      { text: '事件处理', link: '/blog/browser/event' },
      { text: 'Observer', link: '/blog/browser/observer' },
      // { text: '事件循环', link: '/blog/browser/browser-event-loop' },
      // { text: '存储', link: '/blog/browser/storage' },
      // { text: '跨标签页通信', link: '/blog/browser/multiple-tags' },
    ],
  },
  {
    text: 'JavaScript',
    collapsed: false,
    items: [
      { text: '模块化', link: '/blog/js/module' },
      // { text: '位运算符', link: '/blog/js/bitwise' },
      { text: '异步编程', link: '/blog/js/async' },
      { text: '工具函数', link: '/blog/js/utils' },
      { text: '常用库', link: '/blog/js/packages' },
      { text: '正则表达式', link: '/blog/js/RegExp' },
      { text: '设计模式', link: '/blog/js/design-pattern' },
    ],
  },
  {
    text: '网络',
    collapsed: false,
    items: [
      { text: 'HTTP', link: '/blog/network/http' },
      // { text: 'HTTPS', link: '/blog/network/https' },
      { text: 'AJAX', link: '/blog/network/ajax' },
      { text: 'CORS', link: '/blog/network/cors' },
      { text: 'CDN', link: '/blog/network/cdn' },
      // { text: 'Cookie & Session', link: '/blog/network/cookie-session' },
      // { text: '网络安全', link: '/blog/network/network-security' },
      // { text: '性能优化', link: '/blog/network/network-performance-optimization' },
      // { text: 'WebSocket', link: '/blog/network/websocket' }
    ],
  },
  {
    text: 'Vue',
    collapsed: false,
    items: [
      { text: 'Vite 基本使用', link: '/blog/vue/vite' },
      { text: '内置组件', link: '/blog/vue/component' },
      { text: '组件通信', link: '/blog/vue/component-communicate' },
      { text: '状态管理 Pinia', link: '/blog/vue/pinia' },
      { text: '路由管理 VueRouter', link: '/blog/vue/vue-router' },
      { text: 'CSS 功能', link: '/blog/vue/vue-css' },
      { text: '实践场景', link: '/blog/vue/vue-practice' },
    ],
  },
  {
    text: 'Node.js',
    collapsed: false,
    items: [
      { text: '使用 nvm 管理 node', link: '/blog/node/nvm' },
      { text: 'npm 包管理器', link: '/blog/node/npm' },
      { text: 'package.json', link: '/blog/node/package-json' },
      { text: '全局变量', link: '/blog/node/node-globals' },
      { text: '常用内置模块', link: '/blog/node/node-api' },
      // { text: '流', link: '/blog/node/stream' },
      // { text: '事件循环', link: '/blog/node/node-event-loop' },
      { text: 'Express 基本使用', link: '/blog/node/express' },
      { text: 'Express 常见场景', link: '/blog/node/express-scene' },
    ],
  },
  {
    text: '工具',
    collapsed: false,
    items: [
      { text: 'Iconify', link: '/blog/util/iconify' },
      { text: 'UnoCSS', link: '/blog/util/unocss' },
    ]
  }
]
