import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedStatProps {
  value: string;
  inView: boolean;
}

const parseStatValue = (stat: string): { prefix: string; number: number; suffix: string; decimals: number } => {
  const mnokMatch = stat.match(/^([\d,]+)\s*(MNOK)$/);
  if (mnokMatch) {
    const num = parseFloat(mnokMatch[1].replace(',', '.'));
    return { prefix: '', number: num, suffix: ' MNOK', decimals: 1 };
  }
  const pctMatch = stat.match(/^(\d+)\s*%$/);
  if (pctMatch) {
    return { prefix: '', number: parseInt(pctMatch[1]), suffix: ' %', decimals: 0 };
  }
  return { prefix: '', number: 0, suffix: stat, decimals: 0 };
};

const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, inView }) => {
  const [displayed, setDisplayed] = useState('0');
  const parsed = parseStatValue(value);

  useEffect(() => {
    if (!inView || parsed.number === 0) {
      if (parsed.number === 0) setDisplayed(value);
      return;
    }

    let start = 0;
    const end = parsed.number;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      if (parsed.decimals > 0) {
        setDisplayed(current.toFixed(parsed.decimals).replace('.', ',') + parsed.suffix);
      } else {
        setDisplayed(Math.round(current) + parsed.suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span>{displayed}</span>;
};

const facts = [
  { stat: '100 %', text: 'av virksomheter har agentic KI på veikartet for 2026', source: 'Kiteworks / Dasera 2026' },
  { stat: '63 %', text: 'kan ikke begrense hva KI-agentene deres faktisk gjør', source: 'Kiteworks 2026' },
  { stat: '60 %', text: 'kan ikke stoppe en KI-agent som oppfører seg uventet', source: 'Kiteworks 2026' },
  { stat: '86 %', text: 'av ansatte bruker KI ukentlig, og 34 % bruker gratisversjoner uten sikkerhet', source: 'BlackFog 2026' },
  { stat: '77 %', text: 'av ansatte limer sensitiv bedriftsdata inn i KI-verktøy', source: 'Proofpoint 2025' },
  { stat: '4,6 MNOK', text: 'i ekstra kostnad ved datainnbrudd knyttet til shadow AI-hendelser', source: 'IBM Cost of Data Breach 2025' },
  { stat: '7 %', text: 'maks bøtenivå av global omsetning under ny KI-lovgivning', source: 'EU AI Act / Regjeringen' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export const Stats: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="py-24 relative overflow-hidden" id="cost">
      <div className="absolute inset-0 bg-secondary" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          className="max-w-4xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-light font-bold tracking-widest uppercase text-xs mb-3 block">Sjokkfakta</span>
          <h2 className="font-display font-normal text-3xl md:text-4xl text-white mb-6">Tallene bedriften din ikke har råd til å ignorere</h2>
          <p className="text-white/60 text-lg">Formålet er enkelt: skape urgency fra første sekund og gjøre risikoen målbar.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {facts.map((fact, idx) => (
            <motion.article
              key={fact.stat + fact.text}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-lg p-6 hover:border-brand/30 transition-colors"
            >
              <p className="font-display text-4xl text-brand-light font-normal mb-3">
                <AnimatedStat value={fact.stat} inView={isInView} />
              </p>
              <p className="text-white/80 leading-relaxed mb-3">{fact.text}</p>
              <p className="text-xs uppercase tracking-wider text-white/40">Kilde: {fact.source}</p>
            </motion.article>
          ))}
        </div>

        <motion.blockquote
          className="mt-12 p-6 md:p-8 border border-brand/30 bg-brand/10 backdrop-blur-md rounded-lg text-white/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          «De fleste bedrifter kan observere at en KI-agent gjør noe uventet. De kan ikke hindre den i å overskride
          sin autoriserte rolle, stoppe den raskt, eller isolere den fra sensitive systemer. De har bygget utkikksposter
          for et problem som krever nødstopp-knapper.»
          <footer className="mt-4 text-sm text-white/40">Kiteworks, 2026 Data Security Forecast</footer>
        </motion.blockquote>
      </div>
    </section>
  );
};
