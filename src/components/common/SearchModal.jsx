import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Users, FileText, ArrowRight, LayoutDashboard, Brain, BarChart3, Settings, X } from 'lucide-react';
import { ALL_CUSTOMERS } from '../../data/mockData';

export const SearchModal = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true); // open trigger
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPages = [
    { title: 'Dashboard', page: 'dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { title: 'AI Assistant', page: 'ai-assistant', icon: Sparkles, category: 'AI Intelligence' },
    { title: 'AI Insights', page: 'ai-insights', icon: Brain, category: 'AI Intelligence' },
    { title: 'Deep Analytics', page: 'analytics', icon: BarChart3, category: 'Navigation' },
    { title: 'Customer Directory', page: 'customers', icon: Users, category: 'Management' },
    { title: 'Reports & Export', page: 'reports', icon: FileText, category: 'Reporting' },
    { title: 'System Settings', page: 'settings', icon: Settings, category: 'Preferences' },
  ];

  const filteredPages = quickPages.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  const filteredCustomers = ALL_CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.contactName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const handleSelectPage = (page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-xl bg-navy-850 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-700/60 gap-3">
          <Search className="w-5 h-5 text-brand-purple-400" />
          <input
            type="text"
            placeholder="Search pages, customers, AI prompts (e.g. 'OmniHealth', 'Revenue')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-navy-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-4">
          {/* Quick Pages */}
          {filteredPages.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
                Platform Pages
              </p>
              <div className="space-y-1">
                {filteredPages.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.page}
                      onClick={() => handleSelectPage(item.page)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-brand-purple-600/20 group transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-brand-purple-400 group-hover:scale-110 transition-transform" />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-xs text-slate-500 group-hover:text-slate-300 flex items-center gap-1">
                        Go <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customers matches */}
          {filteredCustomers.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
                Matching Accounts
              </p>
              <div className="space-y-1">
                {filteredCustomers.map((cust) => (
                  <button
                    key={cust.id}
                    onClick={() => {
                      onNavigate('customers', { customerId: cust.id });
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-brand-blue-600/20 group transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-blue-500/20 flex items-center justify-center text-xs text-brand-blue-400 font-semibold">
                        {cust.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{cust.name}</p>
                        <p className="text-xs text-slate-400">{cust.contactName} • {cust.tier}</p>
                      </div>
                    </div>
                    <span className="text-xs text-brand-blue-400 font-mono">
                      ${cust.totalSpent.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPages.length === 0 && filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Search className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm">No matching records found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-navy-900/80 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Navigate with <strong>↑ ↓</strong> and <strong>Enter</strong></span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-purple-400" />
            NEXORA Global Intelligence
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
