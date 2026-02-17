import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface SubpageNavProps {
  items: { label: string; slug: string }[];
  activeSlug: string;
  basePath: string;
  backLabel: string;
  backTo: string;
}

export const SubpageNav: React.FC<SubpageNavProps> = ({ items, activeSlug, basePath, backLabel, backTo }) => {
  return (
    <div className="mb-8 space-y-4">
      <Link to={backTo} className="inline-flex items-center gap-2 text-sm font-medium text-ink-light hover:text-brand transition-colors">
        <ArrowLeft className="w-4 h-4" />{backLabel}
      </Link>
      <div className="flex gap-2 flex-wrap">
        {items.map((item) => (
          <Link
            key={item.slug}
            to={`${basePath}/${item.slug}`}
            className={`px-4 py-2 rounded text-sm font-medium transition-all ${
              item.slug === activeSlug
                ? 'bg-brand text-primary-foreground shadow-md'
                : 'bg-card border border-foreground/10 text-foreground/70 hover:border-brand/30 hover:text-foreground'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
