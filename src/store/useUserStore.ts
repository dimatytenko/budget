import { create } from 'zustand';

import type { BaseUserInterface } from '@/types/user';

interface UserState {
  user: BaseUserInterface | null;
  setUser: (rawUser: BaseUserInterface) => void;
  clearUser: () => void;
  updateUser: (partial: Partial<BaseUserInterface>) => void;
  isRefreshing: boolean;
  setIsRefreshing: (value: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isRefreshing: true,
  setIsRefreshing: (value) => set({ isRefreshing: value }),
  user: null,
  setUser: (rawUser) => {
    const {
      id,
      email,
      firstName,
      lastName,
      salary,
      workHoursByWeek,
      expectReturnPercentage,
      investForYear,
    } = rawUser;

    set({
      user: {
        id,
        email,
        firstName,
        lastName,
        salary,
        workHoursByWeek,
        expectReturnPercentage,
        investForYear,
      },
    });
  },
  clearUser: () => set({ user: null }),
  updateUser: (partial: Partial<BaseUserInterface>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : null,
    })),
}));
