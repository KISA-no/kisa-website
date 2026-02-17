export interface PricingTierData {
  slug: string;
  name: string;
  subtitle: string;
  price: string;
  prefix: string;
  currency: string;
  period: string;
  desc: string;
  longDesc: string[];
  features: string[];
  details: string[];
  included: string[];
  notIncluded: string[];
  idealFor: string[];
  cta: string;
  highlight?: boolean;
  tag?: string;
  variant: 'ghost' | 'primary';
}

export const pricingTiers: PricingTierData[] = [
  {
    slug: 'risikovurdering',
    name: 'KISA Risikovurdering',
    subtitle: 'Pilot',
    price: '24 900',
    prefix: '',
    currency: 'kr',
    period: 'engangsinvestering',
    desc: 'Et dypdykk i bedriftens nåværende KI-risiko. Perfekt første steg.',
    longDesc: [
      'KISA Risikovurdering er det ideelle første steget for bedrifter som vil forstå sin KI-risiko før de investerer videre. Vi gjennomfører en grundig analyse av alle KI-verktøy i bruk, identifiserer Shadow AI, og leverer en konkret risikoklassifisering.',
      'Resultatet er en executive summary med tydelige anbefalinger som gir ledelsen grunnlaget for informerte beslutninger om KI-strategi og sikkerhet.',
      'Denne vurderingen dekker også compliance gap-analyse mot EU AI Act, slik at du vet nøyaktig hvor bedriften står i forhold til kommende lovkrav.',
    ],
    features: [
      'Shadow AI-scanning',
      'Risikoklassifisering av eksisterende verktøy',
      'Compliance gap-analyse mot EU AI Act',
      'Executive summary med anbefalinger',
      '1 time strategimøte med KISA-ekspert',
    ],
    details: ['Ideell for bedrifter som vil forstå risiko før videre investering.'],
    included: [
      'Komplett Shadow AI-kartlegging',
      'Risikoklassifisering (trafikklys)',
      'EU AI Act gap-analyse',
      'Executive summary (PDF)',
      '1 time strategimøte',
      '30 dager e-post-support',
    ],
    notIncluded: [
      'Implementering av tiltak',
      'Løpende overvåking',
      'Dashboard-tilgang',
      'Ansatteopplæring',
    ],
    idealFor: [
      'Bedrifter som er usikre på sin KI-eksponering',
      'Ledere som trenger dokumentasjon for styret',
      'Virksomheter som vurderer KI-investeringer',
      'Bedrifter som vil forberede seg på EU AI Act',
    ],
    cta: 'Book risikovurdering',
    variant: 'ghost',
  },
  {
    slug: 'infrastructure',
    name: 'KISA Infrastructure',
    subtitle: 'Oppsett',
    price: '75 000',
    prefix: 'fra',
    currency: 'kr',
    period: 'prosjektpris',
    desc: 'Bygging av sikret KI-arkitektur tilpasset bedriftens behov.',
    longDesc: [
      'KISA Infrastructure er den mest valgte pakken vår – og med god grunn. Her bygger vi den komplette KI-sikkerhetsarkitekturen bedriften trenger, tilpasset deres spesifikke systemer og prosesser.',
      'Vi starter med en full Agent-Audit™, designer og implementerer AI Firewall, setter opp human-in-the-loop-protokoller, og integrerer alt med eksisterende systemer. Inkludert er også en ansatteworkshop og oppsett av Compliance Dashboard.',
      '3 måneder med oppfølging er inkludert for å sikre at alt fungerer optimalt og at organisasjonen er komfortabel med de nye systemene.',
    ],
    features: [
      'Full Agent-Audit™',
      'Design og implementering av AI Firewall',
      'Human-in-the-loop-protokoller',
      'Integrasjon med eksisterende systemer',
      'Ansatteopplæring (workshop)',
      'Compliance Dashboard-oppsett',
      '3 måneders oppfølging inkludert',
    ],
    details: ['Ideell for bedrifter som skal rulle ut KI-agenter eller trenger kontroll på eksisterende.'],
    included: [
      'Komplett Agent-Audit™',
      'AI Firewall design og implementering',
      'Human-in-the-loop konfigurasjon',
      'Systemintegrasjon',
      'Ansatteworkshop (2-4 timer)',
      'Compliance Dashboard',
      '3 mnd oppfølging og support',
      'Dokumentasjon og runbooks',
    ],
    notIncluded: [
      'Løpende overvåking etter 3 mnd',
      'Styrerapporter on-demand',
      'Kvartalsvis compliance-gjennomgang',
      'Re-audit etter 3 mnd',
    ],
    idealFor: [
      'Bedrifter som skal rulle ut KI-agenter',
      'Virksomheter med eksisterende KI-systemer uten kontroll',
      'Selskaper som trenger compliance-infrastruktur',
      'Organisasjoner som vil bygge sikker KI-kultur',
    ],
    cta: 'Planlegg oppsett',
    highlight: true,
    tag: 'Mest valgt',
    variant: 'primary',
  },
  {
    slug: 'governance-partner',
    name: 'KISA Styringspartner',
    subtitle: 'Løpende',
    price: '7 900',
    prefix: 'fra',
    currency: 'kr',
    period: 'mnd',
    desc: 'Kontinuerlig kontroll og compliance mens du fokuserer på drift.',
    longDesc: [
      'KISA Governance Partner er for bedrifter med aktive KI-systemer som trenger kontinuerlig kontroll og compliance. Vi overvåker, rapporterer og oppdaterer slik at du kan fokusere på det du gjør best.',
      'Med 24/7 overvåking, månedlige sikkerhetsrapporter og kvartalsvis compliance-gjennomgang sørger vi for at bedriften alltid er oppdatert og beskyttet mot nye trusler og regulatoriske endringer.',
      'Styrerapporter on-demand betyr at du aldri trenger å stresse med compliance-dokumentasjon til styremøter – vi har det klart når du trenger det.',
    ],
    features: [
      '24/7 overvåking via Compliance Dashboard',
      'Månedlig sikkerhetsrapport',
      'Kvartalsvis compliance-gjennomgang',
      'Løpende oppdatering mot nye trusler og regulatoriske endringer',
      'Prioritert support (4t responstid)',
      'Halvårlig re-audit',
      'Styrerapporter on-demand',
    ],
    details: ['Ideell for bedrifter med aktive KI-systemer som trenger kontinuerlig kontroll og compliance.'],
    included: [
      '24/7 Compliance Dashboard',
      'Månedlig sikkerhetsrapport',
      'Kvartalsvis compliance-gjennomgang',
      'Løpende trusseloppdatering',
      'Prioritert support (4t responstid)',
      'Halvårlig re-audit',
      'Styrerapporter on-demand',
      'Dedikert KISA-rådgiver',
    ],
    notIncluded: [
      'Initialoppsett (se Infrastructure)',
      'Ansatteopplæring',
      'Ny systemintegrasjon',
    ],
    idealFor: [
      'Bedrifter med aktive KI-systemer',
      'Virksomheter som trenger løpende compliance',
      'Organisasjoner med styrekrav til KI-rapportering',
      'Bedrifter i regulerte bransjer',
    ],
    cta: 'Bli styringspartner',
    variant: 'ghost',
  },
];
