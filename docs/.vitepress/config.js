export default {
  title: 'zZ的博客', //站点标题
  description: '一个用于记录技术的博客，包括html、css、js、vue、node、webpack等前端技术',
  lang: 'zh-CN',
  themeConfig: {
    // 导航栏文字
    siteTitle: 'zZ的博客',
    // 网站 logo
    logo: '/logo.png',
    // 导航栏配置
    nav: [{ text: '博客', link: '/articles/vue/vite' }],
    // 社交账户链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/swayfishzz' }],
    // 添加 favicon
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    // 左侧边栏配置
    sidebar: {
      '/articles/': [
        {
          text: 'Vue',
          collapsed: false,
          items: [
            { text: 'Vite 基本使用', link: '/articles/vue/vite' },
            { text: '组件通信', link: '/articles/vue/component-communicate' },
            { text: '状态管理 Pinia', link: '/articles/vue/pinia' },
            { text: '路由管理 VueRouter', link: '/articles/vue/vue-router' },
            { text: '自动引入依赖', link: '/articles/vue/auto-import-util' },
          ],
        },
        {
          text: 'JS',
          collapsed: false,
          items: [
            { text: 'DOM 操作', link: '/articles/js/dom' },
            { text: '事件处理', link: '/articles/js/event' },
            { text: '异步编程', link: '/articles/js/async' },
            { text: 'Fetch 基本使用', link: '/articles/js/fetch' },
            { text: '正则表达式', link: '/articles/js/RegExp' },
          ],
        },
        {
          text: 'Node.js',
          collapsed: false,
          items: [
            { text: '使用 nvm 管理 node', link: '/articles/node/nvm' },
            { text: '常用内置模块', link: '/articles/node/module' },
            { text: 'Express 基本使用', link: '/articles/node/express' },
            { text: 'Express 常见场景', link: '/articles/node/express-scene' },
          ],
        },
      ],
    },
    // 右侧边栏标题
    outline: 'deep',
    outlineTitle: '章节导航',
    // 上下篇文本提示文字
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    // 搜索
    search: {
      provider: 'local',
    },
  },
  // 忽略为localhost类型的无效连接
  ignoreDeadLinks: 'localhostLinks'
}
