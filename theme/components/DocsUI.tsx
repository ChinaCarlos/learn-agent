import type { ReactNode } from 'react';

type Meta = {
  label: string;
  value: string;
};

export function PlanHeader({ kicker, items }: { kicker: string; items: Meta[] }) {
  return (
    <div>
      <p className="plan-kicker">{kicker}</p>
      <div className="plan-header">
        {items.map(item => (
          <div className="plan-header__item" key={item.label}>
            <span className="plan-header__label">{item.label}</span>
            <span className="plan-header__value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warn' | 'danger' | 'ok';
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className={`plan-callout plan-callout--${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function Arch({
  layers,
}: {
  layers: { title: string; body: string }[];
}) {
  return (
    <div className="plan-arch" role="list">
      {layers.map((layer, index) => (
        <div className="plan-arch__layer" role="listitem" key={layer.title}>
          <span className="plan-arch__index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <b>{layer.title}</b>
            <p>{layer.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Flow({
  steps,
}: {
  steps: { title: string; desc: string; gate?: boolean }[];
}) {
  return (
    <div className="plan-flow">
      {steps.map((step, index) => (
        <div className="plan-flow__item" key={`${step.title}-${index}`}>
          {index > 0 ? (
            <span className="plan-flow__arrow" aria-hidden="true">
              →
            </span>
          ) : null}
          <div className={step.gate ? 'plan-flow__node plan-flow__node--gate' : 'plan-flow__node'}>
            <b>{step.title}</b>
            <span>{step.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ConceptGrid({
  items,
}: {
  items: { term: string; meaning: string; analog: string }[];
}) {
  return (
    <div className="plan-concepts">
      {items.map(item => (
        <article className="plan-concept" key={item.term}>
          <h4>{item.term}</h4>
          <p>{item.meaning}</p>
          <p className="plan-concept__analog">{item.analog}</p>
        </article>
      ))}
    </div>
  );
}

export function DemoBox({
  title,
  goal,
  children,
}: {
  title: string;
  goal: string;
  children: ReactNode;
}) {
  return (
    <section className="plan-demo">
      <div className="plan-demo__head">
        <span className="plan-demo__badge">本章 Demo</span>
        <h3>{title}</h3>
        <p>{goal}</p>
      </div>
      <div className="plan-demo__body">{children}</div>
    </section>
  );
}

export function Session({
  when,
  title,
  children,
}: {
  when: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="plan-session">
      <div className="plan-session__when">{when}</div>
      <div>
        <strong>{title}</strong>
        {children}
      </div>
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="plan-check">
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
