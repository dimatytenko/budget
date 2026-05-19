import type { PurchaseFormData } from '@/lib/api/purchase/types';

const buildPurchaseFormData = (data: PurchaseFormData): FormData => {
  const formData = new FormData();

  formData.append('name', data.name.trim());
  formData.append('price', data.price);
  formData.append('quantity', String(Math.trunc(data.quantity)));
  formData.append('decisionTimer', data.decisionTimer);
  formData.append('salary', data.salary);
  formData.append('workHoursByWeek', data.workHoursByWeek);
  formData.append('expectReturnPercentage', data.expectReturnPercentage);
  formData.append('investForYear', data.investForYear);

  const link = data.link.trim();
  if (link) {
    formData.append('link', link);
  }

  if (data.image) {
    formData.append('image', data.image);
  }

  return formData;
};

export default buildPurchaseFormData;
