import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Alert 
} from '@mui/material';
import { FormField } from './FormField';
import { User, FormState } from '../../types/user';
import { validateField, validateForm, hasErrors } from '../../utils/validation';

interface RegisterFormProps {
  onSubmit: (userData: User) => void;
}

const initialValues: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const initialTouched = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: initialTouched,
    isSubmitting: false
  });

  const handleFieldChange = (name: string, value: string) => {
    const fieldName = name as keyof User;
    const newValues = { ...formState.values, [fieldName]: value };
    const fieldError = validateField(fieldName, value, newValues);
    
    setFormState(prev => ({
      ...prev,
      values: newValues,
      errors: {
        ...prev.errors,
        [fieldName]: fieldError
      }
    }));
  };

  const handleFieldBlur = (name: string) => {
    const fieldName = name as keyof User;
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [fieldName]: true
      }
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const errors = validateForm(formState.values);
    const allTouched = Object.keys(formState.values).reduce((acc, key) => {
      acc[key as keyof User] = true;
      return acc;
    }, {} as Record<keyof User, boolean>);

    setFormState(prev => ({
      ...prev,
      errors,
      touched: allTouched,
      isSubmitting: true
    }));

    if (!hasErrors(errors)) {
      try {
        await onSubmit(formState.values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setFormState(prev => ({ ...prev, isSubmitting: false }));
  };

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          ユーザー登録
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormField
            name="firstName"
            label="名前"
            value={formState.values.firstName}
            error={formState.errors.firstName}
            touched={formState.touched.firstName}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            required
          />
          
          <FormField
            name="lastName"
            label="姓"
            value={formState.values.lastName}
            error={formState.errors.lastName}
            touched={formState.touched.lastName}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            required
          />
          
          <FormField
            name="email"
            label="メールアドレス"
            type="email"
            value={formState.values.email}
            error={formState.errors.email}
            touched={formState.touched.email}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            required
          />
          
          <FormField
            name="password"
            label="パスワード"
            type="password"
            value={formState.values.password}
            error={formState.errors.password}
            touched={formState.touched.password}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            required
          />
          
          <FormField
            name="confirmPassword"
            label="パスワード確認"
            type="password"
            value={formState.values.confirmPassword}
            error={formState.errors.confirmPassword}
            touched={formState.touched.confirmPassword}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            required
          />

          {hasErrors(formState.errors) && Object.values(formState.touched).some(Boolean) && (
            <Alert severity="error" sx={{ mt: 2 }}>
              入力内容に誤りがあります。各フィールドをご確認ください。
            </Alert>
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? '送信中...' : '登録する'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};