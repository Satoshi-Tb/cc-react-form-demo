import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { RegisterForm } from '../components/forms/RegisterForm';
import { User } from '../types/user';

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (userData: User) => {
    try {
      // 通常ここでAPIにデータを送信
      console.log('User registration data:', userData);
      
      // 確認画面に遷移（データをクエリパラメータで渡す）
      const queryParams = new URLSearchParams({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
      
      router.push(`/confirm?${queryParams.toString()}`);
    } catch (error) {
      console.error('Registration failed:', error);
      // エラーハンドリング
    }
  };

  return (
    <>
      <Head>
        <title>ユーザー登録 | ユーザー登録フォームアプリ</title>
        <meta name="description" content="新規ユーザー登録フォーム" />
      </Head>
      
      <Box>
        <Box sx={{ mb: 2 }}>
          <Link href="/" passHref>
            <Button variant="text">← ホームに戻る</Button>
          </Link>
        </Box>
        
        <RegisterForm onSubmit={handleSubmit} />
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            プレーンなReactでフォームバリデーションを実装
          </Typography>
        </Box>
      </Box>
    </>
  );
}