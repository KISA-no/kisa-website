import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Handshake, Award, CheckCircle, BarChart3, FileText, ArrowRight } from 'lucide-react';

interface ServiceTab {
  slug: string;
  title: string;
  price: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  mockTitle: string;
  mockIcon: React.ComponentType<{ className?: string }>;
}

const tabs: ServiceTab[] = [
  {
    slug: 'agent-audit',
    title: 'KI Governance Assessment',
    price: '24 900 kr',
    icon: Search,
    features: [
      'Shadow AI-kartlegging av alle verktøy i bruk',
      'Risikovurdering mot EU AI Act',
      'Gap-analyse med prioriterte tiltak',
      'Executive summary for styret',
      'Handlingsplan med tidslinje',
    ],
    mockTitle: 'KI-styringsrapport',
    mockIcon: FileText,
  },
  {
    slug: 'compliance-dashboard',
    title: 'Styringspartner',
    price: '5 900–9 900 kr/mnd',
    icon: Handshake,
    features: [
      'Løpende compliance-overvåking',
      'Kvartalsvis risikorapport til styret',
      'Policy-oppdateringer ved nye krav',
      'Dedikert governance-rådgiver',
      'Hendelseshåndtering og varsling',
    ],
    mockTitle: 'Compliance Dashboard',
    mockIcon: BarChart3,
  },
  {
    slug: 'ki-strategi',
    title: 'ISO 42001 Light',
    price: '75 000–150 000 kr',
    icon: Award,
    features: [
      'Sertifiseringsforløp tilpasset SMB',
      'Dokumentasjonsrammeverk',
      'Internrevisjon og gap-analyse',
      'Opplæring av nøkkelpersonell',
      'Støtte gjennom hele prosessen',
    ],
    mockTitle: 'ISO 42001 Roadmap',
    mockIcon: Award,
  },
];

export const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab];

  return (
    <section className="py-24 bg-paper relative overflow-hidden" id="services">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-normal text-3xl md:text-4xl text-foreground mb-16 leading-[1.2]">
            Skreddersydd<br />KI-styring
          </h2>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
            {/* Vertical tabs */}
            <div className="flex lg:flex-col gap-2">
              {tabs.map((tab, i) => (
                <button
                  key={tab.slug}
                  onClick={() => setActiveTab(i)}
                  className={`relative text-left p-4 rounded-lg transition-all duration-300 flex-1 lg:flex-initial ${activeTab === i
                      ? 'bg-paper-light shadow-md'
                      : 'hover:bg-paper-light/50'
                    }`}
                >
                  {activeTab === i && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-2 bottom-2 w-1 bg-brand rounded-full hidden lg:block"
                    />
                  )}
                  <div className="flex items-center gap-3 mb-1">
                    <tab.icon className={`w-5 h-5 ${activeTab === i ? 'text-brand' : 'text-ink-lighter'}`} />
                    <span className={`font-sans font-bold text-sm ${activeTab === i ? 'text-foreground' : 'text-ink-light'}`}>
                      {tab.title}
                    </span>
                  </div>
                  <p className={`text-xs font-bold ml-8 ${activeTab === i ? 'text-brand' : 'text-ink-lighter'}`}>{tab.price}</p>
                </button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <active.icon className="w-6 h-6 text-brand" />
                    <h3 className="font-display font-medium text-2xl text-foreground">{active.title}</h3>
                  </div>
                  <p className="text-brand font-bold text-lg">{active.price}</p>
                </div>

                <ul className="space-y-3">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-ink-light">
                      <CheckCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Mockup card */}
                <div className="bg-secondary rounded-lg p-8 relative overflow-hidden">
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                      <active.mockIcon className="w-6 h-6 text-brand-light" />
                    </div>
                    <div>
                      <p className="text-primary-foreground font-display font-normal text-lg">{active.mockTitle}</p>
                      <p className="text-primary-foreground/50 text-sm">Generert av KISA</p>
                    </div>
                  </div>
                </div>

                {/* Les mer-lenke */}
                <Link
                  to={`/tjenester/${active.slug}`}
                  className="inline-flex items-center gap-2 text-brand font-medium hover:text-brand-dark transition-colors group"
                >
                  Les mer om {active.title}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
