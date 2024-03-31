# VS Code 编辑器配置

[Visual Studio Code](https://code.visualstudio.com/Download) 是由微软开发的一款免费开源的现代化跨平台代码编辑器。
优势：

- 轻量级和快速启动
- 丰富的插件生态系统
- 更好的 TypeScript 支持

## 插件

VS Code 有一个庞大的插件生态系统，可以根据需要选择安装插件来扩展功能，满足不同项目的需求

| 名称                        | 描述                                           |
| --------------------------- | ---------------------------------------------- |
| `Chinese (Simplified)`      | VS Code 中文语言包                             |
| `Code Runner`               | 在终端直接运行代码，支持多种语言               |
| `Code Spell Checker`        | 单词拼写检查，可以避免开发中的低级失误         |
| `Code Translate`            | 鼠标悬停时，显示中文翻译                       |
| `CodeSnap`                  | 为 代码生成漂亮的截图                          |
| `any-rule`                  | 常用的正则表达式列表                           |
| `ESLint`                    | Javascript 代码风格检查                        |
| `Prettier`                  | 格式化代码                                     |
| `Tailwind CSS IntelliSense` | tailwind css 类名提示插件                      |
| `Vue - Official`            | 用于 Vue3 的高亮、提示插件                     |
| `Vetur`                     | 用于 Vue2 的高亮、提示插件                     |
| `XML Format`                | 格式化 xml 文件                                |
| `Git History`               | 查看和搜索历史记录                             |
| `GitLens`                   | 通过一组强大的工具来提高专注力、生产力和协作。 |
| `GitHub Repositories`       | 在 VS Code 编辑器中直接查看 github 的项目      |
| `Live Server`               | 为 html 文件搭建一个服务器环境                 |
| `open in browser`           | 在浏览器打开文件                               |
| `Path Intellisense`         | 路径提示插件                                   |
| `Project Manager`           | 用于管理不同的项目，切换更加方便               |
| `Svg Preview`               | 预览 svg 文件                                  |
| `Markdown Preview Enhanced` | 预览 markworn 文件                             |
| `Image preview`             | 在代码行号的位置实时预览引入的图片资源         |
| `Todo Tree`                 | 快速搜索工作区，查找 TODO 和 FIXME 等注释标记  |
| `vscode-icons`              | 精美的 `VS Code` 图标主题                      |

## settings.json

```json
{
  "editor.fontFamily": "Consolas, 'Microsoft YaHei', monospace", // 编辑器字体
  "editor.fontSize": 16, // 编辑器字体大小
  "editor.fontLigatures": false, //字体连字
  "editor.fontWeight": "normal", //字体粗细
  "editor.tokenColorCustomizations": {
    "comments": "#7f848e", // 注释颜色
    "textMateRules": [
      {
        "scope": "comment",
        "settings": {
          "fontStyle": "italic" // 注释字体斜体
        }
      }
    ]
  },
  "editor.showFoldingControls": "always", // 行号的折叠控制何时显示
  "editor.formatOnSave": false, //保存后格式化
  "editor.tabSize": 2, //tabs⻓度
  "editor.hover.delay": 600, // 控制显示悬停提示前的等待时间 (毫秒)。
  // 控制编辑器的当前行进行高亮显示的方式  none,gutter,line,all:同时突出显示导航线和当前行
  "editor.renderLineHighlight": "line",
  "editor.minimap.enabled": true, //⼩地图
  "editor.suggestSelection": "first", //语法提示
  "editor.defaultFormatter": "esbenp.prettier-vscode", //编辑器默认格式化程序
  "editor.foldingStrategy": "indentation", //折叠的策略
  "editor.codeActionsOnSave": {}, //保存时执⾏的逻辑
  "editor.bracketPairColorization.enabled": true, //是否启⽤括号对着⾊
  "editor.guides.bracketPairs": "active", //是否启⽤括号对指南
  "editor.wordWrap": "on", //编辑器代码⾃动换⾏
  "editor.wordSeparators": "`~!@#$%^&*()=+[{]}\\|;:'\",.<>/?", // 执行文字相关的导航或操作时将用作文字分隔符的字符
  "editor.acceptSuggestionOnCommitCharacter": false,
  "editor.linkedEditing": true,
  "explorer.compactFolders": false, // 单个文件折叠显示
  "explorer.confirmDelete": false, // 在编辑器内删除文件时是否需要确认
  "explorer.confirmDragAndDrop": false,
  "breadcrumbs.enabled": true, //⾯包屑导航
  "files.associations": {}, //关联的语⾔
  "settingsSync.ignoredExtensions": [], //同步时需要忽略的扩展列表
  "git.enabled": true,
  "workbench.tree.indent": 16, // 目录树的缩进像素
  "prettier.printWidth": 120, // 自动换行最大宽度，默认80
  "prettier.useTabs": false, //缩进使⽤tab
  "prettier.semi": false, // 句尾添加分号
  "prettier.singleQuote": true, // 使⽤单引号代替双引号
  "prettier.trailingComma": "all", //尾部添加逗号
  "prettier.bracketSpacing": true, //对象括号之间添加空格
  "prettier.jsxSingleQuote": true, //JSX中使⽤单引号
  "prettier.arrowParens": "avoid", //在单独的箭头函数参数周围包括括号
  "prettier.useEditorConfig": false, //解析配置时是否考虑.editorconfig
  "prettier.htmlWhitespaceSensitivity": "ignore",
  "diffEditor.ignoreTrimWhitespace": true, //忽略前导空格或后置空格的更改
  "workbench.colorCustomizations": {
    "editor.lineHighlightBackground": "#ffffff15", // 光标所在行背景色
    "editor.selectionBackground": "#3490de90", // 选中内容的颜色
    "editor.selectionHighlightBackground": "#3490de90" // 与选中部分相同的代码的颜色一
  },
  "hediet.vscode-drawio.resizeImages": null, // 在编辑器内拖动或移动文件时是否需要确认
  // 插件配置
  "vetur.ignoreProjectWarning": true, //vetur忽略项⽬警告
  "liveServer.settings.donotShowInfoMsg": true,
  "code-runner.showExecutionMessage": false,
  "code-runner.clearPreviousOutput": true,
  // Draw.io主题配置
  "hediet.vscode-drawio.theme": "atlas",
  // TODO Tree配置
  "todo-tree.highlights.defaultHighlight": {
    "icon": "alert", // 图标
    "type": "tag", // 显示类型
    "foreground": "#000", // 前景色
    "background": "#39f", // 背景色
    "iconColour": "#39f" // icon颜色
  },
  "todo-tree.highlights.customHighlight": {
    "TODO": {
      "background": "#f90"
    },
    "FIXME": {
      "background": "#f30"
    }
  },
  // path-intellisense配置
  "path-intellisense.mappings": {
    "@": "${workspaceRoot}/src"
  },
  "terminal.integrated.fontSize": 16,
  "workbench.startupEditor": "none",
  "vue.inlayHints.optionsWrapper": false,
  "vetur.validation.template": false,
  "cSpell.userWords": ["Pinia"], // 配置不进行警告的未知单词
  "typescript.updateImportsOnFileMove.enabled": "never",
  "security.workspace.trust.untrustedFiles": "open",
  "codesnap.transparentBackground": true,
  "[xml]": {
    "editor.defaultFormatter": "mikeburgh.xml-format"
  },
  "workbench.iconTheme": "vscode-icons",
  "markdown-preview-enhanced.previewTheme": "github-light.css",
  "markdown-preview-enhanced.codeBlockTheme": "vs.css",
  "markdown-preview-enhanced.revealjsTheme": "none.css",
  "git.openRepositoryInParentFolders": "never"
}
```

## 配置用户代码片段

通过配置用户代码片段，可以在输入关键字时，编辑器自动补全，可以显著地提高开发的效率。

<img src="/md/ajax-snippet.gif" alt="ajax-snippet" >

## 目录别名提示(@)

在使用 Vite、Webpack 等构建工具时，常常会映射目录别名，例如使用 `@` 映射根目录的 `src` 文件夹。让 VS Code 可以识别这种路径并给出路径提示，有以下两种方式：

### 根目录配置 jsconfig.json

在根目录新建 `jsconfig.json` 文件，将映射的目录进行配置。

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### 使用 Path Intellisense 插件

下载 `Path Intellisense` 插件，并在 `settings.json` 中配置映射的目录。

<img src="/md/path-intellisense.png" alt="path-intellisense">

添加以下配置

<img src="/md/path-intellisense-setting.png" alt="path-intellisense-setting">
