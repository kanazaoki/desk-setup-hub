'use client'

import { useState } from 'react'
import Link from 'next/link'

type Ratio = '16:9' | '21:9' | '32:9' | '16:10'

const RATIOS: Record<Ratio, { w: number; h: number }> = {
  '16:9':  { w: 16, h: 9 },
  '21:9':  { w: 21, h: 9 },
  '32:9':  { w: 32, h: 9 },
  '16:10': { w: 16, h: 10 },
}

const RESOLUTIONS = [
  { label: 'FHD (1920×1080)',   w: 1920, h: 1080 },
  { label: 'QHD (2560×1440)',   w: 2560, h: 1440 },
  { label: '4K (3840×2160)',    w: 3840, h: 2160 },
  { label: 'UW-FHD (2560×1080)', w: 2560, h: 1080 },
  { label: 'UW-QHD (3440×1440)', w: 3440, h: 1440 },
  { label: 'UWQHD+ (3840×1600)', w: 3840, h: 1600 },
  { label: 'Super UW (5120×1440)', w: 5120, h: 1440 },
]

type Preset = { label: string; size: number; ratio: Ratio; resIdx: number }

const PRESETS: Preset[] = [
  { label: '24" FHD',        size: 24, ratio: '16:9',  resIdx: 0 },
  { label: '27" FHD',        size: 27, ratio: '16:9',  resIdx: 0 },
  { label: '27" QHD',        size: 27, ratio: '16:9',  resIdx: 1 },
  { label: '32" QHD',        size: 32, ratio: '16:9',  resIdx: 1 },
  { label: '27" 4K',         size: 27, ratio: '16:9',  resIdx: 2 },
  { label: '32" 4K',         size: 32, ratio: '16:9',  resIdx: 2 },
  { label: '34" UW QHD',     size: 34, ratio: '21:9',  resIdx: 4 },
  { label: '38" UW WQHD+',  size: 38, ratio: '21:9',  resIdx: 5 },
  { label: '49" Super UW',   size: 49, ratio: '32:9',  resIdx: 6 },
]

type MonitorConfig = { size: number; ratio: Ratio; resIdx: number }

function getDimensions(cfg: MonitorConfig) {
  const r = RATIOS[cfg.ratio]
  const diag = Math.sqrt(r.w ** 2 + r.h ** 2)
  const wInch = cfg.size * r.w / diag
  const hInch = cfg.size * r.h / diag
  return {
    wCm: wInch * 2.54,
    hCm: hInch * 2.54,
    areaCm2: wInch * hInch * 2.54 * 2.54,
  }
}

function getPPI(cfg: MonitorConfig) {
  const res = RESOLUTIONS[cfg.resIdx]
  return Math.round(Math.sqrt(res.w ** 2 + res.h ** 2) / cfg.size)
}

function getTotalPixels(cfg: MonitorConfig) {
  const res = RESOLUTIONS[cfg.resIdx]
  return (res.w * res.h / 1_000_000).toFixed(1)
}

