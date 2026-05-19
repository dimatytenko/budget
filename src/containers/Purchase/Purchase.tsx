import Purchase from '@/components/Purchase';
import { useAuthModals } from '@/hooks/auth';
import usePurchase from '@/hooks/usePurchase';
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

  return (
    <>
      <Purchase
        formData={formData}
        isDisabled={isDisabled}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onChangeFormData={onChangeFormData}
        onChangeQuantity={onChangeQuantity}
        onChangeDecisionTimer={onChangeDecisionTimer}
        onChangeImage={onChangeImage}
        onAnalyze={onAnalyze}
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
