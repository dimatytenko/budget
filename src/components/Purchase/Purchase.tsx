import styles from './Purchase.module.scss';
import PageWrapper from '@/components/Layout/PageWrapper';
import PurchaseForm from '@/components/PurchaseForm';
import type { DecisionTimer } from '@/constants/purchase';
import type { PurchaseFormData } from '@/hooks/purchase/usePurchase';
import type { BasePurchaseInterface } from '@/types/purchase';

interface PurchaseProps {
  latestPurchase: BasePurchaseInterface | null;
  isLatestLoading: boolean;
  latestError: string | null;
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
  latestPurchase,
  isLatestLoading,
  latestError,
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
        {isLatestLoading ? (
          <p className={styles.latest_hint}>Loading your last purchase…</p>
        ) : null}
        {latestError ? <p className={styles.latest_error}>{latestError}</p> : null}
        {latestPurchase ? (
          <p className={styles.latest_hint}>
            Last purchase: <strong>{latestPurchase.name}</strong> ({latestPurchase.status})
          </p>
        ) : null}
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
