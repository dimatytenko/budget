import type { BaseResponseInterface } from '@/types/helpers';
import type { BaseUserInterface } from '@/types/user';

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export type AuthUserTypeResponse = BaseResponseInterface<{
  token: string;
  user: BaseUserInterface;
}>;
