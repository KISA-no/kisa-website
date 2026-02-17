import React from 'react';

const footerLinks = {
  Tjenester: [
    { label: 'Assessment', href: '/tjenester/agent-audit' },
    { label: 'Partner', href: '/tjenester/compliance-dashboard' },
    { label: 'ISO 42001', href: '/tjenester/ki-strategi' },
  ],
  Ressurser: [
    { label: 'KI-loven', href: '/om-ki-loven' },
    { label: 'Shadow AI', href: '/hvorfor-kisa/stopp-shadow-ai' },
    { label: 'AI Firewall', href: '/hvorfor-kisa/ai-firewall' },
  ],
  Kontakt: [
    { label: 'post@kisa.no', href: 'mailto:post@kisa.no' },
    { label: 'LinkedIn', href: '#' },
    { label: '+47 XXX XX XXX', href: 'tel:+47' },
  ],
};

export const Footer: React.FC = () => (
  <footer className="bg-secondary pt-16 pb-8" id="contact">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        {/* Logo + tagline */}
        <div>
          <a href="/" className="font-display font-extrabold text-2xl tracking-tight inline-flex items-center gap-0.5 mb-4">
            <span className="text-primary-foreground">KIS</span>
            <span className="text-brand">A</span>
          </a>
          <p className="text-primary-foreground/50 text-sm leading-relaxed">
            Kontroll og Intelligens for Sikker Autonomi
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="font-display font-bold text-primary-foreground text-sm uppercase tracking-wider mb-4">{heading}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/60 text-sm hover:text-brand transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/40">
        <p>© 2025 KISA AS. Basert på ISO/IEC 42001-prinsipper.</p>
        <div className="flex gap-6">
          <a href="/personvern" className="hover:text-primary-foreground transition-colors">Personvern</a>
          <a href="/vilkar" className="hover:text-primary-foreground transition-colors">Vilkår</a>
        </div>
      </div>
    </div>
  </footer>
);
