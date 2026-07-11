'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { usageProfiles } from '@/lib/data/budget'
import { Usage } from '@/lib/types'

const AFL_BASE = 'https://hb.afl.rakuten.co.jp/ichiba/558f8241.079fc0d8.558f8242.4e790a97/'
const rakutenUrl = (name: string) =>
  `${AFL_BASE}?pc=${encodeURIComponent('https://search.rakuten.co.jp/search/mall/' + encodeURIComponent(name) + '/')}`
const amazonUrl = (name: string) =>
  `https://www.amazon.co.jp/s?k=${encodeURIComponent(name)}&i=computers`

const usageOptions: { value: Usage; label: string; emoji: string }[] = [
  { value: 'gaming', label: 'ゲーミング', emoji: '🎮' },
  { value: 'programming', label: 'プログラミング', emoji: '💻' },
  { value: 'design', label: 'デザイン', emoji: '🎨' },
  { value: 'remote', label: 'リモートワーク', emoji: '🏠' },
  { value: 'video', label: '動画編集', emoji: '🎬' },
  { value: 'streaming', label: '配信', emoji: '📡' },
  { value: 'music', label: '音楽制作', emoji: '🎵' },
  { value: 'study', label: '勉強・学習', emoji: '📚' },
  { value: 'trading', label: 'トレーダー', emoji: '📈' },
  { value: 'cad', label: '3D・CAD', emoji: '📐' },
  { value: 'writing', label: '執筆・ブログ', emoji: '✍️' },
]

const budgetPresets = [20000, 30000, 50000, 100000, 150000, 300000, 500000]

function BudgetContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [usage, setUsage] = useState<Usage | null>(() => {
    const u = searchParams.get('usage') as Usage | null
    return u && u in usageProfiles ? u : null
  })
  const [budget, setBudget] = useState<number>(() => {
    const b = searchParams.get('budget')
    const n = b ? parseInt(b, 10) : NaN
    return isNaN(n) || n < 0 ? 100000 : n
  })
  const [inputValue, setInputValue] = useState(() => {
    const b = searchParams.get('budget')
    const n = b ? parseInt(b, 10) : NaN
    return isNaN(n) || n < 0 ? '100000' : b!
  })
  const [excludedKeys, setExcludedKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    const sp = new URLSearchParams()
    if (usage) sp.set('usage', usage)
    if (budget !== 100000) sp.set('budget', String(budget))
    const search = sp.toString()
    router.replace(search ? `/tools/budget?${search}` : '/tools/budget', { scroll: false })
  }, [usage, budget, router])

  const profile = usage ? usageProfiles[usage] : null

  const handleUsageChange = (v: Usage) => {
    setUsage(v)
    setExcludedKeys(new Set())
  }

  const toggleExclude = (key: string) => {
    setExcludedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const activeCategories = profile?.categories.filter((c) => !excludedKeys.has(c.key)) ?? []
  const excludedCategories = profile?.categories.filter((c) => excludedKeys.has(c.key)) ?? []
  const totalActiveRatio = activeCategories.reduce((sum, c) => sum + c.ratio, 0)

  const recommendation = profile?.recommendations
    .slice()
    .reverse()
    .find((r) => budget >= r.minBudget)

  const handleInputChange = (v: string) => {
    setInputValue(v)
    const n = parseInt(v.replace(/,/g, ''), 10)
    if (!isNaN(n) && n >= 0) setBudget(n)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          💰 予算シミュレーター
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mt-2">
          用途と予算を入力すると、カテゴリ別の最適な配分と推奨スペックを提案します。
          すでに持っている機材は除外して再配分できます。
        </p>
      </div>

      {/* Usage selector */}
      <div className="mb-8">
        <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
          1. 主な用途を選ぶ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {usageOptions.map(({ value, label, emoji }) => (
            <button
              key={value}
              onClick={() => handleUsageChange(value)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                usage === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-400 bg-white dark:bg-stone-900'
              }`}
            >
              <span className="text-base">{emoji}</span>
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Budget input */}
      <div className="mb-8">
        <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
          2. 総予算を入力する
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-stone-600 dark:text-stone-400">¥</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-40 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="100000"
          />
          <span className="text-stone-500 dark:text-stone-400 text-sm">
            = ¥{budget.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {budgetPresets.map((p) => (
            <button
              key={p}
              onClick={() => { setBudget(p); setInputValue(String(p)) }}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                budget === p
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
              }`}
            >
              ¥{p.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {profile && (
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="font-semibold text-stone-900 dark:text-stone-100">
                3. 配分結果
              </h2>
              {excludedKeys.size > 0 && (
                <span className="text-xs text-stone-400 dark:text-stone-500">
                  除外中 {excludedKeys.size}件 → 残予算を再配分
                </span>
              )}
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
              {profile.description}
              <span className="ml-2 text-xs text-stone-400 dark:text-stone-500">
                （右の × で不要な項目を除外できます）
              </span>
            </p>

            <div className="space-y-3">
              {activeCategories.map((cat) => {
                const normalizedRatio = totalActiveRatio > 0 ? cat.ratio / totalActiveRatio : 0
                const amount = Math.round(budget * normalizedRatio)
                const pct = Math.round(normalizedRatio * 100)
                return (
                  <div key={cat.key}>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-stone-800 dark:text-stone-200 truncate">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="font-medium text-stone-900 dark:text-stone-100">
                          ¥{amount.toLocaleString()}
                          <span className="text-stone-400 dark:text-stone-500 ml-1 font-normal">({pct}%)</span>
                        </span>
                        <button
                          onClick={() => toggleExclude(cat.key)}
                          title="持っている・不要として除外"
                          className="w-6 h-6 rounded-full flex items-center justify-center bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-500 dark:hover:text-red-400 transition-colors text-sm font-bold leading-none"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: cat.color }}
                      />
                    </div>
                    {(() => {
                      const suggestion = cat.suggestions
                        .slice()
                        .reverse()
                        .find((s) => amount >= s.minAmount)
                      return suggestion ? (
                        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                          <span className="text-xs" style={{ color: cat.color }}>→</span>
                          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">{suggestion.name}</span>
                          {suggestion.note && (
                            <span className="text-xs text-stone-400 dark:text-stone-500">— {suggestion.note}</span>
                          )}
                          <a
                            href={rakutenUrl(suggestion.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-0.5 rounded bg-red-500 hover:bg-red-600 text-white transition-colors shrink-0"
                          >
                            楽天
                          </a>
                          <a
                            href={amazonUrl(suggestion.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-0.5 rounded bg-amber-400 hover:bg-amber-500 text-stone-900 transition-colors shrink-0"
                          >
                            Amazon
                          </a>
                        </div>
                      ) : null
                    })()}
                  </div>
                )
              })}
            </div>

            {/* Total */}
            <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-700 flex justify-between">
              <span className="text-stone-600 dark:text-stone-400 text-sm">配分合計</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                ¥{budget.toLocaleString()}
              </span>
            </div>

            {/* Excluded items */}
            {excludedCategories.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
                <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wide mb-2">
                  除外済み（すでに持っている）
                </p>
                <div className="flex flex-wrap gap-2">
                  {excludedCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => toggleExclude(cat.key)}
                      title="配分に戻す"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-dashed border-stone-300 dark:border-stone-600 text-stone-400 dark:text-stone-500 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                      <span className="text-stone-300 dark:text-stone-600">＋</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recommendation */}
          {recommendation && (
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5">
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
                この予算帯での推奨構成
              </p>
              <p className="font-semibold text-stone-900 dark:text-stone-100">{recommendation.label}</p>
              <p className="text-sm text-stone-700 dark:text-stone-300 mt-1">
                {recommendation.description}
              </p>
            </div>
          )}

          {/* All tiers */}
          <div>
            <h3 className="text-sm font-semibold text-stone-500 dark:text-stone-400 mb-3">予算帯別ロードマップ</h3>
            <div className="space-y-2">
              {profile.recommendations.map((r) => (
                <div
                  key={r.minBudget}
                  className={`flex gap-4 px-4 py-3 rounded-lg text-sm ${
                    budget >= r.minBudget
                      ? 'bg-stone-100 dark:bg-stone-800'
                      : 'opacity-40 bg-stone-50 dark:bg-stone-900'
                  }`}
                >
                  <span className="font-medium text-stone-700 dark:text-stone-300 shrink-0 w-24">
                    {r.label}
                  </span>
                  <span className="text-stone-600 dark:text-stone-400">{r.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!usage && (
        <div className="text-center text-stone-400 dark:text-stone-600 py-10">
          用途を選択すると配分が表示されます
        </div>
      )}
    </div>
  )
}

export default function BudgetPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-stone-200 dark:bg-stone-800 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {[...Array(11)].map((_, i) => (
            <div key={i} className="h-10 rounded-xl bg-stone-100 dark:bg-stone-800 animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <BudgetContent />
    </Suspense>
  )
}
