import { apiInstance } from '@/lib/api/axiosInstance';
import type {
  AuthCredentials,
  RegisterCredentials,
  UpdateUserCredentials,
  AuthUserTypeResponse,
  UserTypeResponse,
} from '@/lib/api/auth/types';

export const authApi = {
  register: (data: RegisterCredentials) =>
    apiInstance.post<AuthUserTypeResponse>('/users/register', data),
  login: (data: AuthCredentials) => apiInstance.post<AuthUserTypeResponse>('/users/login', data),
  updateUser: (data: UpdateUserCredentials) =>
    apiInstance.patch<UserTypeResponse>('/users/update', data),
  getMe: () => apiInstance.get<UserTypeResponse>('/users/me'),
  logout: () => apiInstance.patch<void>('/users/logout'),
};
