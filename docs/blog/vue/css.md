# CSS 功能

## 组件作用域 CSS

给 `<style>` 标签添加 `scoped` 属性即可开启作用域，即该标签下的 css 代码仅对当前组件生效

```vue
<style scoped>
/* 仅当前组件生效的 css 代码 */
</style>
```

## 深度选择器

如果某个样式想要进行深度选择（即影响到子组件中的同名样式），可以使用 `:deep()` 伪类：

```css
.container :deep(.item) {
  /* 包括后代组件中 container 类名下的 item 类名样式都将被应用 */
}
```

深度选择器通常对修改 UI 库的样式比较有效

## CSS Modules

在 `<style>` 标签上添加 `module` 属性即可开启 CSS Modules

- 在模板中可以通过 `$style` 获取 CSS Modules 的类名对象
- 在脚本中可以通过 `useCssModule` 函数获取 CSS Modules 的类名对象

```vue
<template>
  <!-- 通过 $style 访问 CSS Modules 的类名 -->
  <div :class="$style.red">Here are some red text</div>
</template>

<script setup>
import { useCssModule } from 'vue'

const css = useCssModule()
console.log(css.red) // 获取类名对象的 red 类名
</script>

<style module>
.red {
  color: red;
}
</style>
```

还可以为 modules 指定名称：

```vue
<template>
  <!-- 通过 $style 访问 CSS Modules 的类名 -->
  <div :class="myStyle.red">Here are some red text</div>
</template>

<script setup>
import { useCssModule } from 'vue'

const css = useCssModule('myStyle')
console.log(css.red) // 获取类名对象的 red 类名
</script>

<style module="myStyle">
.red {
  color: red;
}
</style>
```

## CSS 中的 v-bind()

在 css 中使用 `v-bind()` 给样式绑定一个脚本中的值，例如：

```vue
<script setup>
import { ref, reactive } from 'vue'

const size = ref(500) // 定义尺寸
const theme = reactive({ bg: '#333' }) // 定义主题
</script>

<style scoped>
.container {
  width: v-bind(size); /* 普通类型 */
  background-color: v-bind('theme.bg'); /* 表达式类型 */
}
</script>
```

使用 `v-bind()` 绑定 JS 表达式时，需要使用引号包裹：

```vue
<script setup>
const width = 100
</script>

<style scoped>
.box {
  width: v-bind('width + "px"');
  height: v-bind('(width / 2) + "px"');
}
</style>
```
