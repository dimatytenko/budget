import type { DecisionTimer } from '@/constants/purchase';
import type { BaseResponseInterface } from '@/types/helpers';
import type { BasePurchaseInterface } from '@/types/purchase';
import type { BaseUserInterface } from '@/types/user';

export interface PurchaseFormData {
  name: string;
  link: string;
  image: File | null;
  price: string;
  quantity: number;
  decisionTimer: DecisionTimer;
  salary: string;
  workHoursByWeek: string;
  expectReturnPercentage: string;
  investForYear: string;
}

export type CreatePurchaseResponse = BaseResponseInterface<{
  purchase: BasePurchaseInterface;
  user: BaseUserInterface;
}>;
