export type ModuleStatus = 'active' | 'planned';

export interface SaosModule {
  id: string;
  label: string;
  description: string;
  href: string;
  status: ModuleStatus;
}

export const modules: SaosModule[] = [
  { id: 'project', label: 'O projektu', description: 'Smysl, charakter, architektura, fungování a obchodní model SAOS.', href: '/project/', status: 'active' },
  { id: 'brand', label: 'Brand Manual', description: 'Identita, logo, barvy, typografie a jazyk značky.', href: '/brand/', status: 'active' },
  { id: 'design-system', label: 'Design System', description: 'Tokeny, komponenty a pravidla vizuálního systému.', href: '/design-system/', status: 'active' },
  { id: 'business-os', label: 'Business OS', description: 'Strategie, nabídka, obchodní model a řízení firmy.', href: '/business-os/', status: 'active' },
  { id: 'ai-team', label: 'AI Team', description: 'Role, kompetence, prompty, vstupy a odpovědnosti.', href: '/ai-team/', status: 'active' },
  { id: 'workflow', label: 'Workflow', description: 'Opakovatelné pracovní postupy a kontrolní body.', href: '/workflow/', status: 'active' },
  { id: 'marketing', label: 'Marketing', description: 'Kampaně, obsah, kanály a distribuční pravidla.', href: '/marketing/', status: 'active' },
  { id: 'knowledge-base', label: 'Knowledge Base', description: 'Návody, poznatky, dokumentace a firemní know-how.', href: '/knowledge-base/', status: 'active' },
  { id: 'decision-log', label: 'Decision Log', description: 'Důležitá rozhodnutí, důvody a jejich dopady.', href: '/decision-log/', status: 'planned' },
  { id: 'future-ideas', label: 'Future Ideas', description: 'Zásobník prověřovaných nápadů a příležitostí.', href: '/future-ideas/', status: 'planned' },
  { id: 'asset-library', label: 'Asset Library', description: 'Loga, obrazy, SVG, šablony a jejich metadata.', href: '/asset-library/', status: 'planned' }
];
