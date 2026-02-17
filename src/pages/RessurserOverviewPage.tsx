import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/kisa/Navbar';
import { Footer } from '@/components/kisa/Footer';
import { resources } from '@/data/resources';

const RessurserOverviewPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand/20 selection:text-brand-dark">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="text-brand font-medium text-xs uppercase tracking-widest mb-3 block">Ressurser</span>
              <h1 className="font-display font-normal text-3xl md:text-5xl text-foreground mb-4">
                Kunnskap om KI-styring
              </h1>
              <p className="text-ink-light text-lg md:text-xl max-w-3xl leading-relaxed">
                Forstå regelverket, truslene og løsningene. Disse ressursene gir deg grunnlaget for trygg KI-bruk.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, i) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={resource.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      to={resource.href}
                      className="block bg-card rounded-lg border border-foreground/5 p-8 h-full hover:shadow-lg hover:border-brand/20 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center text-brand mb-5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="font-display font-normal text-xl text-foreground mb-3 group-hover:text-brand transition-colors">
                        {resource.title}
                      </h2>
                      <p className="text-ink-light text-sm leading-relaxed mb-6">{resource.desc}</p>
                      <span className="inline-flex items-center gap-2 text-brand font-medium text-sm group-hover:gap-3 transition-all">
                        Les mer <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RessurserOverviewPage;
