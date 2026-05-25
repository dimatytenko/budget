import { useEffect, useState } from 'react';

import {
  PURCHASES_PAGE_LIMIT,
  type FinalPurchaseStatus,
  type PurchaseFilterValue,
} from '@/constants/purchase';
import { getApiErrorMessage } from '@/lib/api/handleApiError';
import { purchaseApi } from '@/lib/api/purchase';
import type { PaginationMeta } from '@/types/helpers';
import type { BasePurchaseInterface, PurchaseOverview } from '@/types/purchase';

const DEFAULT_PAGINATION: PaginationMeta = {
  page: 1,
  limit: PURCHASES_PAGE_LIMIT,
  total: 0,
  totalPages: 1,
};

const usePurchaseHistory = () => {
  const [purchases, setPurchases] = useState<BasePurchaseInterface[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION);
  const [overview, setOverview] = useState<PurchaseOverview | null>(null);
  const [filter, setFilter] = useState<PurchaseFilterValue>('all');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOverviewLoading, setIsOverviewLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchOverview = async () => {
    setIsOverviewLoading(true);

    try {
      const { data } = await purchaseApi.getStatistics();
      setOverview(data.data.statistics);
    } catch {
      setOverview(null);
    } finally {
      setIsOverviewLoading(false);
    }
  };

  const fetchPurchases = async (requestedPage: number, requestedFilter: PurchaseFilterValue) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await purchaseApi.getAll({
        page: requestedPage,
        limit: PURCHASES_PAGE_LIMIT,
        sort: 'createdAt',
        order: 'desc',
        ...(requestedFilter !== 'all' ? { status: requestedFilter } : {}),
      });

      setPurchases(data.data.purchases);
      setPagination(data.data.pagination);
    } catch (err) {
      setPurchases([]);
      setPagination(DEFAULT_PAGINATION);
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  useEffect(() => {
    fetchPurchases(page, filter);
  }, [page, filter]);

  const handleFilterChange = (nextFilter: PurchaseFilterValue) => {
    setFilter(nextFilter);
    setPage(1);
    setActionError(null);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    setActionError(null);
  };

  const handleDelete = async (id: string) => {
    setActionId(id);
    setActionError(null);

    try {
      await purchaseApi.remove(id);

      const isLastOnPage = purchases.length === 1 && page > 1;
      const nextPage = isLastOnPage ? page - 1 : page;

      if (isLastOnPage) {
        setPage(nextPage);
      } else {
        await fetchPurchases(page, filter);
      }

      await fetchOverview();
    } catch (err) {
      setActionError(getApiErrorMessage(err));
    } finally {
      setActionId(null);
    }
  };

  const handleStatusChange = async (id: string, status: FinalPurchaseStatus) => {
    setActionId(id);
    setActionError(null);

    try {
      const { data } = await purchaseApi.updateStatus(id, { status });
      const updatedPurchase = data.data.purchase;

      if (filter !== 'all' && updatedPurchase.status !== filter) {
        const isLastOnPage = purchases.length === 1 && page > 1;

        if (isLastOnPage) {
          setPage(page - 1);
        } else {
          await fetchPurchases(page, filter);
        }
      } else {
        setPurchases((prev) =>
          prev.map((purchase) => (purchase.id === id ? updatedPurchase : purchase)),
        );
      }

      await fetchOverview();
    } catch (err) {
      setActionError(getApiErrorMessage(err));
    } finally {
      setActionId(null);
    }
  };

  return {
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
    onFilterChange: handleFilterChange,
    onPageChange: handlePageChange,
    onDelete: handleDelete,
    onStatusChange: handleStatusChange,
  };
};

export default usePurchaseHistory;
