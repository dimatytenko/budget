import { apiInstance, apiInstanceImages } from '@/lib/api/axiosInstance';
import buildPurchaseFormData from '@/lib/api/purchase/buildFormData';
import type {
  CreatePurchaseResponse,
  ExtendPurchaseDecisionBody,
  ListPurchasesParams,
  ListPurchasesResponse,
  PurchaseFormData,
  PurchaseResponse,
  PurchaseStatisticsResponse,
  UpdatePurchaseStatusBody,
} from '@/lib/api/purchase/types';

export const purchaseApi = {
  getAll: (params?: ListPurchasesParams) =>
    apiInstance.get<ListPurchasesResponse>('/purchases', {
      params,
      paramsSerializer: {
        indexes: null,
      },
    }),

  getLatest: () => apiInstance.get<PurchaseResponse>('/purchases/latest'),
  getStatistics: () => apiInstance.get<PurchaseStatisticsResponse>('/purchases/statistics'),
  getById: (id: string) => apiInstance.get<PurchaseResponse>(`/purchases/${id}`),
  create: (data: PurchaseFormData) =>
    apiInstanceImages.post<CreatePurchaseResponse>('/purchases', buildPurchaseFormData(data)),
  remove: (id: string) => apiInstance.delete<PurchaseResponse>(`/purchases/${id}`),
  updateStatus: (id: string, body: UpdatePurchaseStatusBody) =>
    apiInstance.patch<PurchaseResponse>(`/purchases/${id}/status`, body),
  extendDecision: (id: string, body: ExtendPurchaseDecisionBody) =>
    apiInstance.patch<PurchaseResponse>(`/purchases/${id}/extend-decision`, body),
};

export type {
  CreatePurchaseResponse,
  ExtendPurchaseDecisionBody,
  ListPurchasesParams,
  ListPurchasesResponse,
  PurchaseResponse,
  PurchaseStatisticsResponse,
  UpdatePurchaseStatusBody,
} from '@/lib/api/purchase/types';
export type { PaginationMeta, SortOrder } from '@/types/helpers';
export type { FinalPurchaseStatus, PurchaseSortField } from '@/constants/purchase';
