export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface FormState {
  values: User;
  errors: ValidationErrors;
  touched: Record<keyof User, boolean>;
  isSubmitting: boolean;
}