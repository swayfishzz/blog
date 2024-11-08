# Iconify

[Iconify](https://iconify.design/) 是一个项目的图标解决方案，包含所有流行的图标集，拥有超 20 多万的图标，支持按需引入。

---

本文记录在 vite 中如何使用 Iconify。

安装需要的依赖：

```bash
pnpm add unplugin-auto-import unplugin-icons unplugin-vue-components
```

## 自动导入

### 配置

在 vite.config.js 中添加如下配置：

```js
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [
        // 自动引入 mdi 图标组件，无需手动 import（js, ts 文件中）
        IconsResolver({ prefix: false, enabledCollections: ['mdi'] }),
      ],
    }),

    Components({
      resolvers: [
        // 自动引入 mdi 图标组件，无需手动 import（.vue文件中）
        IconsResolver({ prefix: false, enabledCollections: ['mdi'] }),
      ],
    }),

    // 自动安装用到的图标集
    Icons({ autoInstall: true }),
  ],
})
```

### 使用

按照上面进行配置，即可在项目中使用 Iconify 所有图标，无需手动引入：

名称规则为：`<图标集id 图标名称 />`

```vue
<template>
  <MdiAccount />
  <MdiSettings />
</template>
```

若图标为动态使用，还是需要手动引入，例如：

```vue
<template>
  <component :is="MdiAccount" />
</template>

<script setup>
import MdiAccount from '~icons/mdi/account'
<script>
```

### 更改尺寸

可以在导入时添加参数来修改图标尺寸，例如：

```js
import MidAccount from '~icons/mdi/account?width=2em&height=2em'
```

### 解决 ts 报错

若在项目中使用了 ts，会报识别不到 `~icons···` 路径的错误，可以通过添加全局声明解决。

例如，在 `global.d.ts` 中添加如下声明：

```ts
declare module '~icons' {
  import type { DefineComponent } from 'vue'
  const def: Record<string, DefineComponent>
  export default def
}

declare module '~icons/*' {
  import type { DefineComponent } from 'vue'
  const def: DefineComponent
  export default def
}
```

## 自定义 svg 图标

需要在项目中新建一个目录，用于存放 svg 文件的图标，例如：src/assets/icons，然后添加如下配置：

```js
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  plugins: [
    Icons({
      autoInstall: true,
      // 配置本地 svg 图标
      customCollections: {
        svg: FileSystemIconLoader('./src/assets/icons', svg => {
          // 为 svg 图标设置默认尺寸和对齐方式
          return svg.replace(/^<svg /, '<svg width="1.2em" height="1.2em" style="vertical-align: middle" ')
        }),
      },
    }),
  ],
})
```

现在即可在项目中使用自定义的 svg 图标。

例如，本地有以下文件：src/assets/icons/github.svg

```vue
<template>
  <!-- 使用图标 -->
  <IconGithub />

  <!-- 更改尺寸 -->
  <IconGithub width="2em" height="2em" />
</template>

<script setup>
import IconGithub from '~icons/svg/github'
<script>
```
