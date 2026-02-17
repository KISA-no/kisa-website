import React from 'react';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, FileText, Settings, CheckCircle } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Kartlegging', duration: '14 dager', desc: 'Identifiserer all KI-bruk i bedriften.' },
  { icon: AlertTriangle, title: 'Risikovurdering', duration: '7 dager', desc: 'Klassifiserer risiko og prioriterer tiltak.' },
  { icon: FileText, title: 'Policy & roller', duration: '14 dager', desc: 'Utformer retningslinjer og ansvarsfordeling.' },
  { icon: Settings, title: 'Implementering', duration: '30 dager', desc: 'Setter opp kontroller og overvåking.' },
  { icon: CheckCircle, title: 'Styreklar rapport', duration: 'Compliant', desc: 'Dokumentasjon klar for styre og tilsyn.', highlight: true },
];

export const Process: React.FC = () => (
  <section className="py-24 bg-paper-light relative overflow-hidden" id="process">
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="font-display font-normal text-3xl md:text-4xl text-foreground mb-6 leading-[1.2]">
          Fra risiko til kontroll på 90 dager
        </h2>
      </div>

      {/* Desktop staircase layout */}
      <div className="hidden md:block max-w-5xl mx-auto">
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ marginLeft: `${i * 12}%` }}
            >
              <div className={`flex items-center gap-5 p-5 rounded-lg border transition-shadow max-w-md ${step.highlight
                  ? 'bg-gradient-to-r from-brand to-brand-light border-brand/30 shadow-lg shadow-brand/20'
                  : 'bg-paper-light border-border shadow-sm'
                }`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${step.highlight ? 'bg-primary-foreground/20' : 'bg-brand-light/15'
                  }`}>
                  <step.icon className={`w-6 h-6 ${step.highlight ? 'text-primary-foreground' : 'text-brand'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className={`font-display font-medium text-lg ${step.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
                      {step.title}
                    </h3>
                    <span className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap ${step.highlight ? 'text-primary-foreground/80' : 'text-brand'
                      }`}>{step.duration}</span>
                  </div>
                  <p className={`text-sm ${step.highlight ? 'text-primary-foreground/70' : 'text-ink-light'}`}>{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile vertical layout */}
      <div className="md:hidden space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`flex items-center gap-4 p-4 rounded-lg border ${step.highlight
                ? 'bg-gradient-to-r from-brand to-brand-light border-brand/30'
                : 'bg-paper-light border-border'
              }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${step.highlight ? 'bg-primary-foreground/20' : 'bg-brand-light/15'
              }`}>
              <step.icon className={`w-5 h-5 ${step.highlight ? 'text-primary-foreground' : 'text-brand'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`font-display font-medium ${step.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{step.title}</h3>
                <span className={`text-xs font-bold ${step.highlight ? 'text-primary-foreground/80' : 'text-brand'}`}>{step.duration}</span>
              </div>
              <p className={`text-sm ${step.highlight ? 'text-primary-foreground/70' : 'text-ink-light'}`}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
