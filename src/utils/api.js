import { request } from 'axios';
import config from './constants/serverConfig';

const axiosConfig = {
  baseURL: config.SERVER_BASE_URL,
  // Temporary hard coded tokens, for testing purposes
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmI1OWQxODhlYWZiMjJmZjQ5MTE5YTMiLCJpYXQiOjE1Mzg2Mjg5NzF9.JFAHHz6Ee4Qk9bUc9QHditHJKJ4yKirEQ3Pg2-krf0I'
  }
};

const api = (options = {}) => {
  const fanalOptions = {
    ...axiosConfig,
    ...options,
    headers: {
      ...axiosConfig.headers,
      ...options.headers
    }
  };
  return request({ ...fanalOptions });
};

export default api;
