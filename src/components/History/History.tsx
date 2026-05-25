import { useMemo, useState } from 'react';

import styles from './History.module.scss';
import PageWrapper from '@/components/Layout/PageWrapper';
import PurchaseCard from '@/components/PurchaseCard';
import {
  PURCHASE_FILTER_OPTIONS,
  type FinalPurchaseStatus,
  type PurchaseFilterValue,
} from '@/constants/purchase';
import { MOCK_PURCHASES } from '@/constants/mockPurchases';
import { SegmentedFilter } from '@/ui-kit';
import type { BasePurchaseInterface } from '@/types/purchase';

const History: React.FC = () => {
  const [purchases, setPurchases] = useState<BasePurchaseInterface[]>(MOCK_PURCHASES);
  const [filter, setFilter] = useState<PurchaseFilterValue>('all');

  const filteredPurchases = useMemo(
    () =>
      filter === 'all' ? purchases : purchases.filter((purchase) => purchase.status === filter),
    [filter, purchases],
  );

  const handleStatusChange = (id: string, status: FinalPurchaseStatus) => {
    setPurchases((prev) =>
      prev.map((purchase) => (purchase.id === id ? { ...purchase, status } : purchase)),
    );
  };

  return (
    <PageWrapper title="History" subtitle="Track your purchase history">
      <section className={styles.page}>
        <div className={styles.toolbar}>
          <h2 className={styles.section_title}>Purchase history</h2>
          <SegmentedFilter
            value={filter}
            options={PURCHASE_FILTER_OPTIONS}
            onChange={setFilter}
            ariaLabel="Filter purchases"
          />
        </div>

        <div className={styles.list}>
          {filteredPurchases.map((purchase) => (
            <PurchaseCard
              key={purchase.id}
              purchase={purchase}
              onDelete={() => undefined}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default History;
