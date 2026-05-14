import { Button } from '@/ui-kit';

interface PurchaseProps {
  openLoginModal: () => void;
}

const Purchase: React.FC<PurchaseProps> = ({ openLoginModal }) => {
  return (
    <div>
      <Button text="Open Login Modal" onClick={openLoginModal} />
    </div>
  );
};

export default Purchase;
