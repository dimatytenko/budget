import Purchase from '@/components/Purchase';
import { useAuthModals } from '@/hooks/auth';
import usePurchase from '@/hooks/purchase/usePurchase';
import useLatestPurchase from '@/hooks/purchase/useLatestPurchase';
import LoginContainer from '@/containers/Auth/Login';
import RegisterContainer from '@/containers/Auth/Register';

const PurchasePage = () => {
  const {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    isRegisterModalOpen,
    openRegisterModal,
    closeRegisterModal,
  } = useAuthModals();

  const {
    formData,
    isDisabled,
    submitError,
    isSubmitting,
    onChangeFormData,
    onChangeQuantity,
    onChangeDecisionTimer,
    onChangeImage,
    onAnalyze,
  } = usePurchase({ onRequireLogin: openLoginModal });

  const {
    latestPurchase,
    isLoading: isLatestLoading,
    error: latestError,
    fetchLatestPurchase: refetchLatestPurchase,
  } = useLatestPurchase();

  const handleAnalyze = async () => {
    await onAnalyze();
    await refetchLatestPurchase();
  };

  return (
    <>
      <Purchase
        latestPurchase={latestPurchase}
        isLatestLoading={isLatestLoading}
        latestError={latestError}
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
      {isLoginModalOpen && (
        <LoginContainer
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          goToRegister={openRegisterModal}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterContainer
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
          goToLogin={openLoginModal}
        />
      )}
    </>
  );
};

export default PurchasePage;
