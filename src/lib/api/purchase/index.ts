import { apiInstance, apiInstanceImages } from '@/lib/api/axiosInstance';
import buildPurchaseFormData from '@/lib/api/purchase/buildFormData';
import type {
  CreatePurchaseResponse,
  ListPurchasesParams,
  ListPurchasesResponse,
  PurchaseFormData,
} from '@/lib/api/purchase/types';

export const purchaseApi = {
  getAll: (params?: ListPurchasesParams) =>
    apiInstance.get<ListPurchasesResponse>('/purchases', {
      params,
      paramsSerializer: {
        indexes: null,
      },
    }),

  create: (data: PurchaseFormData) =>
    apiInstanceImages.post<CreatePurchaseResponse>('/purchases', buildPurchaseFormData(data)),
};

export type {
  CreatePurchaseResponse,
  ListPurchasesParams,
  ListPurchasesResponse,
} from '@/lib/api/purchase/types';
export type { PaginationMeta, SortOrder } from '@/types/helpers';
export type { PurchaseSortField } from '@/constants/purchase';
