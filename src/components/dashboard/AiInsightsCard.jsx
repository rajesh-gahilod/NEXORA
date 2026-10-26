import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export const AiInsightsCard = ({ insight, onAskAssistant }) => {
  if (!insight) return null;

  return (
    <Card
      glow
      className="border-brand-purple-500/30 bg-gradient-to-br from-navy-850 via-navy-900 to-brand-purple-950/20"
      title={
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-purple-500/20 text-brand-purple-300">
            <Sparkles className="w-4 h-4 text-brand-purple-400" />
          </div>
          <span className="bg-gradient-to-r from-brand-purple-300 via-white to-brand-blue-300 bg-clip-text text-transparent font-bold">
            NEXORA Neural Executive Brief
          </span>
        </div>
      }
      action={
        <Badge variant="purple" showDot>
          {insight.confidence}% AI Confidence
        </Badge>
      }
    >
      <div className="space-y-4">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
            {insight.headline}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
            {insight.summary}
          </p>
        </div>

        {/* Actionable recommendations */}
        <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-brand-purple-400" /> Actionable Next Steps
          </p>
          <div className="space-y-2">
            {insight.actionableSteps?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer: Impact + Action Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-400">
            Projected Impact:{' '}
            <strong className="text-emerald-400 font-semibold font-mono">
              {insight.metricImpact}
            </strong>
          </div>

          <Button
            variant="ai"
            size="sm"
            onClick={() => onAskAssistant?.(insight.headline)}
            icon={ArrowRight}
          >
            Ask Assistant to Deep Dive
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AiInsightsCard;
