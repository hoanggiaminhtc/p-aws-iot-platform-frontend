import axios from 'axios';
import { getTokenLocalStorage } from './handleLocalStorage';
require('dotenv').config();

const http = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  function (config) {
    let token = getTokenLocalStorage(process.env.REACT_APP_IOT_USER_TOKEN);
    if (
      config.url === '/auth/login' ||
      config.url === '/auth/register' ||
      config.url === '/auth/forgetpassword' ||
      config.url.includes('/dashboard/getonewidget') ||
      config.url.includes('/device/telemetry/getdevicedata') ||
      config.url.includes('/device/telemetry/gettopicdata') ||
      config.url.includes('/device/telemetry/getdatalastnday')
    ) {
      return config;
    } else {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.data.message === 'jwt expired') {
      window.location = 'http://localhost:3000/authentication';
    }
    return Promise.reject(error);
  },
);

export default http;
