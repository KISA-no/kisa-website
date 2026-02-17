import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface KisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FOCUSABLE = 'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export const KisaModal: React.FC<KisaModalProps> = ({ isOpen, onClose, title, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const els = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!els.length) return;
      if (e.shiftKey && document.activeElement === els[0]) { e.preventDefault(); els[els.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === els[els.length - 1]) { e.preventDefault(); els[0].focus(); }
    };

    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', handleKey); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/60 backdrop-blur-sm p-4 md:p-6"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="modal-title"
          className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-border bg-paper-light shadow-2xl">
          <div className="flex items-start justify-between gap-4 p-5 md:p-6 border-b border-border bg-card/80">
            <h3 id="modal-title" className="font-display font-bold text-xl md:text-2xl text-foreground">{title}</h3>
            <button ref={closeBtnRef} type="button" onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-paper transition-colors"
              aria-label="Lukk">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5 md:p-6 overflow-y-auto max-h-[calc(90vh-84px)] text-ink-light leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
