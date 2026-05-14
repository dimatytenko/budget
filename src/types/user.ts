export interface BaseUserInterface {
  id: string;
  email: string;
  name: string;
  surname: string;
  salary: number;
}

export type UserType = BaseUserInterface | null;
