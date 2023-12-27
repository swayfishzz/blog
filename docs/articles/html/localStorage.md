# localStorage

`localStorage` 是 HTML5 中引入的一个 Web Storage 技术，用于在浏览器中存储键值对的数据。它提供了一种简单的方法，让开发者能够在客户端存储和获取数据，而不需要使用服务器或数据库。

以下是关于 `localStorage` 的一些重要信息：

## 存储数据

使用 `localStorage.setItem(key, value)` 方法来存储数据，其中 `key` 是数据的键，`value` 是对应的值。

```javascript
localStorage.setItem("username", "john");
localStorage.setItem("score", "100");
```

## 获取数据

使用 `localStorage.getItem(key)` 方法可以根据键获取存储的数据。

```javascript
const username = localStorage.getItem("username");
const score = localStorage.getItem("score");
```

## 删除数据

使用 `localStorage.removeItem(key)` 方法可以删除特定键的数据。

```javascript
localStorage.removeItem("score");
```

## 清空所有数据

使用 `localStorage.clear()` 方法可以清空所有存储的数据。

```javascript
localStorage.clear();
```

## 限制和注意事项

- `localStorage` 存储的数据在同一个域名下的不同页面之间是共享的。不同域名或不同协议（如 HTTP 和 HTTPS）之间的页面无法共享存储。

- `localStorage` 存储的数据会一直保留在客户端，直到被清除，因此需要注意不要存储过多的敏感信息。

- `localStorage` 存储的数据是以字符串形式存储的，因此需要手动将复杂的数据结构（如对象或数组）转换为字符串再存储。

- `localStorage` 在大多数现代浏览器中得到支持，但在某些情况下可能会受到浏览器隐私模式或设置的限制。

## sessionStorage

`sessionStorage` 是 HTML5 中的另一种 Web Storage 技术，类似于 `localStorage`，用于在浏览器中存储键值对的数据。不同之处在于，`sessionStorage` 存储的数据在同一个浏览器会话期间是有效的，当会话结束（页签被关闭）时，数据将被清除