function MonitorSelector({
  value,
  onChange,
  label,
  color,
}: {
  value: MonitorConfig
  onChange: (v: MonitorConfig) => void
  label: string
  color: string
}) {
  return (
    <div className={`flex-1 rounded-xl border-2 ${color} bg-white dark:bg-stone-900 p-5 space-y-4`}>
      <p className="font-bold text-stone-900 dark:text-stone-100">{label}</p>

      <div>
        <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5">プリセット</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => onChange({ size: p.size, ratio: p.ratio, resIdx: p.resIdx })}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                value.size === p.size && value.ratio === p.ratio && value.resIdx === p.resIdx
                  ? 'bg-amber-500 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">サイズ（インチ）</label>
          <input
            type="number"
            min={10}
            max={80}
            value={value.size}
            onChange={(e) => onChange({ ...value, size: Number(e.target.value) })}
            className="w-full px-2 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">アスペクト比</label>
          <select
            value={value.ratio}
            onChange={(e) => onChange({ ...value, ratio: e.target.value as Ratio })}
            className="w-full px-2 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-amber-400"
          >
            {(Object.keys(RATIOS) as Ratio[]).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">解像度</label>
          <select
            value={value.resIdx}
            onChange={(e) => onChange({ ...value, resIdx: Number(e.target.value) })}
            className="w-full px-2 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-amber-400"
          >
            {RESOLUTIONS.map((r, i) => (
              <option key={i} value={i}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

const CANVAS_W = 560
const CANVAS_H = 220

export default function MonitorSizePage() {
  const [m1, setM1] = useState<MonitorConfig>({ size: 27, ratio: '16:9', resIdx: 1 })
  const [m2, setM2] = useState<MonitorConfig>({ size: 32, ratio: '16:9', resIdx: 1 })

  const d1 = getDimensions(m1)
  const d2 = getDimensions(m2)
  const ppi1 = getPPI(m1)
  const ppi2 = getPPI(m2)

  const maxW = Math.max(d1.wCm, d2.wCm)
  const maxH = Math.max(d1.hCm, d2.hCm)
  const scaleX = (CANVAS_W * 0.42) / maxW
  const scaleY = (CANVAS_H * 0.85) / maxH
  const scale = Math.min(scaleX, scaleY)

  const w1 = d1.wCm * scale
  const h1 = d1.hCm * scale
  const w2 = d2.wCm * scale
  const h2 = d2.hCm * scale

  const gap = 20
  const totalW = w1 + gap + w2
  const offsetX = (CANVAS_W - totalW) / 2
  const x1 = offsetX
  const x2 = offsetX + w1 + gap
  const y1 = CANVAS_H - h1
  const y2 = CANVAS_H - h2

  const rows = [
    { label: '画面サイズ', v1: `${m1.size}"`, v2: `${m2.size}"` },
    { label: 'アスペクト比', v1: m1.ratio, v2: m2.ratio },
    { label: '解像度', v1: RESOLUTIONS[m1.resIdx].label.split(' ')[0], v2: RESOLUTIONS[m2.resIdx].label.split(' ')[0] },
    { label: '画素密度 (PPI)', v1: `${ppi1} ppi`, v2: `${ppi2} ppi`, highlight: true },
    { label: '横幅', v1: `${d1.wCm.toFixed(1)} cm`, v2: `${d2.wCm.toFixed(1)} cm` },
    { label: '縦幅', v1: `${d1.hCm.toFixed(1)} cm`, v2: `${d2.hCm.toFixed(1)} cm` },
    { label: '画面面積', v1: `${(d1.areaCm2 / 100).toFixed(0)} cm²`, v2: `${(d2.areaCm2 / 100).toFixed(0)} cm²` },
    { label: '総画素数', v1: `${getTotalPixels(m1)} M`, v2: `${getTotalPixels(m2)} M` },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          🖥️ モニターサイズ比較
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mt-2">
          2つのモニターを実寸スケールで並べて比較。PPI・実寸法・画面面積を即計算します。
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <MonitorSelector
          label="モニター A"
          value={m1}
          onChange={setM1}
          color="border-amber-400 dark:border-amber-500"
        />
        <MonitorSelector
          label="モニター B"
          value={m2}
          onChange={setM2}
          color="border-sky-400 dark:border-sky-500"
        />
      </div>

      {/* Visual */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-4 mb-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          width="100%"
          style={{ maxWidth: CANVAS_W, display: 'block', margin: '0 auto' }}
        >
          <rect x={x1} y={y1} width={w1} height={h1} rx="3"
            fill="#fbbf24" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
          <text x={x1 + w1 / 2} y={y1 + h1 / 2 - 8} textAnchor="middle"
            className="font-bold" fill="#92400e" fontSize="13" fontWeight="bold">
            {m1.size}"
          </text>
          <text x={x1 + w1 / 2} y={y1 + h1 / 2 + 10} textAnchor="middle"
            fill="#92400e" fontSize="10">
            {d1.wCm.toFixed(1)} × {d1.hCm.toFixed(1)} cm
          </text>

          <rect x={x2} y={y2} width={w2} height={h2} rx="3"
            fill="#38bdf8" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="2" />
          <text x={x2 + w2 / 2} y={y2 + h2 / 2 - 8} textAnchor="middle"
            fill="#0c4a6e" fontSize="13" fontWeight="bold">
            {m2.size}"
          </text>
          <text x={x2 + w2 / 2} y={y2 + h2 / 2 + 10} textAnchor="middle"
            fill="#0c4a6e" fontSize="10">
            {d2.wCm.toFixed(1)} × {d2.hCm.toFixed(1)} cm
          </text>
        </svg>
        <p className="text-center text-xs text-stone-400 mt-2">実寸の比率でスケール表示しています</p>
      </div>

      {/* Spec table */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
              <th className="text-left px-4 py-3 text-stone-500 dark:text-stone-400 font-medium w-1/3">項目</th>
              <th className="text-center px-4 py-3 font-semibold text-amber-700 dark:text-amber-400">モニター A ({m1.size}")</th>
              <th className="text-center px-4 py-3 font-semibold text-sky-700 dark:text-sky-400">モニター B ({m2.size}")</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={`border-b border-stone-100 dark:border-stone-800 ${i % 2 === 0 ? '' : 'bg-stone-50/50 dark:bg-stone-900/50'}`}>
                <td className="px-4 py-3 text-stone-600 dark:text-stone-400">{row.label}</td>
                <td className={`px-4 py-3 text-center font-medium ${row.highlight ? 'text-amber-600 dark:text-amber-400' : 'text-stone-900 dark:text-stone-100'}`}>
                  {row.v1}
                </td>
                <td className={`px-4 py-3 text-center font-medium ${row.highlight ? 'text-sky-600 dark:text-sky-400' : 'text-stone-900 dark:text-stone-100'}`}>
                  {row.v2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tip */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 mb-8">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">💡 PPI の目安</p>
        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-0.5">
          <li>• 100 PPI 以上 — テキストが鮮明でプログラミング・デザインに最適</li>
          <li>• 80〜100 PPI — 一般的なゲーミング・動画編集用途で十分</li>
          <li>• 80 PPI 未満 — 大画面優先。近距離で長時間見ると文字がにじみやすい</li>
        </ul>
      </div>

      <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5">
        <p className="font-medium text-stone-900 dark:text-stone-100 mb-3">
          実際のモニター構成を参考に探す
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/setups?monitorCount=1" className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors">
            シングルモニターを見る →
          </Link>
          <Link href="/setups?monitorCount=2" className="px-3 py-1.5 rounded-lg border border-amber-400 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-sm font-medium transition-colors">
            デュアルモニターを見る →
          </Link>
        </div>
      </div>
    </div>
  )
}
