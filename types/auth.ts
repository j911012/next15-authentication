export type SignupFormState =
  | {
      errors?: {
        email?: string;
        password?: string;
      };
    }
  | undefined;
