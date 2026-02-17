import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calculator, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const formatNOK = (n: number) =>
  new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 }).format(n);

export const ROICalculator: React.FC = () => {
  const [employees, setEmployees] = useState(50);
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const shadowAIPct = 0.86;
  const incidentRate = 0.12;
  const avgCostPerIncident = 46000;
  const kisaReduction = 0.82;

  const usersAtRisk = Math.round(employees * shadowAIPct);
  const annualRiskCost = Math.round(usersAtRisk * incidentRate * avgCostPerIncident);
  const savedWithKisa = Math.round(annualRiskCost * kisaReduction);

  return (
    <section className="py-24 bg-paper relative overflow-hidden" id="roi">
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          className="max-w-4xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand font-bold tracking-widest uppercase text-xs mb-3 block">ROI-kalkulator</span>
          <h2 className="font-display font-normal text-3xl md:text-4xl text-foreground mb-6">Hva koster Shadow AI bedriften din?</h2>
          <p className="text-ink-light text-lg">Juster antall ansatte og se estimert risikokostnad — og besparelse med KISA.</p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto bg-paper-light border border-border rounded-lg p-8 md:p-12 shadow-[0_0_30px_3px_rgba(0,0,0,0.08)]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Slider */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 font-bold text-foreground">
                <Users className="w-5 h-5 text-brand" />
                Antall ansatte
              </label>
              <span className="font-display text-2xl font-normal text-brand">{employees}</span>
            </div>
            <Slider
              value={[employees]}
              onValueChange={(v) => setEmployees(v[0])}
              min={10}
              max={500}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>10</span>
              <span>500</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-6 text-center">
              <TrendingDown className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Ansatte med Shadow AI</p>
              <p className="font-display text-3xl font-normal text-red-400">{usersAtRisk}</p>
            </div>
            <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-6 text-center">
              <Calculator className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Estimert årlig risikokostnad</p>
              <p className="font-display text-2xl font-normal text-red-400">{formatNOK(annualRiskCost)}</p>
            </div>
            <div className="bg-brand/5 border border-brand/20 rounded-lg p-6 text-center">
              <TrendingUp className="w-6 h-6 text-brand mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Besparelse med KISA</p>
              <p className="font-display text-2xl font-normal text-brand">{formatNOK(savedWithKisa)}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Estimatene er basert på bransjerapporter fra IBM, Kiteworks og BlackFog. Faktisk risiko varierer.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
