import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally, e.g., if token is expired, redirect to login page
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login page)
      console.log('Token expired or invalid');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
