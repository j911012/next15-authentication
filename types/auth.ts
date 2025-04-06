export type SignupFormState =
  | {
      errors?: {
        email?: string;
        password?: string;
      };
    }
  | undefined;

export type LoginFormState =
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
