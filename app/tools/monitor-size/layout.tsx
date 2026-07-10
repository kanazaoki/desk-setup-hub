import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'モニターサイズ比較',
  description: '2つのモニターを実寸スケールで並べて比較。PPI・画面面積・実寸法を即計算できます。',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
