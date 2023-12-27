import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import switchTheme from './switch-theme.vue'
import './index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, { locale: zhCn })
    for (const [key, component] of Object.entries(ElementPlusIcons)) {
      app.component(key, component)
    }
    app.use(ContextMenu)
    app.component(switchTheme)
  },
}
