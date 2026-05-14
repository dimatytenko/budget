import { apiInstance } from '@/lib/api/axiosInstance';
import type {
  AuthCredentials,
  RegisterCredentials,
  AuthUserTypeResponse,
} from '@/lib/api/auth/types';

export const authApi = {
  register: (data: RegisterCredentials) =>
    apiInstance.post<AuthUserTypeResponse>('/users/register', data),
  login: (data: AuthCredentials) => apiInstance.post<AuthUserTypeResponse>('/users/login', data),
  logout: () => apiInstance.post<void>('/users/logout'),
};
