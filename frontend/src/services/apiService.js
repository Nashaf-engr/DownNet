import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later');
    } else if (error.message === 'Network Error') {
      throw new Error('Cannot connect to server. Is the backend running?');
    }
    throw error;
  }
);

export const apiService = {
  // Health & Status
  checkHealth: () => apiClient.get('/health'),

  // Platforms
  getPlatforms: () => apiClient.get('/platforms'),

  // Formats
  getFormats: (platform) => apiClient.get(`/formats/${platform}`),

  // Downloads
  startDownload: (data) => apiClient.post('/download', data),
  getDownloadStatus: (downloadId) => apiClient.get(`/download/${downloadId}`),

  // Validation
  validateUrl: (url) => apiClient.post('/validate-url', { url })
};

export default apiService;
