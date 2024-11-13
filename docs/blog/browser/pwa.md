# 渐进式 WEB 应用

渐进式 Web 应用（Progressive Web App，PWA）是一个使用 web 平台技术构建的应用程序。

通过一些配置，浏览器会在地址栏右侧生成一个下载按钮，可以将网页应用下载到桌面，让用户感受到桌面应用的体验。

<image src="/assets/pwa.png" />

## web 应用清单

web 应用清单是一个 JSON 文件，要使网页成为一个 PWA 应用，必须引入一个 web 应用清单，而清单至少需要包含以下配置：

- `name`：PWA 应用名称。
- `display`：控制 PWA 的显示模式。
  - `fullscreen`：全屏显示，隐藏系统合浏览器 UI 元素。
  - `standalone`：系统 UI 可见，浏览器 UI 隐藏。
  - `minimal-ui`：使用最少的浏览器 UI 元素，例如前进后退 UI 控件。
  - `browser`：所有浏览器 UI 元素（如地址栏）都可见。
- `start_url`：启动应用时打开的 URL，可包含 query 参数。
- `icons`：用于指定若干应用图标，最小像素为 144 × 144。

示例：

```json
{
  "name": "Your Project Name",
  "display": "fullscreen",
  "start_url": "/",
  "icons": [
    {
      "src": "/logo.png",
      "sizes": "200x200",
      "type": "image/png"
    }
  ]
}
```

## 使用

在页面内引入 web 应用清单即可。

```html {4}
<!DOCTYPE html>
<html lang="zh">
  <head>
    <link rel="manifest" href="manifest.json" />
  </head>
</html>
```
