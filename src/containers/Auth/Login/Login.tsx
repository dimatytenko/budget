import LoginModal from '@/components/Modals/Auth/LoginModal';
import { useLogin } from '@/hooks/auth';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  goToRegister: () => void;
}

const LoginContainer: React.FC<LoginProps> = ({ isOpen, onClose, goToRegister }) => {
  const { formData, onChangeFormData, isDisabled, onSubmit, loading, error } = useLogin({
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <LoginModal
      isOpen={isOpen}
      onClose={onClose}
      goToRegister={goToRegister}
      formData={formData}
      onChangeFormData={onChangeFormData}
      isDisabled={isDisabled}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default LoginContainer;
