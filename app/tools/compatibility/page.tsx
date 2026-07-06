'use client'

import { useState } from 'react'
import { deskTops, deskLegs, checkCompatibility, CompatibilityResult } from '@/lib/data/compatibility'

const resultConfig: Record<CompatibilityResult, { label: string; color: string; bg: string; icon: string }> = {
  ok: {
    label: '取り付け可能',
    color: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    icon: '✅',
  },
  warning: {
    label: '条件付きで可能',
    color: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    icon: '⚠️',
  },
  ng: {
    label: '取り付け不可',
    color: 'text-red-700 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    icon: '❌',
  },
}

const topBrands = [...new Set(deskTops.map((d) => d.brand))]
const legBrands = [...new Set(deskLegs.map((l) => l.brand))]

export default function CompatibilityPage() {
  const [topBrand, setTopBrand] = useState('')
  const [topId, setTopId] = useState('')
  const [legBrand, setLegBrand] = useState('')
  const [legId, setLegId] = useState('')

  const filteredTops = deskTops.filter((d) => !topBrand || d.brand === topBrand)
  const filteredLegs = deskLegs.filter((l) => !legBrand || l.brand === legBrand)

  const result = topId && legId ? checkCompatibility(topId, legId) : null
  const cfg = result ? resultConfig[result.result] : null

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          🔩 天板 × 昇降脚 互換性チェッカー
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mt-2">
          天板と昇降脚を選ぶだけで、取り付け可否・注意事項を即座に確認できます。
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* 天板 */}
        <div className="space-y-3">
          <h2 className="font-semibold text-stone-900 dark:text-stone-100">天板</h2>
          <div>
            <label className="text-xs text-stone-500 dark:text-stone-400 mb-1 block">メーカー</label>
            <select
              value={topBrand}
              onChange={(e) => { setTopBrand(e.target.value); setTopId('') }}
              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">すべてのメーカー</option>
              {topBrands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-stone-500 dark:text-stone-400 mb-1 block">モデル・サイズ</label>
            <select
              value={topId}
              onChange={(e) => setTopId(e.target.value)}
              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">選択してください</option>
              {filteredTops.map((d) => (
                <option key={d.id} value={d.id}>{d.brand} {d.model}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 昇降脚 */}
        <div className="space-y-3">
          <h2 className="font-semibold text-stone-900 dark:text-stone-100">昇降脚</h2>
          <div>
            <label className="text-xs text-stone-500 dark:text-stone-400 mb-1 block">メーカー</label>
            <select
              value={legBrand}
              onChange={(e) => { setLegBrand(e.target.value); setLegId('') }}
              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">すべてのメーカー</option>
              {legBrands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-stone-500 dark:text-stone-400 mb-1 block">モデル</label>
            <select
              value={legId}
              onChange={(e) => setLegId(e.target.value)}
              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">選択してください</option>
              {filteredLegs.map((l) => (
                <option key={l.id} value={l.id}>{l.brand} {l.model}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Selected specs */}
      {(topId || legId) && (
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {topId && (() => {
            const top = deskTops.find((d) => d.id === topId)!
            return (
              <div className="rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 text-sm space-y-1">
                <p className="font-medium text-stone-800 dark:text-stone-200">{top.brand} {top.model}</p>
                <p className="text-stone-500 dark:text-stone-400">幅 {top.widths[0]}cm / 奥行き {top.depth}cm</p>
                {top.notes && <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">⚠ {top.notes}</p>}
              </div>
            )
          })()}
          {legId && (() => {
            const leg = deskLegs.find((l) => l.id === legId)!
            return (
              <div className="rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 text-sm space-y-1">
                <p className="font-medium text-stone-800 dark:text-stone-200">{leg.brand} {leg.model}</p>
                <p className="text-stone-500 dark:text-stone-400">対応幅 {leg.minWidth}〜{leg.maxWidth}cm / 積載 {leg.maxLoad}kg</p>
              </div>
            )
          })()}
        </div>
      )}

      {/* Result */}
      {result && cfg && (
        <div className={`mt-6 rounded-xl border p-6 ${cfg.bg}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{cfg.icon}</span>
            <span className={`text-xl font-bold ${cfg.color}`}>{cfg.label}</span>
          </div>
          <ul className="space-y-2">
            {result.reasons.map((r, i) => (
              <li key={i} className={`text-sm ${cfg.color}`}>• {r}</li>
            ))}
          </ul>
          {result.tips.length > 0 && (
            <div className="mt-4 pt-4 border-t border-current/10">
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2">アドバイス</p>
              <ul className="space-y-1.5">
                {result.tips.map((t, i) => (
                  <li key={i} className="text-sm text-stone-700 dark:text-stone-300">💡 {t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!topId && !legId && (
        <div className="mt-8 text-center text-stone-400 dark:text-stone-600 py-8">
          天板と昇降脚を選択すると、互換性の判定結果が表示されます
        </div>
      )}
    </div>
  )
}
