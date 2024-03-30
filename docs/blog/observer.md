# Observer

HTML5 提供了一些 Observer API，用于观察（或监视）特定的 DOM 元素、属性或者文档本身的变化。

## MutationObserver

MutationObserver 接口提供了监视对 DOM 树的更改。它可以观察到节点的增加、删除、属性的改变、文本内容的改变等。使用 MutationObserver 可以实现对 DOM 变化的监听。

## IntersectionObserver

IntersectionObserver 接口用于异步监视目标元素与祖先元素或顶级文档视窗(viewport)的交集变化。它可以用于实现懒加载（lazy loading）等功能，以提高性能。

### 图片懒加载

```html
<body>
  <!-- default.jpg 为默认显示的图片，data-src 为图片真实路径 -->
  <img src="./img/default.jpg" data-src="./img/1.jpg" />
  <img src="./img/default.jpg" data-src="./img/2.jpg" />
  <img src="./img/default.jpg" data-src="./img/3.jpg" />
  <img src="./img/default.jpg" data-src="./img/4.jpg" />

  <script>
    // 创建观察器
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        // 元素进入视口
        if (e.isIntersecting) {
          // 将 img 的 src 替换为真实的路径
          e.target.src = e.target.dataset.src
        }
      })
    })

    // 监听所有图片
    document.querySelectorAll('img').forEach(el => {
      observer.observe(el)
    })
  </script>
</body>
```

### 触底加载更多

::: code-group
```html [html]
<ul>
  <li>列表项</li>
  <li>列表项</li>
  <li>列表项</li>
  <li>列表项</li>
  <li>列表项</li>
  <li>列表项</li>
  <li>列表项</li>
  <li>列表项</li>
  <li>列表项</li>
  <li>列表项</li>
  <li>列表项</li>
</ul>
<footer>底部</footer>
```

```js [JavaScript]
// 列表数据
const list = document.querySelector('ul')
// 底部元素，滚动到这里时加载更多
const footer = document.querySelector('footer')

// 创建观察器
const observer = new IntersectionObserver(entries => {
  entries.forEach(el => {
    // 元素进入视口
    if (el.isIntersecting) {
      // 加载更多数据
      loadMore()
    }
  })
})

// 监听元素
observer.observe(footer)

async function loadMore() {
  const data = await fetch('http://example.com/list').then(res => res.json())
  for (const item of data) {
    list.innerHTML += `<li>${item}</li>`
  }
}
```
:::

## ResizeObserver

ResizeObserver 接口用于监视元素的大小变化。当元素的大小发生变化时，会触发回调函数。

```html
<body>
  <div style="width: 100%; height: 200px; background: #ccc"></div>

  <script>
    // 创建观察器
    const observer = new ResizeObserver(() => {
      // 尺寸变化后做的事
      console.log(div.clientWidth)
    })

    // 监听元素
    const div = document.querySelector('div')
    observer.observe(div)

    // 移除监听器
    window.addEventListener('unload', () => {
      observer.unobserve(div)
    })
  </script>
</body>
```
