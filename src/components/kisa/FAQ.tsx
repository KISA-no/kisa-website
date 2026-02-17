import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'Hva innebærer en gratis risikovurdering konkret?', a: 'Vi kartlegger hvilke KI-verktøy som er i bruk, vurderer de største risikopunktene og gir deg tre prioriterte tiltak med tydelig neste steg.' },
  { q: 'Må vi være et stort selskap for å jobbe med KISA?', a: 'Nei. Tjenestene er laget for norske SMB-er, med nivåtilpasset innsats fra pilot til full governance-partner.' },
  { q: 'Hvilke systemer kan dere integrere mot?', a: 'Vi jobber blant annet med Tripletex, Fiken, PowerOffice, HubSpot, Pipedrive, Slack og Teams, i tillegg til tilpassede API-integrasjoner.' },
  { q: 'Når bør vi starte med EU AI Act-forberedelser?', a: 'Nå. Krav og forventninger er allerede operative i markedet, og full håndhevelse for høyrisiko-systemer nærmer seg august 2026.' },
  { q: 'Kan vi bruke KI raskt uten å miste kontroll?', a: 'Ja. Med AI Firewall, human-in-the-loop og tydelige beslutningsgrenser kan dere automatisere raskere uten å kompromittere sikkerhet eller compliance.' },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-paper-light relative overflow-hidden" id="faq">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="text-brand font-bold tracking-widest uppercase text-xs mb-3 block">FAQ</span>
            <h2 className="font-display font-normal text-3xl md:text-4xl text-foreground mb-6">Spørsmål ledelsen stiller før de tar beslutningen</h2>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, idx) => (
              <div key={faq.q} className="bg-paper-light rounded-lg border border-border overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex items-center justify-between p-6 text-left" aria-expanded={openIndex === idx}>
                  <span className="font-display font-medium text-lg text-foreground pr-8">{faq.q}</span>
                  {openIndex === idx ? <Minus className="text-brand shrink-0" /> : <Plus className="text-foreground/40 shrink-0" />}
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-6 text-ink-light leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
