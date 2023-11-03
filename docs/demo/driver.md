# Driver.js 页面引导

[Driver.js](https://driverjs.com/) 是一个用于创建交互式引导教程和用户导航的 JavaScript 库。可以为 Web 应用程序或网站创建引导、教程和用户导览，以引导用户浏览和了解您的产品或功能。

### 安装

```bash
npm i driver.js
```

### 导入项目

在项目中导入 `driver.js` 和样式文件

```js
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
```

### 开始使用

点击下面的按钮查看引导式效果

<Driver />

```vue
<template>
  <el-button type="primary" @click="start">查看效果</el-button>
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
```

<script setup>
import Driver from '../components/driver.vue'
</script>
