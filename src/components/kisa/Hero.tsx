import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart3, ShieldCheck, FileCheck } from 'lucide-react';
import { KisaButton } from './KisaButton';

const MockCard = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={`bg-paper-light border border-border rounded-lg shadow-[0_0_30px_3px_rgba(0,0,0,0.08)] ${className}`}
  >
    {children}
  </motion.div>
);

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-paper-light" id="hero">
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-brand uppercase">EU AI Act • August 2026</span>
            </div>

            <h1 className="font-display font-normal text-[2.75rem] md:text-5xl lg:text-[3.5rem] leading-[1.15] text-ink mb-6">
              <span className="text-brand relative">
                Kontroll
              </span>{' '}
              over KI-bruk
            </h1>

            <p className="text-lg md:text-xl text-ink-lighter mb-10 max-w-xl leading-relaxed">
              KISA hjelper norske SMB-er med strukturert KI-styring – før regulatoriske krav blir et problem.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="din@epost.no"
                className="flex-1 px-4 py-3 border border-border rounded bg-paper-light text-ink placeholder:text-ink-lighter text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
              <KisaButton variant="sharp" href="#contact" chevron className="text-sm px-6 py-3 whitespace-nowrap">
                Kom i gang
              </KisaButton>
            </div>
          </motion.div>

          {/* Right – mockup cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
            style={{ perspective: '1200px' }}
          >
            <div className="relative" style={{ transform: 'rotateY(-8deg) rotateX(4deg)' }}>
              {/* Risk matrix card */}
              <MockCard className="p-5 mb-4" delay={0.3}>
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-brand" />
                  <span className="font-display font-medium text-ink text-sm">Risikomatrise</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['Lav', 'Middels', 'Høy'].map((level, i) => (
                    <div key={level} className={`text-center py-2 rounded-lg text-xs font-bold ${i === 0 ? 'bg-green-100 text-green-700' : i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>{level}</div>
                  ))}
                </div>
              </MockCard>

              {/* Compliance checklist */}
              <MockCard className="p-5 mb-4 ml-8" delay={0.5}>
                <div className="flex items-center gap-3 mb-3">
                  <FileCheck className="w-5 h-5 text-brand" />
                  <span className="font-display font-medium text-ink text-sm">Compliance-sjekk</span>
                </div>
                <div className="space-y-2">
                  {['GDPR-dokumentasjon', 'Risikovurdering utført', 'Human-in-the-loop'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-ink-light">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </MockCard>

              {/* Dashboard card */}
              <MockCard className="p-5 ml-4" delay={0.7}>
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-brand" />
                  <span className="font-display font-medium text-ink text-sm">Governance Score</span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-display font-bold text-3xl text-brand">87%</span>
                  <span className="text-xs text-ink-lighter mb-1">Compliant</span>
                </div>
                <div className="w-full bg-paper-dark rounded-full h-2 mt-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '87%' }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </div>
              </MockCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
