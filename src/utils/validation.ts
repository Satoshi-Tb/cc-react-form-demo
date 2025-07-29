import { User, ValidationErrors } from '../types/user';

export const validateField = (name: keyof User, value: string | string[], allValues?: User): string | undefined => {
  switch (name) {
    case 'firstName':
      if (typeof value === 'string') {
        if (!value.trim()) return '名前を入力してください';
        if (value.trim().length < 1) return '名前は1文字以上で入力してください';
      }
      return undefined;

    case 'lastName':
      if (typeof value === 'string') {
        if (!value.trim()) return '姓を入力してください';
        if (value.trim().length < 1) return '姓は1文字以上で入力してください';
      }
      return undefined;

    case 'email':
      if (typeof value === 'string') {
        if (!value.trim()) return 'メールアドレスを入力してください';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return '有効なメールアドレスを入力してください';
      }
      return undefined;

    case 'password':
      if (typeof value === 'string') {
        if (!value) return 'パスワードを入力してください';
        if (value.length < 8) return 'パスワードは8文字以上で入力してください';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'パスワードは英大文字、英小文字、数字を含む必要があります';
        }
      }
      return undefined;

    case 'confirmPassword':
      if (typeof value === 'string') {
        if (!value) return 'パスワード確認を入力してください';
        if (allValues && value !== allValues.password) return 'パスワードが一致しません';
      }
      return undefined;

    case 'gender':
      if (typeof value === 'string') {
        if (!value) return '性別を選択してください';
      }
      return undefined;

    case 'prefecture':
      if (typeof value === 'string') {
        if (!value) return '都道府県を選択してください';
      }
      return undefined;

    case 'hobbies':
      if (Array.isArray(value)) {
        if (value.length === 0) return '趣味を1つ以上選択してください';
      }
      return undefined;

    default:
      return undefined;
  }
};

export const validateForm = (values: User): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(values).forEach((key) => {
    const fieldName = key as keyof User;
    const error = validateField(fieldName, values[fieldName], values);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined);
};