// ...existing code...
import { API_CONFIG, ENDPOINTS } from '../config/api'; // CHANGED: correct relative path and import ENDPOINTS

const API_BASE_URL = API_CONFIG.BASE_URL;

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const text = await response.text().catch(() => null);
        let err = text || response.statusText || 'Network error';
        try {
          const json = JSON.parse(text);
          err = json.message || err;
        } catch (e) {}
        throw new Error(err);
      }

      // try json
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      // bubble up
      throw error;
    }
  }

  // Categories API
  async getCategories() {
    return this.request(ENDPOINTS.CATEGORIES); // CHANGED: use ENDPOINTS to avoid unused var
  }

  async getProducts() {
    return this.request(ENDPOINTS.PRODUCTS); // CHANGED
  }

  async getOrders() {
    return this.request(ENDPOINTS.ORDERS);
  }

  async postOrder(order) {
    return this.request(ENDPOINTS.ORDERS, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async deleteOrder(id) {
    return this.request(`${ENDPOINTS.ORDERS}/${id}`, { method: 'DELETE' });
  }

  async clearOrders() {
    return this.request(ENDPOINTS.ORDERS, { method: 'DELETE' });
  }

  async saveUser(user) {
    return this.request(ENDPOINTS.USER, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }
}

// CHANGED: assign to variable and export that variable (fix import/no-anonymous-default-export)
const api = new ApiService();
export default api;