# 事件处理

它能够响应用户交互和其他浏览器事件。事件处理包括添加事件监听器以及定义事件处理函数

## 事件类型

事件类型是描述发生在网页上的各种操作或交互的名称。JavaScript 通过事件类型来识别何时发生了特定的事件，然后执行相应的事件处理函数。以下是一些常见的事件类型：

### 鼠标事件

- `click`：当鼠标单击元素时触发。
- `mousedown`：当鼠标按下鼠标按钮时触发。
- `mouseup`：当释放鼠标按钮时触发。
- `mousemove`：当鼠标在元素上移动时触发。
- `mouseenter` 和 `mouseleave`：当鼠标进入或离开元素时触发。
- `mouseover` 和 `mouseout`：当鼠标进入或离开元素或其子元素时触发。
- `contextmenu`：按下鼠标右键时触发。
- `wheel`：鼠标滚轮滚动时触发。

### 键盘事件

- `keydown`：当按下键盘上的任何键时触发。
- `keyup`：当释放键盘上的任何键时触发。
- `keypress`：当按下键盘上的字符键时触发（通常用于处理文本输入）。

### 表单事件

- `submit`：当表单提交时触发。
- `reset`：当表单重置时触发。
- `focus` 和 `blur`：当元素获得或失去焦点时触发。
- `change`：当输入字段的值发生变化时触发。
- `input`：当输入字段的值发生变化时触发（类似于 `change` 但更实时）。

### 网页生命周期事件

- `load`：当网页和所有资源加载完成时触发。
- `unload`：当网页被卸载或关闭时触发。
- `DOMContentLoaded`：当 DOM 结构加载完成时触发，不包括样式表、图像和其他资源。

### 拖放事件

HTML5 引入了一套拖拽 API，相比于传统的 `mousedown`、`mouseup` 方式更加强大

若要使用拖拽 API，需要先向元素添加一个 `draggable` 的布尔属性，设置为 `true`，以允许元素进行拖拽

```html
<div draggable></div>
```

#### 拖拽事件

- `dragstart`：拖拽开始时触发，通常在拖动开始时设置拖动数据
- `drag`：拖拽过程中触发
- `dragend`：拖动操作结束时触发，可用于清理和处理拖动操作

#### 拖放事件

拖拽元素到达目标元素后的一系列事件，例如：将 A 元素拖动到 B 位置，进入 B 位置后的一系列事件

- `dragenter`：进入目标时触发。
- `dragover`：在目标上悬停时持续触发，通常需要阻止默认行为以允许放置。
- `dragleave`：离开目标时触发。
- `drop`：在目标上释放时触发，通常用于处理拖放操作（若没有阻止`drapover`默认行为，该事件不会触发）

#### 数据传输

通过`dataTransfer`对象可以在拖动和释放阶段传递数据

```js
element.addEventListener('dragstart', event => {
  event.dataTransfer.setData('text/plain', '拖拽的数据')
})

element.addEventListener('drop', event => {
  const draggedData = event.dataTransfer.getData('text/plain')
  // 处理拖放的数据
})
```

#### 光标样式

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
element.addEventListener('dragstart', event => {
  event.dataTransfer.effectAllowed = 'move'
})
```

**`dropEffect`属性**：

`dropEffect`属性用于指示在拖放目标上释放拖拽元素时的实际操作类型。它可以设置为与`effectAllowed`属性相同的值，但最终效果由用户代理（浏览器）根据拖拽的目标和源元素来确定。

示例用法：

```javascript
element.addEventListener('dragover', event => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
})
```

通常，在`dragover`事件中使用`event.preventDefault()`以允许在拖放目标上释放，并设置`dropEffect`以指示可能的拖放操作。实际效果是否与设置的一致可能会因浏览器和操作系统的不同而有所不同。

这两个属性的使用可以帮助开发者在拖拽操作中提供更好的用户反馈，并在允许的操作范围内控制拖拽行为。请注意，这些属性的兼容性可能因浏览器而异，因此在实际使用中需要进行兼容性测试。

### 其他事件

- `resize`：当浏览器窗口大小改变时触发。
- `scroll`：当元素滚动时触发。

这只是一小部分常见的事件类型。每个事件类型都有相关的事件对象，包含了与事件相关的信息，如触发事件的元素、事件类型、鼠标位置、键盘键码等等。通过事件类型，您可以编写事件处理程序来响应用户的交互和操作。

## 添加事件监听器

### addEventListener

它是一个向 DOM 对象添加事件监听的方法，在特定的事件类型上注册事件处理函数

接收三个参数：

1. **事件类型（event type）**：表示要监听的事件类型，例如 "click"、"mouseover"、"keydown" 等
2. **事件处理函数（event listener）**：一个函数，当事件被触发时将被调用执行
3. **捕获阶段（capture phase）**：是一个可选的布尔值参数，如果为 `true`，则表示事件在捕获阶段触发。默认值为 `false`，表示事件在冒泡阶段触发。

示例：

```js
const btn = document.querySelector('button')

