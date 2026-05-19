import styles from './Purchase.module.scss';
import PageWrapper from '@/components/Layout/PageWrapper';
import PurchaseForm from '@/components/PurchaseForm';
import type { DecisionTimer } from '@/constants/purchase';
import type { PurchaseFormData } from '@/hooks/usePurchase';

interface PurchaseProps {
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

const Purchase: React.FC<PurchaseProps> = ({
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
    <PageWrapper
      title="Add new purchase"
      subtitle="Enter details and set a timer to make a mindful decision."
    >
      <section className={styles.page}>
        <PurchaseForm
          formData={formData}
          isDisabled={isDisabled}
          submitError={submitError}
          isSubmitting={isSubmitting}
          onChangeFormData={onChangeFormData}
          onChangeQuantity={onChangeQuantity}
          onChangeDecisionTimer={onChangeDecisionTimer}
          onChangeImage={onChangeImage}
          onAnalyze={onAnalyze}
        />
      </section>
    </PageWrapper>
  );
};

export default Purchase;
