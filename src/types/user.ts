export interface BaseUserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  salary: number;
  workHoursByWeek: number;
  expectReturnPercentage: number;
  investForYear: number;
}

export type UserType = BaseUserInterface | null;
