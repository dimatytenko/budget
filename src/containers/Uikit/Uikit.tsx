import styles from './Uikit.module.scss';
import { Button, Logo, StepProgress } from '@/ui-kit';

const Uikit = () => {
  return (
    <div className={styles.page_wrapper}>
      <h1 className={styles.title}>UI Kit Buttons</h1>

      <div className={styles.row}>
        <Logo withText={false} />
        <Logo />
      </div>

      <StepProgress current={1} total={4} />

      <div className={styles.row}>
        <Button
          variant="secondary"
          icon="ArrowRightIcon"
          iconClassName={styles.back_icon}
          iconPosition="left"
          text="Back"
        >
          Back
        </Button>
        <Button variant="primary" icon="ArrowRightIcon" text="Next">
          Next
        </Button>
        <Button variant="ghost" text="Skip" />
      </div>
    </div>
  );
};

export default Uikit;
