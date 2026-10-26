import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import dashboardService from '../services/dashboardService';
import KpiCard from '../components/dashboard/KpiCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import SalesBarChart from '../components/dashboard/SalesBarChart';
import CustomerDistChart from '../components/dashboard/CustomerDistChart';
import RecentTransactionsTable from '../components/dashboard/RecentTransactionsTable';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import AiInsightsCard from '../components/dashboard/AiInsightsCard';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Percent,
  Calendar,
  Sparkles,
  Download,
  RefreshCw,
  Info
} from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';

export const DashboardPage = ({ onNavigate }) => {
  const { isDemoMode } = useAuth();
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboard = async (range) => {
    setLoading(true);
    try {
      const res = await dashboardService.getSummary(range);
      setDashboardData(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard(dateRange);
  }, [dateRange]);

  const handleExportSummary = () => {
    if (!dashboardData) return;
    const exportRows = dashboardData.recentTransactions || [];
    exportToCSV(exportRows, `nexora-transactions-${dateRange}.csv`);
  };

  const handleAskAssistant = (promptText) => {
    onNavigate('ai-assistant', { initialPrompt: promptText });
  };

  const kpis = dashboardData?.kpis;

  return (
    <div className="space-y-6">
      {/* Top Bar: Page Greeting + Date Range Controls + Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Executive Business Overview
            </h2>
            {isDemoMode && (
              <Badge variant="amber" size="sm" showDot>
                Simulated Demo Telemetry
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time revenue metrics, neural forecasting, and transaction audits
          </p>
        </div>

        {/* Date Filter & Export */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-navy-850 border border-slate-700/80 rounded-xl p-1 text-xs">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  dateRange === range
                    ? 'bg-brand-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            isLoading={loading}
            onClick={() => fetchDashboard(dateRange)}
            title="Refresh Metrics"
          />

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleExportSummary}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Demo Mode Notice Banner */}
      {isDemoMode && (
        <div className="p-3 rounded-xl bg-navy-850/80 border border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-brand-purple-400 shrink-0" />
            <span>
              <strong>Demo Environment Active</strong>: Visualizing sample high-velocity SaaS metrics. To switch to live MySQL backend, configure your Spring Boot API in Settings.
            </span>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className="text-[11px] font-semibold text-brand-purple-400 hover:text-brand-purple-300 underline shrink-0 ml-2"
          >
            Backend Config
          </button>
        </div>
      )}

      {/* AI Primary Insight Card */}
      <AiInsightsCard
        insight={dashboardData?.primaryAiInsight}
        onAskAssistant={handleAskAssistant}
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Revenue"
          value={kpis?.totalRevenue?.formatted || '$1,284,920'}
          change={kpis?.totalRevenue?.change || 14.2}
          trend={kpis?.totalRevenue?.trend || 'up'}
          period={kpis?.totalRevenue?.period || 'vs last month'}
          target={kpis?.totalRevenue?.target || '$1,200,000'}
          progress={kpis?.totalRevenue?.progress || 107.1}
          icon={DollarSign}
          colorScheme="purple"
        />

        <KpiCard
          title="Total Orders"
          value={kpis?.totalOrders?.formatted || '18,429'}
          change={kpis?.totalOrders?.change || 8.5}
          trend={kpis?.totalOrders?.trend || 'up'}
          period={kpis?.totalOrders?.period || 'vs last month'}
          target={kpis?.totalOrders?.target || '17,000'}
          progress={kpis?.totalOrders?.progress || 108.4}
          icon={ShoppingCart}
          colorScheme="blue"
        />

        <KpiCard
          title="Active Customers"
          value={kpis?.activeCustomers?.formatted || '4,892'}
          change={kpis?.activeCustomers?.change || 12.1}
          trend={kpis?.activeCustomers?.trend || 'up'}
          period={kpis?.activeCustomers?.period || 'vs last month'}
          target={kpis?.activeCustomers?.target || '4,500'}
          progress={kpis?.activeCustomers?.progress || 108.7}
          icon={Users}
          colorScheme="emerald"
        />

        <KpiCard
          title="Conversion Rate"
          value={kpis?.conversionRate?.formatted || '3.42%'}
          change={kpis?.conversionRate?.change || 0.8}
          trend={kpis?.conversionRate?.trend || 'up'}
          period={kpis?.conversionRate?.period || 'vs last month'}
          target={kpis?.conversionRate?.target || '3.20%'}
          progress={kpis?.conversionRate?.progress || 106.8}
          icon={Percent}
          colorScheme="amber"
        />
      </div>

      {/* Charts Row: Revenue Velocity + Regional Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={dashboardData?.revenueTrends} isDemo={isDemoMode} />
        </div>
        <div>
          <CustomerDistChart data={dashboardData?.customerDistribution} />
        </div>
      </div>

      {/* Second Charts Row: Sales by Segment + Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesBarChart data={dashboardData?.salesBySegment} />
        </div>
        <div>
          <ActivityFeed activities={dashboardData?.activityFeed} />
        </div>
      </div>

      {/* Recent Transactions Table */}
      <RecentTransactionsTable
        transactions={dashboardData?.recentTransactions}
        onSelectTransaction={(tx) => {
          onNavigate('customers', { search: tx.customer });
        }}
      />
    </div>
  );
};

export default DashboardPage;
