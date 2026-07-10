import Link from 'next/link'
import SetupCard from '@/components/SetupCard'
import { setups } from '@/lib/data/setups'
import { articles } from '@/lib/data/articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DeskHub — デスクセットアップ検索・比較サイト',
  description: '予算・用途・デスク幅でデスクセットアップを探せる。互換性チェッカーと予算シミュレーターも無料で使えます。あなたの環境を投稿してコミュニティと共有しよう。',
}

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
    description: '用途と総予算を入力すると、カテゴリ別の最適な配分と商品候補を提案',
  },
  {
    href: '/tools/ergonomics',
    icon: '📐',
    title: '人間工学チェッカー',
    description: '身長を入力するだけでデスク・椅子・モニターの最適な高さと距離を計算',
  },
  {
    href: '/tools/monitor-size',
    icon: '🖥️',
    title: 'モニターサイズ比較',
    description: '2つのモニターを実寸スケールで比較。PPI・画面面積・実寸法を即計算',
  },
]

const features = [
  { icon: '🔍', title: '絞り込み検索', desc: '用途・予算・チェア・ウルトラワイドなど多彩なフィルターで理想の環境を発見' },
  { icon: '⚖️', title: 'セットアップ比較', desc: '気になる2件を選んで15項目を並べて比較。差異をひと目で確認できる' },
  { icon: '♥', title: 'お気に入り保存', desc: '気に入ったセットアップをハートボタンでブックマーク。後でゆっくり見返せる' },
  { icon: '🛒', title: '楽天・Amazon連携', desc: '各アイテムの楽天・Amazonリンクで、気になった商品をすぐ購入できる' },
]

const usageLinks = [
  { value: 'gaming', label: 'ゲーミング', emoji: '🎮' },
  { value: 'programming', label: 'プログラミング', emoji: '💻' },
  { value: 'design', label: 'デザイン', emoji: '🎨' },
  { value: 'remote', label: 'リモートワーク', emoji: '🏠' },
  { value: 'video', label: '動画編集', emoji: '🎬' },
  { value: 'streaming', label: '配信', emoji: '📡' },
  { value: 'music', label: '音楽制作', emoji: '🎵' },
  { value: 'study', label: '勉強・学習', emoji: '📚' },
  { value: 'trading', label: 'トレーダー', emoji: '📈' },
  { value: 'cad', label: '3D・CAD', emoji: '🖇️' },
  { value: 'writing', label: '執筆・ブログ', emoji: '✍️' },
]

const stats = [
  { value: `${setups.length}+`, label: 'セットアップ掲載' },
  { value: `${tools.length}`, label: '無料ツール' },
  { value: '15', label: '比較項目数' },
  { value: '無料', label: '完全無料' },
]

export default function Home() {
  const recent = [...setups].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-20">
      {/* Hero */}
      <section className="text-center space-y-6 py-8">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium">
          デスクセットアップ検索・共有サイト
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
          理想のデスク環境を<br />見つけよう
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
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
            href="/submit"
            className="px-6 py-3 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 text-stone-700 dark:text-stone-300 font-medium transition-colors"
          >
            自分のデスクを投稿する
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 pt-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{value}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage quick links */}
      <section>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          用途から探す
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {usageLinks.map(({ value, label, emoji }) => (
            <Link
              key={label}
              href={`/setups?usage=${value}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 bg-white dark:bg-stone-900 transition-colors text-center group"
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs font-medium text-stone-700 dark:text-stone-300 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-5">
          できること
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
              <span className="text-2xl">{icon}</span>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mt-3 mb-1">{title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent setups */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            最近追加されたセットアップ
          </h2>
          <Link href="/setups" className="text-sm text-amber-600 dark:text-amber-400 hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((setup) => (
            <SetupCard key={setup.id} setup={setup} />
          ))}
        </div>
      </section>

      {/* Articles */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">ガイド・記事</h2>
          <Link href="/articles" className="text-sm text-amber-600 dark:text-amber-400 hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="group block p-5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 bg-white dark:bg-stone-900 transition-colors">
              <div className="flex flex-wrap gap-1 mb-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-[14px] text-stone-900 dark:text-stone-100 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-5">
          無料ツール
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
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Submit CTA */}
      <section className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
          あなたのデスク環境を投稿しませんか？
        </h2>
        <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          使用アイテムと予算を入力するだけ。審査通過後にサイトに掲載され、
          同じ用途のユーザーの参考になります。
        </p>
        <Link
          href="/submit"
          className="inline-block px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors"
        >
          投稿する（無料）
        </Link>
      </section>
    </div>
  )
}
