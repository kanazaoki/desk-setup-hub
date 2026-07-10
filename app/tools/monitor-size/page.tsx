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
  { label: 'FHD (1920×1080)',     w: 1920, h: 1080 },
  { label: 'QHD (2560×1440)',     w: 2560, h: 1440 },
  { label: '4K (3840×2160)',      w: 3840, h: 2160 },
  { label: 'UW-FHD (2560×1080)', w: 2560, h: 1080 },
  { label: 'UW-QHD (3440×1440)', w: 3440, h: 1440 },
  { label: 'UWQHD+ (3840×1600)', w: 3840, h: 1600 },
  { label: 'Super UW (5120×1440)', w: 5120, h: 1440 },
]

type Preset = { label: string; size: number; ratio: Ratio; resIdx: number }

const PRESETS: Preset[] = [
  { label: '24" FHD',       size: 24, ratio: '16:9',  resIdx: 0 },
  { label: '27" FHD',       size: 27, ratio: '16:9',  resIdx: 0 },
  { label: '27" QHD',       size: 27, ratio: '16:9',  resIdx: 1 },
  { label: '32" QHD',       size: 32, ratio: '16:9',  resIdx: 1 },
  { label: '27" 4K',        size: 27, ratio: '16:9',  resIdx: 2 },
  { label: '32" 4K',        size: 32, ratio: '16:9',  resIdx: 2 },
  { label: '34" UW QHD',    size: 34, ratio: '21:9',  resIdx: 4 },
  { label: '38" UW WQHD+', size: 38, ratio: '21:9',  resIdx: 5 },
  { label: '49" Super UW',  size: 49, ratio: '32:9',  resIdx: 6 },
]

type MonitorConfig = { size: number; ratio: Ratio; resIdx: number }

type Dims = { wCm: number; hCm: number; areaCm2: number }

