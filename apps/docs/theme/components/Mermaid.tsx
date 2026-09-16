import { useEffect, useId, useRef, useState } from 'react';
import { useDark } from '@rspress/core/runtime';

type Props = {
  chart: string;
  title?: string;
};

const lightTheme = {
  primaryColor: '#EDE9FE',
  primaryTextColor: '#1E1B4B',
  primaryBorderColor: '#7C3AED',
  lineColor: '#7C3AED',
  secondaryColor: '#CFFAFE',
  tertiaryColor: '#FAF5FF',
  clusterBkg: '#F5F3FF',
  clusterBorder: '#C4B5FD',
  edgeLabelBackground: '#FAF5FF',
  nodeTextColor: '#1E1B4B',
  fontFamily: 'IBM Plex Sans, Noto Sans SC, sans-serif',
};

const darkTheme = {
  primaryColor: '#2E1065',
  primaryTextColor: '#F5F3FF',
  primaryBorderColor: '#A78BFA',
  lineColor: '#A78BFA',
  secondaryColor: '#164E63',
  tertiaryColor: '#1E1B4B',
  clusterBkg: '#1E1B4B',
  clusterBorder: '#7C3AED',
  edgeLabelBackground: '#0F0A1F',
  nodeTextColor: '#F5F3FF',
  fontFamily: 'IBM Plex Sans, Noto Sans SC, sans-serif',
};

export function Mermaid({ chart, title }: Props) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ref = useRef<HTMLDivElement>(null);
  const dark = useDark();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const el = ref.current;
    if (!el) {
      return;
    }

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeVariables: dark ? darkTheme : lightTheme,
          flowchart: { htmlLabels: true, curve: 'basis' },
        });
        const { svg } = await mermaid.render(`plan-mmd-${rawId}`, chart.trim());
        if (!cancelled && el) {
          el.innerHTML = svg;
          setFailed(false);
        }
      } catch {
        if (!cancelled) {
          setFailed(true);
        }
      }
    };

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, dark, rawId]);

  return (
    <figure className="plan-mermaid">
      {title ? <figcaption className="plan-mermaid__title">{title}</figcaption> : null}
      <div ref={ref} className="plan-mermaid__canvas" role="img" aria-label={title ?? '流程图'} />
      {failed ? <pre className="plan-mermaid__fallback">{chart.trim()}</pre> : null}
    </figure>
  );
}
