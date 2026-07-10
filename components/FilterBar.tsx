'use client'

import { FilterState, Usage, Style, ChairType, OsType, PcType } from '@/lib/types'

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
  { value: 'music', label: '音楽制作' },
  { value: 'study', label: '勉強・学習' },
  { value: 'trading', label: 'トレーダー' },
  { value: 'cad', label: '3D・CAD' },
  { value: 'writing', label: '執筆・ブログ' },
]

const styleOptions: { value: Style; label: string }[] = [
  { value: 'minimal', label: 'ミニマル' },
  { value: 'white', label: '白統一' },
  { value: 'dark', label: 'ダーク' },
  { value: 'rgb', label: 'RGB' },
  { value: 'wood', label: 'ウッド' },
  { value: 'cafe', label: 'カフェ風' },
  { value: 'nordic', label: '北欧' },
  { value: 'industrial', label: 'インダストリアル' },
  { value: 'monochrome', label: 'モノトーン' },
  { value: 'vintage', label: 'ヴィンテージ' },
]

const chairOptions: { value: ChairType; label: string }[] = [
  { value: 'gaming', label: 'ゲーミング' },
  { value: 'office', label: 'オフィス' },
  { value: 'other', label: 'その他' },
]

const osOptions: { value: OsType; label: string }[] = [
  { value: 'mac', label: 'Mac' },
  { value: 'windows', label: 'Windows' },
  { value: 'linux', label: 'Linux' },
  { value: 'other', label: 'その他' },
]

const pcTypeOptions: { value: PcType; label: string }[] = [
  { value: 'desktop', label: 'デスクトップ' },
  { value: 'laptop', label: 'ノートPC' },
  { value: 'both', label: '両方' },
]

const budgetRanges = [
  { min: 0,      max: 50000,  label: '〜5万' },
  { min: 50000,  max: 100000, label: '5〜10万' },
  { min: 100000, max: 150000, label: '10〜15万' },
  { min: 150000, max: 200000, label: '15〜20万' },
  { min: 200000, max: 250000, label: '20〜25万' },
  { min: 250000, max: 300000, label: '25〜30万' },
  { min: 300000, max: 400000, label: '30〜40万' },
  { min: 400000, max: 500000, label: '40〜50万' },
  { min: 500000, max: null,   label: '50万〜' },
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

  const toggleBudgetRange = (min: number, max: number | null) => {
    const active = filters.budgetMin === min && filters.budgetMax === max
    if (active) {
      set({ budgetMin: null, budgetMax: null })
    } else {
      set({ budgetMin: min, budgetMax: max })
    }
  }

  const reset = () =>
    onChange({
      budgetMin: null,
      budgetMax: null,
      deskWidthMin: null,
      usage: null,
      monitorCount: null,
      hasStandingDesk: null,
      hasUltrawide: null,
      hasVerticalMonitor: null,
      style: null,
      chairType: null,
      os: null,
      pcType: null,
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
          {budgetRanges.map(({ min, max, label }) => {
            const active = filters.budgetMin === min && filters.budgetMax === max
            return (
              <button
                key={label}
                onClick={() => toggleBudgetRange(min, max)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  active
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
                }`}
              >
                {label}
              </button>
            )
          })}
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

      {/* チェア */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          チェア
        </p>
        <div className="flex flex-wrap gap-1.5">
          {chairOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggle('chairType', value)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                filters.chairType === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* OS */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          OS
        </p>
        <div className="flex flex-wrap gap-1.5">
          {osOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggle('os', value)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                filters.os === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* PC種別 */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          PC種別
        </p>
        <div className="flex flex-wrap gap-1.5">
          {pcTypeOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggle('pcType', value)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                filters.pcType === value
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

      {/* その他 */}
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
            昇降デスク
          </button>
          <button
            onClick={() => toggle('hasUltrawide', true)}
            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
              filters.hasUltrawide === true
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
            }`}
          >
            ウルトラワイド
          </button>
          <button
            onClick={() => toggle('hasVerticalMonitor', true)}
            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
              filters.hasVerticalMonitor === true
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
            }`}
          >
            縦置きモニター
          </button>
        </div>
      </div>
    </div>
  )
}
