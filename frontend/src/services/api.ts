import type { Product } from '../types';

const API_BASE_URL = 'http://localhost:3000/api'; // Assuming standard backend URL

export const api = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  
  // Future methods like getOrders, getUser, etc. can be added here
};
