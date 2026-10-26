import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SearchModal from '../common/SearchModal';
import ToastContainer from '../common/ToastContainer';

export const Layout = ({
  children,
  currentPage,
  onNavigate,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col selection:bg-brand-purple-500/30 selection:text-brand-purple-300">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <Header
          currentPage={currentPage}
          onNavigate={onNavigate}
          onOpenSearch={() => setSearchOpen(true)}
          onToggleSidebar={() => setMobileSidebarOpen(prev => !prev)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>

        <footer className="py-4 px-6 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full no-print">
          <div>
            <span className="font-semibold text-slate-400">NEXORA AI</span> • Enterprise Business Intelligence Engine v2.4
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Spring Security 6.x</span>
            <span>MySQL 8.0</span>
            <span>JWT Auth</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              99.98% Uptime
            </span>
          </div>
        </footer>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={onNavigate}
      />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Layout;
