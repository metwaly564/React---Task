import axios from 'axios';

// Replace with your actual MockAPI URL
const API_BASE_URL = 'https://YOUR_MOCKAPI_PROJECT_ID.mockapi.io';

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

      if (search) {
        params.append('search', search);
      }

      if (category) {
        params.append('category', category);
      }

      const response = await api.get(`/courses?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get a single course by ID
  getCourseById: async (id) => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Get all categories for filtering
  getCategories: async () => {
    try {
      const response = await api.get('/courses');
      const categories = [...new Set(response.data.map(course => course.category))];
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};

export default api; 