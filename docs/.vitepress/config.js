export default {
  title: 'zZ的博客', //站点标题
  description: '一个用于记录技术的博客，包括html、css、js、vue、node、webpack等前端技术',
  lang: 'zh-CN',
  markdown: {
    // lineNumbers: true,// 代码块的行号
  },
  themeConfig: {
    siteTitle: 'zZ的博客', // 导航栏文字
    logo: '/logo.png', // 网站 logo
    // 社交账户链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/swayfishzz' }],
    // 添加 favicon
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    // 导航栏配置
    nav: [
      { text: '博客', link: '/articles/vue/vite' },
      { text: 'Demo', link: '/demo/loading' },
    ],
    // 左侧边栏配置
    sidebar: {
      '/articles/': [
        {
          text: 'Vue',
          collapsed: false,
          items: [
            { text: 'Vite 基本使用', link: '/articles/vue/vite' },
            { text: '组件操作', link: '/articles/vue/component' },
            { text: '组件通信', link: '/articles/vue/component-communicate' },
            { text: '状态管理 Pinia', link: '/articles/vue/pinia' },
            { text: '路由管理 VueRouter', link: '/articles/vue/vue-router' },
            { text: 'CSS 功能', link: '/articles/vue/css' },  
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
            { text: '工具函数', link: '/articles/js/utils' },
          ],
        },
        {
          text: 'Node.js',
          collapsed: false,
          items: [
            { text: '使用 nvm 管理 node', link: '/articles/node/nvm' },
            { text: 'npm 包管理器', link: '/articles/node/npm' },
            { text: '常用内置模块', link: '/articles/node/module' },
            { text: 'Express 基本使用', link: '/articles/node/express' },
            { text: 'Express 常见场景', link: '/articles/node/express-scene' },
          ],
        },
      ],
      '/demo': [
        {
          text: '效果',
          items: [
            { text: 'CSS Loading 效果', link: '/demo/loading' },
            // { text: 'Driver.js 页面引导', link: '/demo/driver' },
            // { text: 'ElementPlus 表格排序', link: '/demo/table-sort' },
            { text: 'ElementPlus 日期区间验证', link: '/demo/date-validate' },
          ],
        },
      ],
    },
    outline: 'deep', // 右侧大纲，深度显示
    outlineTitle: '目录', // 右侧大纲文本
    sidebarMenuLabel: '文章列表', // 移动端 左侧边栏收起时，显示的文本
    returnToTopLabel: '回顶部 ↑', // 移动端 点击大纲时，回顶部按钮的文本
    docFooter: {
      prev: '上一篇', // 文字末尾 上篇文章按钮的文本
      next: '下一篇', // 文字末尾 上篇文章按钮的文本
    },
    // 搜索
    search: {
      provider: 'local',
    },
  },
  ignoreDeadLinks: 'localhostLinks', // 忽略为localhost类型的无效连接
}
