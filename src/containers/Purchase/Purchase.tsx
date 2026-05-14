import Purchase from '@/components/Purchase';
import { useAuthModals } from '@/hooks/auth';
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
  return (
    <>
      <Purchase openLoginModal={openLoginModal} />
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
