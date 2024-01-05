# npm 包管理器

## 包的概念

"包"（Package）通常指的是一个由相关的代码和资源封装成的一个可独立使用的单元，旨在促进代码的模块化和重用。不同的编程语言中，使用不同的工具来管理包。例如，Node.js 使用 npm，Python 使用 pip，Java 使用 Maven。

npm（Node Package Manager）通常与 Node.js 一起安装，因为它是 Node.js 的默认包管理工具。

## npm 配置

npm 具有许多配置选项，可用于自定义 npm 的行为和设置。

### 查看 npm 配置

```bash
npm config list # 查看用户修改的配置
npm config list -l # 查看 npm 所有配置
npm config list -l --json # 以 json 形式查看所有配置
```

若要获取和设置全局配置，可以使用以下命令

```bash
npm config get key # 获取一个全局配置
npm config set key value # 更改一个全局配置
```

### 修改 npm 下载源

npm 的下载源位于国外，下载速度慢，有时会因此下载失败。我们可以将下载地址切换到阿里的 npmmirror 镜像站

```bash
npm config set registry http://registry.npmmirror.com
```

## package.json

package.json 是一个用于描述 Node.js 项目的元数据和依赖关系的配置文件。它通常位于项目的根目录中，是 Node.js 项目和 npm 包管理的核心文件之一。

### 定义运行脚本

`package.json` 中的 `scripts` 选项用于定义项目中的自定义脚本。例如启动应用程序、运行测试、构建项目、部署应用程序等。

其中键是脚本的名称，值是要运行在终端中的 Shell 命令。

```json
"scripts": {
  "start": "nodemon server.js",
  "test": "mocha",
  "build": "webpack"
}
```

运行脚本：

```bash
npm run start # 会运行 nodemon server.js 命令
npm build # 会运行 webpack 命令
```

一些特定的脚本名称可以省略 `run` 运行，例如 `start`、`restart`、`test`。

```bash
npm run start
# 等于
npm start
```

### 依赖关系

依赖关系可以分为两种主要类型：**运行时依赖关系** 和 **开发时依赖关系**。

**`dependencies`**：定义了项目在运行时需要的依赖项，通常是项目在上线运行时所需的包。

```json
{
  "dependencies": {
    "express": "4.17.1",
    "body-parser": "1.19.0"
  }
}
```

**`devDependencies`**：定义了项目在上线运行时不需要的依赖，仅为了方便开发而安装的包。这些依赖项不会包含在最终部署的项目中，而是在开发环境中使用。典型的开发依赖包括测试框架、构建工具、代码检查工具等。

```json
"devDependencies": {
  "mocha": "^9.0.0",
  "webpack": "^5.0.0",
  "eslint": "^8.0.0"
}
```

### 其它

其它的配置通常用于包的发布，日常开发中，一般无需去关心这些配置

