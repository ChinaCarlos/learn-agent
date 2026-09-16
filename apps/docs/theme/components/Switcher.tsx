import { useLocation } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme-original';

type Item = {
  href: string;
  label: string;
};

export const CHAPTERS: Item[] = [
  { href: '/chapters/00-v2-updates', label: '〇 更新' },
  { href: '/chapters/01-stack', label: '一 栈策略' },
  { href: '/chapters/02-concepts', label: '二 概念' },
  { href: '/chapters/03-tech', label: '三 选型' },
  { href: '/chapters/04-architecture', label: '四 架构' },
  { href: '/chapters/05-roadmap', label: '五 路线' },
  { href: '/chapters/06-acceptance', label: '六 验收' },
  { href: '/chapters/07-strategy', label: '七 策略' },
  { href: '/chapters/08-risks', label: '八 风险' },
];

export const WEEKS: Item[] = [
  { href: '/weeks/w01', label: 'W1' },
  { href: '/weeks/w02', label: 'W2' },
  { href: '/weeks/w03', label: 'W3' },
  { href: '/weeks/w04', label: 'W4' },
  { href: '/weeks/w05', label: 'W5' },
  { href: '/weeks/w06', label: 'W6' },
  { href: '/weeks/w07', label: 'W7' },
  { href: '/weeks/w08', label: 'W8' },
  { href: '/weeks/w09', label: 'W9' },
  { href: '/weeks/w10', label: 'W10' },
  { href: '/weeks/w11', label: 'W11' },
  { href: '/weeks/w12', label: 'W12' },
  { href: '/weeks/w13', label: 'W13' },
  { href: '/weeks/w14', label: 'W14' },
];

function SwitcherNav({ items, current }: { items: Item[]; current: string }) {
  const location = useLocation();
  const pathname = (location?.pathname ?? '').replace(/\.html$/, '').replace(/\/$/, '');
  return (
    <nav className="plan-switcher" aria-label="页面切换">
      {items.map(item => {
        const target = item.href.replace(/\/$/, '');
        const active =
          pathname === target ||
          pathname.endsWith(target) ||
          item.href.endsWith(`/${current}`) ||
          item.href === current;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active
                ? 'plan-switcher__item plan-switcher__item--current'
                : 'plan-switcher__item'
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function ChapterSwitcher({ current }: { current: string }) {
  return <SwitcherNav items={CHAPTERS} current={current} />;
}

export function WeekSwitcher({ current }: { current: string }) {
  return <SwitcherNav items={WEEKS} current={current} />;
}

export function PlanCTA({ href, children }: { href: string; children: string }) {
  return (
    <p className="plan-cta">
      <span>下一步</span>
      <Link href={href}>{children}</Link>
    </p>
  );
}
