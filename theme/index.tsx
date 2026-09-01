import './index.css';
import {
  Layout as OriginalLayout,
  type LayoutProps,
} from '@rspress/core/theme-original';
import { HomeExtras } from './components/HomeExtras';

export * from '@rspress/core/theme-original';

export function Layout(props: LayoutProps) {
  return <OriginalLayout {...props} afterHero={<HomeExtras />} />;
}
