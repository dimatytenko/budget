import { describe, expect, it } from 'vitest';

import {
  formatIncomePercent,
  formatInvestmentIncome,
  formatWorkHours,
} from './formatPurchaseStatistics';

describe('formatWorkHours', () => {
  it('formats whole hours without minutes', () => {
    expect(formatWorkHours(52)).toBe('52h');
  });

  it('formats fractional hours as hours and minutes', () => {
    expect(formatWorkHours(47.67)).toBe('47h 40m');
  });

  it('adds thousands separator for large hour values', () => {
    expect(formatWorkHours(216905.0167)).toBe('216,905h 1m');
  });

  it('carries 60 minutes into the next hour', () => {
    expect(formatWorkHours(1.9999)).toBe('2h');
  });
});

describe('formatIncomePercent', () => {
  it('formats integer percent without decimal', () => {
    expect(formatIncomePercent(30)).toBe('30%');
  });

  it('formats fractional percent with one decimal', () => {
    expect(formatIncomePercent(27.5)).toBe('27.5%');
  });
});

describe('formatInvestmentIncome', () => {
  it('delegates to formatMoney with plus sign', () => {
    expect(formatInvestmentIncome(226)).toBe('+$226.00');
  });
});
