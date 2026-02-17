import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, ShieldCheck, BarChart3 } from 'lucide-react';

const props = [
  { icon: ClipboardCheck, title: 'Dokumenterbar styring', desc: 'Alle KI-prosesser dokumentert og sporbare for tilsyn og revisjon.' },
  { icon: ShieldCheck, title: 'Redusert risiko', desc: 'Proaktiv risikovurdering som beskytter mot bøter, datalekkasjer og omdømmetap.' },
  { icon: BarChart3, title: 'Styreklar rapportering', desc: 'Rapporter som styret forstår – med risikoscore, status og anbefalinger.' },
];

export const ValueProps: React.FC = () => (
  <section className="py-24 bg-paper-light relative overflow-hidden" id="value">
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="font-display font-normal text-3xl md:text-4xl text-foreground leading-[1.2]">
          Vi selger ikke frykt.<br />Vi selger kontroll.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {props.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-paper-light rounded-lg p-8 shadow-sm border border-border text-center"
          >
            <div className="w-14 h-14 mx-auto mb-5 bg-brand-light/15 rounded-lg flex items-center justify-center">
              <item.icon className="w-7 h-7 text-brand" />
            </div>
            <h3 className="font-display font-medium text-xl text-foreground mb-3">{item.title}</h3>
            <p className="text-ink-light leading-relaxed">{item.desc}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
