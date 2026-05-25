import axios from 'axios';
import { useState, useEffect } from 'react';

import { getApiErrorMessage } from '@/lib/api/handleApiError';
import { purchaseApi } from '@/lib/api/purchase';
import type { BasePurchaseInterface } from '@/types/purchase';
import { useUser } from '../user';

const useLatestPurchase = () => {
  const { user } = useUser();
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
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setLatestPurchase(null);
        return;
      }

      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setLatestPurchase(null);
      return;
    }

    fetchLatestPurchase();
  }, [user]);

  return {
    latestPurchase,
    isLoading,
    error,
    fetchLatestPurchase,
  };
};

export default useLatestPurchase;
