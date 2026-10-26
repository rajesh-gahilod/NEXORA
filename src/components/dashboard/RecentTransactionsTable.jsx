import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { Search, CreditCard, ExternalLink, ArrowUpRight } from 'lucide-react';

const STATUS_VARIANTS = {
  Completed: 'emerald',
  Pending: 'amber',
  Failed: 'rose',
  Refunded: 'neutral',
};

const TIER_VARIANTS = {
  Enterprise: 'purple',
  'Mid-Market': 'blue',
  SMB: 'neutral',
};

export const RecentTransactionsTable = ({ transactions = [], onSelectTransaction }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(t =>
    t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card
      title="Recent Inflows & Transactions"
      subtitle="Real-time settlement stream from Stripe, ACH, and Enterprise wire transfers"
      action={
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1 bg-navy-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple-500 w-44"
          />
        </div>
      }
    >
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
              <th className="py-2.5 font-semibold">Transaction ID</th>
              <th className="py-2.5 font-semibold">Customer Account</th>
              <th className="py-2.5 font-semibold">Tier</th>
              <th className="py-2.5 font-semibold">Payment Method</th>
              <th className="py-2.5 font-semibold">Date & Time</th>
              <th className="py-2.5 font-semibold text-right">Amount</th>
              <th className="py-2.5 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  No transactions match your search filter.
                </td>
              </tr>
            ) : (
              filtered.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                  onClick={() => onSelectTransaction?.(tx)}
                >
                  <td className="py-3 font-mono text-brand-purple-400 flex items-center gap-1">
                    <span>{tx.id}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={tx.avatar}
                        alt={tx.customer}
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700"
                      />
                      <div>
                        <p className="font-semibold text-slate-200 group-hover:text-white">{tx.customer}</p>
                        <p className="text-[10px] text-slate-400">{tx.contact}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant={TIER_VARIANTS[tx.tier] || 'neutral'} size="sm">
                      {tx.tier}
                    </Badge>
                  </td>
                  <td className="py-3 text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      {tx.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 font-mono text-[11px]">
                    {formatDateTime(tx.date)}
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-white">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="py-3 text-center">
                    <Badge
                      variant={STATUS_VARIANTS[tx.status] || 'neutral'}
                      showDot
                      size="sm"
                    >
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Showing {filtered.length} of {transactions.length} records</span>
        <span className="text-slate-400">Data source: Stripe Billing Webhook + ACH Relay</span>
      </div>
    </Card>
  );
};

export default RecentTransactionsTable;
