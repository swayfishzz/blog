# CSS 工程化

CSS 工程化是在项目中使用一系列的规范、工具和最佳实践来提高 CSS 代码的可维护性、可拓展性和可读性。常见的 CSS 工程化问题：

- 命名冲突
- 样式复用
- 兼容性

## 命名冲突

CSS 是全局的，容易造成样式冲突和全局污染。解决命名冲突的方案有：

- 命名约定：BEM、OOCSS、AMCSS。
- CSS-in-JS：使用 JS 描述样式。
- CSS Modules：CSS 的模块化解决方案

### BEM

[BEM（Block Element Modifier）](https://getbem.com/)是一种命名约定，用于更好地组织和管理 CSS 代码，尤其适用于大型项目。BEM 的核心思想是将每个样式都作为一个块（Block）、元素（Element）或修改器（Modifier）来命名，以建立清晰的层次结构和可维护性。

BEM 的基本概念和命名规则：

- Block：页面中的大区域，表示最顶级的划分，例如：轮播图（banner）、布局（layout）、文章（article）等
- Element：区域中的组成部分，例如：轮播图中的图片（banner-img）、轮播图的容器（banner-container）、布局中的头部（layout-header）等
- Modifier：可选，通常表示状态，例如：展开状态的侧边栏（layout-left\_\_expend）、选中状态的轮播图指示器（banner-dot\_\_selected）等

示例：

```html
<div class="carousel">
  <!-- 轮播图图片 -->
  <img class="carousel-img carousel-img__active" />
  <img class="carousel-img" />
  <!-- 轮播图指示器 -->
  <span class="carousel-dot carousel-dot__active"></span>
  <span class="carousel-dot"></span>
</div>
```

### CSS-in-JS

CSS-in-JS 是一种思想，使用 JS 来描述元素样式，旨在解决传统 CSS 的全局作用域、命名冲突等问题。常见的 CSS-in-JS 库：

- [Styled Components](https://www.styled-components.com)
- [JSS](https://cssinjs.org)
- [Emotion](https://emotion.sh)

示例：为 dom 元素添加样式的方法

```js
/**
 * 为元素添加样式
 * @param {HTMLElement} dom
 * @param {CSSStyleDeclaration} style
 */
function useStyle(dom, style) {
  for (const key in style) {
    dom.style[key] = style[key]
  }
}

useStyle(button, {
  borderRadius: '5px',
  border: 'none',
  background: 'skyblue'
})
```

### CSS Modules

[CSS Modules](https://github.com/css-modules/css-modules) 可以解决全局作用域、命名冲突等问题。

要使用 CSS Modules，需要确保项目中的构建工具（如 Webpack、Vite 等）对其进行支持。详情见：

- [在 Webpack 中使用](https://webpack.docschina.org/loaders/css-loader/#modules)
- [在 Vite 中使用](https://cn.vitejs.dev/guide/features.html#css-modules)

**命名规范**

以 `.module.css` 或 `.module.scss` 结尾，表示该文件使用了 CSS Modules

**定义样式**

在 CSS Modules 文件中，定义的类名会被编译为哈希字符串，依此保证类名的唯一性

```css
/* styles.module.css */
.button {
  border: none;
  border-radius: 4px;
  background: skyblue;
}
```

**使用**

示例为一个 React 的组件

```jsx
import styles from './styles.module.css'

const Button = () => <button className={styles.button}>Click me</button>

export default Button
```

## 样式复用

解决样式复用的方案有：

- 预处理器：Sass、Less、Stylus
- CSS 框架：Tailwind CSS

### Sass

[Sass（Syntactically Awesome Stylesheets）](https://sass-lang.com/)是一种 CSS 预处理器，它在 CSS 的基础上添加了一些功能和语法糖，以提供更强大、更灵活的样式表语言。

Sass 有两种语法格式：原始的缩进式语法（也称为 Sass）和 SCSS（Sassy CSS），它是 CSS3 的超集，使用大括号和分号，更接近传统的 CSS 语法。

在使用 Sass 之前，需要通过编译将 Sass 文件转换为普通的 CSS 文件，这一步骤可以通过构建工具（如 Webpack、Vite 等）中的相应插件来完成。

- [在 Webpack 中使用](https://webpack.docschina.org/loaders/sass-loader)
- [在 Vite 中使用](https://cn.vitejs.dev/guide/features.html#css-pre-processors)

**变量：** Sass 允许你使用变量来存储和重复使用值。

```scss
$primary-color: #008080;
body {
  background-color: $primary-color;
}
```

**嵌套规则：** Sass 支持将规则嵌套在其他规则内，提高了样式表的可读性。

```scss
nav {
  background-color: $primary-color;
  ul {
    list-style: none;
    li {
      display: inline-block;
    }
  }
}
```

**混合（Mixins）：** 混合是一种将一组样式规则引入到另一个规则中的方式。

```scss
@mixin border-radius($radius) {
  border-radius: $radius;
}

button {
  @include border-radius(5px);
}
```

**继承：** Sass 允许一个选择器继承另一个选择器的样式。

```scss
.error {
  border: 1px solid #ff0000;
  color: #ff0000;
}

.error-message {
  @extend .error;
  font-weight: bold;
}
```

**运算：** Sass 支持数学运算，可以在样式表中执行简单的计算。

```scss
$width: 100%;
.container {
  width: $width / 2;
}
```

**导入：** 可以使用`@use`指令将多个 Sass 文件合并到一个文件中，并可使用其中的变量或混入。

> Sass 团队不推荐继续使用 @import 规则。Sass 将在未来几年内逐步淘汰它。（[点这里查看详情](https://sass-lang.com/documentation/at-rules/import/)）

```scss
@use 'colors';

.btn {
  color: use.$primary;
}
```

**条件语句：** Sass 支持使用`@if`、`@else if`和`@else`来实现条件语句。

```scss
$theme: light;
body {
  @if $theme == light {
    background-color: #ffffff;
  } @else {
    background-color: #333333;
    color: #ffffff;
  }
}
```

### Tailwind CSS

[Tailwind CSS](https://www.tailwindcss.cn/) 是一种基于原子类的 CSS 框架，它提供了一系列的原子类，使开发者可以直接在 HTML 中应用这些类，而无需编写自定义的 CSS 样式。

使用 Tailwind CSS 通常需要通过构建工具（如 Webpack、Vite）将其编译成最终的 CSS 文件。常见做法是：在构建工具中使用 PostCSS，并将 Tailwind CSS 作为 PostCSS 的插件集成。

- [在 Webpack 中使用](https://gist.github.com/bradtraversy/1c93938c1fe4f10d1e5b0532ae22e16a)
- [在 Vite 中使用](https://www.tailwindcss.cn/docs/guides/vite)

**原子类：** Tailwind CSS 提供了大量的原子类，每个类都对应一个具体的 CSS 样式。这些类包括颜色、字体大小、边距、填充等，以及更复杂的布局和响应式类。

```html
<div class="bg-blue-500 text-white p-4">一个蓝色的容器</div>
```

**配置文件：** Tailwind CSS 提供一个配置文件，允许开发者根据项目需求自定义颜色、字体、间距、阴影等样式属性。这样可以很容易地根据设计系统的要求进行定制。

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: { customBlue: '#3490dc' }
    }
  }
}
```

**响应式设计：** Tailwind CSS 提供了方便的响应式类，允许在不同屏幕尺寸上应用不同的样式。

```html
<div class="text-center lg:text-left">这段文字将在小屏幕上居中，大屏幕上左对齐</div>
```

**插件系统：** Tailwind CSS 可以通过插件进行扩展，以添加新的功能或样式。例如，可以使用插件来支持自定义字体或添加更多的背景效果。

```js
// tailwind.config.js
module.exports = {
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
```

一开始可能需要适应原子类的使用方式，但一旦熟悉，Tailwind CSS 可以极大地提高开发速度和样式的一致性。Tailwind CSS 为 VS Code 提供了扩展 `Tailwind CSS IntelliSense`

## 兼容性

处理 CSS 浏览器兼容性是前端开发中的一项重要任务，因为不同浏览器对 CSS 标准的支持存在差异。

### 添加浏览器前缀

[Autoprefixer](https://github.com/postcss/autoprefixer) 是一个 [PostCSS](https://www.postcss.com.cn/) 插件，可以自动为 CSS 添加浏览器前缀，以确保在不同浏览器中具有一致的表现。

> [PostCSS 插件列表](https://github.com/postcss/postcss/blob/main/docs/README-cn.md)

示例：

```css
/* 源代码 */
.example {
  display: flex;
}

/* 经 Autoprefixer 转换后 */
.example {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```

在项目中使用

```js
// postcss.config.js
module.exports = {
  plugins: [require('autoprefixer')]
}
```

### 消除浏览器差异

使用 [Normalize.css](https://github.com/necolas/normalize.css) 来确保不同浏览器在默认样式上有一致性。这有助于消除不同浏览器之间的一些差异。

```bash
npm i normalize.css
```

在项目的入口文件中引入

```js
// main.js
import 'normalize.css'
```
