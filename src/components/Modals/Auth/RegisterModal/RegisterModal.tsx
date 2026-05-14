import { useState } from 'react';

import worthyCharacter from '@/assets/images/worthy/worthy-hand-up.png';
import { Button, Input, Modal } from '@/ui-kit';
import styles from '../Auth.module.scss';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  goToLogin: () => void;
  formData: { email: string; password: string; confirmPassword: string };
  onChangeFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  loading: boolean;
  error: string | null;
  onSubmit: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  goToLogin,
  formData,
  onChangeFormData,
  isDisabled,
  loading,
  error,
  onSubmit,
}) => {
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled || loading) return;
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.shell}>
        <div className={styles.form_column}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Create account</h2>
            <p className={styles.subtitle}>Save your analysis and track your future decisions.</p>

            <div className={styles.fields}>
              <Input
                label="Email"
                leadingIcon="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={onChangeFormData}
              />

              <Input
                label="Password"
                type="password"
                leadingIcon="password"
                name="password"
                hint="At least 8 characters"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(ev) => {
                  onChangeFormData(ev);
                  setPasswordMismatch(false);
                }}
              />

              <Input
                label="Confirm password"
                type="password"
                leadingIcon="password"
                name="confirmPassword"
                hint="At least 8 characters"
                placeholder="Enter your password"
                value={formData.confirmPassword}
                onChange={(ev) => {
                  onChangeFormData(ev);
                  setPasswordMismatch(false);
                }}
                error={passwordMismatch ? 'Passwords do not match' : undefined}
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>

            <Button
              variant="primary"
              type="submit"
              text="Create account"
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
            Already have an account?{' '}
            <button type="button" className={styles.footer_link} onClick={goToLogin}>
              Log in
            </button>
          </p>

          <p className={styles.lock_text}>🔒 Your data is secure with us</p>
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

export default RegisterModal;
