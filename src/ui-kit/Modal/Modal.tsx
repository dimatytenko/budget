import ReactDOM from 'react-dom';
import clsx from 'clsx';

import styles from './Modal.module.scss';
import { ButtonClose } from '@/ui-kit';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  variant?: 'default';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, variant = 'default' }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={clsx(styles.modal, styles[variant])}>
        {children}
        {onClose && <ButtonClose onClick={onClose} className={styles.button_close} />}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
