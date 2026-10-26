import React, { useState } from 'react';
import Card from '../common/Card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { TrendingUp, Sparkles, Filter } from 'lucide-react';

const CustomTooltip = ({ active, payload, label, mode }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card bg-navy-950/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 min-w-[170px]">
        <p className="font-semibold text-slate-200 border-b border-slate-800 pb-1 flex items-center justify-between">
          <span>{label} 2026</span>
          <span className="text-[10px] text-brand-purple-400 font-mono">Actuals</span>
        </p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 text-[11px]">
            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-mono font-semibold text-white">
              {mode === 'orders' ? formatNumber(entry.value) : formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueChart = ({ data, isDemo = true }) => {
  const [metric, setMetric] = useState('revenue'); // 'revenue' | 'orders' | 'comparison'

  return (
    <Card
      title="Revenue Velocity & Predictive Forecast"
      subtitle="Trailing 12-month performance model compared to previous cycle and AI neural projection"
      action={
        <div className="flex items-center gap-1 bg-navy-900 border border-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setMetric('revenue')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              metric === 'revenue'
                ? 'bg-brand-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Revenue ($)
          </button>
          <button
            onClick={() => setMetric('comparison')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              metric === 'comparison'
                ? 'bg-brand-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            vs Forecast
          </button>
          <button
            onClick={() => setMetric('orders')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              metric === 'orders'
                ? 'bg-brand-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Orders
          </button>
        </div>
      }
    >
      <div className="h-72 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E293B' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => (metric === 'orders' ? `${v}` : `$${v / 1000}k`)}
            />
            <Tooltip content={<CustomTooltip mode={metric} />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 12, fontSize: 11 }}
            />

            {metric === 'revenue' && (
              <>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Current Revenue ($)"
                  stroke="#8B5CF6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="previous"
                  name="Previous Year ($)"
                  stroke="#64748B"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#prevGrad)"
                />
              </>
            )}

            {metric === 'comparison' && (
              <>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Actual Revenue ($)"
                  stroke="#8B5CF6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  name="AI Projected ($)"
                  stroke="#38BDF8"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  fillOpacity={1}
                  fill="url(#forecastGrad)"
                />
              </>
            )}

            {metric === 'orders' && (
              <Area
                type="monotone"
                dataKey="orders"
                name="Total Orders Placed"
                stroke="#10B981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#forecastGrad)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% Growth
          </span>
          <span>Target exceeded by $84,920</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-brand-purple-400 bg-brand-purple-500/10 px-2 py-0.5 rounded border border-brand-purple-500/20">
          <Sparkles className="w-3 h-3" />
          Neural ARIMA forecast confidence: 96.4%
        </div>
      </div>
    </Card>
  );
};

export default RevenueChart;
