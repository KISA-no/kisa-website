import React from 'react';
import { KisaButton } from './KisaButton';

export const CTABanner: React.FC = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 bg-secondary" />

    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
      <h2 className="font-display font-normal text-3xl md:text-4xl text-white leading-[1.2] mb-6">
        Få kontroll før loven krever det
      </h2>
      <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
        Book en gratis 30-minutters KI-risiko screening.
      </p>
      <KisaButton variant="primary" href="#contact" chevron className="text-base px-8 py-4">
        Book gratis screening
      </KisaButton>
    </div>
  </section>
);
