import React from 'react';

export const Card = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerClassName = '',
  bodyClassName = '',
  hoverEffect = false,
  glow = false
}) => {
  return (
    <div
      className={`glass-card rounded-xl p-5 relative overflow-hidden ${
        hoverEffect ? 'glass-card-hover' : ''
      } ${glow ? 'shadow-glow-purple border-brand-purple-500/20' : ''} ${className}`}
    >
      {(title || subtitle || action) && (
        <div className={`flex items-start justify-between gap-4 mb-4 ${headerClassName}`}>
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-100 tracking-tight flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export default Card;
