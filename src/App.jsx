import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/layout/Layout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Main Platform Pages
import DashboardPage from './pages/DashboardPage';
import AiAssistantPage from './pages/AiAssistantPage';
import AiInsightsPage from './pages/AiInsightsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CustomersPage from './pages/CustomersPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageParams, setPageParams] = useState({});

  // Dynamic Browser Document Title
  useEffect(() => {
    const titles = {
      dashboard: 'Executive Dashboard | NEXORA AI',
      'ai-assistant': 'AI Business Assistant | NEXORA AI',
      'ai-insights': 'Predictive Insights | NEXORA AI',
      analytics: 'Deep Analytics | NEXORA AI',
      customers: 'Customer Intelligence | NEXORA AI',
      reports: 'Executive Reports | NEXORA AI',
      settings: 'System Settings | NEXORA AI',
    };
    document.title = titles[currentPage] || 'NEXORA AI — Intelligent Business Analytics Platform';
  }, [currentPage]);

  const handleNavigate = (pageId, params = {}) => {
    setCurrentPage(pageId);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is not authenticated, show premium Login / Registration flow
  if (!isAuthenticated) {
    if (authView === 'register') {
      return <RegisterPage onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <LoginPage onSwitchToRegister={() => setAuthView('register')} />;
  }

  // Render authenticated pages within Layout
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'ai-assistant':
        return <AiAssistantPage initialPrompt={pageParams.initialPrompt} />;
      case 'ai-insights':
        return <AiInsightsPage onNavigate={handleNavigate} />;
      case 'analytics':
        return <AnalyticsPage onNavigate={handleNavigate} />;
      case 'customers':
        return (
          <CustomersPage
            onNavigate={handleNavigate}
            initialCustomerId={pageParams.customerId}
            initialSearch={pageParams.search || ''}
          />
        );
      case 'reports':
        return <ReportsPage onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
    >
      {renderCurrentPage()}
    </Layout>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
