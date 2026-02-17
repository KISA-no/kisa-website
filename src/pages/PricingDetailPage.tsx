import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/kisa/Navbar';
import { Footer } from '@/components/kisa/Footer';
import { KisaButton } from '@/components/kisa/KisaButton';
import { SubpageNav } from '@/components/kisa/SubpageNav';
import { pricingTiers } from '@/data/pricing';

const PricingDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tier = pricingTiers.find((t) => t.slug === slug);

  if (!tier) {
    return (
      <div className="min-h-screen bg-paper-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-3xl text-foreground mb-4">Prisplan ikke funnet</h1>
          <KisaButton to="/" variant="ghost">Tilbake til forsiden</KisaButton>
        </div>
      </div>
    );
  }

  // Determine layout position based on tier index for zigzag
  const tierIndex = pricingTiers.findIndex((t) => t.slug === slug);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand/20 selection:text-brand-dark">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <SubpageNav
              items={pricingTiers.map((t) => ({ label: t.name.replace('KISA ', ''), slug: t.slug }))}
              activeSlug={slug!}
              basePath="/priser"
              backLabel="Tilbake til priser"
              backTo="/#pricing"
            />

            <div className="space-y-20">

              {/* Block 1: Hero info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <span className="text-brand font-medium text-xs uppercase tracking-widest block mb-2">{tier.subtitle}</span>
                  <h1 className="font-display font-normal text-3xl md:text-5xl text-foreground mb-4">{tier.name}</h1>
                  <p className="text-ink-light text-lg leading-relaxed mb-6">{tier.desc}</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    {tier.prefix && <span className="text-sm font-medium text-ink-light">{tier.prefix}</span>}
                    <span className="text-5xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-lg font-medium text-ink-light">{tier.currency}</span>
                    <span className="text-sm text-ink-light">/ {tier.period}</span>
                  </div>
                  <KisaButton href="#contact" variant="primary" icon className="mb-4">{tier.cta}</KisaButton>
                </div>
                <div className="bg-card rounded-lg p-8 border border-foreground/5 shadow-lg">
                  <h3 className="font-display font-normal text-lg text-foreground mb-4">Om denne planen</h3>
                  {tier.longDesc.map((p, i) => (
                    <p key={i} className="text-ink-light leading-relaxed mb-4">{p}</p>
                  ))}
                </div>
              </motion.div>

              {/* Block 2: Features included */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="grid md:grid-cols-2 gap-12 items-start">
                <div className="md:order-2">
                  <h2 className="font-display font-normal text-2xl text-foreground mb-6">Alt som er inkludert</h2>
                  <ul className="space-y-3">
                    {tier.included.map((f) => (
                      <li key={f} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-foreground/5">
                        <Check className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                        <span className="text-foreground/80 font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:order-1">
                  <h2 className="font-display font-normal text-2xl text-foreground mb-6">Ikke inkludert</h2>
                  <ul className="space-y-3">
                    {tier.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-3 bg-card/50 rounded-lg p-4 border border-foreground/5">
                        <X className="w-5 h-5 text-ink-lighter shrink-0 mt-0.5" />
                        <span className="text-ink-light">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm text-ink-light">
                    <p>Se våre andre planer for komplett dekning.</p>
                  </div>
                </div>
              </motion.div>

              {/* Block 3: Ideal for */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="font-display font-normal text-2xl text-foreground mb-6">Ideell for</h2>
                  <ul className="space-y-4">
                    {tier.idealFor.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand shrink-0 mt-2" />
                        <span className="text-foreground/80 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-brand/5 border border-brand/20 rounded-lg p-8">
                  <h3 className="font-display font-normal text-lg text-foreground mb-4">Detaljert beskrivelse</h3>
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Other tiers */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
                <h2 className="font-display font-normal text-2xl text-foreground mb-8 text-center">Se også våre andre planer</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {pricingTiers.filter((t) => t.slug !== slug).map((otherTier) => (
                    <Link to={`/priser/${otherTier.slug}`} key={otherTier.slug}
                      className="bg-card rounded-lg p-6 border border-foreground/5 hover:border-brand/30 transition-all hover:shadow-lg group">
                      <span className="text-brand font-medium text-xs uppercase tracking-widest">{otherTier.subtitle}</span>
                      <h3 className="font-display font-normal text-xl text-foreground mb-2">{otherTier.name}</h3>
                      <p className="text-ink-light text-sm mb-4">{otherTier.desc}</p>
                      <div className="flex items-baseline gap-1">
                        {otherTier.prefix && <span className="text-sm text-ink-light">{otherTier.prefix}</span>}
                        <span className="text-2xl font-bold text-foreground">{otherTier.price}</span>
                        <span className="text-sm text-ink-light">{otherTier.currency} / {otherTier.period}</span>
                      </div>
                      <span className="text-brand text-sm font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Les mer <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Package CTA */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-secondary rounded-lg p-8 md:p-12 text-center text-secondary-foreground relative overflow-hidden max-w-3xl mx-auto">
                <div className="relative z-10">
                  <h3 className="font-display font-normal text-2xl mb-2">KISA Total</h3>
                  <p className="text-secondary-foreground/70 mb-6">Risikovurdering + Infrastructure + 12 mnd Governance Partner</p>
                  <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
                    <span className="text-2xl line-through text-secondary-foreground/40">~194 700 kr</span>
                    <span className="text-4xl font-bold text-brand">149 000 kr</span>
                  </div>
                  <p className="text-sm text-secondary-foreground/60 mb-8">Pakkerabatt 23 %. En partner, ett ansvar, null risiko.</p>
                  <KisaButton href="#contact" variant="primary">Få pakketilbud</KisaButton>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
              </motion.div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingDetailPage;
