# npm 包管理器

## 包的概念

"包"（Package）通常指的是一个由相关的代码和资源封装成的一个可独立使用的单元，旨在促进代码的模块化和重用。不同的编程语言中，使用不同的工具来管理包。例如，Node.js 使用 npm，Python 使用 pip，Java 使用 Maven。

npm（Node Package Manager）通常与 Node.js 一起安装，因为它是 Node.js 的默认包管理工具。

## npm 配置

npm 具有许多配置选项，可用于自定义 npm 的行为和设置。

若要获取和设置全局配置，可以使用以下命令

```bash
npm config get key # 获取一个全局配置
npm config set key value # 更改一个全局配置
```

**查看 npm 配置**

```bash
npm config list # 查看用户修改的配置
npm config list -l # 查看 npm 所有配置
npm config list -l --json # 以 json 形式查看所有配置
```

**修改 npm 镜像源**

npm 的镜像源位于国外，下载速度慢，有时会因此下载失败。我们可以将下载地址切换到淘宝的 npmmirror 镜像站

```bash
npm config set registry http://registry.npmmirror.com
```

## 使用 nrm 管理镜像源

nrm 是一个简单的 npm 镜像源管理工具，它提供了许多的镜像源，可以快速的在他们之间切换，只需几行命令即可：

**安装 nrm**

```bash
npm i nrm -g
```

**查看镜像**

```bash
nrm ls

* npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
```

**切换镜像**

```bash
nrm use taobao
```

**查看当前使用的镜像**

```bash
nrm current
```

**添加镜像源**

适用于企业内部定制的私有源，`<registry>` 表示源名称，`<url>` 表示源地址。

```bash
nrm add <registry> <url>
```

**测试镜像的响应时间**

```bash
nrm test taobao
```

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

### 安装

**生产依赖安装**

```bash
npm i 包名
npm i 包名1 包名2 # 安装多个包
npm i 包名@版本号 # 安装指定版本
```

**开发依赖安装**

使用 `-D` 参数安装包将它们添加到项目的 `devDependencies` 中，`devDependencies` 是一组仅在开发环境中需要的包的列表。这样做可以减小生产环境的包大小。

```bash
npm i 包名 -D
```

### 全局安装

```bash
npm i 包名 -g
```

查看全局安装的包

```bash
npm list -g --depth=0 # depth=0代表查看的嵌套层级为0
```

查看存放全局包的路径

```bash
npm prefix -g
```

### 卸载

```bash
npm un 包名 # 移除包
npm un 包名 -g # 移除全局安装的包
```

### 更新

```bash
# 更新所有过时的包
npm update

# 更新单个包
npm update 包名

# 更新 npm
npm update npm -g
```

### 检查过时的包

```bash
npm outdated
```

### npx

npx 的用途是使用非全局安装的 npm 包的命令行工具。全局安装可能会导致不同项目之间的版本冲突。使用 npx 可以确保每个项目都使用其依赖中指定的确切版本。

```bash
npx create-react-app my-react-app
```

运行上面的代码时，npx 将`create-react-app`下载到一个临时目录，使用以后再删除。这样就会避免全局包的版本差异问题。

## 其它包管理器

### yarn

[yarn](https://www.yarnpkg.cn/) 是由 Facebook、Google、Exponent 和 Tilde 联合推出的一款包管理器，它旨在解决 npm 的一些痛点。但 npm 跟快就学习了 yarn 的优点，截止 npm@6 时，与 yarn 已经没有多少差距。

**优点**

- 速度快: Yarn 通过并行安装和缓存优化显著提高了安装速度。
- 离线模式: 如果之前已经下载过依赖，Yarn 可以从本地缓存中安装它们，无需联网。
- 友好的错误信息。

### pnpm

[pnpm](https://pnpm.io/zh) 旨在提高安装速度并减少磁盘空间的使用。pnpm 代表 "performant npm"，它采用了一种独特的依赖安装方式，称为“硬链接”（hard links）和“符号链接”（symbolic links），这种方式与 npm 和 yarn 的扁平化节点模块结构不同。

pnpm 的特点：

- 节省磁盘空间：通过使用全局存储区来保存所有的依赖项，并通过符号链接指向这些依赖项，pnpm 能够大幅减少项目实际占用的磁盘空间。
- 快速安装：由于大多数依赖项已经被下载到了全局存储区中，后续的安装过程只需创建链接即可，这大大加快了安装速度。
- 严格的依赖隔离：pnpm 遵循严格的依赖层级结构，这意味着一个包只能访问它自己声明的依赖，从而避免了扁平结构可能引起的冲突。
- 安全性：pnpm 通过使用 SHA-1 哈希校验来确保每次安装的依赖项都是预期的那个版本，增强了安全性。

随着越来越多人采用，pnpm 的社区正在快速增长，提供了丰富的文档和支持。
