import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '天板×昇降脚 互換性チェッカー',
  description: 'FLEXISPOTやSANODESKなどの昇降脚と、カナデモノ・ニトリ・IKEAなどの天板の互換性を即判定。取り付け可否・注意点・ヒントを無料で確認できます。',
  openGraph: {
    title: '天板×昇降脚 互換性チェッカー | DeskHub',
    description: '昇降デスクの天板と脚の互換性を無料で確認。',
  },
}

export default function CompatibilityLayout({ children }: { children: React.ReactNode }) {
  return children
}
