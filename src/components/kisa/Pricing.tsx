import React from 'react';
import { Check } from 'lucide-react';
import { KisaButton } from './KisaButton';

interface Tier {
  name: string; subtitle: string; price: string; prefix: string; currency: string; period: string;
  desc: string; features: string[]; cta: string; highlight?: boolean; tag?: string;
  variant: 'ghost' | 'primary'; slug: string;
}

const tiers: Tier[] = [
  {
    slug: 'risikovurdering',
    name: 'KISA Risikovurdering', subtitle: 'Pilot', price: '24 900', prefix: '', currency: 'kr', period: 'engangsinvestering',
    desc: 'Et dypdykk i bedriftens nåværende KI-risiko. Perfekt første steg.',
    features: ['Shadow AI-scanning', 'Risikoklassifisering av eksisterende verktøy', 'Compliance gap-analyse mot EU AI Act', 'Executive summary med anbefalinger', '1 time strategimøte med KISA-ekspert'],
    cta: 'Book risikovurdering', variant: 'ghost',
  },
  {
    slug: 'infrastructure',
    name: 'KISA Infrastructure', subtitle: 'Oppsett', price: '75 000', prefix: 'fra', currency: 'kr', period: 'prosjektpris',
    desc: 'Bygging av sikret KI-arkitektur tilpasset bedriftens behov.',
    features: ['Full Agent-Audit™', 'Design og implementering av AI Firewall', 'Human-in-the-loop-protokoller', 'Integrasjon med eksisterende systemer', 'Ansatteopplæring (workshop)', 'Compliance Dashboard-oppsett', '3 måneders oppfølging inkludert'],
    cta: 'Planlegg oppsett', highlight: true, tag: 'Mest valgt', variant: 'primary',
  },
  {
    slug: 'governance-partner',
    name: 'KISA Styringspartner', subtitle: 'Løpende', price: '7 900', prefix: 'fra', currency: 'kr', period: 'mnd',
    desc: 'Kontinuerlig kontroll og compliance mens du fokuserer på drift.',
    features: ['24/7 overvåking via Compliance Dashboard', 'Månedlig sikkerhetsrapport', 'Kvartalsvis compliance-gjennomgang', 'Løpende oppdatering mot nye trusler og regulatoriske endringer', 'Prioritert support (4t responstid)', 'Halvårlig re-audit', 'Styrerapporter on-demand'],
    cta: 'Bli styringspartner', variant: 'ghost',
  },
];

export const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-paper-light relative overflow-hidden" id="pricing">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="text-brand font-bold tracking-widest uppercase text-xs mb-3 block">Prising</span>
            <h2 className="font-display font-normal text-3xl md:text-4xl text-foreground mb-6">Forsikring mot den uunngåelige KI-risikoen</h2>
            <p className="text-ink-light text-lg">Du forsikrer bygningen mot brann selv om du ikke forventer brann. KI-risiko er ikke et "om", men et "når". Forskjellen er at denne investeringen også gjør bedriften raskere og mer effektiv.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {tiers.map((tier) => (
              <article key={tier.name} className={`relative h-full rounded-lg p-8 border hover:border-brand/30 transition-all flex flex-col ${tier.highlight ? 'bg-paper-light border-brand shadow-[0_0_30px_3px_rgba(0,0,0,0.1)]' : 'bg-paper-light border-border shadow-sm'}`}>
                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{tier.tag}</div>
                )}
                <h3 className="font-display font-medium text-2xl text-foreground">{tier.name}</h3>
                <span className="text-sm font-bold text-brand block mb-4">{tier.subtitle}</span>
                <p className="text-ink-light text-sm mb-6 min-h-[2.5rem]">{tier.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  {tier.prefix && <span className="text-sm font-medium text-ink-light">{tier.prefix}</span>}
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-sm font-medium text-ink-light">{tier.currency}</span>
                  <span className="text-sm text-ink-light ml-1">/ {tier.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground/80"><Check className="w-5 h-5 text-brand shrink-0" />{f}</li>
                  ))}
                </ul>
                <div className="mt-auto space-y-3">
                  <KisaButton variant="outline" className="w-full" to={`/priser/${tier.slug}`}>Les mer</KisaButton>
                  <KisaButton variant={tier.variant} className="w-full" href="#contact">{tier.cta}</KisaButton>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-secondary" />
            <div className="relative z-10 p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h3 className="font-display font-medium text-2xl text-white mb-2">KISA Total</h3>
              <p className="text-white/60 mb-6">Risikovurdering + Infrastructure + 12 mnd Governance Partner</p>
              <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
                <span className="text-2xl line-through text-white/30">~194 700 kr</span>
                <span className="text-4xl font-bold text-brand-light">149 000 kr</span>
              </div>
              <p className="text-sm text-white/40 mb-8">Pakkerabatt 23 %. En partner, ett ansvar, null risiko.</p>
              <KisaButton href="#contact" variant="primary">Få pakketilbud</KisaButton>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
};
