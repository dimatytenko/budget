import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createMockPurchase } from '@/test/helpers';

import PurchaseAnalysis from './PurchaseAnalysis';

const previewStats = {
  workHoursToPay: 86.57,
  incomePercent: 49.9,
  investmentIncome: 226,
};

const renderAnalysis = (props: React.ComponentProps<typeof PurchaseAnalysis>) =>
  render(
    <MemoryRouter>
      <PurchaseAnalysis {...props} />
    </MemoryRouter>,
  );

describe('PurchaseAnalysis', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-11T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders Idle state without stats or timer', () => {
    renderAnalysis({
      previewStats: null,
      previewInvestForYear: 1,
      confirmationPurchase: null,
    });

    expect(screen.getByText('Take a moment to think')).toBeInTheDocument();
    expect(screen.queryByText('work hours of your life')).not.toBeInTheDocument();
    expect(screen.queryByText('Reflection Timer')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'View in History' })).not.toBeInTheDocument();
  });

  it('renders Preview state with formatted stats', () => {
    renderAnalysis({
      previewStats,
      previewInvestForYear: 1,
      confirmationPurchase: null,
    });

    expect(screen.getByText('See how this purchase fits your life')).toBeInTheDocument();
    expect(screen.getByText('86h 34m')).toBeInTheDocument();
    expect(screen.getByText('49.9%')).toBeInTheDocument();
    expect(screen.getByText('+$226.00')).toBeInTheDocument();
    expect(screen.getByText(/income instead in 1 year/)).toBeInTheDocument();
    expect(screen.queryByText('Reflection Timer')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'View in History' })).not.toBeInTheDocument();
  });

  it('renders Confirmation state with timer and history button', () => {
    const confirmationPurchase = createMockPurchase({
      name: 'MacBook Pro',
      decisionEndsAt: '2026-06-12T12:00:00.000Z',
      createdAt: '2026-06-11T12:00:00.000Z',
    });

    renderAnalysis({
      previewStats: null,
      previewInvestForYear: 1,
      confirmationPurchase,
    });

    expect(screen.getByText('Your reflection pause has started')).toBeInTheDocument();
    expect(screen.getByText('Reflection Timer')).toBeInTheDocument();
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View in History' })).toBeInTheDocument();
    expect(screen.queryByText('work hours of your life')).not.toBeInTheDocument();
  });

  it('prioritizes Preview over Confirmation when both are provided', () => {
    renderAnalysis({
      previewStats,
      previewInvestForYear: 2,
      confirmationPurchase: createMockPurchase({ name: 'Should not show' }),
    });

    expect(screen.getByText('See how this purchase fits your life')).toBeInTheDocument();
    expect(screen.getByText(/income instead in 2 years/)).toBeInTheDocument();
    expect(screen.queryByText('Your reflection pause has started')).not.toBeInTheDocument();
    expect(screen.queryByText('Should not show')).not.toBeInTheDocument();
  });
});
