import { describe, expect, it } from 'vitest';

import { calculatePurchaseStats } from './calculatePurchaseStats';

describe('calculatePurchaseStats', () => {
  it('returns control example values (1200 / 4000 / 40 / 5% / 1 year)', () => {
    expect(
      calculatePurchaseStats({
        price: 1200,
        quantity: 1,
        salary: 4000,
        workHoursByWeek: 40,
        expectReturnPercentage: 5,
        investForYear: 1,
      }),
    ).toEqual({
      workHoursToPay: 52,
      incomePercent: 30,
      investmentIncome: 60,
    });
  });

  it('multiplies total price by quantity', () => {
    const stats = calculatePurchaseStats({
      price: 100,
      quantity: 3,
      salary: 3000,
      workHoursByWeek: 40,
      expectReturnPercentage: 5,
      investForYear: 1,
    });

    expect(stats.incomePercent).toBe(10);
  });

  it('returns zero incomePercent when salary is 0', () => {
    const stats = calculatePurchaseStats({
      price: 1200,
      quantity: 1,
      salary: 0,
      workHoursByWeek: 40,
      expectReturnPercentage: 5,
      investForYear: 1,
    });

    expect(stats.incomePercent).toBe(0);
    expect(stats.workHoursToPay).toBe(0);
    expect(Number.isFinite(stats.investmentIncome)).toBe(true);
  });

  it('returns zero workHoursToPay when workHoursByWeek is 0', () => {
    const stats = calculatePurchaseStats({
      price: 1200,
      quantity: 1,
      salary: 4000,
      workHoursByWeek: 0,
      expectReturnPercentage: 5,
      investForYear: 1,
    });

    expect(stats.workHoursToPay).toBe(0);
  });

  it('never returns NaN or Infinity', () => {
    const stats = calculatePurchaseStats({
      price: 1200,
      quantity: 1,
      salary: 0,
      workHoursByWeek: 0,
      expectReturnPercentage: 0,
      investForYear: 0,
    });

    Object.values(stats).forEach((value) => {
      expect(Number.isFinite(value)).toBe(true);
    });
  });

  it('rounds to 2 decimal places', () => {
    const stats = calculatePurchaseStats({
      price: 1000,
      quantity: 1,
      salary: 3000,
      workHoursByWeek: 40,
      expectReturnPercentage: 5,
      investForYear: 1,
    });

    expect(stats.incomePercent).toBe(33.33);
  });
});
