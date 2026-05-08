import clsx from 'clsx';

import styles from './ButtonClose.module.scss';
import { CloseIcon } from '@/assets/icons';

interface ButtonCloseProps {
  onClick: () => void;
  className?: string;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({ onClick, className }) => {
  return (
    <button className={clsx(styles.button_close, className)} onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

export default ButtonClose;
