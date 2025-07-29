import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import { FormField } from './FormField';
import { User, FormState } from '../../types/user';
import { validateField, validateForm, hasErrors } from '../../utils/validation';
import { useRouter } from 'next/router';

interface RegisterFormProps {
  onSubmit: (userData: User) => void;
}

const initialValues: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  prefecture: '',
  hobbies: []
};

const initialTouched = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
  gender: false,
  prefecture: false,
  hobbies: false
};

const hobbyOptions = [
  '読書',
  '映画鑑賞',
  '音楽鑑賞',
  'スポーツ',
  '料理',
  '旅行',
  'ゲーム',
  '写真撮影',
  'プログラミング',
  '園芸',
  '絵画',
  '手芸'
];

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: initialTouched,
    isSubmitting: false
  });
  const [isDirty, setIsDirty] = useState(false);

  const handleFieldChange = (name: string, value: string | string[]) => {
    const fieldName = name as keyof User;
    const newValues = { ...formState.values, [fieldName]: value };
    const fieldError = validateField(fieldName, value, newValues);
    
    setIsDirty(true);
    
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
        setIsDirty(false);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setFormState(prev => ({ ...prev, isSubmitting: false }));
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleRouteChange = (url: string) => {
      if (isDirty && !confirm('入力内容が保存されていません。このページを離れますか？')) {
        router.events.emit('routeChangeError');
        throw 'Route change aborted';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isDirty, router]);

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

          <FormControl 
            fullWidth 
            margin="normal"
            error={formState.touched.gender && Boolean(formState.errors.gender)}
          >
            <FormLabel component="legend">性別 *</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formState.values.gender}
              onChange={(e) => handleFieldChange('gender', e.target.value)}
              onBlur={() => handleFieldBlur('gender')}
            >
              <FormControlLabel value="male" control={<Radio />} label="男性" />
              <FormControlLabel value="female" control={<Radio />} label="女性" />
              <FormControlLabel value="other" control={<Radio />} label="その他" />
            </RadioGroup>
            {formState.touched.gender && formState.errors.gender && (
              <FormHelperText>{formState.errors.gender}</FormHelperText>
            )}
          </FormControl>

          <FormControl 
            fullWidth 
            margin="normal"
            error={formState.touched.prefecture && Boolean(formState.errors.prefecture)}
          >
            <FormLabel component="legend">都道府県 *</FormLabel>
            <Select
              name="prefecture"
              value={formState.values.prefecture}
              onChange={(e) => handleFieldChange('prefecture', e.target.value)}
              onBlur={() => handleFieldBlur('prefecture')}
              displayEmpty
            >
              <MenuItem value="">
                <em>選択してください</em>
              </MenuItem>
              <MenuItem value="hokkaido">北海道</MenuItem>
              <MenuItem value="aomori">青森県</MenuItem>
              <MenuItem value="iwate">岩手県</MenuItem>
              <MenuItem value="miyagi">宮城県</MenuItem>
              <MenuItem value="akita">秋田県</MenuItem>
              <MenuItem value="yamagata">山形県</MenuItem>
              <MenuItem value="fukushima">福島県</MenuItem>
              <MenuItem value="ibaraki">茨城県</MenuItem>
              <MenuItem value="tochigi">栃木県</MenuItem>
              <MenuItem value="gunma">群馬県</MenuItem>
              <MenuItem value="saitama">埼玉県</MenuItem>
              <MenuItem value="chiba">千葉県</MenuItem>
              <MenuItem value="tokyo">東京都</MenuItem>
              <MenuItem value="kanagawa">神奈川県</MenuItem>
              <MenuItem value="niigata">新潟県</MenuItem>
              <MenuItem value="toyama">富山県</MenuItem>
              <MenuItem value="ishikawa">石川県</MenuItem>
              <MenuItem value="fukui">福井県</MenuItem>
              <MenuItem value="yamanashi">山梨県</MenuItem>
              <MenuItem value="nagano">長野県</MenuItem>
              <MenuItem value="gifu">岐阜県</MenuItem>
              <MenuItem value="shizuoka">静岡県</MenuItem>
              <MenuItem value="aichi">愛知県</MenuItem>
              <MenuItem value="mie">三重県</MenuItem>
              <MenuItem value="shiga">滋賀県</MenuItem>
              <MenuItem value="kyoto">京都府</MenuItem>
              <MenuItem value="osaka">大阪府</MenuItem>
              <MenuItem value="hyogo">兵庫県</MenuItem>
              <MenuItem value="nara">奈良県</MenuItem>
              <MenuItem value="wakayama">和歌山県</MenuItem>
              <MenuItem value="tottori">鳥取県</MenuItem>
              <MenuItem value="shimane">島根県</MenuItem>
              <MenuItem value="okayama">岡山県</MenuItem>
              <MenuItem value="hiroshima">広島県</MenuItem>
              <MenuItem value="yamaguchi">山口県</MenuItem>
              <MenuItem value="tokushima">徳島県</MenuItem>
              <MenuItem value="kagawa">香川県</MenuItem>
              <MenuItem value="ehime">愛媛県</MenuItem>
              <MenuItem value="kochi">高知県</MenuItem>
              <MenuItem value="fukuoka">福岡県</MenuItem>
              <MenuItem value="saga">佐賀県</MenuItem>
              <MenuItem value="nagasaki">長崎県</MenuItem>
              <MenuItem value="kumamoto">熊本県</MenuItem>
              <MenuItem value="oita">大分県</MenuItem>
              <MenuItem value="miyazaki">宮崎県</MenuItem>
              <MenuItem value="kagoshima">鹿児島県</MenuItem>
              <MenuItem value="okinawa">沖縄県</MenuItem>
            </Select>
            {formState.touched.prefecture && formState.errors.prefecture && (
              <FormHelperText>{formState.errors.prefecture}</FormHelperText>
            )}
          </FormControl>

          <FormControl 
            fullWidth 
            margin="normal"
            error={formState.touched.hobbies && Boolean(formState.errors.hobbies)}
          >
            <InputLabel id="hobbies-label">趣味 *</InputLabel>
            <Select
              labelId="hobbies-label"
              multiple
              value={formState.values.hobbies}
              onChange={(e) => handleFieldChange('hobbies', e.target.value as string[])}
              onBlur={() => handleFieldBlur('hobbies')}
              input={<OutlinedInput label="趣味 *" />}
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {hobbyOptions.map((hobby) => (
                <MenuItem key={hobby} value={hobby}>
                  <Checkbox checked={formState.values.hobbies.indexOf(hobby) > -1} />
                  <ListItemText primary={hobby} />
                </MenuItem>
              ))}
            </Select>
            {formState.touched.hobbies && formState.errors.hobbies && (
              <FormHelperText>{formState.errors.hobbies}</FormHelperText>
            )}
          </FormControl>

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