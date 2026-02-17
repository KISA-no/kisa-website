import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/kisa/Navbar';
import { Footer } from '@/components/kisa/Footer';
import { KisaButton } from '@/components/kisa/KisaButton';
import { SubpageNav } from '@/components/kisa/SubpageNav';
import { reasons } from '@/data/reasons';

import shadowAiImg from '@/assets/reason-shadow-ai.jpg';
import firewallImg from '@/assets/reason-firewall.jpg';
import humanLoopImg from '@/assets/reason-human-loop.jpg';

const images: Record<string, string> = {
  'shadow-ai': shadowAiImg,
  firewall: firewallImg,
  'human-loop': humanLoopImg,
};

const ReasonDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const reason = reasons.find((r) => r.slug === slug);

  if (!reason) {
    return (
      <div className="min-h-screen bg-paper-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-3xl text-foreground mb-4">Siden ble ikke funnet</h1>
          <KisaButton to="/" variant="ghost">Tilbake til forsiden</KisaButton>
        </div>
      </div>
    );
  }

  const Icon = reason.icon;
  const img = images[reason.imageKey];

  const navItems = reasons.map((r) => ({ label: r.shortTitle, slug: r.slug }));

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand/20 selection:text-brand-dark">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <SubpageNav
              items={navItems}
              activeSlug={slug!}
              basePath="/hvorfor-kisa"
              backLabel="Tilbake til ressurser"
              backTo="/ressurser"
            />

            {/* Hero */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-brand font-medium text-xs uppercase tracking-widest">{reason.subtitle}</span>
                  <h1 className="font-display font-normal text-3xl md:text-5xl text-foreground">{reason.title}</h1>
                </div>
              </div>
              <p className="text-ink-light text-lg md:text-xl max-w-3xl mt-4 mb-10 leading-relaxed">{reason.teaser}</p>
            </motion.div>

            {/* Image */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-lg overflow-hidden mb-16 shadow-xl">
              <img src={img} alt={reason.title} className="w-full h-auto object-cover aspect-video" />
            </motion.div>

            {/* Long description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="space-y-6">
                <h2 className="font-display font-normal text-2xl text-foreground">Problemet i klartekst</h2>
                {reason.longDesc.map((p, i) => (
                  <p key={i} className="text-ink-light leading-relaxed">{p}</p>
                ))}
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-normal text-xl text-foreground mb-4">Fordeler med KISA</h3>
                  <ul className="space-y-3">
                    {reason.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                        <span className="text-foreground/80 font-medium">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* What KISA does */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-20">
              <h2 className="font-display font-normal text-2xl text-foreground mb-8 text-center">Hva KISA gjør</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {reason.actions.map((a) => (
                  <div key={a} className="bg-card rounded-lg p-5 border border-foreground/5 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{a}</span>
                  </div>
                ))}
              </div>
              {reason.details.length > 0 && (
                <div className="mt-6 bg-brand/5 border border-brand/20 rounded-lg p-6 space-y-2">
                  {reason.details.map((d) => (
                    <p key={d} className="text-ink-light text-sm">{d}</p>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Cost & ROI */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="grid md:grid-cols-2 gap-8 mb-20">
              <div className="bg-card rounded-lg p-8 border border-foreground/5">
                <h3 className="font-display font-normal text-xl text-foreground mb-4">Hva det koster deg</h3>
                <p className="text-ink-light leading-relaxed">{reason.cost}</p>
              </div>
              <div className="bg-brand/5 border border-brand/20 rounded-lg p-8">
                <h3 className="font-display font-normal text-xl text-foreground mb-4">Avkastning</h3>
                <p className="text-ink-light leading-relaxed">{reason.roi}</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="bg-secondary rounded-lg p-8 md:p-12 text-center text-secondary-foreground relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-display font-normal text-2xl md:text-3xl mb-4">Klar for å ta kontroll?</h2>
                <p className="text-secondary-foreground/70 max-w-2xl mx-auto mb-8">Book en gratis risikovurdering og få konkrete anbefalinger for din virksomhet.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <KisaButton href="#contact" variant="primary" icon>Book strategi-samtale</KisaButton>
                  <KisaButton to="/#services" variant="ghost" className="group">
                    Se tjenester<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </KisaButton>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReasonDetailPage;
