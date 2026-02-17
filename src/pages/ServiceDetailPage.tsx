import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/kisa/Navbar';
import { Footer } from '@/components/kisa/Footer';
import { KisaButton } from '@/components/kisa/KisaButton';
import { SubpageNav } from '@/components/kisa/SubpageNav';
import { services } from '@/data/services';

import auditImg from '@/assets/service-audit.jpg';
import dashboardImg from '@/assets/service-dashboard.jpg';
import paymentImg from '@/assets/service-payment.jpg';
import trainingImg from '@/assets/service-training.jpg';
import strategyImg from '@/assets/service-strategy.jpg';

const images: Record<string, string> = {
  audit: auditImg,
  dashboard: dashboardImg,
  payment: paymentImg,
  training: trainingImg,
  strategy: strategyImg,
};

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-paper-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-3xl text-foreground mb-4">Tjeneste ikke funnet</h1>
          <KisaButton to="/" variant="ghost">Tilbake til forsiden</KisaButton>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const img = images[service.imageKey];
  const navItems = services.map((s) => ({ label: s.shortTitle, slug: s.slug }));

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand/20 selection:text-brand-dark">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <SubpageNav
              items={navItems}
              activeSlug={slug!}
              basePath="/tjenester"
              backLabel="Tilbake til forsiden"
              backTo="/"
            />

            {/* Hero */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-brand font-medium text-xs uppercase tracking-widest">{service.subtitle}</span>
                  <h1 className="font-display font-normal text-3xl md:text-5xl text-foreground">{service.title}</h1>
                </div>
              </div>
              <p className="text-ink-light text-lg md:text-xl max-w-3xl mt-4 mb-10 leading-relaxed">{service.desc}</p>
            </motion.div>

            {/* Image */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-lg overflow-hidden mb-16 shadow-xl">
              <img src={img} alt={service.title} className="w-full h-auto object-cover aspect-video" />
            </motion.div>

            {/* Long description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="space-y-6">
                <h2 className="font-display font-normal text-2xl text-foreground">Om tjenesten</h2>
                {service.longDesc.map((p, i) => (
                  <p key={i} className="text-ink-light leading-relaxed">{p}</p>
                ))}
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-normal text-xl text-foreground mb-4">Fordeler</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                        <span className="text-foreground/80 font-medium">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Features grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-20">
              <h2 className="font-display font-normal text-2xl text-foreground mb-8 text-center">Hva er inkludert</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.features.map((f) => (
                  <div key={f} className="bg-card rounded-lg p-5 border border-foreground/5 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{f}</span>
                  </div>
                ))}
              </div>
              {service.details.length > 0 && (
                <div className="mt-6 bg-brand/5 border border-brand/20 rounded-lg p-6 space-y-2">
                  {service.details.map((d) => (
                    <p key={d} className="text-ink-light text-sm">{d}</p>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Process */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-20">
              <h2 className="font-display font-normal text-2xl text-foreground mb-8 text-center">Slik jobber vi</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {service.process.map((step, i) => (
                  <div key={step} className="bg-card rounded-lg p-6 border border-foreground/5 text-center">
                    <div className="w-10 h-10 rounded-full bg-brand text-primary-foreground flex items-center justify-center font-display font-medium text-lg mx-auto mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="font-medium text-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="bg-secondary rounded-lg p-8 md:p-12 text-center text-secondary-foreground relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-display font-normal text-2xl md:text-3xl mb-4">Klar for {service.shortTitle}?</h2>
                <p className="text-secondary-foreground/70 max-w-2xl mx-auto mb-8">{service.desc}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <KisaButton href="#contact" variant="primary" icon>Book strategi-samtale</KisaButton>
                  <KisaButton to="/#pricing" variant="ghost" className="group">
                    Se priser<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

export default ServiceDetailPage;
