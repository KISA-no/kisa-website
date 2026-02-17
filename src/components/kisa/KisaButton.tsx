import React from 'react';
import { ArrowRight, ChevronsRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface KisaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'sharp';
  icon?: boolean;
  chevron?: boolean;
  href?: string;
  to?: string;
}

const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold transition-all duration-300 transform active:scale-95 text-sm md:text-base";

const variants = {
  primary: "bg-brand-dark text-primary-foreground shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:-translate-y-1 rounded-lg border border-brand",
  secondary: "bg-secondary text-secondary-foreground shadow-lg shadow-ink/20 hover:shadow-ink/40 hover:-translate-y-1 rounded",
  ghost: "bg-card/60 hover:bg-card text-foreground border border-border hover:border-ink/20 hover:-translate-y-1 backdrop-blur-sm rounded-lg",
  outline: "border-2 border-brand text-brand hover:bg-brand/5 rounded-lg",
  sharp: "bg-brand-dark text-primary-foreground shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:-translate-y-1 rounded border border-brand",
};

export const KisaButton: React.FC<KisaButtonProps> = ({
  children,
  variant = 'primary',
  icon = false,
  chevron = false,
  className = '',
  href,
  to,
  ...props
}) => {
  const content = (
    <>
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
      {chevron && <ChevronsRight className="w-4 h-4" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
};
