import RegisterModal from '@/components/Modals/Auth/RegisterModal';
import { useRegister } from '@/hooks/auth';

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  goToLogin: () => void;
}

const RegisterContainer: React.FC<RegisterProps> = ({ isOpen, onClose, goToLogin }) => {
  const { formData, onChangeFormData, isDisabled, onSubmit, loading, error } = useRegister({
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <RegisterModal
      isOpen={isOpen}
      onClose={onClose}
      goToLogin={goToLogin}
      formData={formData}
      onChangeFormData={onChangeFormData}
      isDisabled={isDisabled}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default RegisterContainer;
