import { useNavigate } from 'react-router-dom';

import styles from './Footer.module.scss';
import { Button } from '@/ui-kit';
import { routes } from '@/constants/routes';

interface FooterProps {
  pathname: string;
  isAuth: boolean;
}

const Footer: React.FC<FooterProps> = ({ isAuth }) => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={'container'}>
        <div className={styles.content}>
          <div className={styles.buttons}>
            <Button
              text="Add new purchase"
              variant="secondary"
              className={styles.button}
              onClick={() => navigate(routes.purchase)}
            />
            {isAuth && (
              <Button
                text="History"
                variant="secondary"
                className={styles.button}
                onClick={() => navigate(routes.history)}
              />
            )}
          </div>
          <p className={styles.text_copyright}>© 2026 Worthy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
