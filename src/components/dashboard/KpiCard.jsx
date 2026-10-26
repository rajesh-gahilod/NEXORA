import React from 'react';
import Card from '../common/Card';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

export const KpiCard = ({
  title,
  value,
  change,
  trend = 'up',
  period = 'vs last month',
  icon: Icon,
  target,
  progress,
  colorScheme = 'purple'
}) => {
  const isPositive = trend === 'up';

  const COLOR_MAP = {
    purple: {
      iconBg: 'bg-brand-purple-500/15 text-brand-purple-400 border border-brand-purple-500/30',
      bar: 'bg-brand-purple-500',
    },
    blue: {
      iconBg: 'bg-brand-blue-500/15 text-brand-blue-400 border border-brand-blue-500/30',
      bar: 'bg-brand-blue-500',
    },
    emerald: {
      iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      bar: 'bg-emerald-500',
    },
    amber: {
      iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
      bar: 'bg-amber-500',
    }
  };

  const scheme = COLOR_MAP[colorScheme] || COLOR_MAP.purple;

  return (
    <Card hoverEffect className="group">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
            {title}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
            {value}
          </h2>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl ${scheme.iconBg} group-hover:scale-110 transition-transform`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-semibold">
          <span
            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
              isPositive
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change > 0 ? `+${change}%` : `${change}%`}
          </span>
          <span className="text-slate-400 font-normal">{period}</span>
        </div>

        {target && (
          <span className="text-slate-400 text-[11px]">
            Goal: <strong className="text-slate-300 font-medium">{target}</strong>
          </span>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-3">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${scheme.bar}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default KpiCard;
