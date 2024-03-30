# 使用 nvm 管理 node

nvm（Node Version Manager）是一个用于管理多个 Node.js 版本的工具。它允许你在同一台计算机上轻松地切换不同版本的 Node.js，以满足不同项目的需求

## 安装 NVM

**在 Linux/macOS 上安装**：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh
# 或者使用 wget 安装：
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh
```

**在 Windows 上**，你可以从 [NVM for Windows](https://github.com/coreybutler/nvm-windows) 下载并安装 NVM，或直接通过[百度网盘链接](https://pan.baidu.com/s/1Si65BQMUsNdmNBSAk25I-g?pwd=sway)安装

## 检查 NVM 是否安装成功

在终端中运行以下命令来检查是否成功安装 NVM：

```bash
nvm --version
```

## 安装 Node.js 版本

要安装特定版本的 Node.js，可以使用以下命令：

```bash
nvm install <node_version>
# 例如：安装 Node.js 14.17.3 版本：
nvm install 14.17.3
```

## 使用特定版本的 Node.js

你可以使用以下命令来切换到已安装的特定版本的 Node.js：

> 在 windows 上需要以管理员身份运行指令

```bash
nvm use <node_version>
# 例如，要使用 Node.js 14.17.3：
nvm use 14.17.3
```

## 设置默认 Node.js 版本

如果你想将某个 Node.js 版本设置为默认版本，可以运行：

```bash
nvm alias default <node_version>
# 例如，将 Node.js 14.17.3 设置为默认版本：
nvm alias default 14.17.3
```

## 查看已安装的 Node.js 版本

运行以下命令可以查看已安装的 Node.js 版本列表：

```bash
nvm list
# 或
nvm ls
```

这将显示所有已安装的 Node.js 版本以及当前使用的版本。

## 卸载 Node.js 版本

如果你需要卸载某个 Node.js 版本，可以运行以下命令：

```bash
nvm uninstall <node_version>
# 例如，要卸载 Node.js 14.17.3：
nvm uninstall 14.17.3
```

这些是 NVM 的基本用法。使用 NVM，你可以轻松地管理多个 Node.js 版本，以适应不同的项目需求。
