import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { config } from '@/config/env';

/** JSON API client — all REST calls go through this instance (or apiInstanceImages for uploads). */
export const apiInstance: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** For multipart uploads — Content-Type with boundary is set automatically per request. */
export const apiInstanceImages: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
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
