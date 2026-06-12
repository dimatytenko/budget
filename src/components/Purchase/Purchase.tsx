import styles from './Purchase.module.scss';
import PageWrapper from '@/components/Layout/PageWrapper';
import PurchaseAnalysis from '@/components/PurchaseAnalysis';
import PurchaseForm from '@/components/PurchaseForm';
import type { DecisionTimer } from '@/constants/purchase';
import type { PurchaseFormData } from '@/hooks/purchase/usePurchase';
import type { BasePurchaseInterface, PurchaseStatistics } from '@/types/purchase';

interface PurchaseProps {
  previewStats: PurchaseStatistics | null;
  confirmationPurchase: BasePurchaseInterface | null;
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

const toPreviewInvestYears = (value: string): number => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const Purchase: React.FC<PurchaseProps> = ({
  previewStats,
  confirmationPurchase,
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
        <div className={styles.content}>
          <div className={styles.form_column}>
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
          </div>

          <PurchaseAnalysis
            previewStats={previewStats}
            previewInvestForYear={toPreviewInvestYears(formData.investForYear)}
            confirmationPurchase={confirmationPurchase}
          />
        </div>
      </section>
    </PageWrapper>
  );
};

export default Purchase;
