import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'
import { manualUpdate } from '../utils/statistics'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    watch(ctx.router.route, manualUpdate)
  },
}
