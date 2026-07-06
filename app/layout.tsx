import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'DeskHub — デスクセットアップ検索・比較サイト',
  description: '予算・用途・デスク幅でデスクセットアップを探せる。互換性チェッカーと予算シミュレーターも搭載。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={geist.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 dark:border-stone-800 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-stone-500 dark:text-stone-500">
            DeskHub — デスクセットアップ検索・比較サイト
          </div>
        </footer>
      </body>
    </html>
  )
}
