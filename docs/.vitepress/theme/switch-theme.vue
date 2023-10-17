<!-- VitePress 主题变化时，ELementPlus 跟随变化 -->
<script setup>
import { onMounted } from 'vue'
import { useDark, useToggle, useEventListener } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

onMounted(() => {
  // VitePress 切换主题按钮
  const btn = document.querySelector('.VPNav button.appearance')
  // 切换 ELementPlus 主题
  btn.useEventListener('click', toggleDark)
})
</script>
