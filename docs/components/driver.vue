<template>
  <div class="code-view flex-center">
    <el-button type="primary" @click="start">查看效果</el-button>
  </div>
</template>

<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const driverObj = driver({
  showProgress: true, // 显示步骤
  nextBtnText: '下一步',
  prevBtnText: '上一步',
  doneBtnText: '结束',
  // {{count}}：当前所处步骤，{{total}}：总步骤数
  progressText: '{{current}}/{{total}}',
  steps: [
    { element: '.title', popover: { title: '网站标题', description: '这是网站的标题部分' } },
    { element: '.VPDocAside', popover: { title: '目录', description: '这是本篇文章的目录' } },
    { element: '#driver-js-页面引导', popover: { title: '文章标题', description: '这是此片文章的标题' } },
  ],
})

const start = () => driverObj.drive()
</script>
