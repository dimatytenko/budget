import { useState, useEffect } from 'react';

import { authApi } from '@/lib/api/auth';
import { setToken, getToken } from '@/lib/cookies';
import { apiToken } from '@/lib/api/axiosInstance';
import { useUser, useRefreshingUser } from '@/hooks/user';
import { getApiErrorMessage } from '@/lib/api/handleApiError';
import changeInputValues from '@/utils/changeInputValues';

export const useAuthModals = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };
  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return {
    isLoginModalOpen,
    isRegisterModalOpen,
    openLoginModal,
    closeLoginModal,
    openRegisterModal,
    closeRegisterModal,
  };
};

export const useRegister = (options: { onSuccess?: () => void }) => {
  const { onSuccess } = options;
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInputValues(e, setFormData);
    if (error) {
      setError(null);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await authApi.register(formData);
      setToken(data?.data?.token); // set token cookie
      apiToken.set(data?.data?.token); // set token axios instance

      setUser(data?.data?.user || null); // set user to store
      onSuccess?.();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = Object.values(formData).some((value) => !value);

  return {
    formData,
    onChangeFormData,
    isDisabled,
    onSubmit,
    loading,
    error,
  };
};

export const useLogin = (options: { onSuccess?: () => void }) => {
  const { onSuccess } = options;
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInputValues(e, setFormData);
    if (error) {
      setError(null);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await authApi.login(formData);
      setToken(data?.data?.token); // set token cookie
      apiToken.set(data?.data?.token); // set token axios instance
      setUser(data?.data?.user || null); // set user to store
      onSuccess?.();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = Object.values(formData).some((value) => !value);

  return {
    formData,
    onChangeFormData,
    isDisabled,
    onSubmit,
    loading,
    error,
  };
};

export const useFetchSession = () => {
  const { user, setUser, clearUser } = useUser();
  const { setIsRefreshing } = useRefreshingUser();

  const tokenValue = getToken();

  useEffect(() => {
    const fetchUser = async () => {
      if (!tokenValue || user) {
        setIsRefreshing(false);
        return;
      }

      setIsRefreshing(true);

      try {
        apiToken.set(tokenValue); // set token axios instance
        const { data } = await authApi.getMe();
        setUser(data?.data?.user || null); // set user to store
      } catch {
        clearUser(); // clear user from store
        setToken(); // clear token cookie
        apiToken.unset(); // clear token axios instance
      } finally {
        setIsRefreshing(false);
      }
    };

    fetchUser();
  }, [setIsRefreshing, setUser, tokenValue, user]);
};

export const useLogout = () => {
  const { clearUser } = useUser();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToken(); // clear token cookie
      apiToken.unset(); // clear token axios instance
      clearUser(); // clear user from store
    } catch {
      // noop
    }
  };

  return {
    handleLogout,
  };
};
