import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '人間工学チェッカー',
  description: '身長を入力するだけで、デスク・椅子・モニターの最適な高さと距離を計算。JIS基準に基づいた快適なデスク環境づくりをサポートします。',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
