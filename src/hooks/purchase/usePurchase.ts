import { useMemo, useState } from 'react';

import { DEFAULT_DECISION_TIMER, type DecisionTimer } from '@/constants/purchase';
import { useUser } from '@/hooks/user';
import { getApiErrorMessage } from '@/lib/api/handleApiError';
import { purchaseApi } from '@/lib/api/purchase';
import type { PurchaseFormData } from '@/lib/api/purchase/types';
import type { BasePurchaseInterface } from '@/types/purchase';
import type { UserType } from '@/types/user';
import changeInputValues from '@/utils/changeInputValues';
import { buildStats } from '@/utils/purchase/buildStats';

export type { PurchaseFormData };

const INITIAL_PURCHASE_STATE: PurchaseFormData = {
  name: '',
  link: '',
  image: null,
  price: '',
  quantity: 1,
  decisionTimer: DEFAULT_DECISION_TIMER,
  salary: '',
  workHoursByWeek: '',
  expectReturnPercentage: '',
  investForYear: '',
};

const withUserFinancialDefaults = (
  values: PurchaseFormData,
  user: NonNullable<UserType>,
): PurchaseFormData => ({
  ...values,
  salary: values.salary || (user.salary ? String(user.salary) : ''),
  workHoursByWeek:
    values.workHoursByWeek || (user.workHoursByWeek ? String(user.workHoursByWeek) : ''),
  expectReturnPercentage:
    values.expectReturnPercentage ||
    (user.expectReturnPercentage ? String(user.expectReturnPercentage) : ''),
  investForYear: values.investForYear || (user.investForYear ? String(user.investForYear) : ''),
});

const isFormComplete = (formData: PurchaseFormData) =>
  Boolean(
    formData.name.trim() &&
      formData.price.trim() &&
      formData.quantity >= 1 &&
      formData.decisionTimer &&
      formData.salary.trim() &&
      formData.workHoursByWeek.trim() &&
      formData.expectReturnPercentage.trim() &&
      formData.investForYear.trim(),
  );

const usePurchase = (options: { onRequireLogin: () => void }) => {
  const { onRequireLogin } = options;
  const { user, updateUser } = useUser();
  const [formValues, setFormValues] = useState<PurchaseFormData>(INITIAL_PURCHASE_STATE);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedPurchase, setLastSubmittedPurchase] =
    useState<BasePurchaseInterface | null>(null);

  const formData = useMemo(
    () => (user ? withUserFinancialDefaults(formValues, user) : formValues),
    [formValues, user],
  );

  const isDisabled = useMemo(() => !isFormComplete(formData), [formData]);

  const previewStats = useMemo(
    () => buildStats(formData),
    [
      formData.price,
      formData.quantity,
      formData.salary,
      formData.workHoursByWeek,
      formData.expectReturnPercentage,
      formData.investForYear,
    ],
  );

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInputValues(e, setFormValues);
    if (submitError) setSubmitError(null);
  };

  const onChangeQuantity = (quantity: number) => {
    setFormValues((prev) => ({ ...prev, quantity }));
    if (submitError) setSubmitError(null);
  };

  const onChangeDecisionTimer = (decisionTimer: DecisionTimer) => {
    setFormValues((prev) => ({ ...prev, decisionTimer }));
    if (submitError) setSubmitError(null);
  };

  const onChangeImage = (image: File | null) => {
    setFormValues((prev) => ({ ...prev, image }));
    if (submitError) setSubmitError(null);
  };

  const onAnalyze = async (): Promise<boolean> => {
    if (isDisabled || !user) {
      if (!user) onRequireLogin();
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data } = await purchaseApi.create(formData);

      updateUser(data.data.user);
      setLastSubmittedPurchase(data.data.purchase);
      setFormValues(withUserFinancialDefaults(INITIAL_PURCHASE_STATE, data.data.user));
      return true;
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    previewStats,
    lastSubmittedPurchase,
    isDisabled,
    submitError,
    isSubmitting,
    onChangeFormData,
    onChangeQuantity,
    onChangeDecisionTimer,
    onChangeImage,
    onAnalyze,
  };
};

export default usePurchase;
