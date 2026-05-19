import styles from './Uikit.module.scss';
import {
  Button,
  ImageUpload,
  Input,
  Logo,
  QuantityStepper,
  Select,
  StepProgress,
} from '@/ui-kit';

const DECISION_TIMER_OPTIONS = [
  { value: '24h', label: '24 hours (recommended)' },
  { value: '12h', label: '12 hours' },
  { value: '48h', label: '48 hours' },
  { value: '72h', label: '72 hours' },
];

const Uikit = () => {
  return (
    <div className={styles.page_wrapper}>
      <h1 className={styles.title}>UI Kit Buttons</h1>

      <div className={styles.row}>
        <Logo />
        <Logo />
      </div>

      <StepProgress current={1} total={4} />

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Inputs</h2>
        <div className={styles.inputs_column}>
          <Input
            label="Email"
            type="email"
            name="uikit-email"
            placeholder="Enter your email"
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            name="uikit-password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <QuantityStepper label="Quantity" defaultValue={1} min={1} />
          <Select
            label="Decision timer"
            options={DECISION_TIMER_OPTIONS}
            defaultValue="24h"
          />
          <ImageUpload label="Purchase image" />
        </div>
      </section>

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
