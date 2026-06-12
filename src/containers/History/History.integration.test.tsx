import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { API_BASE, http, HttpResponse, server } from '@/test/server';
import { createMockPurchase } from '@/test/helpers';
import type { BaseResponseInterface } from '@/types/helpers';
import type { BasePurchaseInterface, PurchaseOverview } from '@/types/purchase';

import HistoryPage from './History';

/** MSW integration: History overview formatting and empty purchase list. */
const overview: PurchaseOverview = {
  totalSaved: 1100,
  workHours: 216905.0167,
  annualReturn: 250275,
  rejectedCount: 2,
  pendingCount: 1,
  boughtCount: 3,
};

const renderHistoryPage = () =>
  render(
    <MemoryRouter initialEntries={['/history']}>
      <HistoryPage />
    </MemoryRouter>,
  );

describe('History page integration', () => {
  it('renders overview stats and purchase cards with formatted values', async () => {
    const purchase = createMockPurchase({
      name: 'Saved purchase',
      price: 1200,
      quantity: 1,
    });

    server.use(
      http.get(`${API_BASE}/purchases/statistics`, () =>
        HttpResponse.json<BaseResponseInterface<{ statistics: PurchaseOverview }>>({
          code: 200,
          status: 'success',
          data: { statistics: overview },
        }),
      ),
      http.get(`${API_BASE}/purchases`, () =>
        HttpResponse.json<
          BaseResponseInterface<{
            purchases: BasePurchaseInterface[];
            pagination: { page: number; limit: number; total: number; totalPages: number };
          }>
        >({
          code: 200,
          status: 'success',
          data: {
            purchases: [purchase],
            pagination: { page: 1, limit: 8, total: 1, totalPages: 1 },
          },
        }),
      ),
    );

    renderHistoryPage();

    await waitFor(() => {
      expect(screen.getByText('$1,100.00')).toBeInTheDocument();
    });

    expect(screen.getByText('216,905h 1m')).toBeInTheDocument();
    expect(screen.getByText('$250,275.00')).toBeInTheDocument();
    expect(screen.getByText('Saved purchase')).toBeInTheDocument();
  });

  it('shows empty state when purchase list is empty', async () => {
    server.use(
      http.get(`${API_BASE}/purchases/statistics`, () =>
        HttpResponse.json<BaseResponseInterface<{ statistics: PurchaseOverview }>>({
          code: 200,
          status: 'success',
          data: { statistics: overview },
        }),
      ),
      http.get(`${API_BASE}/purchases`, () =>
        HttpResponse.json({
          code: 200,
          status: 'success',
          data: {
            purchases: [],
            pagination: { page: 1, limit: 8, total: 0, totalPages: 1 },
          },
        }),
      ),
    );

    renderHistoryPage();

    await waitFor(() => {
      expect(
        screen.getByText('No purchases yet. Add your first purchase to start tracking.'),
      ).toBeInTheDocument();
    });
  });
});
