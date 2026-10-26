import React from 'react';
import Card from '../common/Card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatNumber } from '../../utils/formatters';
import { Globe2 } from 'lucide-react';

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card bg-navy-950/95 border border-slate-700/80 p-2.5 rounded-xl shadow-2xl text-xs space-y-1">
        <p className="font-semibold text-white flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.fill }} />
          {data.name}
        </p>
        <p className="text-slate-400 flex justify-between gap-4">
          <span>Active Accounts:</span>
          <strong className="text-white font-mono">{formatNumber(data.count)}</strong>
        </p>
        <p className="text-slate-400 flex justify-between gap-4">
          <span>Share:</span>
          <strong className="text-brand-purple-400 font-mono">{data.value}%</strong>
        </p>
      </div>
    );
  }
  return null;
};

export const CustomerDistChart = ({ data }) => {
  const totalCount = data?.reduce((acc, curr) => acc + (curr.count || 0), 0) || 4892;

  return (
    <Card
      title="Regional Distribution"
      subtitle="Active client accounts clustered by primary billing headquarters"
      action={
        <div className="flex items-center gap-1 text-xs text-brand-purple-400 font-mono">
          <Globe2 className="w-3.5 h-3.5" /> 4 Regions
        </div>
      }
    >
      <div className="relative h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomPieTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="#0B0F19" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-white font-mono">{formatNumber(totalCount)}</span>
          <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">Accounts</span>
        </div>
      </div>

      <div className="mt-2 space-y-1.5 pt-2 border-t border-slate-800/80">
        {data?.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
              <span className="text-slate-300 truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-3 font-mono">
              <span className="text-slate-400 text-[11px]">{formatNumber(item.count)}</span>
              <span className="text-white font-semibold w-8 text-right">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CustomerDistChart;
