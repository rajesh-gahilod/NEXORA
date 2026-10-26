import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'AI Anomaly Detected',
      message: 'Unusual spike in self-serve conversions (+28%) detected in US East.',
      time: '10m ago',
      read: false,
      type: 'ai'
    },
    {
      id: 'n-2',
      title: 'Contract Renewal',
      message: 'OmniHealth Solutions finalized annual Enterprise tier agreement ($32k).',
      time: '45m ago',
      read: false,
      type: 'sales'
    },
    {
      id: 'n-3',
      title: 'Daily Backup Completed',
      message: 'Encrypted MySQL cluster snapshot verified across 3 availability zones.',
      time: '3h ago',
      read: true,
      type: 'system'
    }
  ]);

  const addToast = useCallback((toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast = { id, type: 'info', duration: 4000, ...toast };
    
    setToasts(prev => [...prev, newToast]);

    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        notifications,
        markAllAsRead,
        clearNotification,
        unreadCount: notifications.filter(n => !n.read).length
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
