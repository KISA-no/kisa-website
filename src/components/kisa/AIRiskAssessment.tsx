import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ShieldAlert, ChevronRight, ChevronLeft, Loader2, RotateCcw, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { KisaButton } from './KisaButton';
import { supabase } from '@/integrations/supabase/client';

// ── Questions ──────────────────────────────────────────────
interface Question {
  id: string;
  question: string;
  options: string[];
  multi?: boolean;          // toggle-chip multi-select
  allowCustom?: boolean;    // show free-text input
}

const questions: Question[] = [
  {
    id: 'employees',
    question: 'Hvor mange ansatte har bedriften?',
    options: ['1–10', '11–50', '51–200', '200+'],
  },
  {
    id: 'tools',
    question: 'Hvilke KI-verktøy brukes i dag?',
    options: ['Ingen', 'ChatGPT', 'Copilot', 'Gemini', 'Midjourney / DALL-E', 'Egenutviklet KI'],
    multi: true,
    allowCustom: true,
  },
  {
    id: 'guidelines',
    question: 'Har dere retningslinjer for KI-bruk?',
    options: ['Nei, ingen', 'Uformelle retningslinjer', 'Ja, dokumenterte', 'Ja, med opplæring'],
  },
  {
    id: 'sensitiveData',
    question: 'Behandler dere sensitive data med KI?',
    options: ['Nei', 'Usikker', 'Ja, noe', 'Ja, mye'],
  },
  {
    id: 'leadership',
    question: 'Er ledelsen involvert i KI-styring?',
    options: ['Nei', 'Lite', 'Delvis', 'Ja, aktivt'],
  },
];

type Answers = Record<string, string>;
type MultiSelections = Record<string, string[]>;

interface Recommendation {
  title: string;
  description: string;
}

interface AssessmentResult {
  score: 'lav' | 'middels' | 'hoy';
  summary: string;
  recommendations: Recommendation[];
}

const scoreConfig = {
  lav: { label: 'Lav risiko', color: 'text-green-600', bg: 'bg-green-100', icon: ShieldCheck, pct: 25 },
  middels: { label: 'Middels risiko', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertTriangle, pct: 55 },
  hoy: { label: 'Høy risiko', color: 'text-red-600', bg: 'bg-red-100', icon: ShieldAlert, pct: 85 },
};

