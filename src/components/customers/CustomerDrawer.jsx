import React from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import {
  X,
  Building,
  Mail,
  Phone,
  Globe,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Download,
  CreditCard
} from 'lucide-react';

const TIER_VARIANTS = {
  Enterprise: 'purple',
  'Mid-Market': 'blue',
  SMB: 'neutral',
};

const STATUS_VARIANTS = {
  Active: 'emerald',
  'At-Risk': 'amber',
  Inactive: 'rose',
};

export const CustomerDrawer = ({ customer, isOpen, onClose, onAskAboutCustomer }) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-navy-900 border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto glass-card shadow-2xl animate-slide-left">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Customer Intelligence Profile
              </span>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="mt-5 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-purple-600 to-brand-blue-500 p-0.5 shadow-glow-purple shrink-0">
                <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center text-xl font-bold text-white">
                  {customer.name[0]}
                </div>
              </div>
              <div className="overflow-hidden">
                <h3 className="text-lg font-bold text-white truncate">{customer.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  {customer.industry || 'Technology'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={TIER_VARIANTS[customer.tier] || 'neutral'} size="sm">
                    {customer.tier}
                  </Badge>
                  <Badge variant={STATUS_VARIANTS[customer.status] || 'neutral'} showDot size="sm">
                    {customer.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-navy-850 border border-slate-800">
                <p className="text-[11px] text-slate-400 font-medium">Lifetime Spend</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">
                  {formatCurrency(customer.totalSpent)}
                </p>
                <span className="text-[10px] text-slate-400">{customer.ordersCount} total orders</span>
              </div>

              <div className="p-3 rounded-xl bg-navy-850 border border-slate-800">
                <p className="text-[11px] text-slate-400 font-medium">AI Health Score</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-lg font-bold text-white font-mono">
                    {customer.healthScore}/100
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      customer.healthScore > 80
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : customer.healthScore > 60
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {customer.churnRisk} Risk
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Churn probability: {100 - customer.healthScore}%</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="mt-6 space-y-3 p-4 rounded-xl bg-navy-850/60 border border-slate-800 text-xs">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Direct Contact & Billing Info
              </p>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5" /> Contact
                </span>
                <span className="font-medium text-white">{customer.contactName}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5" /> Email
                </span>
                <span className="font-mono text-brand-purple-400">{customer.email}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5" /> Phone
                </span>
                <span className="font-mono text-slate-300">{customer.phone}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2 text-slate-400">
                  <Globe className="w-3.5 h-3.5" /> Country
                </span>
                <span>{customer.country}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" /> Customer Since
                </span>
                <span className="font-mono">{formatDate(customer.joinedDate)}</span>
              </div>
            </div>

            {/* AI Diagnostics Card */}
            <div className="mt-5 p-3.5 rounded-xl bg-brand-purple-950/30 border border-brand-purple-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-purple-300">
                <Sparkles className="w-4 h-4 text-brand-purple-400" />
                <span>NEXORA AI Account Assessment</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {customer.status === 'At-Risk'
                  ? `Telemetry signals 34% drop in active queries over 14 days. Recommend scheduling a CSM retention review with ${customer.contactName}.`
                  : `High platform engagement with automated pipelines. Target for annual Enterprise seat expansion (projected +$18k ARR).`}
              </p>
            </div>
          </div>

          {/* Drawer Actions */}
          <div className="pt-6 border-t border-slate-800 space-y-2">
            <Button
              variant="ai"
              className="w-full"
              size="sm"
              icon={Sparkles}
              onClick={() => {
                onAskAboutCustomer?.(customer);
                onClose();
              }}
            >
              Ask AI Assistant About {customer.name}
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              size="sm"
              icon={Download}
              onClick={() => alert(`Exporting statement for ${customer.name}...`)}
            >
              Export Account Statement (CSV)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDrawer;
