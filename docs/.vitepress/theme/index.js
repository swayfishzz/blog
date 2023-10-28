import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import switchTheme from './switch-theme.vue'
import './index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, { locale: zhCn })
    app.component(switchTheme)
  },
}
