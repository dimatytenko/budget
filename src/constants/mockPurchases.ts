import type { BasePurchaseInterface } from '@/types/purchase';

const dayMs = 24 * 60 * 60 * 1000;

export const MOCK_PURCHASES: BasePurchaseInterface[] = [
  {
    id: '1',
    userId: 'user-1',
    name: 'New sneakers',
    link: 'https://shop.example.com/sneakers',
    imageUrl: null,
    price: 699,
    quantity: 1,
    decisionTimer: '24h',
    salary: 3000,
    workHoursByWeek: 40,
    expectReturnPercentage: 8,
    investForYear: 1,
    statistics: {
      workHoursToPay: 15.33,
      incomePercent: 65,
      investmentIncome: 1000,
    },
    status: 'pending',
    decisionEndsAt: new Date(Date.now() + dayMs).toISOString(),
    createdAt: '2026-05-24T10:00:00.000Z',
    updatedAt: '2026-05-24T10:00:00.000Z',
  },
  {
    id: '2',
    userId: 'user-1',
    name: 'MacBook Pro',
    link: 'https://shop.example.com/macbook',
    imageUrl: null,
    price: 1600,
    quantity: 1,
    decisionTimer: '48h',
    salary: 3000,
    workHoursByWeek: 40,
    expectReturnPercentage: 8,
    investForYear: 1,
    statistics: {
      workHoursToPay: 92.44,
      incomePercent: 53.33,
      investmentIncome: 128,
    },
    status: 'rejected',
    decisionEndsAt: '2026-05-20T12:00:00.000Z',
    createdAt: '2026-05-19T12:00:00.000Z',
    updatedAt: '2026-05-20T15:00:00.000Z',
  },
];
