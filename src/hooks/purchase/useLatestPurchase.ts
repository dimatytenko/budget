import { useState, useEffect } from 'react';

import { getApiErrorMessage } from '@/lib/api/handleApiError';
import { purchaseApi } from '@/lib/api/purchase';
import type { BasePurchaseInterface } from '@/types/purchase';

const useLatestPurchase = () => {
  const [latestPurchase, setLatestPurchase] = useState<BasePurchaseInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestPurchase = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await purchaseApi.getLatest();
      setLatestPurchase(data.data.purchase);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestPurchase();
  }, []);

  return {
    latestPurchase,
    isLoading,
    error,
    fetchLatestPurchase,
  };
};

export default useLatestPurchase;
