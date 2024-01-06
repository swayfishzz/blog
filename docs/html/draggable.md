# 拖拽 API

HTML5 引入了一套拖拽 API，相比于传统的 `mousedown`、`mouseup` 方式更加强大

若要使用拖拽 API，需要先向元素添加一个 `draggable` 的布尔属性，设置为 `true`，以允许元素进行拖拽

```html
<div draggable></div>
```

## 拖拽事件

- `dragstart`：拖拽开始时触发，通常在拖动开始时设置拖动数据
- `drag`：拖拽过程中触发
- `dragend`：拖动操作结束时触发，可用于清理和处理拖动操作

## 拖放事件

拖拽元素到达目标元素后的一系列事件，例如：将 A 元素拖动到 B 位置，进入 B 位置后的一系列事件

- `dragenter`：进入目标时触发。
- `dragover`：在目标上悬停时持续触发，通常需要阻止默认行为以允许放置。
- `dragleave`：离开目标时触发。
- `drop`：在目标上释放时触发，通常用于处理拖放操作（若没有阻止`drapover`默认行为，该事件不会触发）

## 数据传输

通过`dataTransfer`对象可以在拖动和释放阶段传递数据

```js
element.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', '拖拽的数据')
})

element.addEventListener('drop', (event) => {
  const draggedData = event.dataTransfer.getData('text/plain')
  // 处理拖放的数据
})
```

## 光标样式

在 HTML5 的拖拽 API 中，`DataTransfer`对象的`effectAllowed`属性和`dropEffect`属性用于控制和指示拖拽操作的可用效果和实际效果。它们通常在拖拽事件处理程序中使用。

**`effectAllowed`属性**：须在 `dropstart` 时添加

`effectAllowed`属性用于指定源元素可执行的拖拽操作类型。它可以设置为以下值之一：

- `'none'`: 不允许拖拽操作。
- `'copy'`: 允许复制操作。
- `'move'`: 允许移动操作。
- `'link'`: 允许创建链接操作。
- `'copyLink'`: 允许复制链接操作。
- `'copyMove'`: 允许复制和移动操作。
- `'linkMove'`: 允许链接和移动操作。
- `'all'`: 允许所有类型的操作。

示例用法：

```javascript
element.addEventListener('dragstart', (event) => {
  event.dataTransfer.effectAllowed = 'move'
})
```

**`dropEffect`属性**：

`dropEffect`属性用于指示在拖放目标上释放拖拽元素时的实际操作类型。它可以设置为与`effectAllowed`属性相同的值，但最终效果由用户代理（浏览器）根据拖拽的目标和源元素来确定。

示例用法：

```javascript
element.addEventListener('dragover', (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
})
```

通常，在`dragover`事件中使用`event.preventDefault()`以允许在拖放目标上释放，并设置`dropEffect`以指示可能的拖放操作。实际效果是否与设置的一致可能会因浏览器和操作系统的不同而有所不同。

这两个属性的使用可以帮助开发者在拖拽操作中提供更好的用户反馈，并在允许的操作范围内控制拖拽行为。请注意，这些属性的兼容性可能因浏览器而异，因此在实际使用中需要进行兼容性测试。
