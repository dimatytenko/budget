import PageWrapper from '@/components/Layout/PageWrapper';

import { Button } from '@/ui-kit';

interface PurchaseProps {
  openLoginModal: () => void;
}

const Purchase: React.FC<PurchaseProps> = ({ openLoginModal }) => {
  return (
    <PageWrapper
      title="Add new purchase"
      subtitle="Enter details and set a timer to make a mindful decision."
    >
      <Button text="Open Login Modal" onClick={openLoginModal} />
    </PageWrapper>
  );
};

export default Purchase;
