import { useNavigate } from 'react-router-dom';

import {
  BriefcaseIcon,
  ChartUpIcon,
  ClockIcon,
  DollarIcon,
  SadIcon,
  SmileIcon,
} from '@/assets/icons';
import styles from './History.module.scss';
import PageWrapper from '@/components/Layout/PageWrapper';
import PurchaseCard from '@/components/PurchaseCard';
import {
  PURCHASE_FILTER_OPTIONS,
  type FinalPurchaseStatus,
  type PurchaseFilterValue,
} from '@/constants/purchase';
import { routes } from '@/constants/routes';
import { STAT_TOOLTIPS } from '@/constants/statistics';
import type { PaginationMeta } from '@/types/helpers';
import type { BasePurchaseInterface, PurchaseOverview } from '@/types/purchase';
import { Button, ErrorMessage, Loader, Pagination, SegmentedFilter, StatCard } from '@/ui-kit';
import {
  formatAnnualReturn,
  formatOverviewWorkHours,
  formatTotalSaved,
} from '@/utils/purchase/formatPurchaseOverview';

interface HistoryProps {
  purchases: BasePurchaseInterface[];
  pagination: PaginationMeta;
  overview: PurchaseOverview | null;
  filter: PurchaseFilterValue;
  page: number;
  isLoading: boolean;
  isOverviewLoading: boolean;
  error: string | null;
  actionError: string | null;
  actionId: string | null;
  onFilterChange: (filter: PurchaseFilterValue) => void;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: FinalPurchaseStatus) => void;
}

const History: React.FC<HistoryProps> = ({
  purchases,
  pagination,
  overview,
  filter,
  page,
  isLoading,
  isOverviewLoading,
  error,
  actionError,
  actionId,
  onFilterChange,
  onPageChange,
  onDelete,
  onStatusChange,
}) => {
  const navigate = useNavigate();
  const showPagination = pagination.totalPages > 1;
  const isOverviewReady = Boolean(overview) && !isOverviewLoading;

  return (
    <PageWrapper title="History" subtitle="Track your purchase history">
      <section className={styles.page}>
        <div className={styles.overview_section}>
          <h2 className={styles.section_title}>Overview</h2>
          <div className={styles.stats_grid}>
            <StatCard
              label="Total saved"
              value={isOverviewReady ? formatTotalSaved(overview!.totalSaved) : '--'}
              unit="usd"
              variant="saved"
              infoTooltip={STAT_TOOLTIPS.totalSaved}
              icon={<DollarIcon aria-hidden />}
            />
            <StatCard
              label="Work hours"
              value={isOverviewReady ? formatOverviewWorkHours(overview!.workHours) : '--'}
              variant="workHours"
              infoTooltip={STAT_TOOLTIPS.workHours}
              icon={<BriefcaseIcon aria-hidden />}
            />
            <StatCard
              label="Annual return"
              value={isOverviewReady ? formatAnnualReturn(overview!.annualReturn) : '--'}
              unit="usd"
              variant="annualReturn"
              infoTooltip={STAT_TOOLTIPS.annualReturn}
              icon={<ChartUpIcon aria-hidden />}
            />
            <StatCard
              label="Rejected"
              value={isOverviewReady ? String(overview!.rejectedCount) : '--'}
              unit="purchases"
              variant="rejected"
              infoTooltip={STAT_TOOLTIPS.rejected}
              icon={<SmileIcon aria-hidden />}
            />
            <StatCard
              label="Pending"
              value={isOverviewReady ? String(overview!.pendingCount) : '--'}
              unit="purchases"
              variant="pending"
              infoTooltip={STAT_TOOLTIPS.pending}
              icon={<ClockIcon aria-hidden />}
            />
            <StatCard
              label="Bought"
              value={isOverviewReady ? String(overview!.boughtCount) : '--'}
              unit="purchases"
              variant="bought"
              infoTooltip={STAT_TOOLTIPS.bought}
              icon={<SadIcon aria-hidden />}
            />
          </div>
        </div>

        <div className={styles.history_section}>
          <div className={styles.toolbar}>
            <h2 className={styles.section_title}>Purchase history</h2>
            <div>
              <SegmentedFilter
                value={filter}
                options={PURCHASE_FILTER_OPTIONS}
                onChange={onFilterChange}
                ariaLabel="Filter purchases"
              />
            </div>
          </div>

          {error ? <ErrorMessage message={error} /> : null}
          {actionError ? <ErrorMessage message={actionError} /> : null}

          {isLoading ? (
            <div className={styles.loader_wrap}>
              <Loader />
            </div>
          ) : purchases.length > 0 ? (
            <div className={styles.list}>
              {purchases.map((purchase) => (
                <PurchaseCard
                  key={purchase.id}
                  purchase={purchase}
                  layout="grid"
                  onDelete={actionId === purchase.id ? undefined : onDelete}
                  onStatusChange={actionId === purchase.id ? undefined : onStatusChange}
                />
              ))}
            </div>
          ) : (
            <p className={styles.empty_state}>
              {filter === 'all'
                ? 'No purchases yet. Add your first purchase to start tracking.'
                : `No ${filter} purchases found.`}
            </p>
          )}

          {showPagination && !isLoading ? (
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
              className={styles.pagination}
            />
          ) : null}

          <Button
            text="+ Add new purchase"
            className={styles.add_button}
            onClick={() => navigate(routes.purchase)}
          />
        </div>
      </section>
    </PageWrapper>
  );
};

export default History;
