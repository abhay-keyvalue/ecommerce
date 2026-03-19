import type { Product } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');
  const headers = new Headers(options.headers);
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'API request failed');
  }

  return response.json();
};

export const api = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const data = await apiFetch('/products');
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const data = await apiFetch(`/products/${id}`);
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },
  
  login: async (credentials: any) => {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (credentials: any) => {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
};
