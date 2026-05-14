import type { BaseResponseInterface } from '@/types/helpers';
import type { BaseUserInterface } from '@/types/user';

export interface UpdateUserCredentials {
  firstName: string;
  lastName: string;
  salary: number;
  workHoursByWeek: number;
  expectReturnPercentage: number;
  investForYear: number;
}

export type UserTypeResponse = BaseResponseInterface<{
  user: BaseUserInterface;
}>;
