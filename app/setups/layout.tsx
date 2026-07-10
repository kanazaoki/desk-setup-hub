import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'セットアップ一覧',
  description: '予算・用途・デスク幅・スタイルで絞り込めるデスクセットアップの一覧。ゲーミング・リモートワーク・プログラミングなど用途別に検索できます。',
  openGraph: {
    title: 'セットアップ一覧 | DeskHub',
    description: '予算・用途・デスク幅で理想のデスク環境を探そう。',
  },
}

export default function SetupsLayout({ children }: { children: React.ReactNode }) {
  return children
}