function getDimensions(cfg: MonitorConfig): Dims {
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

// 視聴距離に対するモニターの快適度を返す
function getViewingAssessment(distanceCm: number, wCm: number) {
  const angleDeg = 2 * Math.atan(wCm / (2 * distanceCm)) * (180 / Math.PI)
  if (angleDeg > 65) return { status: 'too-close', label: '近すぎ',     color: 'text-red-600 dark:text-red-400',    desc: '画面端を見るために頭を動かす必要があります' }
  if (angleDeg > 50) return { status: 'close',     label: 'やや近め',   color: 'text-amber-600 dark:text-amber-400', desc: '没入感重視のゲーミング向き。長時間のオフィス作業には疲れやすい' }
  if (angleDeg >= 28) return { status: 'ok',       label: '快適',       color: 'text-emerald-600 dark:text-emerald-400', desc: '作業・ゲームともに快適な距離です' }
  if (angleDeg >= 18) return { status: 'far',      label: 'やや遠め',   color: 'text-amber-600 dark:text-amber-400', desc: '文字が小さく感じることがあります' }
  return               { status: 'too-far',         label: '遠すぎ',     color: 'text-red-600 dark:text-red-400',    desc: 'モニターが小さく見えて作業効率が下がります' }
}

// 推奨視聴距離（水平FOV 40° ≒ wCm × 1.37）
function getRecommendedDistance(wCm: number) {
  return Math.round(wCm * 1.4)
}

type Insight = { winner: 'A' | 'B' | 'tie'; label: string; detail: string }

function getInsights(m1: MonitorConfig, m2: MonitorConfig, d1: Dims, d2: Dims, ppi1: number, ppi2: number): Insight[] {
  const insights: Insight[] = []

  // PPI（文字の鮮明さ）
  const ppiDiff = Math.abs(ppi1 - ppi2)
  if (ppiDiff >= 5) {
    const w = ppi1 > ppi2 ? 'A' : 'B'
    const better = w === 'A' ? ppi1 : ppi2
    const worse  = w === 'A' ? ppi2 : ppi1
    insights.push({
      winner: w,
      label: '文字の鮮明さ',
      detail: `モニター${w}は ${better} PPI（対して ${worse} PPI）。テキストが鮮明でプログラミング・デザイン作業向き`,
    })
  } else {
    insights.push({ winner: 'tie', label: '文字の鮮明さ', detail: '両モニターの PPI はほぼ同等。鮮明さに差はありません' })
  }

  // 画面面積（作業スペース）
  const areaDiffCm2 = d1.areaCm2 - d2.areaCm2
  if (Math.abs(areaDiffCm2) > 100) {
    const w = areaDiffCm2 > 0 ? 'A' : 'B'
    const diff = Math.round(Math.abs(areaDiffCm2) / 100)
    insights.push({
      winner: w,
      label: '作業スペース',
      detail: `モニター${w}は画面面積が約 ${diff} cm² 広い。マルチウィンドウ・動画編集・デュアルページ表示に有利`,
    })
  } else {
    insights.push({ winner: 'tie', label: '作業スペース', detail: '両モニターの画面面積はほぼ同等です' })
  }

  // アスペクト比（ウルトラワイド）
  const uwRatios: Ratio[] = ['21:9', '32:9']
  const uwA = uwRatios.includes(m1.ratio)
  const uwB = uwRatios.includes(m2.ratio)
  if (uwA && !uwB) {
    insights.push({ winner: 'A', label: '横の広さ', detail: 'モニターAはウルトラワイド。横長の作業スペース・ゲームの没入感が欲しい人向き。一般的な 16:9 コンテンツは黒帯が出る場合あり' })
  } else if (uwB && !uwA) {
    insights.push({ winner: 'B', label: '横の広さ', detail: 'モニターBはウルトラワイド。横長の作業スペース・ゲームの没入感が欲しい人向き。一般的な 16:9 コンテンツは黒帯が出る場合あり' })
  }

  // 物理的な大きさ（設置スペース）
  const wDiff = d1.wCm - d2.wCm
  if (Math.abs(wDiff) > 4) {
    const larger = wDiff > 0 ? 'A' : 'B'
    const lw = larger === 'A' ? d1.wCm : d2.wCm
    insights.push({
      winner: larger === 'A' ? 'B' : 'A',
      label: '省スペース',
      detail: `モニター${larger}は横幅 ${lw.toFixed(1)} cm で設置スペースが大きめ。デスクが狭い場合は注意`,
    })
  }

  return insights
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
            type="number" min={10} max={80} value={value.size}
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

const WINNER_BADGE: Record<'A' | 'B' | 'tie', string> = {
  A:   'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
  B:   'bg-sky-100   dark:bg-sky-900/40   text-sky-800   dark:text-sky-300',
  tie: 'bg-stone-100 dark:bg-stone-800    text-stone-600 dark:text-stone-400',
}
const WINNER_LABEL: Record<'A' | 'B' | 'tie', string> = { A: 'A が有利', B: 'B が有利', tie: '同等' }

export default function MonitorSizePage() {
  const [m1, setM1] = useState<MonitorConfig>({ size: 27, ratio: '16:9', resIdx: 1 })
  const [m2, setM2] = useState<MonitorConfig>({ size: 32, ratio: '16:9', resIdx: 1 })
  const [distance, setDistance] = useState(60)

  const d1 = getDimensions(m1)
  const d2 = getDimensions(m2)
  const ppi1 = getPPI(m1)
  const ppi2 = getPPI(m2)

  // SVG scale
  const maxW = Math.max(d1.wCm, d2.wCm)
  const maxH = Math.max(d1.hCm, d2.hCm)
  const scaleX = (CANVAS_W * 0.42) / maxW
  const scaleY = (CANVAS_H * 0.85) / maxH
  const scale = Math.min(scaleX, scaleY)
  const w1 = d1.wCm * scale, h1 = d1.hCm * scale
  const w2 = d2.wCm * scale, h2 = d2.hCm * scale
  const gap = 20
  const totalW = w1 + gap + w2
  const offsetX = (CANVAS_W - totalW) / 2
  const x1 = offsetX, x2 = offsetX + w1 + gap
  const y1 = CANVAS_H - h1, y2 = CANVAS_H - h2

  const rows = [
    { label: '画面サイズ',    v1: `${m1.size}"`,                          v2: `${m2.size}"` },
    { label: 'アスペクト比',  v1: m1.ratio,                               v2: m2.ratio },
    { label: '解像度',        v1: RESOLUTIONS[m1.resIdx].label.split(' ')[0], v2: RESOLUTIONS[m2.resIdx].label.split(' ')[0] },
    { label: '画素密度 (PPI)', v1: `${ppi1} ppi`,                         v2: `${ppi2} ppi`, highlight: true },
    { label: '横幅',          v1: `${d1.wCm.toFixed(1)} cm`,              v2: `${d2.wCm.toFixed(1)} cm` },
    { label: '縦幅',          v1: `${d1.hCm.toFixed(1)} cm`,              v2: `${d2.hCm.toFixed(1)} cm` },
    { label: '画面面積',      v1: `${(d1.areaCm2 / 100).toFixed(0)} cm²`, v2: `${(d2.areaCm2 / 100).toFixed(0)} cm²` },
    { label: '総画素数',      v1: `${getTotalPixels(m1)} M`,              v2: `${getTotalPixels(m2)} M` },
  ]

  const insights = getInsights(m1, m2, d1, d2, ppi1, ppi2)
  const assess1 = getViewingAssessment(distance, d1.wCm)
  const assess2 = getViewingAssessment(distance, d2.wCm)
  const rec1 = getRecommendedDistance(d1.wCm)
  const rec2 = getRecommendedDistance(d2.wCm)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">🖥️ モニターサイズ比較</h1>
        <p className="text-stone-600 dark:text-stone-400 mt-2">
          2つのモニターを実寸スケールで並べて比較。PPI・実寸法・画面面積を即計算します。
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <MonitorSelector label="モニター A" value={m1} onChange={setM1} color="border-amber-400 dark:border-amber-500" />
        <MonitorSelector label="モニター B" value={m2} onChange={setM2} color="border-sky-400 dark:border-sky-500" />
      </div>

      {/* Visual */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-4 mb-6 overflow-x-auto">
        <svg viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} width="100%" style={{ maxWidth: CANVAS_W, display: 'block', margin: '0 auto' }}>
          <rect x={x1} y={y1} width={w1} height={h1} rx="3" fill="#fbbf24" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
          <text x={x1 + w1 / 2} y={y1 + h1 / 2 - 8} textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">{m1.size}"</text>
          <text x={x1 + w1 / 2} y={y1 + h1 / 2 + 10} textAnchor="middle" fill="#92400e" fontSize="10">{d1.wCm.toFixed(1)} × {d1.hCm.toFixed(1)} cm</text>
          <rect x={x2} y={y2} width={w2} height={h2} rx="3" fill="#38bdf8" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="2" />
          <text x={x2 + w2 / 2} y={y2 + h2 / 2 - 8} textAnchor="middle" fill="#0c4a6e" fontSize="13" fontWeight="bold">{m2.size}"</text>
          <text x={x2 + w2 / 2} y={y2 + h2 / 2 + 10} textAnchor="middle" fill="#0c4a6e" fontSize="10">{d2.wCm.toFixed(1)} × {d2.hCm.toFixed(1)} cm</text>
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
                <td className={`px-4 py-3 text-center font-medium ${row.highlight ? 'text-amber-600 dark:text-amber-400' : 'text-stone-900 dark:text-stone-100'}`}>{row.v1}</td>
                <td className={`px-4 py-3 text-center font-medium ${row.highlight ? 'text-sky-600 dark:text-sky-400' : 'text-stone-900 dark:text-stone-100'}`}>{row.v2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── A. 比較まとめ ── */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 mb-6">
        <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">📊 比較まとめ</h2>
        <div className="space-y-3">
          {insights.map((ins) => (
            <div key={ins.label} className="flex items-start gap-3">
              <span className={`shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${WINNER_BADGE[ins.winner]}`}>
                {WINNER_LABEL[ins.winner]}
              </span>
              <div>
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400">{ins.label} — </span>
                <span className="text-sm text-stone-700 dark:text-stone-300">{ins.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── B. 視聴距離チェッカー ── */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 mb-8">
        <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">📏 視聴距離チェッカー</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">目からモニターまでの距離を入力すると、そのモニターを快適に使えるか判定します。</p>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-stone-700 dark:text-stone-300">座る距離</label>
            <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{distance} cm</span>
          </div>
          <input
            type="range" min={30} max={120} step={5} value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="flex justify-between text-xs text-stone-400 mt-1">
            <span>30 cm（近い）</span>
            <span>120 cm（遠い）</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {([
            { label: 'モニター A', cfg: m1, d: d1, assess: assess1, rec: rec1, border: 'border-amber-200 dark:border-amber-800', bg: 'bg-amber-50 dark:bg-amber-900/20' },
            { label: 'モニター B', cfg: m2, d: d2, assess: assess2, rec: rec2, border: 'border-sky-200 dark:border-sky-800',    bg: 'bg-sky-50 dark:bg-sky-900/20' },
          ] as const).map(({ label, cfg, d, assess, rec, border, bg }) => (
            <div key={label} className={`rounded-xl border ${border} ${bg} p-4`}>
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{label}（{cfg.size}"）</p>
              <p className={`text-xl font-bold mb-1 ${assess.color}`}>{assess.label}</p>
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">{assess.desc}</p>
              <div className="text-xs text-stone-500 dark:text-stone-400 space-y-0.5">
                <p>推奨距離：<span className="font-medium text-stone-700 dark:text-stone-300">{rec} cm 前後</span></p>
                <p>横幅：{d.wCm.toFixed(1)} cm　／　PPI：{getPPI(cfg)}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-stone-400 mt-4">※ 水平視野角 28〜50° を快適範囲として判定しています。ゲーミング用途では50° 前後が没入感を高めます。</p>
      </div>

      {/* PPI tip */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 mb-8">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">💡 PPI の目安</p>
        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-0.5">
          <li>• 100 PPI 以上 — テキストが鮮明でプログラミング・デザインに最適</li>
          <li>• 80〜100 PPI — 一般的なゲーミング・動画編集用途で十分</li>
          <li>• 80 PPI 未満 — 大画面優先。近距離で長時間見ると文字がにじみやすい</li>
        </ul>
      </div>

      <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5">
        <p className="font-medium text-stone-900 dark:text-stone-100 mb-3">実際のモニター構成を参考に探す</p>
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
