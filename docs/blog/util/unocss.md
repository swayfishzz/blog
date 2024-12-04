# UnoCSS

[UnoCSS](https://unocss-cn.pages.dev/) 是一个按需引入的原子化 CSS 引擎，和 TailWindCSS 类似，它通过预设提供原子化 CSS。

## 安装

安装 unocss

```bash
pnpm add unocss -D
```

在 vite.config.js 中配置：

```js
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UnoCSS()],
})
```

项目根目录中创建 `uno.config.js` 文件

```js
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
})
```

在入口文件引入：

```js
import 'virtual:uno.css'
```

## 功能

原子化 css 的使用本文不再演示，下面介绍其功能。

- 快捷方式：将多个原子化 css 组成一个简写。
- 主题：自定义你的个性化主题颜色。
- 自定义规则：添加自定义的原子化样式。
- 指令转换器：在 css 代码中使用原子化样式。

```js
import presetUno from '@unocss/preset-uno'
import { defineConfig, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetUno()],

  // 配置后在 css 中可以通过 @apply 等指令使用原子化类名
  transformers: [transformerDirectives()],

  // 自定义快捷类名
  shortcuts: [{ 'flex-center': 'flex items-center justify-center' }],

  theme: {
    // 自定义颜色
    colors: { brand: '#00f' },
  },
})
```

使用：

```vue
<template>
  <!-- 使用定义的快捷类名和主题颜色 -->
  <div class="box flex-center bg-brand"></div>
</template>

<style scoped>
.box {
  /* 通过 @apply 指令使用原子化类名 */
  @apply w-10 h-10 rounded color-white;
}
</style>
```

## 结合编辑器

推荐使用 VS Code 编辑器，配合 UnoCSS 插件，插件作用：

- 提示原子化类名
- 鼠标悬浮显示原子化类名的样式
