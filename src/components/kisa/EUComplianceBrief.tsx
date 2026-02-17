import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Clock, ShieldOff, FileSearch, ChevronRight } from 'lucide-react';
import { KisaButton } from './KisaButton';

const highlights = [
    { icon: ShieldOff, date: 'Feb 2025', title: 'Forbudte KI-praksiser håndheves' },
    { icon: FileSearch, date: 'Aug 2025', title: 'Krav til generelle KI-modeller' },
    { icon: Scale, date: 'Aug 2026', title: 'Full håndhevelse for høyrisiko' },
    { icon: Clock, date: '2027', title: 'Backstop-frist og standarder' },
];

export const EUComplianceBrief: React.FC = () => (
    <section className="py-24 bg-paper relative overflow-hidden" id="compliance">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-brand font-bold tracking-widest uppercase text-xs mb-3 block">
                        KI-loven (EU AI Act)
                    </span>
                    <h2 className="font-display font-normal text-3xl md:text-4xl text-foreground mb-6 leading-[1.2]">
                        Norges nye KI-lov nærmer seg – er dere klare?
                    </h2>
                    <p className="text-ink-light text-lg max-w-2xl mx-auto">
                        EU AI Act trer i kraft trinnvis fra 2025 til 2027. Bøter kan nå opptil 7 % av global omsetning.
                        Forbered bedriften nå – ikke etter tilsynet banker på.
                    </p>
                </motion.div>

                {/* Compact timeline */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.date}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-paper-light rounded-lg p-5 border border-border shadow-sm text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-10 h-10 mx-auto mb-3 bg-brand-light/15 rounded-lg flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-brand" />
                            </div>
                            <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1">{item.date}</span>
                            <h3 className="font-display font-medium text-sm text-foreground">{item.title}</h3>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <KisaButton variant="outline" to="/om-ki-loven" className="inline-flex items-center gap-2">
                        Les mer om KI-loven <ChevronRight className="w-4 h-4" />
                    </KisaButton>
                </motion.div>
            </div>
        </div>
    </section>
);
