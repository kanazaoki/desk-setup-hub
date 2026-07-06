import Link from 'next/link'
import SetupCard from '@/components/SetupCard'
import { setups } from '@/lib/data/setups'

const tools = [
  {
    href: '/tools/compatibility',
    icon: '🔩',
    title: '天板 × 昇降脚 互換性チェッカー',
    description: '天板メーカーと昇降脚を選ぶだけで、取り付け可能かどうかを即判定',
  },
  {
    href: '/tools/budget',
    icon: '💰',
    title: '予算シミュレーター',
    description: '用途と総予算を入力すると、カテゴリ別の最適な配分を提案',
  },
]

export default function Home() {
  const featured = setups.slice(0, 6)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          理想のデスクを<br className="sm:hidden" />見つけよう
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
          予算・用途・デスクサイズで絞り込める、デスクセットアップの検索・比較サイト。
          互換性チェッカーと予算シミュレーターも無料で使えます。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/setups"
            className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors"
          >
            セットアップを探す →
          </Link>
          <Link
            href="/tools/budget"
            className="px-6 py-3 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-amber-400 text-stone-700 dark:text-stone-300 font-medium transition-colors"
          >
            予算を計算する
          </Link>
        </div>
      </section>

      {/* Tools */}
      <section>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          ツール
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tools.map(({ href, icon, title, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex gap-4 p-5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 bg-white dark:bg-stone-900 transition-colors"
            >
              <span className="text-3xl shrink-0">{icon}</span>
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured setups */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            セットアップ一覧
          </h2>
          <Link
            href="/setups"
            className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
          >
            すべて見る →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((setup) => (
            <SetupCard key={setup.id} setup={setup} />
          ))}
        </div>
      </section>
    </div>
  )
}
