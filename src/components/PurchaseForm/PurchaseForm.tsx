import { DollarIcon, EditIcon } from '@/assets/icons';
import { DECISION_TIMER_OPTIONS, type DecisionTimer } from '@/constants/purchase';
import type { PurchaseFormData } from '@/hooks/purchase/usePurchase';
import { Button, ErrorMessage, ImageUpload, Input, QuantityStepper, Select } from '@/ui-kit';

import styles from './PurchaseForm.module.scss';

interface PurchaseFormProps {
  formData: PurchaseFormData;
  isDisabled: boolean;
  submitError: string | null;
  isSubmitting: boolean;
  onChangeFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeQuantity: (quantity: number) => void;
  onChangeDecisionTimer: (value: DecisionTimer) => void;
  onChangeImage: (file: File | null) => void;
  onAnalyze: () => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({
  formData,
  isDisabled,
  submitError,
  isSubmitting,
  onChangeFormData,
  onChangeQuantity,
  onChangeDecisionTimer,
  onChangeImage,
  onAnalyze,
}) => {
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onAnalyze();
      }}
      noValidate
    >
      <div className={styles.card}>
        <section className={styles.section}>
          <div className={styles.section_header}>
            <EditIcon aria-hidden className={styles.section_icon} />
            <h2 className={styles.section_title}>Purchase details</h2>
          </div>

          <Input
            label="Purchase name"
            name="name"
            value={formData.name}
            placeholder="iPhone 17 pro"
            onChange={onChangeFormData}
          />

          <Input
            label="Purchase link (optional)"
            name="link"
            value={formData.link}
            placeholder="https://www.apple.com/shop/buy-iphone/iphone-17-pro"
            onChange={onChangeFormData}
          />

          <ImageUpload
            label="Purchase image (optional)"
            value={formData.image}
            onChange={onChangeImage}
          />

          <div className={styles.row}>
            <Input
              label="Price for 1 purchase"
              name="price"
              type="number"
              prefix="$"
              value={formData.price}
              placeholder="1,600.00"
              min={0}
              step="0.01"
              onChange={onChangeFormData}
            />

            <QuantityStepper
              label="Quantity"
              value={formData.quantity}
              min={1}
              onChange={onChangeQuantity}
            />
          </div>

          <Select
            label="Decision timer"
            options={[...DECISION_TIMER_OPTIONS]}
            value={formData.decisionTimer}
            onChange={(value) => onChangeDecisionTimer(value as DecisionTimer)}
          />
        </section>

        <section className={styles.section}>
          <div className={styles.section_header}>
            <DollarIcon aria-hidden className={styles.section_icon} />
            <h2 className={styles.section_title}>Your financial profile</h2>
          </div>

          <div className={styles.row}>
            <Input
              label="Monthly income"
              name="salary"
              type="number"
              prefix="$"
              value={formData.salary}
              placeholder="3,000.00"
              min={0}
              onChange={onChangeFormData}
            />

            <Input
              label="Work hours / Week"
              name="workHoursByWeek"
              type="number"
              value={formData.workHoursByWeek}
              placeholder="40"
              min={0}
              onChange={onChangeFormData}
            />
          </div>

          <div className={styles.row}>
            <Input
              label="Annual Return %"
              name="expectReturnPercentage"
              type="number"
              value={formData.expectReturnPercentage}
              placeholder="8"
              min={0}
              onChange={onChangeFormData}
            />

            <Input
              label="Invest for (years)"
              name="investForYear"
              type="number"
              value={formData.investForYear}
              placeholder="1"
              min={0}
              onChange={onChangeFormData}
            />
          </div>
        </section>

        <div className={styles.footer}>
          {submitError ? <ErrorMessage message={submitError} /> : null}

          <Button
            type="submit"
            text="Analyze new purchase"
            className={styles.submit_btn}
            isLoading={isSubmitting}
            disabled={isDisabled}
          />
        </div>
      </div>
    </form>
  );
};

export default PurchaseForm;
