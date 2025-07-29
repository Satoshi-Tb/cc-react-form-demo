export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  prefecture: string;
  hobbies: string[];
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  prefecture?: string;
  hobbies?: string;
}

export interface FormState {
  values: User;
  errors: ValidationErrors;
  touched: Record<keyof User, boolean>;
  isSubmitting: boolean;
}