export const AIRiskAssessment: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'quiz' | 'loading' | 'result'>('idle');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [multiAnswers, setMultiAnswers] = useState<MultiSelections>({});
  const [customTool, setCustomTool] = useState('');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const q = questions[step];

  const toggleMulti = (qId: string, value: string) => {
    setMultiAnswers((prev) => {
      const current = prev[qId] ?? [];
      // "Ingen" is exclusive
      if (value === 'Ingen') return { ...prev, [qId]: ['Ingen'] };
      const without = current.filter((v) => v !== 'Ingen');
      const updated = without.includes(value) ? without.filter((v) => v !== value) : [...without, value];
      return { ...prev, [qId]: updated };
    });
  };

  // Build combined tools string from multi-select + custom text
  const buildToolsAnswer = (): string => {
    const selected = multiAnswers['tools'] ?? [];
    const parts = [...selected];
    if (customTool.trim()) parts.push(customTool.trim());
    return parts.length > 0 ? parts.join(', ') : 'Ingen';
  };

  const selectAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const confirmMultiAndAdvance = () => {
    const toolsStr = buildToolsAnswer();
    setAnswers((prev) => ({ ...prev, tools: toolsStr }));
    if (step < questions.length - 1) setStep((s) => s + 1);
  };

  const isStepAnswered = (idx: number) => {
    const qn = questions[idx];
    if (qn.multi) {
      return (multiAnswers[qn.id] ?? []).length > 0 || customTool.trim().length > 0;
    }
    return !!answers[qn.id];
  };

  const allAnswered = questions.every((_, i) => isStepAnswered(i));

  const submit = async () => {
    // Ensure tools answer is built before submitting
    const finalAnswers = { ...answers, tools: buildToolsAnswer() };
    setAnswers(finalAnswers);
    setPhase('loading');
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('ai-risk-assessment', {
        body: { answers: finalAnswers },
      });
      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);
      setResult(data as AssessmentResult);
      setPhase('result');
    } catch (e: any) {
      console.error(e);
      setError(e.message ?? 'Noe gikk galt. Prøv igjen.');
      setPhase('quiz');
    }
  };

  const reset = () => {
    setPhase('idle');
    setStep(0);
    setAnswers({});
    setMultiAnswers({});
    setCustomTool('');
    setResult(null);
    setError(null);
  };

  const progress = ((step + (isStepAnswered(step) ? 1 : 0)) / questions.length) * 100;


  return (
    <section id="risikovurdering" className="relative py-20 md:py-28 bg-secondary text-secondary-foreground overflow-hidden">

      <div className="container max-w-3xl mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {/* ── IDLE ── */}
          {phase === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand/20 text-brand-light text-xs font-bold tracking-wider uppercase">
                Gratis verktøy
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Hvor godt er din bedrift rustet for KI?
              </h2>
              <p className="text-ink-lighter max-w-xl mx-auto">
                Svar på 5 raske spørsmål og få en KI-generert risikovurdering med konkrete anbefalinger – helt gratis.
              </p>
              <KisaButton variant="primary" icon onClick={() => setPhase('quiz')}>
                Start risikovurdering
              </KisaButton>
            </motion.div>
          )}

          {/* ── QUIZ ── */}
          {phase === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <Progress value={progress} className="h-2 bg-ink-light/30" />

              {error && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground">
                  {error}
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
                  <p className="text-xs text-ink-lighter mb-2">
                    Spørsmål {step + 1} av {questions.length}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-6">
                    {questions[step].question}
                  </h3>

                  {/* Multi-select (tools) */}
                  {q.multi ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt) => {
                          const selected = (multiAnswers[q.id] ?? []).includes(opt);
                          return (
                            <button
                              key={opt}
                              onClick={() => toggleMulti(q.id, opt)}
                              className={`px-4 py-2.5 rounded-full border transition-all duration-200 font-medium text-sm ${selected
                                ? 'border-brand bg-brand/20 text-primary-foreground'
                                : 'border-ink-light/20 bg-ink/10 hover:border-brand/40 hover:bg-brand/10 text-secondary-foreground'
                                }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {q.allowCustom && (
                        <input
                          type="text"
                          value={customTool}
                          onChange={(e) => setCustomTool(e.target.value)}
                          placeholder="Andre verktøy? Skriv inn her…"
                          className="w-full px-4 py-3 rounded-xl border border-ink-light/20 bg-ink/10 text-secondary-foreground placeholder:text-ink-lighter text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40"
                        />
                      )}
                    </div>
                  ) : (
                    /* Single-select (all other questions) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt) => {
                        const selected = answers[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => selectAnswer(opt)}
                            className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 font-medium ${selected
                              ? 'border-brand bg-brand/20 text-primary-foreground'
                              : 'border-ink-light/20 bg-ink/10 hover:border-brand/40 hover:bg-brand/10 text-secondary-foreground'
                              }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => (step > 0 ? setStep((s) => s - 1) : reset())}
                  className="inline-flex items-center gap-1 text-sm text-ink-lighter hover:text-primary-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> {step > 0 ? 'Forrige' : 'Avbryt'}
                </button>

                {allAnswered ? (
                  <KisaButton variant="primary" icon onClick={submit}>
                    Se resultater
                  </KisaButton>
                ) : isStepAnswered(step) ? (
                  <button
                    onClick={() => q.multi ? confirmMultiAndAdvance() : setStep((s) => s + 1)}
                    className="inline-flex items-center gap-1 text-sm font-bold text-brand-light hover:text-brand transition-colors"
                  >
                    Neste <ChevronRight className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            </motion.div>
          )}

          {/* ── LOADING ── */}
          {phase === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6 py-12">
              <Loader2 className="w-12 h-12 text-brand animate-spin mx-auto" />
              <p className="font-display text-xl font-bold">Analyserer svarene dine…</p>
              <p className="text-ink-lighter text-sm">KI-en vurderer risikoprofilen til bedriften din</p>
            </motion.div>
          )}

          {/* ── RESULT ── */}
          {phase === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              {(() => {
                const cfg = scoreConfig[result.score];
                const Icon = cfg.icon;
                return (
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${cfg.bg}`}
                    >
                      <Icon className={`w-10 h-10 ${cfg.color}`} />
                    </motion.div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold">{cfg.label}</h3>
                    <Progress value={cfg.pct} className="h-3 max-w-xs mx-auto bg-ink-light/30" />
                    <p className="text-ink-lighter max-w-lg mx-auto">{result.summary}</p>
                  </div>
                );
              })()}

              <div className="space-y-3">
                <h4 className="font-display font-bold text-lg">Anbefalinger</h4>
                {result.recommendations.map((rec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="rounded-xl border border-ink-light/20 bg-ink/10 p-5"
                  >
                    <p className="font-bold text-primary-foreground mb-1">{rec.title}</p>
                    <p className="text-ink-lighter text-sm">{rec.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <KisaButton variant="primary" icon href="https://calendly.com" >
                  Book gratis screening
                </KisaButton>
                <button onClick={reset} className="inline-flex items-center gap-1 text-sm text-ink-lighter hover:text-primary-foreground transition-colors">
                  <RotateCcw className="w-4 h-4" /> Ta testen på nytt
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
