import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createInputChangeEvent, resetUserStore, setLoggedInUser } from '@/test/helpers';

import usePurchase from './usePurchase';

describe.sequential('usePurchase previewStats', () => {
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

  it('starts with previewStats as null', async () => {
    const { result, unmount } = renderHook(() => usePurchase({ onRequireLogin: vi.fn() }));

    await waitFor(() => {
      expect(result.current.previewStats).toBeNull();
    });

    unmount();
  });

  it('derives previewStats when price becomes valid', async () => {
    const { result, unmount } = renderHook(() => usePurchase({ onRequireLogin: vi.fn() }));

    await act(async () => {
      result.current.onChangeFormData(createInputChangeEvent('price', '1200'));
    });

    await waitFor(() => {
      expect(result.current.previewStats).toEqual({
        workHoursToPay: 52,
        incomePercent: 30,
        investmentIncome: 60,
      });
    });

    unmount();
  });

  it('clears previewStats when price is removed', async () => {
    const { result, unmount } = renderHook(() => usePurchase({ onRequireLogin: vi.fn() }));

    await act(async () => {
      result.current.onChangeFormData(createInputChangeEvent('price', '1200'));
    });

    await waitFor(() => {
      expect(result.current.previewStats).not.toBeNull();
    });

    await act(async () => {
      result.current.onChangeFormData(createInputChangeEvent('price', ''));
    });

    await waitFor(() => {
      expect(result.current.previewStats).toBeNull();
    });

    unmount();
  });
});
