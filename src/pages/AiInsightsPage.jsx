import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import aiService from '../services/aiService';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  Brain,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Users,
  Database,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  ShieldAlert
} from 'lucide-react';

const CATEGORY_MAP = {
  all: 'All Insights',
  'Revenue Acceleration': 'Revenue & Growth',
  'Risk Mitigation': 'Risk & Compliance',
  'Customer Behavior': 'Customer Intelligence',
  'Cost Optimization': 'Operational Cost',
};

const IMPACT_COLORS = {
  High: 'rose',
  Medium: 'amber',
  Low: 'blue',
};

export const AiInsightsPage = ({ onNavigate }) => {
  const { isDemoMode } = useAuth();
  const [insightsData, setInsightsData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const res = await aiService.getInsights();
        setInsightsData(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const primary = insightsData?.primary;
  const list = insightsData?.insights || [];

  const filteredList = selectedCategory === 'all'
    ? list
    : list.filter(item => item.category === selectedCategory);

  const handleDeepDive = (insight) => {
    onNavigate('ai-assistant', {
      initialPrompt: `Deep dive into the insight: "${insight.title}". What are the detailed implementation steps and expected ROI?`
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Brain className="w-6 h-6 text-brand-purple-400" />
              Autonomous AI Insights Engine
            </h2>
            {isDemoMode && (
              <Badge variant="amber" size="sm" showDot>
                Demo Telemetry Models
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Continuous Bayesian diagnostic analysis mapping transactional flows to actionable strategic opportunities
          </p>
        </div>

        {/* Action Button */}
        <Button
          variant="ai"
          size="sm"
          icon={Sparkles}
          onClick={() => onNavigate('ai-assistant', { initialPrompt: 'Perform full executive risk and growth audit for Q4.' })}
        >
          Run Full AI Audit
        </Button>
      </div>

      {/* Primary Highlight Hero Card */}
      {primary && (
        <Card
          glow
          className="bg-gradient-to-br from-navy-850 via-navy-900 to-brand-purple-950/30 border-brand-purple-500/30"
          title={
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-purple-500/20 text-brand-purple-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="font-bold text-white text-base">Key Strategic Observation</span>
            </div>
          }
          action={
            <div className="flex items-center gap-2">
              <Badge variant="purple" showDot>
                {primary.confidence}% Confidence
              </Badge>
              <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {primary.metricImpact}
              </span>
            </div>
          }
        >
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {primary.headline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              {primary.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {primary.actionableSteps?.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {Object.entries(CATEGORY_MAP).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all border ${
              selectedCategory === key
                ? 'bg-brand-purple-600 text-white border-brand-purple-500 shadow-sm'
                : 'bg-navy-850 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredList.map((item) => (
          <Card
            key={item.id}
            hoverEffect
            className="flex flex-col justify-between"
            headerClassName="items-start"
            title={
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={IMPACT_COLORS[item.impact] || 'purple'} size="sm">
                    {item.impact} Impact
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.dateRange}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white pt-1">
                  {item.title}
                </h4>
              </div>
            }
            action={
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                {item.metricChange}
              </span>
            }
          >
            <div className="space-y-3.5 my-2">
              {/* Telemetry Observation */}
              <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800/80 text-xs">
                <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1">
                  Telemetry Evidence
                </p>
                <p className="text-slate-300 leading-relaxed">{item.observation}</p>
              </div>

              {/* Prescriptive Recommendation */}
              <div className="p-3 rounded-xl bg-brand-purple-950/20 border border-brand-purple-500/20 text-xs">
                <p className="text-[10px] uppercase font-semibold text-brand-purple-400 tracking-wider mb-1">
                  Prescriptive Recommendation
                </p>
                <p className="text-slate-200 leading-relaxed font-medium">{item.recommendation}</p>
              </div>

              {/* Source Data Line */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1 truncate">
                  <Database className="w-3 h-3 text-slate-400 shrink-0" />
                  Source: {item.source}
                </span>
                <span className="font-mono text-brand-purple-400 shrink-0">
                  {item.confidence}% Confidence
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {item.tags?.map((t) => (
                  <span key={t} className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                icon={ArrowRight}
                onClick={() => handleDeepDive(item)}
                className="text-brand-purple-400 hover:text-brand-purple-300"
              >
                Deep Dive in AI
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AiInsightsPage;
