import { apiInstance } from '@/lib/api/axiosInstance';
import type { UpdateUserCredentials, UserTypeResponse } from '@/lib/api/user/types';

export const userApi = {
  updateUser: (data: UpdateUserCredentials) =>
    apiInstance.patch<UserTypeResponse>('/users/me', data),
  getMe: () => apiInstance.get<UserTypeResponse>('/users/me'),
};
