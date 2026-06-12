import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { ChartUpIcon, ClockIcon, DollarIcon, PurchaseTagIcon, SearchIcon } from '@/assets/icons';
import worthyTimeImg from '@/assets/images/worthy/worthy-time.png';
import worthyLookImg from '@/assets/images/worthy/worthy-look.png';
import { routes } from '@/constants/routes';
import { useDecisionCountdown } from '@/hooks/purchase/useDecisionCountdown';
import type { BasePurchaseInterface, PurchaseStatistics } from '@/types/purchase';
import { Button } from '@/ui-kit';
import {
  formatIncomePercent,
  formatInvestmentIncome,
  formatInvestYears,
  formatWorkHours,
} from '@/utils/purchase/formatPurchaseStatistics';

import styles from './PurchaseAnalysis.module.scss';

interface PurchaseAnalysisProps {
  previewStats: PurchaseStatistics | null;
  previewInvestForYear: number;
  confirmationPurchase: BasePurchaseInterface | null;
}

interface StatRowProps {
  icon: React.ReactNode;
  value: string;
  description: string;
  valueClassName?: string;
}

const StatRow: React.FC<StatRowProps> = ({ icon, value, description, valueClassName }) => (
  <div className={clsx(styles.stat_row, styles.stat_rowActive)}>
    <span className={clsx(styles.stat_icon, styles.stat_iconActive)}>{icon}</span>
    <p className={styles.stat_text}>
      <span className={clsx(styles.stat_value, valueClassName)}>{value}</span> {description}
    </p>
  </div>
);

const PurchaseAnalysis: React.FC<PurchaseAnalysisProps> = ({
  previewStats,
  previewInvestForYear,
  confirmationPurchase,
}) => {
  const navigate = useNavigate();

  const isPreview = previewStats !== null;
  const isConfirmation = !isPreview && confirmationPurchase !== null;
  const isIdle = !isPreview && !isConfirmation;

  const { formatted, progress } = useDecisionCountdown(
    isConfirmation && confirmationPurchase?.status === 'pending'
      ? confirmationPurchase.decisionEndsAt
      : null,
    isConfirmation ? (confirmationPurchase?.createdAt ?? null) : null,
  );

  const heroImage = isConfirmation ? worthyTimeImg : worthyLookImg;
  const heroTitle = isConfirmation
    ? 'Your reflection pause has started'
    : isPreview
      ? 'See how this purchase fits your life'
      : 'Take a moment to think';
  const heroSubtitle = isConfirmation
    ? 'Reflect before you decide.'
    : isPreview
      ? 'Stats update as you fill in the form.'
      : 'Enter purchase details on the left to see your analysis.';

  return (
    <aside className={styles.card} aria-label="Purchase analysis">
      <div className={styles.header}>
        <SearchIcon aria-hidden className={styles.header_icon} />
        <h2 className={styles.title}>Purchase analysis</h2>
      </div>

      <div className={clsx(styles.hero, !isIdle && styles.heroActive)}>
        <img src={heroImage} alt="" className={styles.hero_image} />
        <p className={styles.hero_title}>{heroTitle}</p>
        <p className={styles.hero_subtitle}>{heroSubtitle}</p>
      </div>

      {isPreview ? (
        <div className={styles.stats}>
          <StatRow
            icon={<ClockIcon aria-hidden />}
            value={formatWorkHours(previewStats.workHoursToPay)}
            description="work hours of your life"
          />
          <StatRow
            icon={<DollarIcon aria-hidden />}
            value={formatIncomePercent(previewStats.incomePercent)}
            description="of your income"
          />
          <StatRow
            icon={<ChartUpIcon aria-hidden />}
            value={formatInvestmentIncome(previewStats.investmentIncome)}
            description={`income instead in ${formatInvestYears(previewInvestForYear)}`}
            valueClassName={styles.stat_valueAccent}
          />
        </div>
      ) : null}

      {isConfirmation && confirmationPurchase.status === 'pending' ? (
        <div className={styles.timer_card}>
          <div className={styles.timer_header}>
            <ClockIcon aria-hidden className={styles.timer_header_icon} />
            <span className={styles.timer_header_title}>Reflection Timer</span>
          </div>

          <p className={styles.timer_value}>{formatted}</p>
          <p className={styles.timer_hint}>Until you can decide</p>

          <div className={styles.progress_track} aria-hidden>
            <span className={styles.progress_fill} style={{ width: `${progress}%` }} />
          </div>

          <div className={styles.purchase_tag}>
            <PurchaseTagIcon aria-hidden className={styles.purchase_tag_icon} />
            <span>{confirmationPurchase.name}</span>
          </div>
        </div>
      ) : null}

      {isConfirmation ? (
        <Button
          text="View in History"
          icon="ArrowRightIcon"
          className={styles.history_btn}
          onClick={() => navigate(routes.history)}
        />
      ) : isIdle ? (
        <p className={styles.footer_note}>🔒 Your future purchase will be saved to History.</p>
      ) : null}
    </aside>
  );
};

export default PurchaseAnalysis;
