import React, { useState } from 'react';
import { ShieldOff, FileSearch, Scale, Clock, ShieldCheck, AlertTriangle, FileText, CheckCircle, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KisaModal } from './KisaModal';
import { KisaButton } from './KisaButton';

interface Milestone { date: string; title: string; short: string; meaning: string; examples?: string[]; actions: string[]; icon: React.ElementType; }

const milestones: Milestone[] = [
  { date: 'Februar 2025', title: 'Forbudte KI-praksiser håndheves', short: 'Uakseptable KI-bruksmåter blir forbudt og kan sanksjoneres.', meaning: 'Uakseptable KI-bruksmåter blir forbudt og kan sanksjoneres.', examples: ['Manipulasjon', 'Sosial scoring', 'Utnyttelse av sårbare grupper (avhengig av definisjon i lovverket)'], actions: ['Kartlegg KI-bruk', 'Stopp eller erstatt risikabel praksis', 'Dokumenter beslutningen'], icon: ShieldOff },
  { date: 'August 2025', title: 'Krav til generelle KI-modeller trer i kraft', short: 'Transparens, datahåndtering, risikovurdering og styring blir sentrale krav.', meaning: 'Krav rundt transparens, datahåndtering, risikovurdering og styring for visse modelltyper.', actions: ['Sett leverandørkrav i innkjøp', 'Innfør logging', 'Stram tilgangsstyring', 'Lag tydelig policy for bruk av KI-verktøy'], icon: FileSearch },
  { date: 'August 2026', title: 'Full håndhevelse for høyrisiko KI-systemer', short: 'Høyrisiko-systemer må være revisjonsklare og ha menneskelig kontroll.', meaning: 'Høyrisiko-systemer må oppfylle krav til styring, dokumentasjon, overvåkning og menneskelig kontroll.', actions: ['Klassifisering', 'Teknisk dokumentasjon', 'Test og validering', 'Hendelseslogg', 'Human-in-the-loop', 'Intern revisjon'], icon: Scale },
  { date: '2027', title: 'Backstop-frist / standarder', short: 'Strammere etterlevelse forventes også der standarder har vært forsinket.', meaning: 'Strammere etterlevelse der standarder og krav er forsinket, men fortsatt forventes oppfylt.', actions: ['Gjennomfør gap-analyse', 'Oppdater rutiner', 'Kjør periodiske kontroller', 'Rapporter regelmessig til ledelsen'], icon: Clock },
];

const requirements = [
  'Risikovurdering: klassifiser alle KI-systemer (uakseptabel, høy, begrenset, minimal)',
  'Dokumentasjon: design, data, testing og ytelse for høyrisiko-systemer',
  'Transparens: tydelig informasjon når brukeren samhandler med KI',
  'Menneskelig tilsyn: mekanismer for inngripen ved kritiske beslutninger',
  'Regelmessig revisjon og dokumentasjon av etterlevelse',
];

const currentMilestoneIndex = 2;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' } }),
};

