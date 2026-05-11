import { useState } from 'react';

import worthyCharacter from '@/assets/images/worthy/worthy-hand-up.png';
import { Button, Input, Modal } from '@/ui-kit';
import { LockColorIcon } from '@/assets/icons';

import styles from '../Auth.module.scss';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: { email: string; password: string }) => void;
  goToRegister?: () => void;
}

const LoginModal = ({ isOpen, onClose, onSubmit, goToRegister }: RegisterModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.shell}>
        <div className={styles.form_column}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.({ email, password });
            }}
            noValidate
          >
            <h2 className={styles.title}>Welcome back!</h2>
            <p className={styles.subtitle}>
              Log in or create an account to save your analysis and track your future decisions.
            </p>

            <div className={styles.fields}>
              <Input
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
            </div>

            <Button variant="primary" type="submit" text="Log in" className={styles.login_button} />
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
            <LockColorIcon className={styles.lock_icon} />
            <p className={styles.lock_icon_text}>Your data is secure with us</p>
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
