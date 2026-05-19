import { apiInstanceImages } from '@/lib/api/axiosInstance';
import buildPurchaseFormData from '@/lib/api/purchase/buildFormData';
import type { CreatePurchaseResponse } from '@/lib/api/purchase/types';
import type { PurchaseFormData } from '@/lib/api/purchase/types';

export const purchaseApi = {
  create: (data: PurchaseFormData) =>
    apiInstanceImages.post<CreatePurchaseResponse>('/purchases', buildPurchaseFormData(data)),
};

export type { CreatePurchaseResponse };