btn.addEventListener('click', function (e) {
  alert('按钮被点击了！')
})
```

**注意事项**

- 可以使用 `addEventListener` 为同一个 DOM 元素添加多个事件监听器
- 使用 `removeEventListener` 方法可以删除已添加的事件监听器
- 当事件触发时，事件对象将被传递给事件处理函数，包含有关事件的详细信息

### on 方式

> `addEventListener` 方法是一种更现代、更强大的事件处理机制，推荐在 JavaScript 中使用它来管理事件

使用 on 加上事件类型可以为 DOM 元素添加事件监听器，示例

```js
const btn = document.querySelector('button')

// 添加事件监听器
btn.onclick = function (e) {
  alert('按钮被点击了')
}

// 移除事件监听器
btn.onclick = null
```

**注意事项**

- 不能为同一个 DOM 元素添加多个事件监听器

## 事件对象

[事件对象（Event Object）](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)是在 DOM 事件处理函数中传递的一个对象，它包含有关事件的详细信息，如事件类型、事件目标元素、鼠标位置等

在事件处理函数中，事件对象通常作为参数传递给函数。以下是事件对象的一些常见属性和方法

**1. `event.type`：** 表示触发的事件类型，例如 "click"、"keydown" 等。

**2. `event.target`：** 表示触发事件的 DOM 元素，即事件的目标元素。

**3. `event.currentTarget`：** 表示当前正在处理事件的 DOM 元素，通常与 `this` 关键字相同。

**4. `event.clientX` 和 `event.clientY`：** 表示鼠标指针相对于浏览器窗口的水平和垂直坐标。

**5. `event.preventDefault()`：** 阻止事件的默认行为，例如阻止表单的提交或链接的跳转。

**6. `event.stopPropagation()`：** 阻止事件的传播，即阻止事件继续冒泡或捕获。

**7. `event.keyCode` 和 `event.key`：** 用于键盘事件，表示按下的键的键码和键名。

示例

```js
const button = document.getElementById('myButton')

button.addEventListener('click', function (event) {
  // 获取事件类型
  console.log('事件类型：' + event.type)

  // 获取事件目标元素
  console.log('事件目标元素：' + event.target.tagName)

  // 获取鼠标位置
  console.log('鼠标位置：' + event.clientX + ', ' + event.clientY)

  // 阻止事件的默认行为
  event.preventDefault()
})
```

## 阻止默认行为

阻止默认行为是指防止事件发生时浏览器自动执行的操作。例如，点击链接时默认情况下会导致浏览器跳转到链接指定的 URL，按下提交按钮时会默认提交表单。可以使用事件对象的 `event.preventDefault()` 方法来阻止默认行为。以下是一些常见的示例：

- 阻止链接的默认跳转行为
- 阻止表单的默认提交行为
- 阻止键盘事件的默认行为
- ...

```js
const form = document.querySelector('form')

form.addEventListener('submit', function (event) {
  event.preventDefault() // 阻止表单提交的默认行为
  // ...
})
```

通过使用 `event.preventDefault()`，您可以更精确地控制事件的行为，以满足您的特定需求，而不受浏览器默认行为的限制。这对于构建交互式和用户友好的 Web 应用程序非常有用。

## 停止事件传播

停止事件传播是指阻止事件在 DOM 树中的进一步传播，包括捕获阶段和冒泡阶段。

### 事件传播

事件传播是指当一个事件在 DOM 中触发时，该事件如何传播到不同的 DOM 元素，以及如何处理这些事件。事件传播分为三个阶段：捕获阶段（Capture Phase）、目标阶段（Target Phase）和冒泡阶段（Bubbling Phase）。这个过程被称为事件传播或事件流。

**捕获阶段（Capture Phase）**：

- 事件从文档的根节点（通常是 `<html>` 元素）开始传播，向下到达触发事件的目标元素的父元素。
- 在捕获阶段，事件经过父元素、祖父元素等，直到到达目标元素。
- 如果在捕获阶段的某个元素上注册了事件处理程序，它会在此阶段执行。

**目标阶段（Target Phase）**：

- 事件达到了触发事件的目标元素。
- 事件在目标元素上触发，会执行与目标元素相关联的事件处理程序。

**冒泡阶段（Bubbling Phase）**：

- 事件从目标元素开始向上冒泡，逐级传播到文档的根节点。
- 在冒泡阶段，事件经过目标元素的父元素、祖父元素等，直到到达文档根节点。
- 如果在冒泡阶段的某个元素上注册了事件处理程序，它会在此阶段执行。

### 阻止冒泡传播

当事件在 DOM 中冒泡传播时，可以通过调用 `event.stopPropagation()` 阻止它继续向上冒泡，从而防止祖先元素上的事件处理程序被触发。

```javascript
dom.addEventListener('click', function (event) {
  event.stopPropagation() // 阻止事件冒泡传播到父元素
})
```

### 在捕获阶段执行

事件传播的默认行为是从捕获阶段开始，然后到达目标阶段，最后进入冒泡阶段。这个默认行为可以通过 `addEventListener()` 方法的第三个参数（`useCapture`）来控制。如果 `useCapture` 为 `true`，则事件将在捕获阶段执行；如果为 `false`（默认值），则事件将在冒泡阶段执行。

```javascript
button.addEventListener('click', function() {
  ···
}, true) // 在捕获阶段触发
```
