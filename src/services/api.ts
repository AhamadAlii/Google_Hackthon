import axios, { AxiosError } from 'axios';
import { withRetry, RateLimitError } from '../utils/errorHandling';
import { Resource, DisasterEvent } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      throw new RateLimitError('Rate limit reached');
    }
    throw error;
  }
);

interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

// API methods with retry logic
export const disasterApi = {
  getDisasters: (params?: QueryParams) => 
    withRetry(() => api.get('/disasters', { params }).then(res => res.data)),
  
  createDisaster: (data: Partial<DisasterEvent>) =>
    withRetry(() => api.post('/disasters', data).then(res => res.data)),
  
  updateDisaster: (id: string, data: Partial<DisasterEvent>) =>
    withRetry(() => api.patch(`/disasters/${id}`, data).then(res => res.data)),
};

export const resourceApi = {
  getResources: (params?: QueryParams) =>
    withRetry(() => api.get('/resources', { params }).then(res => res.data)),
  
  updateResource: (id: string, data: Partial<Resource>) =>
    withRetry(() => api.patch(`/resources/${id}`, data).then(res => res.data)),
};

export const alertApi = {
  getAlerts: (params?: QueryParams) =>
    withRetry(() => api.get('/alerts', { params }).then(res => res.data)),
  
  markAlertRead: (id: string) =>
    withRetry(() => api.patch(`/alerts/${id}/read`).then(res => res.data)),
};

export const seismicApi = {
  getEarthquakes: (params?: QueryParams) =>
    withRetry(() => api.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
      .then(res => res.data)),
  
  getRecentEarthquakes: (params?: QueryParams) =>
    withRetry(() => api.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson')
      .then(res => res.data)),
};