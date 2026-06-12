import type { PurchaseFormData } from '@/hooks/purchase/usePurchase';
import type { PurchaseStatistics } from '@/types/purchase';

import { calculatePurchaseStats } from './calculatePurchaseStats';

const toNum = (v: string | number): number => {
  const n = typeof v === 'number' ? v : parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Derives preview statistics from controlled form fields.
 *
 * Returns `null` when price is missing or ≤ 0 — that signals the analysis panel
 * should stay in Idle, not an error state. Empty quantity falls back to 1 so
 * partial form input still produces a meaningful preview.
 */
export const buildStats = (formData: PurchaseFormData): PurchaseStatistics | null => {
  const price = toNum(formData.price);
  if (price <= 0) return null;

  return calculatePurchaseStats({
    price,
    quantity: toNum(formData.quantity) || 1,
    salary: toNum(formData.salary),
    workHoursByWeek: toNum(formData.workHoursByWeek),
    expectReturnPercentage: toNum(formData.expectReturnPercentage),
    investForYear: toNum(formData.investForYear),
  });
};
