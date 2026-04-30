import styles from './Uikit.module.scss';
import { Loader } from '@/ui-kit';

const Uikit = () => {
  return (
    <div className={styles.page_wrapper}>
      <h1 className={styles.title}>UI Kit Example</h1>
      <Loader />
    </div>
  );
};

export default Uikit;
