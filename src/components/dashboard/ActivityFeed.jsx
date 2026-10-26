import React from 'react';
import Card from '../common/Card';
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck, UserPlus, Clock } from 'lucide-react';

const ICON_MAP = {
  ai: Sparkles,
  sales: TrendingUp,
  system: AlertTriangle,
  user: UserPlus,
};

const COLOR_MAP = {
  ai: 'text-brand-purple-400 bg-brand-purple-500/15 border-brand-purple-500/30',
  sales: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
  system: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
  user: 'text-brand-blue-400 bg-brand-blue-500/15 border-brand-blue-500/30',
};

export const ActivityFeed = ({ activities = [] }) => {
  return (
    <Card
      title="Live Activity & Telemetry"
      subtitle="Real-time events synchronized across microservices"
      action={
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
          Live Stream
        </div>
      }
    >
      <div className="space-y-3.5 mt-1">
        {activities.map((item, idx) => {
          const Icon = ICON_MAP[item.type] || Sparkles;
          const style = COLOR_MAP[item.type] || COLOR_MAP.ai;

          return (
            <div key={item.id || idx} className="flex items-start gap-3 group">
              <div className={`p-2 rounded-xl shrink-0 mt-0.5 border ${style} transition-transform group-hover:scale-110`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0 font-mono flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ActivityFeed;
