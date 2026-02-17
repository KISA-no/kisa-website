import { Search, Handshake, Award } from 'lucide-react';
import type { ComponentType } from 'react';

export interface ServiceData {
  slug: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  shortTitle: string;
  subtitle: string;
  price: string;
  desc: string;
  longDesc: string[];
  features: string[];
  details: string[];
  benefits: string[];
  process: string[];
  highlight?: boolean;
  imageKey: string;
}

export const services: ServiceData[] = [
  {
    slug: 'agent-audit',
    icon: Search,
    shortTitle: 'KI Governance Assessment',
    title: 'KI Governance Assessment',
    subtitle: 'Vet du hva KI-systemene dine faktisk gjør?',
    price: '24 900 kr',
    desc: 'En full gjennomgang av automatiserte prosesser i bedriften. Vi svarer på spørsmålene tilsynet vil stille før de banker på døra.',
    longDesc: [
      'De fleste norske bedrifter har allerede KI-verktøy i bruk – men svært få har kontroll på hva de faktisk gjør. Ansatte bruker ChatGPT, Copilot og andre verktøy uten at IT-avdelingen er involvert. Dette kalles Shadow AI, og det utgjør en betydelig risiko.',
      'KISA KI Governance Assessment er en strukturert gjennomgang av alle KI-systemer i virksomheten. Vi identifiserer risiko, vurderer compliance-status, og leverer en konkret handlingsplan som gjør bedriften revisjonsklar.',
      'Assessmenten er designet for å svare på de spørsmålene Datatilsynet og EU-tilsynet vil stille når de banker på døra. Bedre å ha svarene klare på forhånd.',
    ],
    features: [
      'Shadow AI-kartlegging av alle verktøy i bruk',
      'Risikovurdering mot EU AI Act',
      'Gap-analyse med prioriterte tiltak',
      'Executive summary for styret',
      'Handlingsplan med tidslinje',
    ],
    details: [
      'Målgruppe: HR, finans, kundeservice og ledelse med behov for styring og kontroll.',
      'Tidslinje: vanligvis 2-4 uker avhengig av størrelse og kompleksitet.',
    ],
    benefits: [
      'Full oversikt over KI-risiko i virksomheten',
      'Revisjonsklar dokumentasjon for styret og tilsynsmyndigheter',
      'Prioritert handlingsplan med konkrete tiltak',
      'Redusert risiko for bøter og compliance-brudd',
    ],
    process: [
      'Oppstartsmøte og scope-definisjon',
      'Kartlegging av alle KI-systemer og verktøy',
      'Risikovurdering og compliance-analyse',
      'Testing og verifisering',
      'Rapport med trafikklys-klassifisering',
      'Presentasjon og handlingsplan',
    ],
    imageKey: 'audit',
  },
  {
    slug: 'compliance-dashboard',
    icon: Handshake,
    shortTitle: 'Styringspartner',
    title: 'KISA Styringspartner',
    subtitle: 'Løpende compliance-overvåking og styrerapportering',
    price: '5 900–9 900 kr/mnd',
    desc: 'Løpende compliance-overvåking med kvartalsvis risikorapport til styret, policy-oppdateringer og dedikert governance-rådgiver.',
    longDesc: [
      'Med EU AI Act som trer i kraft og Norges nye KI-lov med sikte på august 2026, trenger bedrifter kontinuerlig overvåking og oppdatering av sine KI-systemer.',
      'Governance Partner gir deg en dedikert rådgiver som følger opp compliance, oppdaterer policyer ved nye krav, og leverer kvartalsvise risikorapporter til styret.',
      'Bøter kan nå opptil 7 % av global omsetning ved alvorlige brudd mot EU AI Act. Et godt compliance-system er ikke lenger valgfritt – det er en nødvendighet.',
    ],
    features: [
      'Løpende compliance-overvåking',
      'Kvartalsvis risikorapport til styret',
      'Policy-oppdateringer ved nye krav',
      'Dedikert governance-rådgiver',
      'Hendelseshåndtering og varsling',
    ],
    details: [
      'Norges nye KI-lov med sikte på august 2026 gjør dette til dokumentasjon som beskytter virksomheten.',
      'Bøter kan nå opptil 7 % av global omsetning ved alvorlige brudd.',
    ],
    benefits: [
      'Sanntidsoversikt over all KI-compliance',
      'Styreklar rapportering med ett klikk',
      'Automatisk varsling ved avvik',
      'Dokumentasjon som beskytter mot bøter',
    ],
    process: [
      'Behovsanalyse og tilpasning',
      'Konfigurasjon av varsler og terskler',
      'Opplæring av nøkkelpersonell',
      'Go-live og løpende support',
    ],
    highlight: true,
    imageKey: 'dashboard',
  },
  {
    slug: 'ki-strategi',
    icon: Award,
    shortTitle: 'ISO 42001 Light',
    title: 'ISO 42001 Light',
    subtitle: 'Sertifiseringsforløp tilpasset SMB',
    price: '75 000–150 000 kr',
    desc: 'Sertifiseringsforløp tilpasset norske SMB-er med dokumentasjonsrammeverk, internrevisjon og støtte gjennom hele prosessen.',
    longDesc: [
      'ISO 42001 er den internasjonale standarden for KI-styringssystemer. Sertifisering gir virksomheten et beviselig rammeverk for ansvarlig KI-bruk.',
      'KISA ISO 42001 Light er et skreddersydd forløp for norske SMB-er som vil oppnå sertifisering uten å drukne i byråkrati. Vi leverer dokumentasjonsrammeverk, gjennomfører internrevisjon, og støtter deg gjennom hele prosessen.',
      'Sertifiseringen gir konkurransefortrinn i anbud, styrker tilliten hos kunder og partnere, og dokumenterer overfor tilsynsmyndigheter at virksomheten tar KI-styring på alvor.',
    ],
    features: [
      'Sertifiseringsforløp tilpasset SMB',
      'Dokumentasjonsrammeverk',
      'Internrevisjon og gap-analyse',
      'Opplæring av nøkkelpersonell',
      'Støtte gjennom hele prosessen',
    ],
    details: [
      'Tidslinje: typisk 3-6 måneder avhengig av modenhetsnivå.',
      'Inkluderer forberedelse til ekstern revisjon.',
    ],
    benefits: [
      'Konkurransefortrinn i anbud og partnerskap',
      'Dokumentert KI-styring for tilsynsmyndigheter',
      'Strukturert rammeverk for hele organisasjonen',
      'Redusert risiko og økt tillit',
    ],
    process: [
      'Modenhetsvurdering og gap-analyse',
      'Dokumentasjonsutvikling',
      'Implementering av styringssystem',
      'Opplæring og internrevisjon',
      'Forberedelse til ekstern revisjon',
      'Sertifisering og oppfølging',
    ],
    imageKey: 'strategy',
  },
];
