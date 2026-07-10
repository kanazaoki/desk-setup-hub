import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  metadataBase: new URL('https://desk-setup-hub.vercel.app'),
  title: {
    default: 'DeskHub — デスクセットアップ検索・比較サイト',
    template: '%s | DeskHub',
  },
  description: '予算・用途・デスク幅でデスクセットアップを探せる。互換性チェッカーと予算シミュレーターも無料で使えます。',
  keywords: ['デスクセットアップ', 'デスク環境', '在宅ワーク', 'ゲーミングデスク', '昇降デスク', 'デスクツアー', 'テレワーク'],
  openGraph: {
    type: 'website',
    siteName: 'DeskHub',
    title: 'DeskHub — デスクセットアップ検索・比較サイト',
    description: '予算・用途・デスク幅でデスクセットアップを探せる。互換性チェッカーと予算シミュレーターも無料で使えます。',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeskHub — デスクセットアップ検索・比較サイト',
    description: '予算・用途・デスク幅でデスクセットアップを探せる。',
    images: ['/opengraph-image'],
  },
}

const GA_ID = 'G-2C975DMT85'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={geist.variable}>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}} />
      </head>
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
