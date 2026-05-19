export const DECISION_TIMERS = ['12h', '24h', '48h', '72h'] as const;
export type DecisionTimer = (typeof DECISION_TIMERS)[number];

export const PURCHASE_STATUSES = ['pending', 'bought', 'rejected'] as const;
export type PurchaseStatus = (typeof PURCHASE_STATUSES)[number];

export const PURCHASE_SORT_FIELDS = ['createdAt', 'decisionEndsAt'] as const;
export type PurchaseSortField = (typeof PURCHASE_SORT_FIELDS)[number];

export const DEFAULT_DECISION_TIMER: DecisionTimer = '24h';

export const DECISION_TIMER_OPTIONS: { value: DecisionTimer; label: string }[] = [
  { value: '24h', label: '24 hours (recommended)' },
  { value: '12h', label: '12 hours' },
  { value: '48h', label: '48 hours' },
  { value: '72h', label: '72 hours' },
];
