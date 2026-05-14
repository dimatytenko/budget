import { useUserStore } from '@/store/useUserStore';

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
