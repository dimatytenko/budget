import type { DecisionTimer, PurchaseStatus } from '@/constants/purchase';

export type { DecisionTimer, PurchaseStatus };

export interface PurchaseStatistics {
  workHoursToPay: number;
  incomePercent: number;
  investmentIncome: number;
}

export interface BasePurchaseInterface {
  id: string;
  userId: string;
  name: string;
  link: string | null;
  imageUrl: string | null;
  price: number;
  quantity: number;
  decisionTimer: DecisionTimer;
  salary: number;
  workHoursByWeek: number;
  expectReturnPercentage: number;
  investForYear: number;
  statistics?: PurchaseStatistics;
  status: PurchaseStatus;
  decisionEndsAt: string;
  createdAt: string;
  updatedAt: string;
}
