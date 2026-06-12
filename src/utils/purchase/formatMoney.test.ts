import { describe, expect, it } from 'vitest';

import { formatMoney } from './formatMoney';

describe('formatMoney', () => {
  it('formats US currency with 2 decimal places', () => {
    expect(formatMoney(1100)).toBe('$1,100.00');
    expect(formatMoney(1234567.891)).toBe('$1,234,567.89');
    expect(formatMoney(0)).toBe('$0.00');
  });

  it('adds plus sign for positive values with sign option', () => {
    expect(formatMoney(226, { sign: true })).toBe('+$226.00');
  });

  it('formats negative values with minus sign', () => {
    expect(formatMoney(-50)).toBe('-$50.00');
  });
});
