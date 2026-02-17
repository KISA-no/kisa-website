import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Search, Handshake, Award, Scale, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import { KisaButton } from './KisaButton';

// ─── Menu data ───────────────────────────────────────────────

interface MenuItem {
  label: string;
  desc?: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MenuTab {
  label: string;
  items: MenuItem[];
  cta?: { label: string; desc: string; href: string };
}

interface DropdownConfig {
  tabs: MenuTab[];
}

const dropdowns: Record<string, DropdownConfig> = {
  Tjenester: {
    tabs: [
      {
        label: 'Våre tjenester',
        items: [
          { label: 'KI Governance Assessment', desc: 'Full gjennomgang av KI-risiko og compliance-status.', href: '/tjenester/agent-audit', icon: Search },
          { label: 'Styringspartner', desc: 'Løpende compliance-overvåking og styrerapportering.', href: '/tjenester/compliance-dashboard', icon: Handshake },
          { label: 'ISO 42001 Light', desc: 'Sertifiseringsforløp tilpasset norske SMB-er.', href: '/tjenester/ki-strategi', icon: Award },
        ],
      },
      {
        label: 'Priser',
        items: [
          { label: 'Risikovurdering', desc: 'Engangsinvestering fra 24 900 kr.', href: '/priser/risikovurdering' },
          { label: 'Infrastructure', desc: 'Prosjektpris fra 75 000 kr.', href: '/priser/infrastructure' },
          { label: 'Styringspartner', desc: 'Løpende fra 7 900 kr/mnd.', href: '/priser/governance-partner' },
        ],
        cta: { label: 'Book en demo', desc: 'Se hvordan KISA kan hjelpe din bedrift.', href: '/#contact' },
      },
    ],
  },
  Ressurser: {
    tabs: [
      {
        label: 'Lær mer',
        items: [
          { label: 'KI-loven (EU AI Act)', desc: 'Tidslinje, krav og konsekvenser for norske bedrifter.', href: '/om-ki-loven', icon: Scale },
          { label: 'Shadow AI', desc: 'Forstå risikoen ved ukontrollert KI-bruk.', href: '/hvorfor-kisa/stopp-shadow-ai', icon: Search },
          { label: 'AI Firewall', desc: 'Kontinuerlig kontroll av autonome KI-agenter.', href: '/hvorfor-kisa/ai-firewall', icon: ShieldCheck },
          { label: 'Human-in-the-Loop', desc: 'Klare grenser for hva KI kan gjøre selvstendig.', href: '/hvorfor-kisa/human-in-the-loop', icon: UserCheck },
        ],
      },
      {
        label: 'Verktøy',
        items: [
          { label: 'KI-risikovurdering', desc: 'Gratis vurdering av din bedrifts KI-risiko.', href: '/#risk-assessment' },
          { label: 'ROI-kalkulator', desc: 'Beregn verdien av KI-sikkerhet.', href: '/#roi' },
        ],
        cta: { label: 'Gratis risikovurdering', desc: 'Ta vår 2-minutters vurdering og få tilpassede anbefalinger.', href: '/#risk-assessment' },
      },
    ],
  },
};

const navItems = [
  { label: 'Tjenester', hasDropdown: true },
  { label: 'Ressurser', hasDropdown: true },
  { label: 'Om KI-loven', href: '/om-ki-loven' },
  { label: 'Om oss', href: '/#value' },
];

// ─── Animation variants ──────────────────────────────────────

const panelVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut', staggerChildren: 0.05, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, staggerChildren: 0.04, delayChildren: 0.02 } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.12 } },
};

// ─── Component ───────────────────────────────────────────────

