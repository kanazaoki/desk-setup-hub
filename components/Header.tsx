'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/setups', label: 'セットアップ一覧' },
  { href: '/tools/compatibility', label: '互換性チェック' },
  { href: '/tools/budget', label: '予算シミュレーター' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#111110]/90 backdrop-blur border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="font-bold text-lg tracking-tight text-stone-900 dark:text-stone-100 shrink-0">
          DeskHub
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                pathname.startsWith(href)
                  ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-medium'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/submit"
            className="ml-2 px-3 py-1.5 rounded-md text-sm whitespace-nowrap bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
          >
            ＋ 投稿
          </Link>
        </nav>
      </div>
    </header>
  )
}
