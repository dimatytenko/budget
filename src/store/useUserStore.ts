import { create } from 'zustand';

import type { AuthUserInterface } from '@/types/user';
import type { UserType } from '@/types/user';

interface UserState {
  user: UserType;
  setUser: (rawUser: AuthUserInterface) => void;
  clearUser: () => void;
  updateUser: (partial: Partial<UserType>) => void;
  isRefreshing: boolean;
  setIsRefreshing: (value: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isRefreshing: true,
  setIsRefreshing: (value) => set({ isRefreshing: value }),
  user: null,
  setUser: (rawUser) => {
    const { _id, avatar, email } = rawUser;

    set({
      user: {
        _id,
        avatar,
        email,
      },
    });
  },
  clearUser: () => set({ user: null }),
  updateUser: (partial: Partial<UserType>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : null,
    })),
}));
