import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { checkBackendHealth } from '../services/api';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  Settings,
  User,
  Bell,
  Cpu,
  Server,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lock,
  RefreshCw,
  Sliders,
  Moon
} from 'lucide-react';

export const SettingsPage = () => {
  const { user, setUser, logout, isDemoMode, toggleDemoMode } = useAuth();
  const { addToast } = useNotification();

  // Profile Form State
  const [name, setName] = useState(user?.name || 'Alexandra Vance');
  const [email, setEmail] = useState(user?.email || 'alexandra.vance@nexora.io');
  const [role, setRole] = useState(user?.role || 'Chief Analytics Officer');
  const [organization, setOrganization] = useState(user?.organization || 'Global Enterprise Solutions Inc.');

  // Notification Preferences
  const [emailDigest, setEmailDigest] = useState(true);
  const [anomalyAlerts, setAnomalyAlerts] = useState(true);
  const [weeklySummaries, setWeeklySummaries] = useState(true);

  // Backend & AI Config
  const [backendUrl, setBackendUrl] = useState('http://localhost:8080/api');
  const [aiProvider, setAiProvider] = useState('spring-ai-openai');
  const [checkingBackend, setCheckingBackend] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      email,
      role,
      organization
    };
    setUser(updated);
    localStorage.setItem('nexora_user', JSON.stringify(updated));
    addToast({
      title: 'Profile Updated',
      message: 'Your executive profile details were saved successfully.',
      type: 'success'
    });
  };

  const handleTestBackendConnection = async () => {
    setCheckingBackend(true);
    try {
      const res = await checkBackendHealth();
      setBackendStatus(res);
      if (res.reachable) {
        addToast({
          title: 'Spring Boot Connected',
          message: `Successfully reached Spring Boot REST cluster at ${backendUrl}`,
          type: 'success'
        });
      } else {
        addToast({
          title: 'Backend Offline',
          message: 'Could not reach Spring Boot server. Demo mode remains active.',
          type: 'warning'
        });
      }
    } finally {
      setCheckingBackend(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Settings className="w-6 h-6 text-slate-300" />
              Platform & Security Settings
            </h2>
            <Badge variant="purple" size="sm">
              v2.4.0
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure your executive profile, Spring Boot API endpoint, telemetry notifications, and AI credentials
          </p>
        </div>

        <Button
          variant="danger"
          size="sm"
          icon={LogOut}
          onClick={logout}
        >
          Sign Out of Workspace
        </Button>
      </div>

      {/* Grid: Profile & Backend Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <Card
          title="User Profile & Identity"
          subtitle="Manage your credentials within Spring Security JWT context"
        >
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-4 pb-2">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt="Avatar"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-purple-500/40"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{name}</h4>
                <p className="text-xs text-slate-400">{role}</p>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3 h-3" /> Authenticated via Spring JWT
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-navy-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Corporate Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-navy-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Corporate Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-purple-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="sm">
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Backend & AI Integration Card */}
        <Card
          title="Backend & AI Engine Setup"
          subtitle="Spring Boot REST API endpoint & encapsulated LLM integration"
          action={
            <Badge variant={isDemoMode ? 'amber' : 'emerald'} showDot size="sm">
              {isDemoMode ? 'Demo Mode' : 'Connected'}
            </Badge>
          }
        >
          <div className="space-y-4">
            {/* Backend URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Spring Boot API Base URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  placeholder="http://localhost:8080/api"
                  className="flex-1 px-3 py-2 bg-navy-950 border border-slate-700/80 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-brand-purple-500"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  icon={RefreshCw}
                  isLoading={checkingBackend}
                  onClick={handleTestBackendConnection}
                >
                  Test Connection
                </Button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Endpoint for authentication, MySQL database queries, and AI proxy routes.
              </p>
            </div>

            {/* AI Provider Config */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Configured AI LLM Engine (Backend Handled)
              </label>
              <select
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value)}
                className="w-full px-3 py-2 bg-navy-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-purple-500"
              >
                <option value="spring-ai-openai">Spring AI — OpenAI GPT-4o Enterprise</option>
                <option value="spring-ai-claude">Spring AI — Anthropic Claude 3.5 Sonnet</option>
                <option value="spring-ai-azure">Spring AI — Azure OpenAI Private Cloud</option>
                <option value="gemini-flash">Google Gemini 1.5 Pro Telemetry Engine</option>
              </select>
            </div>

            {/* Security Notice on API Keys */}
            <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 text-xs space-y-1">
              <p className="font-semibold text-brand-purple-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Enterprise Security Protocol
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                As per enterprise security compliance standards, <strong>never store raw AI API keys in frontend code</strong>. All LLM calls are signed and tokenized server-side by your Spring Boot backend microservice.
              </p>
            </div>

            {/* Demo Mode Toggle */}
            <div className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Simulated Demo Mode Fallback</p>
                <p className="text-[11px] text-slate-400">
                  Fallback to sample SaaS telemetry when Spring Boot backend is offline
                </p>
              </div>
              <button
                type="button"
                onClick={toggleDemoMode}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isDemoMode ? 'bg-brand-purple-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isDemoMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Preferences Section: Notifications & Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Notification Preferences"
          subtitle="Configure real-time telemetry anomaly dispatches"
        >
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-navy-950/60 border border-slate-800 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-white">AI Anomaly Alerts</p>
                <p className="text-[11px] text-slate-400">Immediate dispatches for sudden drops in conversion or checkouts</p>
              </div>
              <input
                type="checkbox"
                checked={anomalyAlerts}
                onChange={(e) => setAnomalyAlerts(e.target.checked)}
                className="w-4 h-4 rounded bg-navy-900 border-slate-700 text-brand-purple-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-navy-950/60 border border-slate-800 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-white">Weekly Executive Financial Digest</p>
                <p className="text-[11px] text-slate-400">Consolidated Monday summary with neural forecast delta</p>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="w-4 h-4 rounded bg-navy-900 border-slate-700 text-brand-purple-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-navy-950/60 border border-slate-800 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-white">Contract Renewal Alerts</p>
                <p className="text-[11px] text-slate-400">Reminders for enterprise accounts entering 60-day renewal cycle</p>
              </div>
              <input
                type="checkbox"
                checked={weeklySummaries}
                onChange={(e) => setWeeklySummaries(e.target.checked)}
                className="w-4 h-4 rounded bg-navy-900 border-slate-700 text-brand-purple-600 focus:ring-0"
              />
            </label>
          </div>
        </Card>

        <Card
          title="Display & Environment"
          subtitle="Dark mode styling and high-density SaaS dashboard controls"
        >
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-navy-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-purple-500/15 text-brand-purple-400">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Executive Dark Navy Theme</p>
                  <p className="text-[11px] text-slate-400">Optimized for high-contrast multi-monitor executive trading floors</p>
                </div>
              </div>
              <Badge variant="purple" size="sm">Active Default</Badge>
            </div>

            <div className="p-4 rounded-xl bg-navy-900/40 border border-slate-800 text-xs space-y-2">
              <p className="font-semibold text-slate-300">Database Engine Credentials</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                <div>Cluster: <span className="text-white">MySQL 8.0.35</span></div>
                <div>Storage: <span className="text-white">AWS Aurora Replica</span></div>
                <div>JWT Expiry: <span className="text-white">24 Hours</span></div>
                <div>Algorithm: <span className="text-white">HS256 / RSA4096</span></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
