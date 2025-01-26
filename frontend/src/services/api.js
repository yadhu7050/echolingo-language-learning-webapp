import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Lessons API calls
export const lessonsAPI = {
  getLessons: (level) => api.get(`/lessons/${level}`),
  getLessonDetails: (lessonId) => api.get(`/lessons/${lessonId}`),
  updateProgress: (lessonId, progress) => 
    api.post(`/progress/update`, { lesson_id: lessonId, ...progress }),
};

// Translation API calls
export const translationAPI = {
  translate: (text, targetLang) => 
    api.post('/ai/translate', { text, target_language: targetLang }),
  getLanguages: () => api.get('/ai/supported-languages'),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  getProgress: () => api.get('/user/progress'),
};

export default api;