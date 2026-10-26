import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import customerService from '../services/customerService';
import CustomerDrawer from '../components/customers/CustomerDrawer';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { formatCurrency, formatDate } from '../utils/formatters';
import { exportToCSV } from '../utils/exportUtils';
import {
  Users,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  ArrowUpDown,
  Building,
  Mail
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

export const CustomersPage = ({ onNavigate, initialCustomerId = null, initialSearch = '' }) => {
  const { isDemoMode } = useAuth();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('totalSpent');
  const [sortDir, setSortDir] = useState('desc');
  const [customersData, setCustomersData] = useState({ items: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await customerService.getCustomers({
        search: searchTerm,
        status: statusFilter,
        tier: tierFilter,
        page,
        limit: 7,
        sortBy,
        sortDir
      });
      setCustomersData(res.data);

      if (initialCustomerId && !selectedCustomer) {
        const target = res.data.items?.find(c => c.id === initialCustomerId);
        if (target) {
          setSelectedCustomer(target);
          setDrawerOpen(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, statusFilter, tierFilter, page, sortBy, sortDir]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
  };

  const handleOpenCustomer = (customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  const handleExportCustomers = () => {
    exportToCSV(customersData.items || [], 'nexora-customers-directory.csv');
  };

  const handleAskAboutCustomer = (customer) => {
    onNavigate('ai-assistant', {
      initialPrompt: `Analyze customer account "${customer.name}". What is their churn risk, lifetime spend, and strategic expansion opportunity?`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-brand-purple-400" />
              Customer Intelligence Directory
            </h2>
            {isDemoMode && (
              <Badge variant="amber" size="sm" showDot>
                Sample Account Records
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise account health scores, lifetime contract values, and predictive churn indicators
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Download}
          onClick={handleExportCustomers}
        >
          Export CSV
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border border-slate-800">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search accounts by name, email, or contact..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 bg-navy-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple-500"
          />
        </div>

        {/* Tier filter */}
        <div className="flex items-center gap-2">
          <select
            value={tierFilter}
            onChange={(e) => {
              setTierFilter(e.target.value);
              setPage(1);
            }}
            className="bg-navy-950 border border-slate-700/80 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-purple-500"
          >
            <option value="all">All Tiers</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Mid-Market">Mid-Market</option>
            <option value="SMB">SMB</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-navy-950 border border-slate-700/80 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="At-Risk">At-Risk</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Main Table Card */}
      <Card>
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 font-semibold">Account & Contact</th>
                <th className="py-3 font-semibold">Tier</th>
                <th
                  className="py-3 font-semibold cursor-pointer hover:text-white"
                  onClick={() => handleSort('totalSpent')}
                >
                  <span className="flex items-center gap-1">
                    Total Purchases <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th
                  className="py-3 font-semibold cursor-pointer hover:text-white"
                  onClick={() => handleSort('healthScore')}
                >
                  <span className="flex items-center gap-1">
                    AI Health Score <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th className="py-3 font-semibold">Registration Date</th>
                <th className="py-3 font-semibold">Status</th>
                <th className="py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {customersData.items?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500 text-xs">
                    No customers found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                customersData.items?.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    onClick={() => handleOpenCustomer(cust)}
                  >
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-navy-800 border border-slate-700/80 flex items-center justify-center font-bold text-white text-xs group-hover:border-brand-purple-500 transition-colors">
                          {cust.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200 group-hover:text-white">
                            {cust.name}
                          </p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {cust.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <Badge variant={TIER_VARIANTS[cust.tier] || 'neutral'} size="sm">
                        {cust.tier}
                      </Badge>
                    </td>

                    <td className="py-3.5 font-mono font-bold text-white">
                      {formatCurrency(cust.totalSpent)}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {cust.ordersCount} orders
                      </span>
                    </td>

                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-200">
                          {cust.healthScore}/100
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            cust.healthScore > 80
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : cust.healthScore > 60
                              ? 'bg-amber-500/15 text-amber-400'
                              : 'bg-rose-500/15 text-rose-400'
                          }`}
                        >
                          {cust.churnRisk}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 text-slate-400 font-mono text-[11px]">
                      {formatDate(cust.joinedDate)}
                    </td>

                    <td className="py-3.5">
                      <Badge variant={STATUS_VARIANTS[cust.status] || 'neutral'} showDot size="sm">
                        {cust.status}
                      </Badge>
                    </td>

                    <td className="py-3.5 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Eye}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCustomer(cust);
                        }}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing {customersData.items?.length || 0} of {customersData.total || 0} customer records
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-slate-700 bg-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-300">
              Page {page} of {customersData.totalPages || 1}
            </span>
            <button
              onClick={() => setPage(p => Math.min(customersData.totalPages || 1, p + 1))}
              disabled={page >= (customersData.totalPages || 1)}
              className="p-1.5 rounded-lg border border-slate-700 bg-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-slate-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Customer Slide-out Drawer */}
      <CustomerDrawer
        customer={selectedCustomer}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAskAboutCustomer={handleAskAboutCustomer}
      />
    </div>
  );
};

export default CustomersPage;
