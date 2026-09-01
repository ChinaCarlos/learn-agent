import { Link } from '@rspress/core/theme-original';

const categories = [
  {
    href: '/chapters/',
    kicker: '方案',
    title: '9 个概念章节',
    body: '从版本变更、栈策略到架构与验收。每章含流程图、架构图、课时拆解和 Demo。',
  },
  {
    href: '/weeks/',
    kicker: '执行',
    title: '14 周精读计划',
    body: '2026-09-03 到 12-09。每周 10–15 小时，拆到课时、验收和可运行小案例。',
  },
];

const phases = [
  { name: '阶段 A', range: 'W1–2', focus: '概念 + Prompt + Output API' },
  { name: '阶段 B', range: 'W3–6', focus: 'LangChain → LangGraph → Durable → MCP' },
  { name: '阶段 C', range: 'W7–9', focus: 'A2A + RAG + DeepAgent' },
  { name: '阶段 D', range: 'W10', focus: 'Harness 运行时与成本治理' },
  { name: '阶段 E', range: 'W11–12', focus: 'Sandbox 安全 + Evals' },
  { name: '阶段 F', range: 'W13–14', focus: '观测、部署、SLO' },
];

export function HomeExtras() {
  return (
    <div className="home-extras">
      <section className="home-extras__section">
        <h2>从这里开始</h2>
        <div className="home-cats">
          {categories.map(cat => (
            <Link key={cat.href} href={cat.href} className="home-cat">
              <span className="plan-kicker">{cat.kicker}</span>
              <strong>{cat.title}</strong>
              <p>{cat.body}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-extras__section">
        <h2>六阶段学习地图</h2>
        <div className="home-phases">
          {phases.map(phase => (
            <article className="home-phase" key={phase.name}>
              <span>{phase.range}</span>
              <b>{phase.name}</b>
              <p>{phase.focus}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
