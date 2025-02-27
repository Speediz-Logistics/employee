import axios from 'axios';
import { mapResponse } from '@/composables/useMixin';
import { useCookies } from 'vue3-cookies'; // For token retrieval
import ENV from './config/env';

const { cookies } = useCookies();

const http = axios.create({
  baseURL: ENV.APP_API_URL,
  headers: {
    Accept: 'application/json',
    'X-Access-Key': ENV.APP_API_ACESS_KEY,
  },
});

// Request interceptor to add token to headers
http.interceptors.request.use(
  (config) => {
    const token = cookies.get('token'); // Retrieve token from cookies

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  ({ data, headers }) => {
    if (
      headers['content-type'] !== 'application/json' &&
      headers['content-type'] !== 'application/json; charset=UTF-8'
    ) {
      return Promise.resolve({ data });
    }
    return Promise.resolve(mapResponse(data));
  },
  (error) => {
    console.error(
      `${error?.config.method.toUpperCase()} ${error?.config.baseURL}`,
      `net::${error?.code}`
    );
    return Promise.reject(error);
  }
);

export default http;
