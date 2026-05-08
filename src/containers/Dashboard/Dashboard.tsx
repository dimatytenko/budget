import Dashboard from '@/components/Dashboard';
import { useAuthModals } from '@/hooks/auth';
import LoginContainer from '@/containers/Auth/Login';
import RegisterContainer from '@/containers/Auth/Register';

const DashboardPage = () => {
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
      <Dashboard openLoginModal={openLoginModal} />
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

export default DashboardPage;
