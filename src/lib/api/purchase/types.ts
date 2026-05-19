import type { DecisionTimer, PurchaseSortField, PurchaseStatus } from '@/constants/purchase';
import type {
  BaseResponseInterface,
  PaginationMeta,
  PaginationParams,
  SortParams,
} from '@/types/helpers';
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

export interface ListPurchasesParams extends PaginationParams, SortParams<PurchaseSortField> {
  status?: PurchaseStatus | PurchaseStatus[];
}

export type ListPurchasesResponse = BaseResponseInterface<{
  purchases: BasePurchaseInterface[];
  pagination: PaginationMeta;
}>;
