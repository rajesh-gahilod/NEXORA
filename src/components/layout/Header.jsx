import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import NotificationDropdown from './NotificationDropdown';
import {
  Search,
  Bell,
  Menu,
  Server,
  Sparkles,
  ChevronRight,
  LogOut,
  User,
  ShieldCheck,
  Zap
} from 'lucide-react';

const PAGE_TITLES = {
  dashboard: 'Executive Dashboard',
  'ai-assistant': 'AI Business Assistant',
  'ai-insights': 'Predictive AI Insights',
  analytics: 'Deep Performance Analytics',
  customers: 'Customer Intelligence & Accounts',
  reports: 'Reports & Export Center',
  settings: 'System & Security Settings',
};

export const Header = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onToggleSidebar,
  sidebarCollapsed
}) => {
  const { user, logout, isDemoMode, toggleDemoMode } = useAuth();
  const { unreadCount } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-navy-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 lg:hidden transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-0.5">
            <span className="hover:text-slate-300 transition-colors">NEXORA</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-brand-purple-400 font-medium">Enterprise Suite</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {PAGE_TITLES[currentPage] || 'Analytics Platform'}
          </h1>
        </div>
      </div>

      {/* Right Controls: Search, Backend Status, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Button (Cmd+K) */}
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-navy-850 hover:bg-navy-800 border border-slate-700/70 hover:border-slate-600 text-slate-400 hover:text-slate-200 rounded-lg text-xs transition-all shadow-inner"
        >
          <Search className="w-3.5 h-3.5 text-brand-purple-400" />
          <span>Quick search...</span>
          <kbd className="text-[10px] bg-navy-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Backend / Demo Mode Status Pill */}
        <button
          onClick={toggleDemoMode}
          title={isDemoMode ? "Currently running on simulated Spring Boot API telemetry. Click to toggle." : "Connected to live Spring Boot REST API."}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
            isDemoMode
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
          }`}
        >
          <Server className="w-3 h-3" />
          <span className="hidden md:inline">{isDemoMode ? 'Demo Mode Active' : 'Spring Boot Live'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-subtle" />
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(prev => !prev);
              setShowUserMenu(false);
            }}
            className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-purple-500 rounded-full ring-2 ring-navy-900" />
            )}
          </button>
          <NotificationDropdown
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(prev => !prev);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all"
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
              alt={user?.name || "User"}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-brand-purple-500/40"
            />
            <span className="hidden lg:block text-xs font-medium text-slate-200">
              {user?.name?.split(' ')[0] || 'User'}
            </span>
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 mt-2 w-56 glass-card bg-navy-850 border border-slate-700/80 rounded-xl shadow-2xl p-2 z-50 animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 border-b border-slate-700/60 mb-1">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-medium text-brand-purple-300 bg-brand-purple-500/20 px-1.5 py-0.5 rounded border border-brand-purple-500/30">
                  {user?.role || 'Executive Admin'}
                </span>
              </div>

              <button
                onClick={() => {
                  onNavigate('settings');
                  setShowUserMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors text-left"
              >
                <User className="w-3.5 h-3.5 text-brand-blue-400" />
                Profile & Settings
              </button>

              <button
                onClick={() => {
                  onNavigate('ai-assistant');
                  setShowUserMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-brand-purple-600/20 rounded-lg transition-colors text-left"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-purple-400" />
                AI Assistant
              </button>

              <div className="my-1 border-t border-slate-700/60" />

              <button
                onClick={() => {
                  logout();
                  setShowUserMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors text-left font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
