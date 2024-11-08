# package.json

package.json 是一个用于描述 Node.js 项目的元数据和依赖关系的配置文件。它通常位于项目的根目录中，是 Node.js 项目和 npm 包管理的核心文件之一。

## 模块

`type` 字段用于指定 `package.json` 所在目录下 `.js` 文件的模块处理方式：

- `commonjs`：将 js 文件按 commonjs 模块处理。
- `module`：将 js 文件按 ES Module 模块处理。

```json
{
  "type": "module"
}
```

> `.mjs` 始终会按照 ESM 模块处理；`.cjs` 始终会按 `CommonJS` 模块处理。

## 配置脚本

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
npm run start  会运行 nodemon server.js 命令
npm run build  会运行 webpack 命令
```

一些特定的脚本名称可以省略 `run` 运行，例如 `start`、`restart`、`test`。

```bash
npm run start
# 等于
npm start
```

## 依赖

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

**`devDependencies`**：仅在开发环境中使用的包，项目上线运行时不需要。

典型的开发依赖包括测试框架、构建工具、代码检查工具等。

```json
"devDependencies": {
  "mocha": "^9.0.0",
  "webpack": "^5.0.0",
  "eslint": "^8.0.0"
}
```

## 浏览器兼容

`browserslist` 用于指定项目要兼容的浏览器和版本，一些流行的工具会读取该配置（如 Autoprefixer、Babel、ESLint、PostCSS 和 Webpack）。

```json
{
  "browserslist": ["> 0.2 and not dead", "last 2 versions"]
}
```

该配置也可在项目根目录中新建 `.browserslistrc` 进行配置。

关于 `browserslist` 的语法和常用配置，见 https://browsersl.ist/

## 其它

其它的配置通常用于包的发布，日常开发中，一般无需去关心这些配置

- `name`: 项目的名称，通常是小写字母，不包含空格或特殊字符。
- `version`: 项目的版本号，通常采用 [语义化版本规范 (Semantic Versioning)](https://semver.org/)。
- `description`: 项目的简短描述，用于解释项目的主要目标或内容。
- `main`: 项目的入口点文件，通常是一个 JavaScript 文件。
- `author`: 项目的作者或维护者的名称。
- `license`: 项目的许可证，指明了使用项目的规则和限制。
- `repository`: 项目的源代码托管库的 URL。
- `keywords`: 数组，与项目相关的关键字，用于使别人更容易地找到你的项目。
- `bugs`：提交 bug 的地址，一般为你的 git 仓库地址的 issues。
- `engines`: 指定项目运行所需的 Node.js 版本范围。
- `private`: 如果设置为 `true`，则防止项目被发布到 npm 注册表。
