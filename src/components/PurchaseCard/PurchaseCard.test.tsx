import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createMockPurchase } from '@/test/helpers';

import { PurchaseCard } from './PurchaseCard';

vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: () => false,
}));

describe('PurchaseCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-11T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('displays formatted total price with quantity', () => {
    const purchase = createMockPurchase({ price: 600, quantity: 2 });

    render(<PurchaseCard purchase={purchase} layout="grid" />);

    expect(screen.getAllByText('$1,200.00').length).toBeGreaterThan(0);
  });

  it('shows ticking timer for pending purchases', () => {
    const purchase = createMockPurchase({
      status: 'pending',
      decisionEndsAt: '2026-06-11T17:33:12.000Z',
    });

    render(<PurchaseCard purchase={purchase} layout="grid" />);

    expect(screen.getByText('5:33:12 left')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('5:33:11 left')).toBeInTheDocument();
  });

  it.each(['rejected', 'bought'] as const)(
    'shows dash for timer when status is %s',
    (status) => {
      const purchase = createMockPurchase({ status });

      render(<PurchaseCard purchase={purchase} layout="grid" />);

      expect(screen.getByText('—')).toBeInTheDocument();
    },
  );

  it('caps income impact progress bar at 100%', () => {
    const purchase = createMockPurchase({
      statistics: {
        workHoursToPay: 10,
        incomePercent: 150,
        investmentIncome: 100,
      },
    });

    const { container } = render(<PurchaseCard purchase={purchase} layout="grid" />);

    const fill = container.querySelector('[class*="impact_fill"]') as HTMLElement;

    expect(fill.style.width).toBe('100%');
  });

  it('does not render link when purchase has no link', () => {
    const purchase = createMockPurchase({ link: null });

    render(<PurchaseCard purchase={purchase} layout="grid" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
