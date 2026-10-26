/**
 * Central API Client for Java Spring Boot Integration
 * Handles JWT injection, error interception, and automatic simulated fallback
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Status tracking for Spring Boot backend connectivity
let isBackendReachable = false;
let lastPingTime = null;

export const checkBackendHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(2500)
    });
    isBackendReachable = res.ok;
    lastPingTime = new Date().toISOString();
    return { reachable: isBackendReachable, status: res.status };
  } catch (err) {
    isBackendReachable = false;
    lastPingTime = new Date().toISOString();
    return { reachable: false, error: err.message };
  }
};

export const getBackendStatus = () => ({
  reachable: isBackendReachable,
  lastPingTime,
  baseUrl: API_BASE_URL
});

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('nexora_token');
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('nexora_token');
      localStorage.removeItem('nexora_user');
      window.dispatchEvent(new CustomEvent('auth:expired'));
      throw new Error('Session expired. Please log in again.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // If backend is unreachable or returned network error, report it
    console.warn(`[NEXORA API] ${endpoint} request failed:`, error.message);
    throw error;
  }
};

export default {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};
