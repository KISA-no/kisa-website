import { Search, ShieldCheck, UserCheck } from 'lucide-react';
import type { ComponentType } from 'react';

export interface ReasonData {
  slug: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  shortTitle: string;
  subtitle: string;
  teaser: string;
  problem: string;
  cost: string;
  actions: string[];
  roi: string;
  longDesc: string[];
  details: string[];
  benefits: string[];
  imageKey: string;
}

export const reasons: ReasonData[] = [
  {
    slug: 'stopp-shadow-ai',
    icon: Search,
    shortTitle: 'Shadow AI',
    title: '1. Stopp Shadow AI',
    subtitle: 'Vi finner det de ansatte allerede bruker',
    teaser: 'Ansatte bruker ofte KI via gratisverktøy og personlige kontoer uten innsyn eller kontroll.',
    problem: 'Ansatte bruker gratisverktøy, personlige kontoer og utvidelser uten innsyn. Resultatet er at kundedata, strategidokumenter og økonomiske analyser kan havne utenfor din kontroll.',
    cost: 'Shadow AI-relaterte datainnbrudd har svært høy kostnad, og revisjoner undersøker i økende grad styring av KI-verktøy og datahåndtering.',
    actions: [
      'KI-kartlegging av alle verktøy i bruk, godkjente og ikke-godkjente',
      'Risikoklassifisering mot EU AI Act og intern policy',
      'Handlingsplan: hva som kan fortsette, må sikres eller må stoppes',
      'Ansatt-onboarding med tydelig kommunikasjon og alternativer',
    ],
    roi: 'ROI: Styringsrammeverk for KI kan redusere innbruddskostnader kraftig. En investering i titusenklassen kan spare millioner.',
    longDesc: [
      'Shadow AI er et voksende problem for norske bedrifter. Ansatte bruker KI-verktøy som ChatGPT, Copilot, Gemini og andre gratistjenester uten at IT-avdelingen eller ledelsen har innsyn. Dette betyr at sensitiv bedriftsdata – kundeinfo, strategidokumenter, økonomiske analyser – potensielt deles med tredjeparter uten kontroll.',
      'Ifølge BlackFog 2026 bruker 86 % av ansatte KI ukentlig, og 34 % bruker gratisversjoner uten sikkerhet. Proofpoint rapporterer at 77 % av ansatte limer sensitiv bedriftsdata inn i KI-verktøy. IBM anslår at Shadow AI-hendelser koster i snitt 4,6 MNOK ekstra per datainnbrudd.',
      'KISA løser dette gjennom en systematisk tilnærming: vi kartlegger alt som er i bruk, klassifiserer risiko, lager en konkret handlingsplan, og hjelper med kommunikasjon til ansatte slik at overgangen blir smidig.',
    ],
    details: [
      'De fleste bedrifter oppdager at de har 3-5x flere KI-verktøy i bruk enn de trodde.',
      'En fullstendig Shadow AI-kartlegging tar typisk 1-2 uker og gir umiddelbar oversikt over risikoeksponering.',
    ],
    benefits: [
      'Full oversikt over alle KI-verktøy i bruk',
      'Redusert risiko for datalekkasjer via gratisverktøy',
      'Klare retningslinjer for ansatte',
      'Dokumentasjon for styret og tilsynsmyndigheter',
      'Grunnlag for informerte beslutninger om KI-investering',
    ],
    imageKey: 'shadow-ai',
  },
  {
    slug: 'ai-firewall',
    icon: ShieldCheck,
    shortTitle: 'AI Firewall',
    title: '2. AI Firewall',
    subtitle: 'Din digitale dørvakt',
    teaser: 'Autonome KI-agenter trenger kontinuerlig kontroll av input, output og tilgangsnivå.',
    problem: 'KI-agenter er autonome og ikke-deterministiske. De kan kalle API-er, flytte data og utløse handlinger. Prompt injection og andre angrep vokser raskt.',
    cost: 'KI-drevne angrep kan koste millioner per hendelse. Angripere kombinerer supply-chain-angrep, modellinversjon og modellunndragelse for å bryte seg inn.',
    actions: [
      'Input-filtrering av kommandoer og forespørsler',
      'Output-validering før handling eller brukerrespons',
      'Anomalideteksjon med sanntidsvarsling',
      'Minste privilegium for alle agenter og innebygd nødstopp-mekanisme',
    ],
    roi: 'ROI: Zero-trust-tilnærming reduserer gjennomsnittlig skadeomfang betydelig. Forebygging koster en brøkdel av opprydding.',
    longDesc: [
      'KI-agenter er fundamentalt forskjellige fra tradisjonell programvare. De er autonome, ikke-deterministiske, og kan ta beslutninger som utviklerne aldri forutså. Uten riktig kontroll kan en KI-agent kalle API-er, flytte data mellom systemer, og utløse handlinger som går langt utover det som var tiltenkt.',
      'Prompt injection – der angripere manipulerer KI-systemet gjennom skjulte instruksjoner – er en raskt voksende trussel. Kiteworks 2026-rapport viser at 63 % av bedrifter ikke kan begrense hva KI-agentene deres faktisk gjør, og 60 % ikke kan stoppe en agent som oppfører seg uventet.',
      'KISAs AI Firewall er en komplett sikkerhetsarkitektur som filtrerer input, validerer output, overvåker for anomalier, og sikrer at alle agenter opererer med minste mulige privilegium. Med innebygd nødstopp-mekanisme kan du alltid ta kontroll tilbake.',
    ],
    details: [
      'AI Firewall bygges som en separat sikkerhetslaag rundt dine KI-agenter, uavhengig av leverandør.',
      'Designet etter zero-trust-prinsipper med logging og audit trail for alle agenthandlinger.',
    ],
    benefits: [
      'Kontroll over hva KI-agenter kan og ikke kan gjøre',
      'Beskyttelse mot prompt injection og manipulasjon',
      'Sanntidsvarsling ved uventet oppførsel',
      'Nødstopp-mekanisme for kritiske situasjoner',
      'Full audit trail for compliance og gransking',
    ],
    imageKey: 'firewall',
  },
  {
    slug: 'human-in-the-loop',
    icon: UserCheck,
    shortTitle: 'Human-in-the-Loop',
    title: '3. Human-in-the-Loop',
    subtitle: 'KI foreslår, mennesker beslutter',
    teaser: 'Kritiske beslutninger trenger klare grenser for hva KI kan gjøre selvstendig.',
    problem: 'Full automatisering uten styringsrammer gir tap av kontroll over beslutninger som påvirker kunder, ansatte og bunnlinje.',
    cost: 'Komfort med autonome beslutninger uten klare eskaleringsregler øker risiko for feil, svikt i tillit og regulatoriske avvik.',
    actions: [
      'Beslutningskartlegging: hva KI kan gjøre selv og hva som må godkjennes',
      'Eskaleringsprotokoller med full kontekst til rett person',
      'Revisjonslogg for KI-beslutninger og overstyringer',
      'Forklarbarhet og gradvis autonomi basert på dokumentert ytelse',
    ],
    roi: 'ROI: Ansvarlig KI med governance gir høyere avkastning fordi virksomheten tør automatisere prosesser med høyere verdi.',
    longDesc: [
      'Full automatisering høres attraktivt ut – men uten klare grenser for hva KI kan beslutte selvstendig, risikerer bedriften tap av kontroll over beslutninger som direkte påvirker kunder, ansatte og bunnlinje.',
      'Human-in-the-loop betyr ikke at mennesker må godkjenne alt. Det betyr at det finnes tydelige regler for når KI kan handle selvstendig, og når en person må involveres. De mest vellykkede KI-implementeringene har akkurat denne balansen.',
      'KISAs tilnærming starter med beslutningskartlegging – vi identifiserer hvilke beslutninger som kan automatiseres trygt, og hvilke som krever menneskelig godkjenning. Deretter setter vi opp eskaleringsprotokoller, revisjonslogger, og gradvis autonomi basert på dokumentert ytelse over tid.',
    ],
    details: [
      'Gradvis autonomi betyr at KI-systemet får mer ansvar etter hvert som det beviser pålitelighet.',
      'Alle beslutninger logges med full kontekst for gransking og læring.',
    ],
    benefits: [
      'Trygg automatisering av høyverdiprosesser',
      'Klare eskaleringsregler for kritiske beslutninger',
      'Full revisjonsspor for compliance',
      'Gradvis økt effektivitet uten økt risiko',
      'Tillit fra kunder, ansatte og tilsynsmyndigheter',
    ],
    imageKey: 'human-loop',
  },
];
