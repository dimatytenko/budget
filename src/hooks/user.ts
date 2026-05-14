import { useState } from 'react';

import { useUserStore } from '@/store/useUserStore';
import changeInputValues from '@/utils/changeInputValues';
import { userApi } from '@/lib/api/user';

export const useUser = () => {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const updateUser = useUserStore((s) => s.updateUser);

  return {
    user,
    setUser,
    clearUser,
    updateUser,
  };
};

export const useGetUser = () => {
  const user = useUserStore((s) => s.user);

  return {
    user,
    isExistUser: !!user,
  };
};

export const useRefreshingUser = () => {
  const isRefreshing = useUserStore((s) => s.isRefreshing);
  const setIsRefreshing = useUserStore((s) => s.setIsRefreshing);

  return {
    isRefreshing,
    setIsRefreshing,
  };
};

const INITIAL_USER_STATE = {
  firstName: '',
  lastName: '',
  salary: '',
  workHoursByWeek: '',
  expectReturnPercentage: '',
  investForYear: '',
};

export const useUpdateUser = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    ...INITIAL_USER_STATE,
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    salary: user?.salary ? String(user.salary) : '',
    workHoursByWeek: user?.workHoursByWeek ? String(user.workHoursByWeek) : '',
    expectReturnPercentage: user?.expectReturnPercentage ? String(user.expectReturnPercentage) : '',
    investForYear: user?.investForYear ? String(user.investForYear) : '',
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
      const { data } = await userApi.updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        salary: Number(formData.salary),
        workHoursByWeek: Number(formData.workHoursByWeek),
        expectReturnPercentage: Number(formData.expectReturnPercentage),
        investForYear: Number(formData.investForYear),
      });
      updateUser(data?.data?.user || null);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    formData,
    onChangeFormData,
    loading,
    error,
    onSubmit,
  };
};
