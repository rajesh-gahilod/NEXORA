import api from './api';
import { ALL_CUSTOMERS } from '../data/mockData';

export const customerService = {
  /**
   * GET /api/customers
   * Fetches customer list with search, filter, and pagination
   */
  async getCustomers(params = {}) {
    const { search = '', status = 'all', tier = 'all', page = 1, limit = 6, sortBy = 'totalSpent', sortDir = 'desc' } = params;
    const query = new URLSearchParams(params).toString();

    try {
      const response = await api.get(`/customers${query ? `?${query}` : ''}`);
      return { data: response, isDemo: false };
    } catch (error) {
      await new Promise(r => setTimeout(r, 250));

      let filtered = [...ALL_CUSTOMERS];

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        filtered = filtered.filter(c =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.contactName.toLowerCase().includes(q)
        );
      }

      // Status filter
      if (status !== 'all') {
        filtered = filtered.filter(c => c.status.toLowerCase() === status.toLowerCase());
      }

      // Tier filter
      if (tier !== 'all') {
        filtered = filtered.filter(c => c.tier.toLowerCase() === tier.toLowerCase());
      }

      // Sort
      filtered.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        
        if (valA < valB) return sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });

      // Pagination
      const total = filtered.length;
      const startIndex = (page - 1) * limit;
      const items = filtered.slice(startIndex, startIndex + limit);
      const totalPages = Math.ceil(total / limit) || 1;

      return {
        data: {
          items,
          total,
          page,
          limit,
          totalPages
        },
        isDemo: true,
        source: 'Simulated Demo Data'
      };
    }
  },

  /**
   * GET /api/customers/:id
   */
  async getCustomerById(id) {
    try {
      const response = await api.get(`/customers/${id}`);
      return { data: response, isDemo: false };
    } catch (error) {
      const found = ALL_CUSTOMERS.find(c => c.id === id) || ALL_CUSTOMERS[0];
      return { data: found, isDemo: true };
    }
  }
};

export default customerService;
