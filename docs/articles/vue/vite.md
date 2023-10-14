# Vite 基本使用
Vite是一个面向现代前端开发的工具，旨在提供更快的开发体验和更高的性能。

## 使用 Vite 创建项目

打开终端，导航到你想要创建项目的目录，使用以下命令创建一个新的 Vue 项目。

```bash
npm create vite@latest
```

运行后，Vite 将在终端中提供一些可供选择的配置，这些配置按步骤分别为：

1. 项目名称（默认 vite-project）
2. 选择一个框架，如 Vue、React、Svelte 等，根据自己需求进行选择
3. 选择一个开发方式，如 TypeScript、JavaScript、Nuxt 等，根据自己需求进行选择

然后 Vite 会创建项目文件结构，创建完成后，使用以下命令启动开发服务器

```bash
cd vite-project # 将终端导航到你的项目中
npm i # 构建依赖项
npm run dev # 启动开发服务器
```

## 环境变量

环境变量通常用于配置不同环境下的应用程序行为，例如开发、生产或测试环境。

### 内置环境变量

使用 `import.meta.env` 对象，可以访问内置环境变量，常用内置环境变量有：

- `import.meta.env.MODE`：当前的构建模式（如 `'development'`、`'production'`）
- `import.meta.env.BASE_URL`：应用部署时的基本 URL，它由 `vite.config.js` 中的 [`base` 配置项](https://cn.vitejs.dev/config/shared-options.html#base)决定
- `import.meta.env.PROD`：布尔值，表示应用是否运行在生产环境中
- `import.meta.env.DEV`：布尔值，表示应用是否运行在开发环境中

在代码中，可以这样使用：

```js
// any
console.log(import.meta.env.MODE) // 打印当前模式
console.log(import.meta.env.DEV) // 检查是否为开发环境
```

### 自定义环境变量

也可以在项目的根目录中创建一个名为 `.env` 的文件，然后在该文件中定义自定义的环境变量。这些自定义环境变量需要以 `VITE_` 开头，并且可以在代码中通过 `import.meta.env` 访问

例如，在 `.env` 文件中自定义一个环境变量，并在代码中访问它

```js
// .env 中进行定义
VITE_APP_BASE_URL = 'http://domain.com'

// 其它文件中访问
console.log(import.meta.env.VITE_APP_BASE_URL)
```

### env 文件类型

还可以为不同的模式创建 env 文件

```bash
.env 										# 所有情况下都会加载
.env.local 							# 所有情况下都会加载，但会被 git 忽略
.env.development 				# 只在开发模式下加载
.env.production 				# 只在生产模式下加载
.env.production.local 	# 只在生产模式下加载，并被 git 忽略
```

例如，根据环境不同，访问对应的环境变量：

```js
// .env.development
VITE_BASE_URL = 'http://localhost'

// .env.production
VITE_BASE_URL = 'http://domain.com'

// any
console.log(import.meta.env.VITE_BASE_URL) // 根据不同模式输出不同的值
```

## Vite 常用配置

### 开发服务器

可以通过 `vite.config.js` 中的 [`server`](https://cn.vitejs.dev/config/server-options.html) 选项来配置开发阶段的服务器代理

```js
export default {
  server: {
    port: 8080, // 指定开发服务器的端口号，默认为 3000
    open: false, // 是否在启动时自动打开浏览器
    proxy: {
      // 配置跨域代理
      '/api': 'https://www.domain.com', // 要进行代理的域名
      '/api2': {
        target: 'https://www.test.com', // 要进行代理的域名
        changeOrigin: true, // 修改请求头中的 host 和 origin
      },
    },
  },
}
```

### 映射目录别名

配置目录别名非常方便，可以帮助你更轻松地引用项目中的模块或文件，同时提高代码的可维护性。

在项目根目录中的 `vite.config.js` 中添加配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 导入node路径模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置路径别名
    },
  },
})
```

### 注入全局 Sass 文件

Vite 支持多种 CSS 预处理器，你可以通过 `css.preprocessorOptions` 配置选项来启用和配置它们。下面是一个全局注入 sass 文件的示例

```js
export default {
  css: {
    preprocessorOptions: {
      // 配置 scss，也可以是 less、stylus
      scss: {
        // 添加全局的 Sass 变量、混入等
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
}
```

### 自定义 Rollup 配置

通过 `build.rollupOptions` 配置选项可以自定义 Rollup 打包过程中的一些配置，如代码拆分、压缩等。

```js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash'],
        },
      },
    },
  },
}
```
