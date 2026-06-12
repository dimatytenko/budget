import { useMemo } from 'react';

import Purchase from '@/components/Purchase';
import { useAuthModalsContext } from '@/containers/Auth/AuthModalsProvider';
import usePurchase from '@/hooks/purchase/usePurchase';
import useLatestPurchase from '@/hooks/purchase/useLatestPurchase';

const PurchasePage = () => {
  const { openLoginModal } = useAuthModalsContext();

  const {
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
  } = usePurchase({ onRequireLogin: openLoginModal });

  const { latestPurchase, fetchLatestPurchase: refetchLatestPurchase } = useLatestPurchase();

  const confirmationPurchase = useMemo(() => {
    if (previewStats !== null) return null;
    if (lastSubmittedPurchase) return lastSubmittedPurchase;
    return latestPurchase?.status === 'pending' ? latestPurchase : null;
  }, [previewStats, lastSubmittedPurchase, latestPurchase]);

  const handleAnalyze = async () => {
    const isSuccess = await onAnalyze();

    if (isSuccess) {
      await refetchLatestPurchase();
    }
  };

  return (
    <Purchase
      previewStats={previewStats}
      confirmationPurchase={confirmationPurchase}
      formData={formData}
      isDisabled={isDisabled}
      submitError={submitError}
      isSubmitting={isSubmitting}
      onChangeFormData={onChangeFormData}
      onChangeQuantity={onChangeQuantity}
      onChangeDecisionTimer={onChangeDecisionTimer}
      onChangeImage={onChangeImage}
      onAnalyze={handleAnalyze}
    />
  );
};

export default PurchasePage;
