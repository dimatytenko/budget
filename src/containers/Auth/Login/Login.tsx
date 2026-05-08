import LoginModal from '@/components/Modals/Auth/LoginModal';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  goToRegister: () => void;
}

const LoginContainer: React.FC<LoginProps> = ({ isOpen, onClose, goToRegister }) => {
  return <LoginModal isOpen={isOpen} onClose={onClose} goToRegister={goToRegister} />;
};

export default LoginContainer;
