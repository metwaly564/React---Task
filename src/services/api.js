import axios from 'axios';

// Replace with your actual MockAPI URL
// For now, using a placeholder that will show an error message
const API_BASE_URL = 'https://6873dfedc75558e273558266.mockapi.io/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to handle common headers
api.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const courseAPI = {
  // Get courses with pagination
  getCourses: async (page = 1, limit = 6, search = '', category = '') => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      const url = `${API_BASE_URL}/courses?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch courses: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get a single course by ID
  getCourseById: async (id) => {
    try {
      const url = `${API_BASE_URL}/courses/${id}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch course: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Get all categories for filtering
  getCategories: async () => {
    try {
      const url = `${API_BASE_URL}/courses`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
      const data = await res.json();
      const categories = [...new Set(data.map(course => course.category))];
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};

export default api; 