export default {
  title: 'zZ的博客', //站点标题
  description: '技术博客，vue，js，node',
  lang: 'zh-CN',
  themeConfig: {
    // 网站标题
    siteTitle: 'zZ的博客',
    // 网站 logo
    logo: '/logo.jpg',
    // 导航栏配置
    nav: [{ text: '博客', link: '/articles/vite基本使用' }],
    // 社交账户链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/SwayFish' }],
    // 左侧边栏配置
    sidebar: {
      '/articles/': [
        {
          text: 'Vue',
          collapsible: true,
          items: [
            { text: 'Vite 基本使用', link: '/articles/vite基本使用' },
            { text: '状态管理 Pinia', link: '/articles/pinia' },
          ],
        },
        {
          text: 'JS',
          collapsible: true,
          items: [
            { text: 'DOM 操作', link: '/articles/DOM操作' },
            { text: '事件处理', link: '/articles/事件处理' },
          ],
        },
      ],
    },
    // 右侧边栏标题
    outline: 'deep',
    outlineTitle: '章节导航',
    // 上下篇文本提示文字
    docFooter: {
      prev: '< 上一篇',
      next: '下一篇 >',
    },
  },
}
