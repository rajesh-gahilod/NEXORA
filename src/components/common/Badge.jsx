import React from 'react';

const BADGE_STYLES = {
  purple: 'bg-brand-purple-500/15 text-brand-purple-400 border-brand-purple-500/30',
  blue: 'bg-brand-blue-500/15 text-brand-blue-400 border-brand-blue-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  rose: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  neutral: 'bg-slate-800 text-slate-300 border-slate-700/60',
};

const DOT_COLORS = {
  purple: 'bg-brand-purple-400',
  blue: 'bg-brand-blue-400',
  emerald: 'bg-emerald-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400',
  neutral: 'bg-slate-400',
};

export const Badge = ({
  children,
  variant = 'purple',
  showDot = false,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${BADGE_STYLES[variant] || BADGE_STYLES.neutral} ${sizeClasses} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse-subtle ${DOT_COLORS[variant] || DOT_COLORS.neutral}`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
