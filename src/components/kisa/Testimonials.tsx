import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingDown, Shield, FileCheck } from 'lucide-react';

const cases = [
  {
    quote: 'Etter Shadow AI-kartlegging fikk vi kontroll på verktøyene som var i bruk, og kunne stoppe datadeling via personlige kontoer.',
    author: 'COO, norsk SMB',
    role: 'Case fra risikovurdering',
    metric: 'Reduserte Shadow AI-hendelser med 89 %',
    metricIcon: TrendingDown,
    initials: 'AL',
  },
  {
    quote: 'AI Firewall ga oss en faktisk nødstopp-mekanisme og tydelig tilgangsstyring. Det senket risikoen uten å bremse leveransene.',
    author: 'CTO, B2B-selskap',
    role: 'Case fra Infrastructure-oppsett',
    metric: '100 % agent-kontroll fra dag 1',
    metricIcon: Shield,
    initials: 'MK',
  },
  {
    quote: 'Med human-in-the-loop og dashboard har vi styreklar dokumentasjon på beslutninger, overstyringer og compliance-status.',
    author: 'CFO, tjenestevirksomhet',
    role: 'Case fra Governance Partner',
    metric: 'Styreklar rapport på under 2 uker',
    metricIcon: FileCheck,
    initials: 'ES',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

export const Testimonials: React.FC = () => (
  <section className="py-24 relative overflow-hidden" id="results">
    {/* Purple gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-light" />

    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-white/70 font-bold tracking-widest uppercase text-xs mb-3 block">Resultater</span>
        <h2 className="font-display font-normal text-3xl md:text-4xl text-white mb-6">Fra usynlig risiko til styrbar drift</h2>
        <p className="text-white/70 text-lg">Kundene bruker KISA for å få dokumenterbar kontroll, ikke bare gode intensjoner.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {cases.map((item, idx) => (
          <motion.article
            key={item.author}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white rounded-lg p-8 flex flex-col h-full shadow-[0_0_30px_3px_rgba(0,0,0,0.15)] hover:shadow-xl transition-all"
          >
            {/* Metric badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-xs font-bold text-brand mb-6 w-fit">
              <item.metricIcon className="w-3.5 h-3.5" />
              {item.metric}
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand text-brand" />)}
            </div>
            <blockquote className="font-display text-lg text-ink font-normal mb-8 flex-1 leading-relaxed italic">"{item.quote}"</blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold text-sm">
                {item.initials}
              </div>
              <div>
                <cite className="not-italic font-bold text-ink block text-sm">{item.author}</cite>
                <span className="text-xs text-ink-light">{item.role}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
