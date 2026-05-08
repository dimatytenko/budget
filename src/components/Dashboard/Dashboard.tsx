import { Button } from '@/ui-kit';

interface DashboardProps {
  openLoginModal: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ openLoginModal }) => {
  return (
    <div>
      <Button text="Open Login Modal" onClick={openLoginModal} />
    </div>
  );
};

export default Dashboard;
