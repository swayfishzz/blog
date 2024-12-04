# Git 提交规范

使用 git 提交代码时，使用良好的提交信息能够帮助团队成员更好地理解代码变更的原因和内容。

这些规范是基于软件开发社区多年来的最佳实践逐渐形成和发展起来的。[AngularJS](https://github.com/angular/angular.js) 在 github 上 的提交记录被业内许多人认可，逐渐被大家引用。

格式：

```bash
type(scope): subject

Body

BREAKING CHANGE:

closes
```

## 规范

- **type** 必填，类型：本次提交的类型，通常为以下值之一。
  | 类型 | 描述 |
  | -------- | ----------------------------------- |
  | feat | 新功能（feature） |
  | fix | 修复 bug（bug fix） |
  | docs | 文档改动（documentation） |
  | style | 代码格式修改，不影响代码运行的变动 |
  | refactor | 重构 |
  | perf | 性能优化 |
  | test | 增加测试 |
  | chore | 修改构建流程、辅助工具/依赖库的增加 |
  | build | 构建 |
  | revert | 回滚 |
- **scope** 可选，范围：指定本地更改影响的范围。
- **subject** 必填，主题：对改动的简短描述。
- **body** 可选，详细描述：对改动的详细描述。
- **BREAKING CHANGE** 可选，破坏性变更：对以往版本的某些功能产生影响，不再兼容之前的版本。
- **closes** 可选，关闭 bug：针对 issue 的 bug 修复，使用此字段指出修复的 bug。

## 示例

**新增功能**

```bash
git commit -m "feat(user): 添加用户登录功能"
```

**修复 bug**

其中 #123 为 bug 的编号，通常为仓库 issue 或禅道 bug 的编号。

```bash
git commit -m "fix(user): 修复用户登录问题

closes #123"
```

**完整示例**

```bash
git commit -m "feat(user): 添加用户权限功能

增加用户权限管理
增加用户仓库
增加路由守卫

BREAKING CHANGE: 之前登录逻辑已移除

closes: #123"
```
