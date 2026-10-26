import api from './api';
import {
  KPI_DATA,
  REVENUE_TRENDS,
  SALES_BY_SEGMENT,
  CUSTOMER_DISTRIBUTION,
  RECENT_TRANSACTIONS,
  ACTIVITY_FEED,
  AI_PRIMARY_INSIGHT
} from '../data/mockData';

export const dashboardService = {
  /**
   * GET /api/dashboard/summary
   * Fetches core KPIs, trends, recent transactions and activities
   */
  async getSummary(dateRange = '30d') {
    try {
      const response = await api.get(`/dashboard/summary?range=${dateRange}`);
      return { data: response, isDemo: false };
    } catch (error) {
      // Backend offline: return high-fidelity demo dataset
      await new Promise(r => setTimeout(r, 300));
      return {
        data: {
          kpis: KPI_DATA,
          revenueTrends: REVENUE_TRENDS,
          salesBySegment: SALES_BY_SEGMENT,
          customerDistribution: CUSTOMER_DISTRIBUTION,
          recentTransactions: RECENT_TRANSACTIONS,
          activityFeed: ACTIVITY_FEED,
          primaryAiInsight: AI_PRIMARY_INSIGHT,
          dateRange
        },
        isDemo: true,
        source: 'Simulated Demo Data'
      };
    }
  }
};

export default dashboardService;
