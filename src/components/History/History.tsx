import { useState } from 'react';

import styles from './History.module.scss';
import PageWrapper from '@/components/Layout/PageWrapper';
import PurchaseCard from '@/components/PurchaseCard';
import type { FinalPurchaseStatus } from '@/constants/purchase';
import { MOCK_PURCHASES } from '@/constants/mockPurchases';
import type { BasePurchaseInterface } from '@/types/purchase';

const History: React.FC = () => {
  const [purchases, setPurchases] = useState<BasePurchaseInterface[]>(MOCK_PURCHASES);

  const handleStatusChange = (id: string, status: FinalPurchaseStatus) => {
    setPurchases((prev) =>
      prev.map((purchase) => (purchase.id === id ? { ...purchase, status } : purchase)),
    );
  };

  return (
    <PageWrapper title="History" subtitle="Track your purchase history">
      <section className={styles.page}>
        <h2 className={styles.section_title}>Purchase history</h2>

        <div className={styles.list}>
          {purchases.map((purchase) => (
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
