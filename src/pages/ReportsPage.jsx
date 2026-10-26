import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import reportService from '../services/reportService';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { formatCurrency, formatDate } from '../utils/formatters';
import { exportToCSV, printDocument } from '../utils/exportUtils';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  Clock,
  Layers,
  ShieldCheck
} from 'lucide-react';

const REPORT_TEMPLATES = [
  {
    id: 'rpt-exec',
    type: 'EXECUTIVE_SUMMARY',
    title: 'Executive Financial Health & Growth Brief',
    description: 'Consolidated revenue velocity, CAC payback period, and Q4 revenue trajectory model.',
    period: 'Q4 2026 (YTD)',
    records: 18429,
    status: 'Ready',
    lastGenerated: 'Today, 14:30'
  },
  {
    id: 'rpt-rev',
    type: 'REVENUE_AUDIT',
    title: 'Monthly Recurring Revenue (MRR) Ledger',
    description: 'Detailed billing reconciliation across Stripe webhooks and enterprise ACH transfers.',
    period: 'Trailing 12 Months',
    records: 94812,
    status: 'Ready',
    lastGenerated: 'Yesterday, 18:00'
  },
  {
    id: 'rpt-churn',
    type: 'CHURN_DIAGNOSTICS',
    title: 'Customer Retention & Churn Risk Ledger',
    description: 'AI health score clustering identifying high expansion targets and churn candidates.',
    period: 'Trailing 90 Days',
    records: 4892,
    status: 'Ready',
    lastGenerated: 'Oct 24, 2026'
  },
];

