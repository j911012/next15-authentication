export type FormStateType =
  | {
      errors?: {
        email?: string;
        password?: string;
      };
    }
  | undefined;

export type UserRecord = {
  id: string;
  email: string;
  password: string;
};
