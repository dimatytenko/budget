import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return <p className={styles.error}>{message}</p>;
};

export default ErrorMessage;
