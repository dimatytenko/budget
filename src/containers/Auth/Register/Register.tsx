import RegisterModal from '@/components/Modals/Auth/RegisterModal';

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  goToLogin: () => void;
}

const RegisterContainer: React.FC<RegisterProps> = ({ isOpen, onClose, goToLogin }) => {
  return <RegisterModal isOpen={isOpen} onClose={onClose} goToLogin={goToLogin} />;
};

export default RegisterContainer;
