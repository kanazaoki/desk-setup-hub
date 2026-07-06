'use client'

import { FilterState, Usage, Style, ChairType, RoomType } from '@/lib/types'

interface Props {
  filters: FilterState
  onChange: (filters: FilterState) => void
  totalCount: number
}

const usageOptions: { value: Usage; label: string }[] = [
  { value: 'gaming', label: 'ゲーミング' },
  { value: 'programming', label: 'プログラミング' },
  { value: 'design', label: 'デザイン' },
  { value: 'remote', label: 'リモートワーク' },
  { value: 'video', label: '動画編集' },
  { value: 'streaming', label: '配信' },
]

const styleOptions: { value: Style; label: string }[] = [
  { value: 'minimal', label: 'ミニマル' },
  { value: 'rgb', label: 'RGB' },
  { value: 'cafe', label: 'カフェ風' },
  { value: 'monochrome', label: 'モノトーン' },
  { value: 'wood', label: 'ウッド' },
]

const budgetOptions = [
  { value: 50000, label: '5万円以下' },
  { value: 100000, label: '10万円以下' },
  { value: 200000, label: '20万円以下' },
  { value: 999999999, label: '制限なし' },
]

const monitorOptions = [
  { value: 1, label: '1枚' },
  { value: 2, label: '2枚' },
  { value: 3, label: '3枚以上' },
]

const deskWidthOptions = [
  { value: 100, label: '100cm以上' },
  { value: 120, label: '120cm以上' },
  { value: 150, label: '150cm以上' },
]

export default function FilterBar({ filters, onChange, totalCount }: Props) {
  const set = (partial: Partial<FilterState>) =>
    onChange({ ...filters, ...partial })

  const toggle = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    set({ [key]: filters[key] === value ? null : value } as Partial<FilterState>)
  }

  const reset = () =>
    onChange({
      budgetMax: null,
      deskWidthMin: null,
      usage: null,
      monitorCount: null,
      hasStandingDesk: null,
      style: null,
      chairType: null,
      roomType: null,
    })

  const hasFilters = Object.values(filters).some((v) => v !== null)

  return (
    <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
          {totalCount}件
        </span>
        {hasFilters && (
          <button
            onClick={reset}
            className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
          >
            リセット
          </button>
        )}
      </div>

      {/* 用途 */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          用途
        </p>
        <div className="flex flex-wrap gap-1.5">
          {usageOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggle('usage', value)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                filters.usage === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 予算 */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          予算
        </p>
        <div className="flex flex-wrap gap-1.5">
          {budgetOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggle('budgetMax', value)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                filters.budgetMax === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* デスク幅 */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          デスク幅
        </p>
        <div className="flex flex-wrap gap-1.5">
          {deskWidthOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggle('deskWidthMin', value)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                filters.deskWidthMin === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* モニター枚数 */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          モニター枚数
        </p>
        <div className="flex flex-wrap gap-1.5">
          {monitorOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggle('monitorCount', value)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                filters.monitorCount === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* スタイル */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          スタイル
        </p>
        <div className="flex flex-wrap gap-1.5">
          {styleOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggle('style', value)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                filters.style === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 昇降デスク */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          その他
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => toggle('hasStandingDesk', true)}
            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
              filters.hasStandingDesk === true
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
            }`}
          >
            昇降デスクのみ
          </button>
          <button
            onClick={() => set({ roomType: filters.roomType === 'studio' ? null : 'studio' as RoomType })}
            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
              filters.roomType === 'studio'
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
            }`}
          >
            ワンルーム可
          </button>
        </div>
      </div>
    </div>
  )
}
