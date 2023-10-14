# 自动引入依赖

在使用 vue3 进行开发时，大部分情况下我们都需要引入 `ref`、`reactive`、`onMounted` 等函数，开发中页面又非常的多，非常容易造成体力负担 🥲。

可以通过 `unplugin-auto-import` 库自动引入 vue 相关的依赖，无需每次使用时都要手动引入

### 安装

使用 npm 进行安装

```bash
npm i unplugin-auto-import -D
```

### 配置

在 `vite.config.js` 中添加配置，将 `vue` 和 `vue-router` 都进行添加：

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({ imports: ['vue', 'vue-router']
  })],
})
```

### 在页面中使用

添加完成后，在 vue 中使用就可以不用导入了，例如：

```vue
<script setup>
const value = ref(0)
const user = reactive([])
onMounted(() => {
  /* ... */
})
const route = useRoute()
</script>
```
