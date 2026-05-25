import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { ChartUpIcon, ClockIcon, DollarIcon, PurchaseTagIcon, SearchIcon } from '@/assets/icons';
import worthyTimeImg from '@/assets/images/worthy/worthy-time.png';
import worthyLookImg from '@/assets/images/worthy/worthy-look.png';
import { routes } from '@/constants/routes';
import { useDecisionCountdown } from '@/hooks/purchase/useDecisionCountdown';
import type { BasePurchaseInterface } from '@/types/purchase';
import { Button } from '@/ui-kit';
import {
  formatIncomePercent,
  formatInvestmentIncome,
  formatInvestYears,
  formatWorkHours,
} from '@/utils/purchase/formatPurchaseStatistics';

import styles from './PurchaseAnalysis.module.scss';

interface PurchaseAnalysisProps {
  purchase: BasePurchaseInterface | null;
}

interface StatRowProps {
  icon: React.ReactNode;
  value: string;
  description: string;
  valueClassName?: string;
  isPlaceholder?: boolean;
}

const StatRow: React.FC<StatRowProps> = ({
  icon,
  value,
  description,
  valueClassName,
  isPlaceholder,
}) => (
  <div className={clsx(styles.stat_row, value && styles.stat_rowActive)}>
    <span className={clsx(styles.stat_icon, value && styles.stat_iconActive)}>{icon}</span>
    <p className={styles.stat_text}>
      <span
        className={clsx(
          styles.stat_value,
          isPlaceholder && styles.stat_valuePlaceholder,
          valueClassName,
        )}
      >
        {value}
      </span>{' '}
      {description}
    </p>
  </div>
);

const PurchaseAnalysis: React.FC<PurchaseAnalysisProps> = ({ purchase }) => {
  const navigate = useNavigate();
  const hasPurchase = Boolean(purchase);
  const statistics = purchase?.statistics;
  const { formatted, progress } = useDecisionCountdown(
    purchase?.status === 'pending' ? purchase.decisionEndsAt : null,
    purchase?.createdAt ?? null,
  );

  return (
    <aside className={styles.card} aria-label="Purchase analysis">
      <div className={styles.header}>
        <SearchIcon aria-hidden className={styles.header_icon} />
        <h2 className={styles.title}>Purchase analysis</h2>
      </div>

      <div className={clsx(styles.hero, hasPurchase && styles.heroActive)}>
        <img
          src={hasPurchase ? worthyTimeImg : worthyLookImg}
          alt=""
          className={styles.hero_image}
        />
        <p className={styles.hero_title}>
          {hasPurchase ? 'Take a moment to think' : 'Add details to analyze'}
        </p>
        <p className={styles.hero_subtitle}>
          {hasPurchase
            ? 'Reflect before you decide.'
            : 'Enter purchase details on the left to see your analysis.'}
        </p>
      </div>

      <div className={styles.stats}>
        <StatRow
          icon={<ClockIcon aria-hidden />}
          value={statistics ? formatWorkHours(statistics.workHoursToPay) : '--'}
          description="work hours of your life"
          isPlaceholder={!statistics}
        />
        <StatRow
          icon={<DollarIcon aria-hidden />}
          value={statistics ? formatIncomePercent(statistics.incomePercent) : '--'}
          description="of your income"
          isPlaceholder={!statistics}
        />
        <StatRow
          icon={<ChartUpIcon aria-hidden />}
          value={statistics ? formatInvestmentIncome(statistics.investmentIncome) : '--'}
          description={
            statistics
              ? `income instead in ${formatInvestYears(purchase?.investForYear ?? 1)}`
              : 'income instead in X year'
          }
          valueClassName={statistics ? styles.stat_valueAccent : undefined}
          isPlaceholder={!statistics}
        />
      </div>

      {hasPurchase && purchase?.status === 'pending' ? (
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
            <span>{purchase.name}</span>
          </div>
        </div>
      ) : null}

      {hasPurchase ? (
        <Button
          text="View in History"
          icon="ArrowRightIcon"
          className={styles.history_btn}
          onClick={() => navigate(routes.history)}
        />
      ) : (
        <p className={styles.footer_note}>🔒 Your future purchase will be saved to History.</p>
      )}
    </aside>
  );
};

export default PurchaseAnalysis;
