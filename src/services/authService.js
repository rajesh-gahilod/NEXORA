import api from './api';
import { DEMO_USER } from '../data/mockData';

export const authService = {
  /**
   * POST /api/auth/login
   * Authenticats user credentials against Java Spring Boot backend
   * Falls back to realistic demo session when backend is offline
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response && response.token) {
        localStorage.setItem('nexora_token', response.token);
        localStorage.setItem('nexora_user', JSON.stringify(response.user));
        return { success: true, user: response.user, token: response.token, isDemo: false };
      }
      throw new Error('Invalid response from authentication server');
    } catch (error) {
      // If backend is not available, check for demo/sample mode
      console.info('[Auth] Backend unavailable or failed, evaluating demo fallback...');
      
      // Simulate realistic validation delay
      await new Promise(r => setTimeout(r, 600));

      if (email && password && password.length >= 6) {
        const demoUser = {
          ...DEMO_USER,
          email: email,
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || DEMO_USER.name
        };
        localStorage.setItem('nexora_token', demoUser.token);
        localStorage.setItem('nexora_user', JSON.stringify(demoUser));
        return {
          success: true,
          user: demoUser,
          token: demoUser.token,
          isDemo: true,
          notice: 'Authenticated in Demo Mode (Simulated Spring Security JWT)'
        };
      }
      throw new Error(error.message || 'Invalid email or password');
    }
  },

  /**
   * POST /api/auth/register
   * Registers new user account with Spring Boot / MySQL
   */
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, data: response, isDemo: false };
    } catch (error) {
      console.info('[Auth] Backend unavailable, simulating registration success in demo mode');
      await new Promise(r => setTimeout(r, 700));
      
      const newUser = {
        ...DEMO_USER,
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        name: userData.fullName || userData.name || 'New Enterprise User',
        email: userData.email,
        organization: userData.company || 'Enterprise Org'
      };
      
      localStorage.setItem('nexora_token', newUser.token);
      localStorage.setItem('nexora_user', JSON.stringify(newUser));
      return {
        success: true,
        user: newUser,
        token: newUser.token,
        isDemo: true,
        notice: 'Registration simulated in Demo Mode'
      };
    }
  },

  /**
   * Logout user and clear tokens
   */
  logout() {
    localStorage.removeItem('nexora_token');
    localStorage.removeItem('nexora_user');
  },

  /**
   * Get current stored user session
   */
  getCurrentUser() {
    try {
      const u = localStorage.getItem('nexora_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('nexora_token');
  }
};

export default authService;
