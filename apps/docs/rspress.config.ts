import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  lang: 'zh',
  title: 'Agent 学习指南',
  description: '面向资深前端的 TypeScript 主栈企业级 Agent 学习文档',
  icon: '/favicon.svg',
  logoText: 'Agent 学习指南',
  llms: true,
  markdown: {
    showLineNumbers: true,
  },
  themeConfig: {
    hideNavbar: 'auto',
    outline: true,
    lastUpdated: false,
    socialLinks: [],
    footer: {
      message:
        'v2 · 技术快照 2026-09-02 · 学习前请再核官方 changelog · 生产锁定用精确版本 + lockfile',
    },
  },
  builderConfig: {
    html: {
      title: 'Agent 学习指南',
    },
  },
});
