# AOS

[AOS](https://github.com/michalsnik/aos) 是一个为元素添加页面滚动动画的库，在元素进入视窗时触发动画，简单灵活易配置。

## 开始

### CDN

```html
<!-- 在 head 标签中 -->
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

<!-- 在 body 标签中 -->
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
  AOS.init()
</script>
```

### npm

```bash
npm i aos@next
```

在项目中引入：

```js
import AOS from 'aos'
import 'aos/dist/aos.css'

// ...

AOS.init()
```

## 示例

通过 `data-aos` 为元素添加属性，AOS 会根据该值处理动画、时长、偏移量等。

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
</head>

<body>
  <div data-aos="fade-up"></div>
  <div data-aos="fade-up"></div>
  <div data-aos="fade-up"></div>
  <div data-aos="fade-up"></div>
  <div data-aos="fade-up"></div>

  <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
  <script>
    AOS.init()
  </script>
</body>
```

示例效果

<img src="/md/aos-example.gif" alt="aos-example" style="zoom: 50%" />

更多示例效果见：https://michalsnik.github.io/aos

## 配置项

### init 配置项

```js
AOS.init()

AOS.init({
  // 全局配置
  disable: false, // 是否开启动画，可选值：'phone', 'tablet', 'mobile'，布尔值，表达式或函数
  startEvent: 'DOMContentLoaded', // AOS 初始化时机
  initClassName: 'aos-init', // 初始化后使用的类名
  animatedClassName: 'aos-animate', // 动画类名
  useClassNames: false, // 如果为true，将在滚动时添加`data-aos`的内容作为类
  disableMutationObserver: false, // 禁用 MutationObserver 检测
  debounceDelay: 50, // 防抖时长
  throttleDelay: 99, // 节流时长

  // 以下属性可以通过在元素上设置 `data-aos-*` 覆盖
  offset: 120, // 距离原点的偏移量 (px)
  delay: 0, // 动画延迟触发时长，取值为 0 - 3000，步长 50ms
  duration: 400, // 动画持续时长，取值为 0 - 3000，步长 50ms
  easing: 'ease', // 默认动画缓动函数
  once: false, // 只触发一次
  mirror: false, // 向上滚动时，是否使用动画
  anchorPlacement: 'top-bottom' // 定义动画在元素自身哪个位置触发
})
```

### data-aos- 配置项

```html
<div
  data-aos="fade-up"
  data-aos-offset="200"
  data-aos-delay="50"
  data-aos-duration="1000"
  data-aos-easing="ease-in-out"
  data-aos-mirror="true"
  data-aos-once="false"
  data-aos-anchor-placement="top-center"
></div>
```
