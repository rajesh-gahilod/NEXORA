import React from 'react';
import Card from '../common/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { Layers } from 'lucide-react';

const COLORS = ['#8B5CF6', '#38BDF8', '#6366F1', '#10B981'];

const CustomBarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card bg-navy-950/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1 min-w-[160px]">
        <p className="font-semibold text-white border-b border-slate-800 pb-1">{data.segment}</p>
        <p className="text-slate-400 flex justify-between">
          <span>Revenue:</span>
          <strong className="text-white font-mono">{formatCurrency(data.revenue)}</strong>
        </p>
        <p className="text-slate-400 flex justify-between">
          <span>Orders:</span>
          <strong className="text-slate-300 font-mono">{formatNumber(data.orders)}</strong>
        </p>
        <p className="text-slate-400 flex justify-between">
          <span>Share:</span>
          <strong className="text-brand-purple-400 font-mono">{data.share}%</strong>
        </p>
        <p className="text-emerald-400 flex justify-between pt-1 border-t border-slate-800">
          <span>QoQ Growth:</span>
          <strong className="font-mono">+{data.growth}%</strong>
        </p>
      </div>
    );
  }
  return null;
};

export const SalesBarChart = ({ data }) => {
  return (
    <Card
      title="Sales by Segment"
      subtitle="Contract value distribution across enterprise & commercial tiers"
      action={
        <div className="flex items-center gap-1.5 text-xs text-brand-blue-400 bg-brand-blue-500/10 px-2 py-1 rounded border border-brand-blue-500/20 font-medium">
          <Layers className="w-3.5 h-3.5" /> 4 Segments
        </div>
      }
    >
      <div className="h-64 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis
              dataKey="segment"
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
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-xs">
        {data?.map((item, idx) => (
          <div key={item.segment} className="p-2 rounded-lg bg-navy-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
              <span className="text-[11px] text-slate-400 truncate">{item.segment}</span>
            </div>
            <p className="font-semibold text-white font-mono text-xs">{formatCurrency(item.revenue)}</p>
            <p className="text-[10px] text-emerald-400">+{item.growth}% QoQ</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SalesBarChart;
