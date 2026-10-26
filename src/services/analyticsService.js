import api from './api';
import {
  REVENUE_TRENDS,
  SALES_BY_SEGMENT,
  CATEGORY_BREAKDOWN
} from '../data/mockData';

export const analyticsService = {
  /**
   * GET /api/analytics/revenue
   * Retrieves multidimensional revenue metrics, categories, and customer acquisition
   */
  async getRevenueAnalytics(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    try {
      const response = await api.get(`/analytics/revenue${query ? `?${query}` : ''}`);
      return { data: response, isDemo: false };
    } catch (error) {
      await new Promise(r => setTimeout(r, 350));
      
      // Dynamic adjustments based on selected period or category
      let monthlyData = [...REVENUE_TRENDS];
      if (filters.period === '7d') {
        monthlyData = monthlyData.slice(-3);
      } else if (filters.period === '90d') {
        monthlyData = monthlyData.slice(-6);
      }

      return {
        data: {
          monthlyRevenue: monthlyData,
          salesBySegment: SALES_BY_SEGMENT,
          categoryBreakdown: CATEGORY_BREAKDOWN,
          growthMetrics: {
            yoy: 26.4,
            mom: 14.2,
            targetVariance: 4.8,
            cacPaybackMonths: 7.2,
            netRevenueRetention: 114.8
          }
        },
        isDemo: true,
        source: 'Simulated Demo Data'
      };
    }
  }
};

export default analyticsService;
