# 自定义属性

在 HTML5 中，你可以使用自定义属性（也称为"数据属性"）为 HTML 元素添加额外的自定义信息，这些信息通常不会影响元素的默认行为，但可以在 JavaScript 和 CSS 中使用。自定义属性使用`data-`前缀，后面跟上自定义的属性名。这些属性可以用于存储元素特定的数据或配置，以实现更好的交互和样式控制。

以下是一个自定义属性的示例：

```html
<div data-id="123" data-color="blue" class="container">一个块级元素</div>
```

在这个示例中，`data-id`和`data-color`是自定义属性，分别存储了"id"和"color"的值。这些自定义属性可以通过 JavaScript 或 CSS 进行访问和操作。

## 通过 JavaScript 访问

自定义的属性将储存在元素的 `dataset` 对象上，读取它即可获取自定义属性的值

```javascript
const container = document.querySelector('.container')
const id = container.dataset.id // 获取data-id的值
const color = container.dataset.color // 获取data-color的值

// 设置data-color的值为"red"
container.dataset.color = 'red'
```

## 通过 CSS 访问

通过 CSS 使用自定义属性（CSS 变量）：

```css
.container {
  color: var(--custom-color); /* 使用自定义属性作为CSS变量 */
}
```

## 优点

自定义属性的好处包括：

- **JavaScript 交互**：您可以使用 JavaScript 在元素上存储和获取自定义数据，以实现更复杂的交互功能。
- **CSS 样式控制**：您可以将自定义属性用作 CSS 变量，以动态地控制元素的样式。
- **代码维护**：将元素相关的数据存储在自定义属性中，使得代码更易于理解和维护。

请注意，虽然自定义属性对于在元素上存储数据和配置非常有用，但应该避免过度滥用它们，而是优先考虑使用更适合的方式，例如通过 JavaScript 中的对象或其他数据结构来管理数据。
