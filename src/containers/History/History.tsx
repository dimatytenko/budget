import History from '@/components/History';
import usePurchaseHistory from '@/hooks/purchase/usePurchaseHistory';

const HistoryPage = () => {
  const {
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
  } = usePurchaseHistory();

  return (
    <History
      purchases={purchases}
      pagination={pagination}
      overview={overview}
      filter={filter}
      page={page}
      isLoading={isLoading}
      isOverviewLoading={isOverviewLoading}
      error={error}
      actionError={actionError}
      actionId={actionId}
      onFilterChange={onFilterChange}
      onPageChange={onPageChange}
      onDelete={onDelete}
      onStatusChange={onStatusChange}
    />
  );
};

export default HistoryPage;
