import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface FormFieldProps extends Omit<TextFieldProps, 'onChange' | 'onBlur' | 'error'> {
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  ...textFieldProps
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  const handleBlur = () => {
    onBlur(name);
  };

  return (
    <TextField
      {...textFieldProps}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && !!error}
      helperText={touched && error}
      fullWidth
      margin="normal"
    />
  );
};