export const ReportsPage = () => {
  const { isDemoMode } = useAuth();
  const { addToast } = useNotification();
  const [selectedReport, setSelectedReport] = useState(REPORT_TEMPLATES[0]);
  const [generating, setGenerating] = useState(false);
  const [dateRange, setDateRange] = useState('Q4 2026 (YTD)');
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleGenerateReport = async (template) => {
    setGenerating(true);
    try {
      const res = await reportService.generateReport({
        type: template.type,
        title: template.title,
        dateRange
      });
      setGeneratedReport(res.data);
      addToast({
        title: 'Report Compiled',
        message: `${template.title} compiled with authorized telemetry.`,
        type: 'success'
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadCsv = () => {
    const dataToExport = [
      { Metric: 'Total Revenue', Value: '$1,284,920', Period: dateRange },
      { Metric: 'Total Orders', Value: '18,429', Period: dateRange },
      { Metric: 'Active Customers', Value: '4,892', Period: dateRange },
      { Metric: 'Conversion Rate', Value: '3.42%', Period: dateRange },
      { Metric: 'Net Revenue Retention', Value: '114.8%', Period: dateRange },
      { Metric: 'Enterprise Share', Value: '42.6%', Period: dateRange },
    ];
    exportToCSV(dataToExport, `nexora-report-${selectedReport.type.toLowerCase()}.csv`);
  };

  const handlePrint = () => {
    printDocument();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand-purple-400" />
              Executive Reports & Export Center
            </h2>
            {isDemoMode && (
              <Badge variant="amber" size="sm" showDot>
                Simulated Audits
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Formal business intelligence packages formatted for board meetings and investor updates
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Printer}
            onClick={handlePrint}
          >
            Print View
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={handleDownloadCsv}
          >
            Download CSV
          </Button>
        </div>
      </div>

      {/* Date Range Selector Bar */}
      <div className="glass-card rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 border border-slate-800 no-print">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Calendar className="w-4 h-4 text-brand-purple-400" />
          <span className="font-semibold">Target Period:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-navy-950 border border-slate-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-purple-500"
          >
            <option value="Q4 2026 (YTD)">Q4 2026 (YTD)</option>
            <option value="Q3 2026">Q3 2026</option>
            <option value="Trailing 12 Months">Trailing 12 Months</option>
            <option value="Full Fiscal Year 2026">Full Fiscal Year 2026</option>
          </select>
        </div>

        <Button
          variant="ai"
          size="sm"
          icon={Sparkles}
          isLoading={generating}
          onClick={() => handleGenerateReport(selectedReport)}
        >
          Regenerate AI Report Summary
        </Button>
      </div>

      {/* Report Templates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 no-print">
        {REPORT_TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            onClick={() => setSelectedReport(tmpl)}
            className={`glass-card rounded-xl p-4 cursor-pointer transition-all border ${
              selectedReport.id === tmpl.id
                ? 'border-brand-purple-500 bg-brand-purple-950/20 shadow-glow-purple'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono text-brand-purple-400 bg-brand-purple-500/10 px-2 py-0.5 rounded border border-brand-purple-500/20">
                {tmpl.type}
              </span>
              <Badge variant="emerald" size="sm">
                {tmpl.status}
              </Badge>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">{tmpl.title}</h4>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
              {tmpl.description}
            </p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800 font-mono">
              <span>{tmpl.records.toLocaleString()} records</span>
              <span>{tmpl.lastGenerated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Compiled Report Document Preview (Print-Friendly) */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 bg-navy-850/90 shadow-2xl space-y-6">
        {/* Printable Document Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-purple-400 uppercase">
                CONFIDENTIAL AUDIT REPORT
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">
                REF: {generatedReport?.id || 'RPT-849201'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {selectedReport.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Prepared for: <strong>Global Enterprise Solutions Inc.</strong> • Scope: {dateRange}
            </p>
          </div>

          <div className="text-right text-xs text-slate-400 font-mono">
            <p>Generated: {new Date().toLocaleDateString()}</p>
            <p className="text-emerald-400 flex items-center gap-1 justify-end font-semibold mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Cryptographically Verified
            </p>
          </div>
        </div>

        {/* AI Executive Summary Block */}
        <div className="p-4 rounded-xl bg-navy-950/80 border border-brand-purple-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-purple-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-purple-400" />
            AI Executive Synthesis
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {generatedReport?.summary ||
              `During ${dateRange}, net operational revenue totaled $1,284,920 (+14.2% MoM), outpacing baseline targets by +4.8%. Key expansion velocity was driven by Enterprise multi-seat activations and healthcare sector contract renewals with a 114.8% Net Revenue Retention rate.`}
          </p>
        </div>

        {/* Key Financial Telemetry Table */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-xs text-slate-400">
            Key Telemetry Breakdown
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-navy-900/60">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-navy-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Metric Indicator</th>
                  <th className="py-2.5 px-4 font-semibold">Current Value</th>
                  <th className="py-2.5 px-4 font-semibold">Variance vs Target</th>
                  <th className="py-2.5 px-4 font-semibold">Industry Benchmark</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono text-[11px]">
                <tr>
                  <td className="py-3 px-4 font-sans font-semibold text-white">Gross Revenue Velocity</td>
                  <td className="py-3 px-4 text-brand-purple-400 font-bold">$1,284,920</td>
                  <td className="py-3 px-4 text-emerald-400">+14.2%</td>
                  <td className="py-3 px-4 text-slate-400">$1,100,000</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-400 font-semibold font-sans">Exceeding</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-semibold text-white">Net Revenue Retention (NRR)</td>
                  <td className="py-3 px-4 text-brand-blue-400 font-bold">114.8%</td>
                  <td className="py-3 px-4 text-emerald-400">+2.4%</td>
                  <td className="py-3 px-4 text-slate-400">108.0%</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-400 font-semibold font-sans">Top Quartile</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-semibold text-white">Blended Conversion Rate</td>
                  <td className="py-3 px-4 font-bold">3.42%</td>
                  <td className="py-3 px-4 text-emerald-400">+0.8%</td>
                  <td className="py-3 px-4 text-slate-400">2.80%</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-400 font-semibold font-sans">Healthy</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-semibold text-white">Average Order Value (AOV)</td>
                  <td className="py-3 px-4 font-bold">$142.50</td>
                  <td className="py-3 px-4 text-rose-400">-1.4%</td>
                  <td className="py-3 px-4 text-slate-400">$150.00</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-amber-400 font-semibold font-sans">Monitor</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Sign-off */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            <p className="font-semibold text-slate-300">NEXORA Neural Engine Telemetry Certification</p>
            <p className="text-[11px] text-slate-400">
              Compiled via Java Spring Boot Analytics Service & MySQL 8.0 Enterprise Cluster.
            </p>
          </div>
          <div className="flex items-center gap-3 no-print">
            <Button
              variant="secondary"
              size="sm"
              icon={Printer}
              onClick={handlePrint}
            >
              Print Document
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={handleDownloadCsv}
            >
              Download CSV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
