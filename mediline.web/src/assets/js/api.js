import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cs-490-mediline-backend-1021109447710.us-central1.run.app/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

function isTokenExpired(token) {
  if (!token) return true;
  const [, payload] = token.split('.');
  const { exp } = JSON.parse(atob(payload));
  return Date.now() >= exp * 1000;
}

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');

  function isTokenExpired(token) {
    if (!token) return true;
    const [, payload] = token.split('.');
    const { exp } = JSON.parse(atob(payload));
    return Date.now() >= exp * 1000;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for 401s
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCall = error?.config?.url?.includes('/auth/login');

    if (error.response?.status === 401 && !isAuthCall) {
      window.location.href = '/unauthorized?code=401';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
