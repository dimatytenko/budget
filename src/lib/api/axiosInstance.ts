import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { config } from '@/config/env';

export const apiInstance: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiInstanceImages: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const apiToken = {
  set(token: string) {
    const authHeader = `Bearer ${token}`;
    apiInstance.defaults.headers.Authorization = authHeader;
    apiInstanceImages.defaults.headers.Authorization = authHeader;
  },

  unset() {
    delete apiInstance.defaults.headers.Authorization;
    delete apiInstanceImages.defaults.headers.Authorization;
  },
};
