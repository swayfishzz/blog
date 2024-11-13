# 常用库

## lodash-es

[lodash-es](https://www.npmjs.com/package/lodash-es) 是 lodash 的 ESM 版本，支持了构建工具的 [tree shaking](https://webpack.docschina.org/guides/tree-shaking/) 功能。

常用函数：

- `throttle`：节流。
- `debounce`：防抖。
- `once`：创建一个只执行一次的函数。
- `pick`：从对象挑选中挑选若干属性。
- `groupBy`：分组。
- `get`：安全获取一个对象的属性，例如：`get(obj, 'a.b[0].c')`。

## radash

lodash 对于现代 web 开发已经稍显老旧，很多函数随着 ES 版本不断更新已经不再被需要，对于新版 ES 的功能也没有更好的支持。

[radash](https://www.radash.wiki/) 是一个零依赖、模块化、高性能的 JS/TS 实用工具库，去除了 lodash 中已经过时的函数，新增了很多呼声较高的实用函数，对现代 web 开发更友好。

常用函数：

- `throttle`：节流。
- `debounce`：防抖。
- `pick`：从对象挑选中挑选若干属性。
- `get`：安全获取一个对象的属性，例如：`get(obj, 'a.b[0].c')`。
- `tryit`：将函数转为错误优先的函数。
  ```js
  import { tryit } from 'radash'
  const [err, data] = await tryit(axios.get)('/users')
  ```
- `retry`：对异步函数添加重试功能。
  ```js
  import { retry } from 'radash'
  // getServerData 请求失败，自动重试，最大重试次数为 5
  await retry({ times: 5 }, getServerData)
  ```
- `guard`：若异步函数出错，返回 undefined。
  ```js
  import { tryit } from 'radash'
  const data = (await guard(getServerData)) ?? []
  ```

## xijs

[xijs](https://www.npmjs.com/package/xijs) 是一个偏向处理业务的工具库。

常用函数：

- `transformTree`：数组转树。
- `transformArray`：树转数组。
- `hex2rgba`：HEX 颜色转 rgb 格式。
- `url2obj`：url 的 query 参数转为对象。
- `regexp`： 常用正则表达式。
  ```js
  import { regexp } from 'xijs'

  regexp('phoneRegexp', '13322223333') // 验证手机号
  regexp('emailRegexp', 'foo@bar.com') // 验证邮箱
  regexp('idRegexp', '12343414314134') // 验证身份证号
  // ···
  ```
