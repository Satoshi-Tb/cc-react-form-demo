import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>ユーザー登録フォームアプリ</title>
        <meta name="description" content="Reactフォーム機能のテストアプリケーション" />
      </Head>
      
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          ユーザー登録フォームアプリ
        </Typography>
        
        <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Reactのフォーム機能をテストするためのアプリケーションです
        </Typography>
        
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              開始する
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              新規ユーザー登録を行います
            </Typography>
            <Link href="/register" passHref>
              <Button variant="contained" size="large" fullWidth>
                ユーザー登録
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          技術スタック: Next.js + TypeScript + MUI
        </Typography>
      </Box>
    </>
  );
}