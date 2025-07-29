import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Alert
} from '@mui/material';
import Link from 'next/link';

export default function Confirm() {
  const router = useRouter();
  const { firstName, lastName, email } = router.query;

  // クエリパラメータがない場合はリダイレクト
  React.useEffect(() => {
    if (router.isReady && (!firstName || !lastName || !email)) {
      router.push('/register');
    }
  }, [router.isReady, firstName, lastName, email, router]);

  if (!firstName || !lastName || !email) {
    return null; // リダイレクト中
  }

  const handleComplete = () => {
    // 実際のアプリでは登録完了処理を実行
    alert('登録が完了しました！');
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>登録確認 | ユーザー登録フォームアプリ</title>
        <meta name="description" content="ユーザー登録内容の確認画面" />
      </Head>
      
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Link href="/register" passHref>
            <Button variant="text">← 登録画面に戻る</Button>
          </Link>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              登録内容確認
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              以下の内容で登録を行います。内容をご確認ください。
            </Alert>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="名前" 
                  secondary={`${firstName} ${lastName}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="メールアドレス" 
                  secondary={email}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="パスワード" 
                  secondary="●●●●●●●●"
                />
              </ListItem>
            </List>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => router.back()}
              >
                修正する
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleComplete}
              >
                登録完了
              </Button>
            </Box>
          </CardContent>
        </Card>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            実際のアプリではここでサーバーにデータを送信します
          </Typography>
        </Box>
      </Box>
    </>
  );
}