- `name`: 项目的名称，通常是小写字母，不包含空格或特殊字符。
- `version`: 项目的版本号，通常采用 [语义化版本规范 (Semantic Versioning)](https://semver.org/)。
- `description`: 项目的简短描述，用于解释项目的主要目标或内容。
- `main`: 项目的入口点文件，通常是一个 JavaScript 文件。
- `author`: 项目的作者或维护者的名称。
- `license`: 项目的许可证，指明了使用项目的规则和限制。
- `repository`: 项目的源代码托管库的 URL。
- `keywords`: 与项目相关的关键字，用于使别人更容易地找到你的项目。
- `engines`: 指定项目运行所需的 Node.js 版本范围。
- `private`: 如果设置为 `true`，则防止项目被发布到 npm 注册表。
- `browserslist`: 指定项目支持的浏览器和其版本。

## 常用命令

### 初始化

使用 `npm init` 初始化一个目录，运行命令后，会询问项目相关信息，通常使用 `npm init -y` 代表使用默认配置，即可跳过交互，并创建 `package.json` 文件

```bash
npm init -y
```

### 还原项目依赖

根据项目的 package.json 文件来安装所有依赖项

```bash
npm i
```

### 安装包

#### 作为生产依赖安装

```bash
npm i 包名
npm i 包名1 包名2 # 安装多个包
npm i 包名@版本号 # 安装指定版本
```

#### 作为开发依赖安装

使用 `-D` 参数安装包将它们添加到项目的 `devDependencies` 中，`devDependencies` 是一组仅在开发环境中需要的包的列表。这样做可以减小生产环境的包大小。

```bash
npm i 包名 -D
```

#### 全局安装

```bash
npm i 包名 -g
```

### 卸载包

```bash
npm un 包名 # 移除包
npm un 包名 -g # 移除全局安装的包
```

### 查看全局安装的包

```bash
npm list -g --depth=0 # depth=0代表查看的嵌套层级为0
```

### 查看存放全局包的路径

```bash
npm prefix -g
```

### npx

npx 想要解决的主要问题，就是调用项目内部安装的模块，npx 还能避免全局安装的模块。比如，`create-react-app`这个模块是全局安装，npx 可以运行它，而且不进行全局安装。

```bash
npx create-react-app my-react-app
```

运行上面的代码时，npx 将`create-react-app`下载到一个临时目录，使用以后再删除。这样就会避免全局包的版本差异问题。

## 其它包管理器

### yarn

[yarn](https://www.yarnpkg.cn/) 是由 Facebook、Google、Exponent 和 Tilde 联合推出的一款包管理器，它是一个替代 npm 的工具，因为以往的 npm 存在以下问题：

- npm 的依赖是嵌套的，而 windows 最大支持 256 个路径字符
- 依赖嵌套，也导致同版本包被重复安装
- 安装速度慢，npm 对包的下载是串行的，即上个包安装完后，再安装下一个

yarn 将这些问题解决，并进行额外优化：

- 目录扁平化
- 使用并行下载和缓存来提高包安装速度
- 使用 yarn-lock 确保项目的依赖项版本一致性
- 离线支持，不联网时，从本地检索包并安装

因此，npm 的用户大量流失到 yarn，随后不久 npm 学习 yarn 的模式不断更新，直到 npm@6 版本时，原本的问题已经全部解决，和 yarn 也已经没有多少差距了

**基本使用**

安装 yarn

```bash
npm i yarn -g
```

初始化项目

```bash
yarn init
```

根据项目的 package.json 文件还原依赖项

```bash
yarn install
```

安装包

```bash
yarn add 包名
yarn add 包名 -D
```

卸载包

```bash
yarn remove 包名
```

更新包

```bash
yarn update 包名
```

运行脚本

```bash
yarn run 脚本名称
```

### pnpm

[pnpm](https://pnpm.io/zh) 是一款高性能包管理器，与 npm/yarn 采用了不同的依赖项管理方法。

pnpm 的特点：

- 共享依赖：多个项目的依赖项通过硬链接的方式指向单个位置，从而减少了磁盘空间的占用。
- 树状结构：解决幽灵依赖的问题（指未手动安装即可使用的包）且依赖关系清晰。
- 快速安装：只会安装项目中添加或更新的依赖项，而不会重新安装所有依赖项。

**基本使用**

安装 pnpm

```bash
npm i pnpm -g
```

初始化项目

```bash
pnpm init
```

根据项目的 package.json 文件还原依赖项

```bash
pnpm install
```

安装包

```bash
pnpm add 包名
pnpm add 包名 -D
```

卸载包

```bash
pnpm remove 包名
```

更新包

```bash
pnpm update 包名
```

运行脚本

```bash
pnpm run 脚本名称
```

### cnpm

[cnpm](https://npmmirror.com/package/cnpm) 是一个淘宝团队维护包管理工具，旨在提高在中国大陆地区 npm 包管理器的下载速度，以避免访问国际 npm 镜像时的网络速度问题。

**基本使用**

安装

```bash
npm i cnpm -g
```

初始化项目

```bash
cnpm init
```

还原依赖

```bash
cnpm i
```

安装包

```bash
cnpm i 包名
cnpm i 包名 -D
```

卸载包

```bash
cnpm uninstall 包名
```

更新包

```bash
cnpm update 包名
```

运行脚本

```bash
cnpm run 脚本名称
```
