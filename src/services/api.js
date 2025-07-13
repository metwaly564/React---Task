import axios from 'axios';

// Replace with your actual MockAPI URL
// For now, using a placeholder that will show an error message
const API_BASE_URL = 'https://6873dfedc75558e273558266.mockapi.io/api/v1';

// Cache configuration
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_PREFIX = 'course_explorer_cache_';

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

// Cache utility functions
const cacheUtils = {
  // Generate cache key
  getCacheKey: (endpoint, params = {}) => {
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${CACHE_PREFIX}${endpoint}${paramString ? `?${paramString}` : ''}`;
  },

  // Set cache with expiry
  setCache: (key, data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + CACHE_EXPIRY
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to set cache:', error);
    }
  },

  // Get cache if not expired
  getCache: (key) => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      if (Date.now() > cacheData.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.warn('Failed to get cache:', error);
      return null;
    }
  },

  // Clear expired cache entries
  clearExpiredCache: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          const cached = localStorage.getItem(key);
          if (cached) {
            const cacheData = JSON.parse(cached);
            if (Date.now() > cacheData.expiry) {
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (error) {
      console.warn('Failed to clear expired cache:', error);
    }
  },

  // Clear all cache
  clearAllCache: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
};

// Clear expired cache on app start
cacheUtils.clearExpiredCache();

export const courseAPI = {
  // Get courses with pagination and caching
  getCourses: async (page = 1, limit = 6, search = '', category = '') => {
    try {
      const params = {
        page: page.toString(),
        limit: limit.toString(),
      };
      if (search) params.search = search;
      if (category) params.category = category;

      const cacheKey = cacheUtils.getCacheKey('courses', params);
      
      // Try to get from cache first
      const cachedData = cacheUtils.getCache(cacheKey);
      if (cachedData) {
        console.log('Serving courses from cache');
        return cachedData;
      }

      // Fetch from API
      const paramString = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}/courses?${paramString}`;
      const res = await fetch(url);
      
      if (!res.ok) {
        // Handle 404 specifically for search results
        if (res.status === 404) {
          return [];
        }
        throw new Error(`Failed to fetch courses: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Cache the response (even empty results)
      cacheUtils.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get a single course by ID with caching
  getCourseById: async (id) => {
    try {
      const cacheKey = cacheUtils.getCacheKey(`courses/${id}`);
      
      // Try to get from cache first
      const cachedData = cacheUtils.getCache(cacheKey);
      if (cachedData) {
        console.log('Serving course details from cache');
        return cachedData;
      }

      // Fetch from API
      const url = `${API_BASE_URL}/courses/${id}`;
      const res = await fetch(url);
      
      if (!res.ok) throw new Error(`Failed to fetch course: ${res.status}`);
      
      const data = await res.json();
      
      // Cache the response
      cacheUtils.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Get all categories for filtering with caching
  getCategories: async () => {
    try {
      const cacheKey = cacheUtils.getCacheKey('categories');
      
      // Try to get from cache first
      const cachedData = cacheUtils.getCache(cacheKey);
      if (cachedData) {
        console.log('Serving categories from cache');
        return cachedData;
      }

      // Fetch from API
      const url = `${API_BASE_URL}/courses`;
      const res = await fetch(url);
      
      if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
      
      const data = await res.json();
      const categories = [...new Set(data.map(course => course.category))];
      
      // Cache the response
      cacheUtils.setCache(cacheKey, categories);
      
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Clear cache for specific course (useful when course is updated)
  clearCourseCache: (courseId) => {
    if (courseId) {
      const cacheKey = cacheUtils.getCacheKey(`courses/${courseId}`);
      try {
        localStorage.removeItem(cacheKey);
      } catch (error) {
        console.warn('Failed to clear course cache:', error);
      }
    }
  },

  // Clear all course cache
  clearAllCourseCache: () => {
    cacheUtils.clearAllCache();
  },

  // Get cache statistics
  getCacheStats: () => {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
      const stats = {
        totalEntries: cacheKeys.length,
        totalSize: 0,
        expiredEntries: 0
      };

      cacheKeys.forEach(key => {
        const cached = localStorage.getItem(key);
        if (cached) {
          stats.totalSize += cached.length;
          const cacheData = JSON.parse(cached);
          if (Date.now() > cacheData.expiry) {
            stats.expiredEntries++;
          }
        }
      });

      return stats;
    } catch (error) {
      console.warn('Failed to get cache stats:', error);
      return null;
    }
  }
};

export default api; 