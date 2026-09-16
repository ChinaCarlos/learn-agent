# Agent 学习指南

面向资深前端的 TypeScript 主栈企业级 Agent 学习文档（Rspress）。

内容依据根目录《企业级 Agent 学习方案》拆成 9 个概念章节与 14 周执行手册，每页含流程图、架构图和 Demo。

## 项目结构

```
learn-agent/
├── apps/
│   └── docs/          # Rspress 文档站点
│       ├── docs/      # 文档内容
│       ├── theme/     # 自定义主题
│       └── design-system/
├── packages/          # 学习项目代码包（预留）
├── pnpm-workspace.yaml
└── package.json       # workspace 根配置
```

## 环境要求

- **Node.js**: 24.0.0（见 `.nvmrc` / `.node-version`）
- **包管理器**: pnpm 10.11.0+

## 安装

```bash
pnpm install
```

## 本地开发

```bash
# 从根目录运行
pnpm dev

# 或直接在 docs 包运行
pnpm --filter @learn-agent/docs dev
```

## 生产构建

```bash
pnpm build
pnpm preview
```

默认开发地址见终端输出（一般为 `http://localhost:3000`）。

## GitHub Pages 部署

站点自动部署到 GitHub Pages：**https://ChinaCarlos.github.io/learn-agent/**

### 工作流程

- **PR 到 main**: 仅构建验证，不部署
- **Push 到 main**: 构建并自动部署到 GitHub Pages

### 首次启用 Pages

需要在 GitHub 仓库设置中启用 Pages：

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. 保存后，下次 push 到 main 分支将自动部署

## 添加学习项目

在 `packages/` 目录下创建新包，例如：

```bash
mkdir -p packages/demo-agent
cd packages/demo-agent
pnpm init
```

新包会自动被 pnpm workspace 识别。
