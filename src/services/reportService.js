import api from './api';
import { KPI_DATA, REVENUE_TRENDS, SALES_BY_SEGMENT, ALL_CUSTOMERS } from '../data/mockData';

export const reportService = {
  /**
   * POST /api/reports/generate
   */
  async generateReport(config) {
    try {
      const response = await api.post('/reports/generate', config);
      return { data: response, isDemo: false };
    } catch (error) {
      await new Promise(r => setTimeout(r, 600));

      const reportId = `RPT-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedAt = new Date().toISOString();

      return {
        data: {
          id: reportId,
          type: config.type || 'EXECUTIVE_SUMMARY',
          title: config.title || 'Executive Performance & Financial Health Audit',
          dateRange: config.dateRange || 'Q4 2026 (YTD)',
          generatedAt,
          summary: `This report consolidates enterprise financial velocity and customer retention telemetry for ${config.dateRange || 'the current period'}. Key findings show Net Revenue at $1,284,920 (+14.2% MoM), with customer acquisition pace exceeding forecasts by 8.4%.`,
          kpis: KPI_DATA,
          trends: REVENUE_TRENDS,
          segments: SALES_BY_SEGMENT,
          sampleRecords: ALL_CUSTOMERS.slice(0, 5),
          format: config.format || 'CSV'
        },
        isDemo: true,
        source: 'Simulated Demo Data'
      };
    }
  }
};

export default reportService;
