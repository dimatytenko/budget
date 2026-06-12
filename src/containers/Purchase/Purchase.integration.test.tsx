import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { AuthModalsProvider } from '@/containers/Auth/AuthModalsProvider';
import { API_BASE, http, HttpResponse, server } from '@/test/server';
import { createMockPurchase, mockUser, resetUserStore, setLoggedInUser } from '@/test/helpers';
import { useUserStore } from '@/store/useUserStore';
import type { BaseResponseInterface } from '@/types/helpers';
import type { BasePurchaseInterface } from '@/types/purchase';
import type { BaseUserInterface } from '@/types/user';

import PurchasePage from './Purchase';

/** MSW integration: Add page submit flow (success, 500, 401, unauthenticated login modal). */
const renderPurchasePage = async () => {
  let latestFetchResolved = false;

  server.use(
    http.get(`${API_BASE}/purchases/latest`, () => {
      latestFetchResolved = true;
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }),
  );

  render(
    <MemoryRouter initialEntries={['/purchase']}>
      <AuthModalsProvider>
        <PurchasePage />
      </AuthModalsProvider>
    </MemoryRouter>,
  );

  await screen.findByLabelText('Purchase name');

  if (useUserStore.getState().user) {
    await waitFor(() => expect(latestFetchResolved).toBe(true));
  }
};

const fillCompleteForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('Purchase name'), 'New headphones');
  await user.type(screen.getByLabelText('Price for 1 purchase'), '1200');
  await user.type(screen.getByLabelText('Monthly income'), '4000');
  await user.type(screen.getByLabelText('Work hours / Week'), '40');
  await user.type(screen.getByLabelText('Annual Return %'), '5');
  await user.type(screen.getByLabelText('Invest for (years)'), '1');
};

describe.sequential('Purchase page integration', () => {
  beforeEach(() => {
    act(() => {
      resetUserStore();
      setLoggedInUser();
    });
  });

  afterEach(() => {
    act(() => {
      resetUserStore();
    });
  });

  it('submits purchase and shows confirmation state on success', async () => {
    const user = userEvent.setup();
    const createdPurchase = createMockPurchase({
      name: 'New headphones',
      decisionEndsAt: '2026-06-12T12:00:00.000Z',
      createdAt: '2026-06-11T12:00:00.000Z',
    });

    await renderPurchasePage();

    server.use(
      http.post(`${API_BASE}/purchases`, () =>
        HttpResponse.json<
          BaseResponseInterface<{ purchase: BasePurchaseInterface; user: BaseUserInterface }>
        >({
          code: 201,
          status: 'success',
          data: {
            purchase: createdPurchase,
            user: mockUser,
          },
        }),
      ),
      http.get(`${API_BASE}/purchases/latest`, () =>
        HttpResponse.json({
          code: 200,
          status: 'success',
          data: { purchase: createdPurchase },
        }),
      ),
    );
    await fillCompleteForm(user);
    await user.click(screen.getByRole('button', { name: 'Analyze new purchase' }));

    await screen.findByText('Your reflection pause has started');

    expect(screen.getByText('New headphones')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View in History' })).toBeInTheDocument();
    expect(screen.queryByText('work hours of your life')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Purchase name')).toHaveValue('');
  });

  it('shows server error and keeps form data on 500', async () => {
    const user = userEvent.setup();

    server.use(
      http.post(`${API_BASE}/purchases`, () =>
        HttpResponse.json({ message: 'Internal server error' }, { status: 500 }),
      ),
    );

    await renderPurchasePage();
    await fillCompleteForm(user);
    await user.click(screen.getByRole('button', { name: 'Analyze new purchase' }));

    await screen.findByText('Internal server error');

    expect(screen.getByLabelText('Purchase name')).toHaveValue('New headphones');
    expect(screen.queryByText('Your reflection pause has started')).not.toBeInTheDocument();
  });

  it('shows API error message on 401 for logged-in user', async () => {
    const user = userEvent.setup();

    server.use(
      http.post(`${API_BASE}/purchases`, () =>
        HttpResponse.json({ message: 'Unauthorized' }, { status: 401 }),
      ),
    );

    await renderPurchasePage();
    await fillCompleteForm(user);
    await user.click(screen.getByRole('button', { name: 'Analyze new purchase' }));

    await screen.findByText('Unauthorized');

    expect(screen.getByLabelText('Purchase name')).toHaveValue('New headphones');
  });

  it('opens login flow when submitting without a user', async () => {
    act(() => {
      resetUserStore();
    });

    const user = userEvent.setup();

    await renderPurchasePage();
    await fillCompleteForm(user);
    await user.click(screen.getByRole('button', { name: 'Analyze new purchase' }));

    await screen.findByRole('heading', { name: 'Welcome back!' });
  });
});
