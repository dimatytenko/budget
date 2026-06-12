import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { config } from '@/config/env';

const API_BASE = config.apiBaseUrl;

export const server = setupServer(
  http.get(`${API_BASE}/purchases/latest`, () =>
    HttpResponse.json({ message: 'Not found' }, { status: 404 }),
  ),
);

export { API_BASE, http, HttpResponse };
