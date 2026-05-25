import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { AccountIcon, LogoutIcon } from '@/assets/icons';
import styles from './Header.module.scss';
import { routes } from '@/constants/routes';
import { Button, Logo } from '@/ui-kit';

interface HeaderProps {
  isAuth: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuth, onLogin, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={'container'}>
        <div className={styles.content}>
          <Logo linkToPurchase variantText="desk" />
          <nav className={styles.nav} aria-label="main navigation">
            <NavLink
              to={routes.purchase}
              className={({ isActive }) => clsx(styles.navLink, isActive && styles.navLinkActive)}
            >
              Add new purchase
            </NavLink>
            {isAuth && (
              <NavLink
                to={routes.history}
                className={({ isActive }) => clsx(styles.navLink, isActive && styles.navLinkActive)}
              >
                History
              </NavLink>
            )}
          </nav>
          <div className={styles.actions}>
            {isAuth ? (
              <>
                <NavLink
                  to={routes.profile}
                  className={({ isActive }) =>
                    clsx(styles.iconButton, isActive && styles.iconButtonActive)
                  }
                  aria-label="Profile"
                >
                  <AccountIcon className={styles.icon} />
                </NavLink>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label="Log out"
                  onClick={onLogout}
                >
                  <LogoutIcon className={styles.icon} />
                </button>
              </>
            ) : (
              <Button
                text="Log in"
                variant="secondary"
                className={styles.loginButton}
                onClick={onLogin}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
