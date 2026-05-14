interface HistoryProps {
  title?: string;
}

const HistoryPage: React.FC<HistoryProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default HistoryPage;
