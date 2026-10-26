import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Brain,
  BarChart3,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, badge: 'PRO' },
  { id: 'ai-insights', label: 'AI Insights', icon: Brain, badge: 'AUTO' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({
  currentPage,
  onNavigate,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) => {
  const { user, logout } = useAuth();

  const handleNavClick = (id) => {
    onNavigate(id);
    if (mobileOpen) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-navy-950/95 lg:bg-navy-950/70 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:w-20' : 'lg:w-64'
        } ${mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top: Logo Branding */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
            <div
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-purple-600 via-indigo-600 to-brand-blue-500 p-0.5 shadow-glow-purple group-hover:scale-105 transition-transform shrink-0">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-purple-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>

              {(!collapsed || mobileOpen) && (
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      NEXORA
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-brand-purple-500/20 text-brand-purple-300 border border-brand-purple-500/30">
                      AI
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 tracking-tight truncate">
                    Enterprise Intelligence
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-purple-600/20 to-brand-blue-600/10 text-white border border-brand-purple-500/30 shadow-glow-purple'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent'
                  } ${collapsed && !mobileOpen ? 'justify-center' : ''}`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive
                        ? 'text-brand-purple-400 scale-110'
                        : 'text-slate-400 group-hover:text-slate-200 group-hover:scale-105'
                    }`}
                  />

                  {(!collapsed || mobileOpen) && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}

                  {(!collapsed || mobileOpen) && item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide ${
                        item.badge === 'PRO'
                          ? 'bg-brand-purple-500/20 text-brand-purple-300 border border-brand-purple-500/30'
                          : 'bg-brand-blue-500/20 text-brand-blue-300 border border-brand-blue-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-brand-purple-500 rounded-r-full shadow-glow-purple" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Enterprise Org & User Badge */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          {(!collapsed || mobileOpen) ? (
            <div className="p-2.5 rounded-xl bg-navy-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-navy-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-semibold text-slate-200 truncate">
                    {user?.organization || 'Enterprise Org'}
                  </p>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    SOC2 Certified
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/60 transition-colors shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              title="Sign Out"
              className="w-full flex justify-center p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
