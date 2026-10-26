import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import analyticsService from '../services/analyticsService';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { exportToCSV } from '../utils/exportUtils';
import {
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

const CustomAnalyticsTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card bg-navy-950/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1 min-w-[170px]">
        <p className="font-semibold text-white border-b border-slate-800 pb-1">{label}</p>
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 text-[11px]">
            <span style={{ color: entry.color }} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-mono font-semibold text-white">
              {typeof entry.value === 'number' && entry.name.includes('($)')
                ? formatCurrency(entry.value)
                : formatNumber(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AnalyticsPage = () => {
  const { isDemoMode } = useAuth();
  const [period, setPeriod] = useState('1y');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await analyticsService.getRevenueAnalytics({
          period,
          category: selectedCategory
        });
        setAnalyticsData(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [period, selectedCategory]);

  const handleExport = () => {
    if (!analyticsData) return;
    exportToCSV(analyticsData.monthlyRevenue || [], `nexora-revenue-analytics-${period}.csv`);
  };

  const monthly = analyticsData?.monthlyRevenue || [];
  const categories = analyticsData?.categoryBreakdown || [];
  const metrics = analyticsData?.growthMetrics || {};

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-brand-blue-400" />
              Multi-Dimensional Analytics
            </h2>
            {isDemoMode && (
              <Badge variant="amber" size="sm" showDot>
                Demo Telemetry
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deep granular telemetry on monthly recurring revenue, category contribution, and customer cohort CAC payback
          </p>
        </div>

        {/* Global Filter Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-navy-850 border border-slate-700/80 rounded-xl p-1 text-xs">
            {['7d', '90d', '1y'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  period === p
                    ? 'bg-brand-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleExport}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Growth Metric Strips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">YoY Growth</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">+{metrics.yoy || 26.4}%</p>
          <span className="text-[10px] text-slate-400">Pacing +4.8% vs annual targets</span>
        </div>

        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Net Retention (NRR)</span>
          <p className="text-2xl font-extrabold text-brand-purple-400 font-mono mt-1">{metrics.netRevenueRetention || 114.8}%</p>
          <span className="text-[10px] text-slate-400">Expansion ARR exceeding logo churn</span>
        </div>

        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">CAC Payback Period</span>
          <p className="text-2xl font-extrabold text-brand-blue-400 font-mono mt-1">{metrics.cacPaybackMonths || 7.2} Mo</p>
          <span className="text-[10px] text-slate-400">Enterprise average: 5.8 months</span>
        </div>

        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Target Variance</span>
          <p className="text-2xl font-extrabold text-white font-mono mt-1">+{metrics.targetVariance || 4.8}%</p>
          <span className="text-[10px] text-emerald-400">Positive delta for 4 consecutive quarters</span>
        </div>
      </div>

      {/* Chart 1: Revenue Trajectory (Actual vs Previous vs Forecast) */}
      <Card
        title="Revenue Trajectory & Historical Seasonality"
        subtitle="Tracking multi-period financial flow with AI trend line"
      >
        <div className="h-72 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="anRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip content={<CustomAnalyticsTooltip />} />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: 10, fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue ($)"
                stroke="#38BDF8"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#anRevenueGrad)"
              />
              <Line
                type="monotone"
                dataKey="forecast"
                name="Forecast ($)"
                stroke="#C084FC"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="previous"
                name="Previous Year ($)"
                stroke="#64748B"
                strokeWidth={1.5}
                strokeDasharray="2 2"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Two Column Grid: Product Category Breakdown & Order Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories Bar Chart */}
        <Card
          title="Revenue by Product Category"
          subtitle="Direct contribution to top-line ARR by functional module"
        >
          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                <YAxis dataKey="category" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} width={110} />
                <Tooltip content={<CustomAnalyticsTooltip />} />
                <Bar dataKey="revenue" name="Revenue ($)" fill="#8B5CF6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Share & Metrics List */}
        <Card
          title="Product Performance Matrix"
          subtitle="Order volume, market share, and platform attach rates"
        >
          <div className="space-y-3 mt-1">
            {categories.map((cat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-navy-900/60 border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white">{cat.category}</span>
                  <span className="font-mono font-bold text-brand-purple-400">{formatCurrency(cat.revenue)}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-blue-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{cat.percentage}% of overall ARR</span>
                  <span>{formatNumber(cat.orders)} transactions</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
