import worthyCharacter from '@/assets/images/worthy/worthy-hand-up.png';
import { Button, Input, Modal } from '@/ui-kit';

import styles from '../Auth.module.scss';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  goToRegister?: () => void;
  formData: { email: string; password: string };
  onChangeFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  loading: boolean;
  error: string | null;
  onSubmit: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  goToRegister,
  formData,
  onChangeFormData,
  isDisabled,
  loading,
  error,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled || loading) return;
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.shell}>
        <div className={styles.form_column}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Welcome back!</h2>
            <p className={styles.subtitle}>Log in to your existing account.</p>

            <div className={styles.fields}>
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={onChangeFormData}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={onChangeFormData}
              />

              {error && <p className={styles.error}>{error}</p>}
            </div>

            <Button
              variant="primary"
              type="submit"
              text="Log in"
              className={styles.login_button}
              disabled={isDisabled}
              isLoading={loading}
            />
          </form>

          <div className={styles.divider} aria-hidden>
            <span className={styles.divider_line} />
            <span className={styles.divider_text}>or</span>
            <span className={styles.divider_line} />
          </div>

          <p className={styles.footer}>
            New to Worthy?{' '}
            <button type="button" className={styles.footer_link} onClick={goToRegister}>
              Create account
            </button>
          </p>

          <div className={styles.lock_icon_container}>
            <p className={styles.lock_icon_text}>🔒 Your data is secure with us</p>
          </div>
        </div>

        <aside className={styles.aside} aria-hidden>
          <img
            className={styles.illustration}
            src={worthyCharacter}
            alt=""
            width={300}
            height={300}
            decoding="async"
          />
          <div className={styles.brand}>Worthy</div>
          <p className={styles.slogan}>Think before you spend.</p>
        </aside>
      </div>
    </Modal>
  );
};

export default LoginModal;
