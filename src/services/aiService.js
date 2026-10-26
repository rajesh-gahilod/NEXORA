import api from './api';
import { AI_INSIGHTS_LIST, AI_MOCK_RESPONSES, AI_PRIMARY_INSIGHT } from '../data/mockData';

export const aiService = {
  /**
   * POST /api/ai/chat
   * Sends user query + authorized business context to Java Spring Boot / LLM
   */
  async sendMessage(message, history = []) {
    try {
      const response = await api.post('/ai/chat', {
        message,
        history,
        contextScope: 'ORGANIZATION_SUMMARY'
      });
      return {
        reply: response.reply || response.content,
        timestamp: new Date().toISOString(),
        isDemo: false,
        confidence: response.confidence || 98
      };
    } catch (error) {
      // Simulate realistic intelligent LLM response with network latency
      await new Promise(r => setTimeout(r, 900));

      const lower = message.toLowerCase();
      let reply = AI_MOCK_RESPONSES.default;

      if (lower.includes('analyze') || lower.includes('performance') || lower.includes('margin')) {
        reply = AI_MOCK_RESPONSES.analyze;
      } else if (lower.includes('dip') || lower.includes('decrease') || lower.includes('drop') || lower.includes('august')) {
        reply = AI_MOCK_RESPONSES.dip;
      } else if (lower.includes('best') || lower.includes('product') || lower.includes('segment') || lower.includes('top')) {
        reply = AI_MOCK_RESPONSES.best;
      } else if (lower.includes('suggest') || lower.includes('strateg') || lower.includes('increase') || lower.includes('growth')) {
        reply = AI_MOCK_RESPONSES.strategies;
      } else if (lower.includes('summar') || lower.includes('month') || lower.includes('october') || lower.includes('brief')) {
        reply = AI_MOCK_RESPONSES.summarize;
      }

      return {
        reply,
        timestamp: new Date().toISOString(),
        isDemo: true,
        confidence: 96.2,
        notice: 'Simulated AI Analysis (Demo Mode)'
      };
    }
  },

  /**
   * GET /api/ai/insights
   * Fetches prioritized AI business insights and recommendations
   */
  async getInsights() {
    try {
      const response = await api.get('/ai/insights');
      return { data: response, isDemo: false };
    } catch (error) {
      await new Promise(r => setTimeout(r, 300));
      return {
        data: {
          primary: AI_PRIMARY_INSIGHT,
          insights: AI_INSIGHTS_LIST
        },
        isDemo: true,
        source: 'Simulated Demo Data'
      };
    }
  }
};

export default aiService;
