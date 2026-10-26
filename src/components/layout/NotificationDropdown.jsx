import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Bell, Sparkles, TrendingUp, ShieldAlert, Check, X } from 'lucide-react';

const TYPE_ICONS = {
  ai: Sparkles,
  sales: TrendingUp,
  system: ShieldAlert,
};

const TYPE_COLORS = {
  ai: 'text-brand-purple-400 bg-brand-purple-500/15',
  sales: 'text-brand-blue-400 bg-brand-blue-500/15',
  system: 'text-amber-400 bg-amber-500/15',
};

export const NotificationDropdown = ({ isOpen, onClose }) => {
  const { notifications, markAllAsRead, clearNotification, unreadCount } = useNotification();

  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 mt-2 w-80 sm:w-96 glass-card bg-navy-850 border border-slate-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-up"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-3.5 border-b border-slate-700/60 bg-navy-900/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-purple-400" />
          <h4 className="text-sm font-semibold text-slate-100">Notifications</h4>
          {unreadCount > 0 && (
            <span className="text-[10px] bg-brand-purple-500/20 text-brand-purple-300 font-bold px-1.5 py-0.5 rounded-full border border-brand-purple-500/30">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-[11px] text-brand-purple-400 hover:text-brand-purple-300 flex items-center gap-1 font-medium transition-colors"
          >
            <Check className="w-3 h-3" /> Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">
            No notifications at this time
          </div>
        ) : (
          notifications.map((item) => {
            const Icon = TYPE_ICONS[item.type] || Bell;
            const colorClass = TYPE_COLORS[item.type] || 'text-slate-400 bg-slate-800';

            return (
              <div
                key={item.id}
                className={`p-3.5 flex items-start gap-3 transition-colors hover:bg-slate-800/40 ${
                  !item.read ? 'bg-brand-purple-950/20' : ''
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1 mb-0.5">
                    <p className={`text-xs font-semibold truncate ${!item.read ? 'text-white' : 'text-slate-300'}`}>
                      {item.title}
                    </p>
                    <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {item.message}
                  </p>
                </div>
                <button
                  onClick={() => clearNotification(item.id)}
                  className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors"
                  title="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="p-2.5 bg-navy-900/90 border-t border-slate-800 text-center">
        <span className="text-[11px] text-slate-400 font-medium">
          Connected to Spring Boot Anomaly Telemetry
        </span>
      </div>
    </div>
  );
};

export default NotificationDropdown;
