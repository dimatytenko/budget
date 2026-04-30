export interface BaseUserInterface {
  _id: string;
  avatar: string;
  email: string;
}

export interface AuthUserInterface extends BaseUserInterface {
  token: string;
}

export type UserType = BaseUserInterface | null;
