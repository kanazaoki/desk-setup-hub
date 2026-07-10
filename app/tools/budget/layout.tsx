import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'デスク環境 予算シミュレーター',
  description: '用途と総予算を入力するだけで、デスク・チェア・モニターなどカテゴリ別の最適な予算配分を提案。ゲーミング・在宅ワーク・配信など用途別に対応。',
  openGraph: {
    title: 'デスク環境 予算シミュレーター | DeskHub',
    description: '用途と予算を入力してカテゴリ別の最適配分を確認。',
  },
}

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
  return children
}
