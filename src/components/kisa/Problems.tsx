import React from 'react';
import { motion } from 'framer-motion';
import { EyeOff, Scale, FileX, Gavel } from 'lucide-react';

const problems = [
  { icon: EyeOff, title: 'Ingen oversikt', desc: 'Ansatte bruker KI-verktøy uten at ledelsen vet om det.' },
  { icon: Scale, title: 'Juridisk risiko', desc: 'Sensitive data deles med KI uten risikovurdering.' },
  { icon: FileX, title: 'Manglende dokumentasjon', desc: 'Ingen policy, ingen logg, ingen sporbarhet.' },
  { icon: Gavel, title: 'KI-loven kommer', desc: 'EU AI Act stiller krav fra august 2026.' },
];

export const Problems: React.FC = () => {
  return (
    <section className="py-24 bg-paper relative overflow-hidden" id="problems">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-display font-normal text-3xl md:text-[1.875rem] lg:text-4xl text-foreground mb-6 leading-[1.2]">
            SMB bruker KI. Men har dere kontroll?
          </h2>
          <p className="text-ink-light text-lg max-w-2xl mx-auto">
            De fleste bedrifter bruker ChatGPT, Copilot og KI-verktøy daglig – uten oversikt, retningslinjer eller risikovurdering.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {problems.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-paper-light rounded-lg p-6 shadow-sm border border-border text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-brand-light/15 rounded-lg flex items-center justify-center">
                <item.icon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="font-display font-medium text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-ink-light text-sm leading-relaxed">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
