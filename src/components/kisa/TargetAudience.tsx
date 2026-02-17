import React from 'react';
import { motion } from 'framer-motion';
import { Users, Cpu, Calculator, Briefcase } from 'lucide-react';

const audiences = [
  { icon: Users, title: '10–150 ansatte', desc: 'Vekstbedrifter som bruker KI men mangler styringsrammeverk.' },
  { icon: Cpu, title: 'Teknologi & tjenestebedrifter', desc: 'Selskaper som utvikler eller integrerer KI i sine produkter.' },
  { icon: Calculator, title: 'Regnskapskontor', desc: 'Automatiserer med KI og trenger compliance-dokumentasjon.' },
  { icon: Briefcase, title: 'Konsulentselskaper', desc: 'Rådgivere som vil tilby KI-styring til sine kunder.' },
];

export const TargetAudience: React.FC = () => (
  <section className="py-24 bg-paper relative overflow-hidden" id="audience">
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="font-display font-normal text-3xl md:text-4xl text-foreground leading-[1.2]">
          For norske vekstbedrifter
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {audiences.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-paper-light rounded-lg p-6 border border-border shadow-sm flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-brand-light/15 rounded-lg flex items-center justify-center shrink-0">
              <item.icon className="w-6 h-6 text-brand" />
            </div>
            <div>
              <h3 className="font-display font-medium text-lg text-foreground mb-1">{item.title}</h3>
              <p className="text-ink-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
