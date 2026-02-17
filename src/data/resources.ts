import { Scale, Search, ShieldCheck, UserCheck } from 'lucide-react';
import type { ComponentType } from 'react';

export interface ResourceData {
  slug: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  shortTitle: string;
  desc: string;
  href: string;
}

export const resources: ResourceData[] = [
  {
    slug: 'ai-loven',
    icon: Scale,
    title: 'KI-loven (EU AI Act)',
    shortTitle: 'KI-loven',
    desc: 'Alt du trenger å vite om EU AI Act og Norges nye KI-lov – tidslinje, krav og konsekvenser.',
    href: '/om-ki-loven',
  },
  {
    slug: 'stopp-shadow-ai',
    icon: Search,
    title: 'Shadow AI',
    shortTitle: 'Shadow AI',
    desc: 'Ansatte bruker KI-verktøy uten kontroll. Forstå risikoen og hva du kan gjøre.',
    href: '/hvorfor-kisa/stopp-shadow-ai',
  },
  {
    slug: 'ai-firewall',
    icon: ShieldCheck,
    title: 'AI Firewall',
    shortTitle: 'AI Firewall',
    desc: 'Autonome KI-agenter trenger kontinuerlig kontroll. Lær om KISAs sikkerhetsarkitektur.',
    href: '/hvorfor-kisa/ai-firewall',
  },
  {
    slug: 'human-in-the-loop',
    icon: UserCheck,
    title: 'Human-in-the-Loop',
    shortTitle: 'Human-in-the-Loop',
    desc: 'Kritiske beslutninger trenger klare grenser. Forstå KISAs tilnærming til ansvarlig KI.',
    href: '/hvorfor-kisa/human-in-the-loop',
  },
];
