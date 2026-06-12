import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DEFAULT_DECISION_TIMER } from '@/constants/purchase';
import type { PurchaseFormData } from '@/hooks/purchase/usePurchase';

import PurchaseForm from './PurchaseForm';

const defaultFormData: PurchaseFormData = {
  name: '',
  link: '',
  image: null,
  price: '',
  quantity: 1,
  decisionTimer: DEFAULT_DECISION_TIMER,
  salary: '4000',
  workHoursByWeek: '40',
  expectReturnPercentage: '5',
  investForYear: '1',
};

const renderForm = (overrides: Partial<React.ComponentProps<typeof PurchaseForm>> = {}) => {
  const onChangeFormData = vi.fn();
  const onAnalyze = vi.fn();

  render(
    <PurchaseForm
      formData={defaultFormData}
      isDisabled={false}
      submitError={null}
      isSubmitting={false}
      onChangeFormData={onChangeFormData}
      onChangeQuantity={vi.fn()}
      onChangeDecisionTimer={vi.fn()}
      onChangeImage={vi.fn()}
      onAnalyze={onAnalyze}
      {...overrides}
    />,
  );

  return { onChangeFormData, onAnalyze };
};

describe('PurchaseForm', () => {
  it('calls onChangeFormData with correct field name on input', async () => {
    const user = userEvent.setup();
    const { onChangeFormData } = renderForm();

    await user.type(screen.getByLabelText('Purchase name'), 'iPhone');

    expect(onChangeFormData).toHaveBeenCalled();
    const names = onChangeFormData.mock.calls.map(([event]) => event.target.name);
    expect(names).toContain('name');
  });

  it('calls onAnalyze on submit', async () => {
    const user = userEvent.setup();
    const onAnalyze = vi.fn();

    renderForm({ onAnalyze });

    await user.click(screen.getByRole('button', { name: 'Analyze new purchase' }));

    expect(onAnalyze).toHaveBeenCalledTimes(1);
  });

  it('disables submit button when isDisabled is true', () => {
    renderForm({ isDisabled: true });

    expect(screen.getByRole('button', { name: 'Analyze new purchase' })).toBeDisabled();
  });

  it('shows submit error message', () => {
    renderForm({ submitError: 'Server error occurred' });

    expect(screen.getByText('Server error occurred')).toBeInTheDocument();
  });
});