export const MegaMenu: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, number>>({});
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openDropdown = useCallback((label: string) => {
    clearTimeout(closeTimeoutRef.current);
    setOpenMenu(label);
    if (!activeTab[label]) setActiveTab((prev) => ({ ...prev, [label]: 0 }));
  }, [activeTab]);

  const scheduleClose = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimeoutRef.current);
  }, []);

  const currentTabIndex = openMenu ? (activeTab[openMenu] ?? 0) : 0;
  const currentDropdown = openMenu ? dropdowns[openMenu] : null;
  const currentTab = currentDropdown?.tabs[currentTabIndex];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-paper-light transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="font-display font-bold text-2xl tracking-tight flex items-center gap-0.5">
              <span className="text-ink">KIS</span>
              <span className="text-brand">A</span>
            </Link>

            {/* Desktop nav items */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <button
                    key={item.label}
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={scheduleClose}
                    onClick={() => openMenu === item.label ? setOpenMenu(null) : openDropdown(item.label)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1.5 rounded ${openMenu === item.label ? 'text-ink' : 'text-ink-light hover:text-ink'
                      }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 text-ink-light hover:text-ink font-medium text-sm transition-colors rounded"
                    onMouseEnter={() => { clearTimeout(closeTimeoutRef.current); setOpenMenu(null); }}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="/#contact" className="text-ink-light hover:text-ink font-medium text-sm transition-colors">
                Kontakt
              </a>
              <KisaButton variant="sharp" href="/#contact" className="py-2.5 px-5 text-sm">
                Gratis risikovurdering
              </KisaButton>
            </div>

            {/* Mobile hamburger */}
            <button className="lg:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-6 h-6 text-ink" /> : <Menu className="w-6 h-6 text-ink" />}
            </button>
          </div>
        </div>

        {/* ─── Desktop Mega Panel ─── */}
        <AnimatePresence>
          {openMenu && currentDropdown && (
            <motion.div
              key={openMenu}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="absolute left-0 right-0 top-16 z-50 hidden lg:block"
            >
              <div className="container mx-auto px-4 md:px-6 pt-2 pb-4">
                <div className="bg-paper-light rounded-xl shadow-xl border border-border overflow-hidden max-w-[1100px] mx-auto">
                  <div className="flex min-h-[320px]">
                    {/* Left tabs column */}
                    <motion.div className="w-[220px] bg-accent p-3 flex flex-col gap-1 shrink-0" variants={panelVariants}>
                      {currentDropdown.tabs.map((tab, i) => (
                        <motion.button
                          key={tab.label}
                          variants={itemVariants}
                          onClick={() => setActiveTab((prev) => ({ ...prev, [openMenu!]: i }))}
                          className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between gap-2 ${currentTabIndex === i
                              ? 'bg-secondary text-primary-foreground shadow-sm'
                              : 'text-ink-light hover:bg-paper-light hover:text-ink'
                            }`}
                        >
                          {tab.label}
                          <ArrowRight className={`w-3.5 h-3.5 transition-opacity ${currentTabIndex === i ? 'opacity-100' : 'opacity-0'}`} />
                        </motion.button>
                      ))}
                    </motion.div>

                    {/* Right content column */}
                    <div className="flex-1 p-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${openMenu}-${currentTabIndex}`}
                          variants={tabContentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="flex gap-6 h-full"
                        >
                          {/* Items grid */}
                          <div className={`flex-1 grid gap-1 content-start ${currentTab && currentTab.items.length > 3 ? 'grid-cols-2' : 'grid-cols-1'
                            }`}>
                            {currentTab?.items.map((menuItem) => (
                              <motion.div key={menuItem.label} variants={itemVariants}>
                                <Link
                                  to={menuItem.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="block p-3 rounded-lg hover:bg-accent transition-colors group"
                                >
                                  <div className="flex items-center gap-2.5 mb-0.5">
                                    {menuItem.icon && <menuItem.icon className="w-4 h-4 text-brand shrink-0" />}
                                    <span className="font-semibold text-sm text-foreground group-hover:text-brand transition-colors">
                                      {menuItem.label}
                                    </span>
                                  </div>
                                  {menuItem.desc && (
                                    <p className={`text-xs text-muted-foreground leading-relaxed ${menuItem.icon ? 'ml-[26px]' : ''}`}>
                                      {menuItem.desc}
                                    </p>
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA box */}
                          {currentTab?.cta && (
                            <motion.div variants={itemVariants} className="w-[240px] shrink-0">
                              <div className="bg-secondary rounded-xl p-6 h-full flex flex-col justify-between">
                                <div>
                                  <p className="font-display text-lg text-primary-foreground mb-2">{currentTab.cta.label}</p>
                                  <p className="text-primary-foreground/60 text-sm leading-relaxed">{currentTab.cta.desc}</p>
                                </div>
                                <a
                                  href={currentTab.cta.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="inline-flex items-center gap-2 text-brand-light text-sm font-medium mt-4 hover:text-brand transition-colors"
                                >
                                  Kom i gang <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── Overlay ─── */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/20 z-40 hidden lg:block"
            onClick={() => setOpenMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* ─── Mobile menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-50 bg-paper-light border-t border-border overflow-auto max-h-[calc(100vh-4rem)] lg:hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between text-ink font-medium text-lg py-3 px-4 hover:bg-accent rounded-lg transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === item.label && dropdowns[item.label] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 space-y-1">
                            {dropdowns[item.label].tabs.map((tab) => (
                              <div key={tab.label}>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-4 py-2">{tab.label}</p>
                                {tab.items.map((menuItem) => (
                                  <Link
                                    key={menuItem.label}
                                    to={menuItem.href}
                                    onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                                    className="block py-2.5 px-4 text-ink-light hover:text-ink hover:bg-accent rounded-lg transition-colors"
                                  >
                                    <span className="text-sm font-medium">{menuItem.label}</span>
                                    {menuItem.desc && (
                                      <span className="block text-xs text-muted-foreground mt-0.5">{menuItem.desc}</span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-ink font-medium text-lg py-3 px-4 hover:bg-accent rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
              <div className="h-px bg-border my-2" />
              <a href="/#contact" className="block text-ink-light font-medium py-2 px-4" onClick={() => setMobileOpen(false)}>Kontakt</a>
              <KisaButton href="/#contact" variant="sharp" className="w-full" onClick={() => setMobileOpen(false)}>Gratis risikovurdering</KisaButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
