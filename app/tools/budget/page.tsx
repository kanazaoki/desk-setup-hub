'use client'

import { useState } from 'react'
import { usageProfiles } from '@/lib/data/budget'
import { Usage } from '@/lib/types'

const usageOptions: { value: Usage; label: string; emoji: string }[] = [
  { value: 'gaming', label: 'ゲーミング', emoji: '🎮' },
  { value: 'programming', label: 'プログラミング', emoji: '💻' },
  { value: 'design', label: 'デザイン', emoji: '🎨' },
  { value: 'remote', label: 'リモートワーク', emoji: '🏠' },
  { value: 'video', label: '動画編集', emoji: '🎬' },
  { value: 'streaming', label: '配信', emoji: '📡' },
]

const budgetPresets = [30000, 50000, 100000, 150000, 300000, 500000]

export default function BudgetPage() {
  const [usage, setUsage] = useState<Usage | null>(null)
  const [budget, setBudget] = useState<number>(100000)
  const [inputValue, setInputValue] = useState('100000')

  const profile = usage ? usageProfiles[usage] : null

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
        </p>
      </div>

      {/* Usage selector */}
      <div className="mb-8">
        <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
          1. 主な用途を選ぶ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {usageOptions.map(({ value, label, emoji }) => (
            <button
              key={value}
              onClick={() => setUsage(value)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                usage === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-400 bg-white dark:bg-stone-900'
              }`}
            >
              <span className="text-lg">{emoji}</span>
              {label}
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
            <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              3. 配分結果
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
              {profile.description}
            </p>

            <div className="space-y-3">
              {profile.categories.map((cat) => {
                const amount = Math.round(budget * cat.ratio)
                const pct = Math.round(cat.ratio * 100)
                return (
                  <div key={cat.key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-stone-800 dark:text-stone-200">{cat.name}</span>
                      <span className="font-medium text-stone-900 dark:text-stone-100">
                        ¥{amount.toLocaleString()}
                        <span className="text-stone-400 dark:text-stone-500 ml-1 font-normal">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Total */}
            <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-700 flex justify-between">
              <span className="text-stone-600 dark:text-stone-400 text-sm">合計</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                ¥{budget.toLocaleString()}
              </span>
            </div>
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
