import { useState } from 'react';

import {
  BriefcaseIcon,
  ChartUpIcon,
  ClockIcon,
  DollarIcon,
  SadIcon,
  SmileIcon,
} from '@/assets/icons';
import styles from './Uikit.module.scss';
import {
  Button,
  ImageUpload,
  Input,
  Logo,
  Pagination,
  QuantityStepper,
  SegmentedFilter,
  Select,
  StatCard,
  StepProgress,
} from '@/ui-kit';

import {
  DECISION_TIMER_OPTIONS,
  DEFAULT_DECISION_TIMER,
  PURCHASE_FILTER_OPTIONS,
  type PurchaseFilterValue,
} from '@/constants/purchase';
import { MOCK_PURCHASES } from '@/constants/mockPurchases';
import { STAT_TOOLTIPS } from '@/constants/statistics';
import PurchaseCard from '@/components/PurchaseCard';
import PurchaseStatusSelect from '@/components/PurchaseStatusSelect';
import type { FinalPurchaseStatus } from '@/constants/purchase';

import type { BasePurchaseInterface } from '@/types/purchase';

const Uikit = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [purchaseCards, setPurchaseCards] = useState<BasePurchaseInterface[]>(MOCK_PURCHASES);
  const [filter, setFilter] = useState<PurchaseFilterValue>('all');
  const totalPages = 10;

  const handlePurchaseStatusChange = (id: string, status: FinalPurchaseStatus) => {
    setPurchaseCards((prev) =>
      prev.map((purchase) => (purchase.id === id ? { ...purchase, status } : purchase)),
    );
  };

  return (
    <div className={styles.page_wrapper}>
      <h1 className={styles.title}>UI Kit Buttons</h1>

      <div className={styles.row}>
        <Logo />
        <Logo />
      </div>

      <StepProgress current={1} total={4} />

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Overview</h2>
        <div className={styles.stats_grid}>
          <StatCard
            label="Total saved"
            value="150,68"
            unit="usd"
            variant="saved"
            infoTooltip={STAT_TOOLTIPS.totalSaved}
            icon={<DollarIcon aria-hidden />}
          />
          <StatCard
            label="Work hours"
            value="--"
            variant="workHours"
            infoTooltip={STAT_TOOLTIPS.workHours}
            icon={<BriefcaseIcon aria-hidden />}
          />
          <StatCard
            label="Annual return"
            value="--"
            unit="usd"
            variant="annualReturn"
            infoTooltip={STAT_TOOLTIPS.annualReturn}
            icon={<ChartUpIcon aria-hidden />}
          />
          <StatCard
            label="Rejected"
            value="--"
            unit="purchases"
            variant="rejected"
            infoTooltip={STAT_TOOLTIPS.rejected}
            icon={<SmileIcon aria-hidden />}
          />
          <StatCard
            label="Pending"
            value="--"
            unit="purchases"
            variant="pending"
            infoTooltip={STAT_TOOLTIPS.pending}
            icon={<ClockIcon aria-hidden />}
          />
          <StatCard
            label="Bought"
            value="--"
            unit="purchases"
            variant="bought"
            infoTooltip={STAT_TOOLTIPS.bought}
            icon={<SadIcon aria-hidden />}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Filter</h2>
        <SegmentedFilter
          value={filter}
          options={PURCHASE_FILTER_OPTIONS}
          onChange={setFilter}
          ariaLabel="Filter purchases"
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Status select</h2>
        <div className={styles.status_select_row}>
          <PurchaseStatusSelect status="pending" onStatusChange={() => undefined} />
          <PurchaseStatusSelect status="rejected" />
          <PurchaseStatusSelect status="bought" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Purchase card</h2>
        <div className={styles.purchase_cards}>
          {purchaseCards.map((purchase) => (
            <PurchaseCard
              key={purchase.id}
              purchase={purchase}
              onDelete={() => undefined}
              onStatusChange={handlePurchaseStatusChange}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Pagination</h2>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>

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
            options={[...DECISION_TIMER_OPTIONS]}
            defaultValue={DEFAULT_DECISION_TIMER}
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