export const EUCompliance: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const active = milestones[activeIndex];

  const openMilestone = (index: number) => { setActiveIndex(index); setOpenModalIndex(index); };

  const progressPercent = ((currentMilestoneIndex + 0.5) / milestones.length) * 100;

  return (
    <section className="py-24 relative overflow-hidden" id="compliance">
      {/* Dark background */}
      <div className="absolute inset-0 bg-secondary" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-light font-bold tracking-widest uppercase text-xs mb-3 block">EU AI Act & Norge</span>
            <h2 className="font-display font-normal text-3xl md:text-4xl text-white mb-6">Norges nye KI-lov: Hva din bedrift må vite</h2>
            <p className="text-white/60 text-lg">Norge implementerer EU AI Act gjennom en ny norsk KI-lov. Regjeringen sikter mot ikrafttredelse i august 2026, med Nkom som koordinerende tilsynsmyndighet.</p>
          </motion.div>

          {/* Timeline */}
          <div className="mb-16">
            <h3 className="font-display font-medium text-2xl text-white mb-10 text-center">Tidslinjen</h3>

            {/* Desktop timeline */}
            <div className="hidden md:block relative mb-8">
              <div className="absolute top-6 left-[6%] right-[6%] h-1 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-dark via-brand to-brand-light"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-4 gap-5 relative">
                {milestones.map((item, idx) => {
                  const isPassed = idx < currentMilestoneIndex;
                  const isCurrent = idx === currentMilestoneIndex;
                  const isActive = activeIndex === idx;
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.date}
                      type="button"
                      onClick={() => openMilestone(idx)}
                      custom={idx}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-30px' }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className={`relative text-left rounded-lg border transition-all duration-300 cursor-pointer
                        ${isActive
                          ? 'bg-gradient-to-br from-brand to-brand-dark border-brand/50 shadow-[0_0_30px_-5px_hsl(var(--brand)/0.4)]'
                          : 'bg-white/[0.06] backdrop-blur-md border-white/10 hover:border-brand/30 hover:bg-white/[0.1]'
                        }`}
                      aria-pressed={isActive}
                    >
                      <div className="flex justify-start px-5 -mt-3">
                        <div className={`relative w-6 h-6 rounded-full flex items-center justify-center
                          ${isPassed ? 'bg-brand' : isCurrent ? 'bg-brand timeline-glow' : 'bg-white/20 border-2 border-white/30'}`}
                        >
                          {isPassed && <Check className="w-3.5 h-3.5 text-white" />}
                          {isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="p-5 pt-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3
                          ${isActive ? 'bg-white/20' : 'bg-brand/10'}`}>
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-brand-light'}`} />
                        </div>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isActive ? 'text-white/70' : 'text-brand-light'}`}>{item.date}</p>
                        <h4 className={`font-display font-medium text-lg leading-tight mb-2 ${isActive ? 'text-white' : 'text-white/90'}`}>{item.title}</h4>
                        <p className={`text-sm leading-relaxed ${isActive ? 'text-white/70' : 'text-white/50'}`}>{item.short}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile timeline */}
            <div className="md:hidden relative pl-10 space-y-4 mb-8">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 rounded-full bg-white/10">
                <div
                  className="w-full rounded-full bg-gradient-to-b from-brand-dark via-brand to-brand-light"
                  style={{ height: `${progressPercent}%` }}
                />
              </div>

              {milestones.map((item, idx) => {
                const isPassed = idx < currentMilestoneIndex;
                const isCurrent = idx === currentMilestoneIndex;
                const isActive = activeIndex === idx;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.date}
                    type="button"
                    onClick={() => openMilestone(idx)}
                    custom={idx}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`relative w-full text-left p-4 rounded-lg border transition-all duration-300
                      ${isActive
                        ? 'bg-gradient-to-br from-brand to-brand-dark border-brand/50 shadow-[0_0_25px_-5px_hsl(var(--brand)/0.4)]'
                        : 'bg-white/[0.06] backdrop-blur-md border-white/10'
                      }`}
                    aria-pressed={isActive}
                  >
                    <div className={`absolute -left-[1.85rem] top-5 w-5 h-5 rounded-full flex items-center justify-center
                      ${isPassed ? 'bg-brand' : isCurrent ? 'bg-brand timeline-glow' : 'bg-white/20 border-2 border-white/30'}`}
                    >
                      {isPassed && <Check className="w-3 h-3 text-white" />}
                      {isCurrent && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                        ${isActive ? 'bg-white/20' : 'bg-brand/10'}`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-light'}`} />
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-white/70' : 'text-brand-light'}`}>{item.date}</p>
                        <h4 className={`font-display font-medium text-lg leading-tight mb-1 ${isActive ? 'text-white' : 'text-white/90'}`}>{item.title}</h4>
                        <p className={`text-sm leading-relaxed ${isActive ? 'text-white/70' : 'text-white/50'}`}>{item.short}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Active milestone detail box */}
            <AnimatePresence mode="wait">
              <motion.article
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.06] backdrop-blur-md rounded-lg border border-white/10 p-6 md:p-8 border-l-4 border-l-brand"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-brand-light mb-2">Aktiv milepæl: {active.date}</p>
                <h4 className="font-display font-medium text-2xl md:text-3xl text-white mb-3">{active.title}</h4>
                <p className="text-white/60 leading-relaxed mb-5 text-lg">{active.short}</p>
                <motion.button
                  onClick={() => setOpenModalIndex(activeIndex)}
                  className="inline-flex items-center gap-2 text-brand-light font-bold hover:gap-3 transition-all duration-300"
                  whileHover={{ x: 4 }}
                >
                  Les mer <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Requirements & consequences */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="flex items-center gap-3 font-display font-medium text-2xl text-white mb-6">
                <FileText className="w-6 h-6 text-brand-light" />Krav du må forberede deg på
              </h3>
              <ul className="space-y-4">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /><span>{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <article className="bg-red-500/10 backdrop-blur-md p-6 rounded-lg border border-red-500/20">
                <h3 className="flex items-center gap-3 font-display font-medium text-xl text-red-300 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-400" />Konsekvenser ved brudd
                </h3>
                <p className="text-red-200/80 text-sm mb-3">Opptil 35 millioner euro eller 7 % av global årsomsetning for brudd på forbudte praksiser.</p>
                <p className="text-red-200/80 text-sm mb-3">Opptil 15 millioner euro eller 3 % for brudd på øvrige krav.</p>
                <p className="text-red-200/80 text-sm italic">Dette kan være strengere enn GDPR-bøter.</p>
              </article>
              <article className="bg-brand/10 backdrop-blur-md p-6 rounded-lg border border-brand/20">
                <h3 className="flex items-center gap-3 font-display font-medium text-xl text-brand-light mb-4">
                  <ShieldCheck className="w-5 h-5 text-brand-light" />SMB-vennlige tiltak og KISAs rolle
                </h3>
                <p className="text-white/60 text-sm mb-3">EU AI Act inkluderer reduserte krav og sandbox-tilgang for SMB-er. Norske virksomheter kan søke veiledning gjennom AI Norway Sandbox og Datatilsynets regulatoriske sandbox.</p>
                <p className="text-white/60 text-sm">KISA oversetter juridisk språk til konkrete tiltak. Du trenger ikke bli jurist, du trenger en partner som forstår teknologi, drift og regelverk i norsk kontekst.</p>
              </article>
            </motion.div>
          </div>
        </div>
      </div>

      <KisaModal isOpen={openModalIndex !== null} onClose={() => setOpenModalIndex(null)} title={openModalIndex !== null ? `${milestones[openModalIndex].date} - ${milestones[openModalIndex].title}` : 'Detaljer'}>
        {openModalIndex !== null && (
          <div className="space-y-5">
            <p>{milestones[openModalIndex].short}</p>
            <section><h4 className="font-display font-medium text-foreground text-lg mb-2">Hva betyr det?</h4><p>{milestones[openModalIndex].meaning}</p></section>
            {milestones[openModalIndex].examples && (
              <section><h4 className="font-display font-medium text-foreground text-lg mb-2">Eksempler</h4>
                <ul className="space-y-2">{milestones[openModalIndex].examples?.map((e) => <li key={e} className="flex gap-2"><span className="text-brand font-bold">•</span><span>{e}</span></li>)}</ul>
              </section>
            )}
            <section><h4 className="font-display font-medium text-foreground text-lg mb-2">Hva bedriften må gjøre</h4>
              <ul className="space-y-2">{milestones[openModalIndex].actions.map((a) => <li key={a} className="flex gap-2"><span className="text-brand font-bold">•</span><span>{a}</span></li>)}</ul>
            </section>
          </div>
        )}
      </KisaModal>
    </section>
  );
};
