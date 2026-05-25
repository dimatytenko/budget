import { createContext, useContext } from 'react';

import { useAuthModals } from '@/hooks/auth';
import LoginContainer from '@/containers/Auth/Login';
import RegisterContainer from '@/containers/Auth/Register';

type AuthModalsContextValue = ReturnType<typeof useAuthModals>;

const AuthModalsContext = createContext<AuthModalsContextValue | null>(null);

export const useAuthModalsContext = () => {
  const context = useContext(AuthModalsContext);

  if (!context) {
    throw new Error('useAuthModalsContext must be used within AuthModalsProvider');
  }

  return context;
};

interface AuthModalsProviderProps {
  children: React.ReactNode;
}

export const AuthModalsProvider: React.FC<AuthModalsProviderProps> = ({ children }) => {
  const authModals = useAuthModals();

  return (
    <AuthModalsContext.Provider value={authModals}>
      {children}
      {authModals.isLoginModalOpen && (
        <LoginContainer
          isOpen={authModals.isLoginModalOpen}
          onClose={authModals.closeLoginModal}
          goToRegister={authModals.openRegisterModal}
        />
      )}
      {authModals.isRegisterModalOpen && (
        <RegisterContainer
          isOpen={authModals.isRegisterModalOpen}
          onClose={authModals.closeRegisterModal}
          goToLogin={authModals.openLoginModal}
        />
      )}
    </AuthModalsContext.Provider>
  );
};
