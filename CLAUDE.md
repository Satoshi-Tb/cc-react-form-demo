# ユーザー登録フォームアプリ

## プロジェクト概要
Reactのフォーム機能をテストするためのユーザー登録フォームアプリケーション。
プレーンなReactの実装でフォームバリデーションや状態管理を学習する。

## 技術スタック
- **言語**: TypeScript
- **フレームワーク**: Next.js (Pages Router), React
- **UIライブラリ**: MUI (Material-UI)
- **サーバーデータ取得**: SWR + fetch API（必要に応じて）
- **状態管理**: Jotai（必要に応じて）

## 制約事項
- react-hook-form、zod等のフォームライブラリは使用しない
- プレーンなReactでフォーム機能を実装する

## 機能要件
- [ ] 基本情報入力フォーム（名前、メール、パスワード）
- [ ] フォームバリデーション機能
- [ ] 確認画面
- [ ] エラーハンドリング
- [ ] レスポンシブデザイン

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run type-check

# リント
npm run lint
```

## ディレクトリ構成
```
src/
├── pages/
│   ├── index.tsx          # ホーム画面
│   ├── register.tsx       # 登録フォーム画面
│   └── confirm.tsx        # 確認画面
├── components/
│   ├── forms/
│   │   ├── RegisterForm.tsx
│   │   └── FormField.tsx
│   └── layout/
│       └── Layout.tsx
├── types/
│   └── user.ts           # ユーザー型定義
├── utils/
│   └── validation.ts     # バリデーション関数
└── styles/
    └── globals.css
```