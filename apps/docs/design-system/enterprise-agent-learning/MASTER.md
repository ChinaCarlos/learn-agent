# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Enterprise Agent Learning
**Generated:** 2026-09-02
**Category:** Knowledge Base / AI Developer Documentation

用户指定紫色 UI。自动检索的儿童教育配色（Baloo 2 / Comic Neue）不适合资深前端读者，已按以下规则覆盖：

- 色板采用 **AI/Chatbot Platform**：紫主色 + 浅紫背景 + 青交互
- 字体采用 **Developer Mono**：JetBrains Mono + IBM Plex Sans + Noto Sans SC
- 保留 Rspress 暗色模式（开发者文档刚需），覆盖「避免 dark mode」的教育类建议
- 交互采用 Micro-interactions：150–300ms、只改颜色/阴影/边框，不用 scale

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#7C3AED` | `--color-primary` / `--rp-c-brand` | 链接、激活态、章节强调 |
| Secondary | `#A78BFA` | `--color-secondary` | 次级标签、暗色品牌 |
| CTA/Accent | `#06B6D4` | `--color-cta` | Demo、流程图箭头、交互高亮 |
| Background | `#FAF5FF` | `--color-background` | 浅色页面底 |
| Surface | `#FFFFFF` | `--color-surface` | 卡片 |
| Text | `#1E1B4B` | `--color-text` | 正文（对比度 > 4.5:1） |
| Muted | `#5B567A` | `--color-muted` | 辅助文字 |
| Gate | `#DB2777` | `--color-gate` | 审批闸门节点 |
| Gold | `#D97706` | `--color-gold` | 时段、里程碑 |

**Color Notes:** AI purple + cyan interactions. 暗色模式底 `#0F0A1F`，品牌改 `#A78BFA`。

### Typography

- **Heading Font:** IBM Plex Sans
- **Body Font:** IBM Plex Sans + Noto Sans SC
- **Code Font:** JetBrains Mono
- **Mood:** code, developer, technical, precise
- **Google Fonts:** IBM Plex Sans + JetBrains Mono + Noto Sans SC

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight gaps |
| `--space-sm` | `8px` | Icon gaps |
| `--space-md` | `16px` | Standard padding |
| `--space-lg` | `24px` | Section padding |
| `--space-xl` | `32px` | Large gaps |
| `--space-2xl` | `48px` | Section margins |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(76, 29, 149, 0.06)` | Subtle lift |
| `--shadow-md` | `0 8px 24px rgba(76, 29, 149, 0.08)` | Cards |
| `--shadow-lg` | `0 16px 40px rgba(76, 29, 149, 0.12)` | Featured panels |

---

## Component Specs

### Buttons / Links

- 可点击元素必须 `cursor: pointer`
- Hover：边框/背景色过渡 200ms，**禁止 scale**
- Focus：`2px solid #7C3AED` + 3px tint ring

### Cards

```css
.card {
  background: #ffffff;
  border: 1px solid #E9D5FF;
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: var(--shadow-sm);
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.card:hover {
  border-color: #7C3AED;
  box-shadow: var(--shadow-md);
}
```

浅色玻璃态最低不透明度为 `bg-white/80`。

---

## Style Guidelines

**Style:** Micro-interactions + Documentation Landing

**Page Pattern:** FAQ/Documentation Landing

- Hero（价值主张 + 搜索）
- 分类入口（章节 / 周计划）
- 详细文档（流程图 + 架构图 + Demo）
- 页尾 CTA（下一章 / 本周验收）

**Key Effects:** 150–300ms color/opacity；`prefers-reduced-motion: reduce`

---

## Anti-Patterns (Do NOT Use)

- 用 emoji 当图标
- Hover 使用 scale 造成布局抖动
- 浅色模式低对比灰字
- 线性（linear）UI 动画
- 装饰性无限动画
- 儿童手写体（Comic Neue / Baloo 2）

---

## Pre-Delivery Checklist

- [ ] 无 emoji 图标
- [ ] `cursor-pointer` 在可点击元素上
- [ ] Hover 200ms，无 layout shift
- [ ] 浅色正文对比度 ≥ 4.5:1
- [ ] 键盘可见 focus
- [ ] `prefers-reduced-motion` 生效
- [ ] 375 / 768 / 1024 / 1440 可用
