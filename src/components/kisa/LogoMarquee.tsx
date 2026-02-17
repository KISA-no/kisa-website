import React from 'react';
import { motion } from 'framer-motion';

const logos = ['TRIPLETEX', 'FIKEN', 'POWEROFFICE', 'HUBSPOT', 'SLACK', 'MICROSOFT 365', 'GOOGLE WORKSPACE', 'VISMA'];

export const LogoMarquee: React.FC = () => {
  return (
    <section className="py-10 border-b border-border relative overflow-hidden bg-paper-light">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <p className="text-center text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">
          Integrerer med verktøyene du allerede bruker
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-paper-light to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-paper-light to-transparent z-10" />
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...logos, ...logos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-sans font-bold text-lg text-foreground/25 hover:text-foreground/50 transition-colors flex-shrink-0 px-4"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
