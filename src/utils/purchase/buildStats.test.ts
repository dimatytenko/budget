import { describe, expect, it } from 'vitest';

import type { PurchaseFormData } from '@/hooks/purchase/usePurchase';

import { buildStats } from './buildStats';
import { calculatePurchaseStats } from './calculatePurchaseStats';

const baseFormData: PurchaseFormData = {
  name: 'Test',
  link: '',
  image: null,
  price: '',
  quantity: 1,
  decisionTimer: '24h',
  salary: '4000',
  workHoursByWeek: '40',
  expectReturnPercentage: '5',
  investForYear: '1',
};

describe('buildStats', () => {
  it.each(['', '0', '-10', 'abc'])('returns null for invalid price "%s"', (price) => {
    expect(buildStats({ ...baseFormData, price })).toBeNull();
  });

  it('parses string field values', () => {
    const stats = buildStats({ ...baseFormData, price: '1200' });

    expect(stats).toEqual(
      calculatePurchaseStats({
        price: 1200,
        quantity: 1,
        salary: 4000,
        workHoursByWeek: 40,
        expectReturnPercentage: 5,
        investForYear: 1,
      }),
    );
  });

  it('falls back quantity to 1 when empty', () => {
    const stats = buildStats({
      ...baseFormData,
      price: '100',
      quantity: 0,
    });

    expect(stats?.incomePercent).toBe(
      calculatePurchaseStats({
        price: 100,
        quantity: 1,
        salary: 4000,
        workHoursByWeek: 40,
        expectReturnPercentage: 5,
        investForYear: 1,
      }).incomePercent,
    );
  });

  it('returns calculatePurchaseStats result for valid input', () => {
    const stats = buildStats({ ...baseFormData, price: '1200' });

    expect(stats).toMatchObject({
      workHoursToPay: 52,
      incomePercent: 30,
      investmentIncome: 60,
    });
  });
});
