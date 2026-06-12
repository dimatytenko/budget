/** Shared test fixtures and Zustand store helpers for hook/component/integration tests. */
import type { BasePurchaseInterface } from '@/types/purchase';
import type { BaseUserInterface } from '@/types/user';
import { useUserStore } from '@/store/useUserStore';

export const mockUser: BaseUserInterface = {
  id: 'user-1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  salary: 4000,
  workHoursByWeek: 40,
  expectReturnPercentage: 5,
  investForYear: 1,
};

export const createMockPurchase = (
  overrides: Partial<BasePurchaseInterface> = {},
): BasePurchaseInterface => ({
  id: 'purchase-1',
  userId: mockUser.id,
  name: 'Test Purchase',
  link: null,
  imageUrl: null,
  price: 1200,
  quantity: 1,
  decisionTimer: '24h',
  salary: 4000,
  workHoursByWeek: 40,
  expectReturnPercentage: 5,
  investForYear: 1,
  statistics: {
    workHoursToPay: 52,
    incomePercent: 30,
    investmentIncome: 60,
  },
  status: 'pending',
  decisionEndsAt: new Date('2026-06-12T12:00:00.000Z').toISOString(),
  createdAt: new Date('2026-06-11T12:00:00.000Z').toISOString(),
  updatedAt: new Date('2026-06-11T12:00:00.000Z').toISOString(),
  ...overrides,
});

export const resetUserStore = () => {
  useUserStore.setState({
    user: null,
    isRefreshing: false,
  });
};

export const setLoggedInUser = (user: BaseUserInterface = mockUser) => {
  useUserStore.setState({ user, isRefreshing: false });
};

export const createInputChangeEvent = (
  name: string,
  value: string,
): React.ChangeEvent<HTMLInputElement> =>
  ({
    target: { name, value },
  }) as React.ChangeEvent<HTMLInputElement>;
