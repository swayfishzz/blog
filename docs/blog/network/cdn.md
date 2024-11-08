# CDN

CDN (Content Delivery Network) 是一种分布式网络服务，旨在有效地分发网络内容给最终用户。

它通过将资源存储在位于全球各地的服务器上，并根据用户的位置、网络状况和请求内容等因素，将内容提供给用户，从而提高内容的加载速度、可用性和安全性。

CDN 推荐：

- [jsDelivr](https://www.jsdelivr.com/)
- [unpkg](https://www.unpkg.com/)
- [cdnjs](https://cdnjs.com/)
- [BootCDN](https://www.bootcdn.cn)

## 页面中使用

在学习一些库的时候，经常会使用 CDN 来引入它的资源，例如：jquery、axios 等。引入之后，这些库一般会暴露一个全局变量，例如 jquery 对应 $。

```html
<body>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.8/dist/axios.min.js"></script>
  <script>
    console.log($, axios)
  </script>
</body>
```

## 构建工具中使用

在实际开发中，可以通过使用 CDN 加载第三方库的方式来减小打包后的项目体积。

### Vite

首先需要在页面中引入对应的 CDN 资源，例如 jQuery。

```html {4}
<!-- /index.html -->
<body>
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
  <script type="module" src="/src/main.js"></script>
</body>
```

安装 rollup 的插件，用于告诉 rollup 指定的依赖对应的全局变量。

```bash
npm i rollup-plugin-external-globals -D
```

配置 vite.config.js

```js {9,12}
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ExternalGlobals from 'rollup-plugin-external-globals'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['jquery'], // 无需打包的库
      plugins: [
        ExternalGlobals({
          jquery: '$', // 告诉 rollup， jquery 模块的全局变量为 $
        }),
      ],
    },
  },
})
```

### Webpack

通过 CDN 引入无需打包的库。

```html {5}
<!-- /public/index.html -->
<body>
  <div id="app"></div>
  <!-- built files will be auto injected -->
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
</body>
```

配置 webpack.config.js

```js {4}
module.exports = {
  //...
  externals: {
    jquery: '$',
  },
}
```
