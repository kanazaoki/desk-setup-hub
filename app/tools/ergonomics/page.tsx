'use client'

import { useState } from 'react'
import Link from 'next/link'

function calc(height: number) {
  const seat = Math.round(height * 0.25)
  const desk = Math.round(height * 0.42)
  const eyeLevel = Math.round(height * 0.55)
  const monitorCenter = eyeLevel - 12
  const monitorDistMin = Math.round(height * 0.26 + 5)
  const monitorDistMax = Math.round(height * 0.26 + 25)
  return { seat, desk, eyeLevel, monitorCenter, monitorDistMin, monitorDistMax }
}

type Row = {
  label: string
  value: string
  sub: string
  tip: string
  icon: string
}

function rows(height: number): Row[] {
  const r = calc(height)
  return [
    {
      label: '椅子の座面高さ',
      value: `${r.seat} cm`,
      sub: `±2 cm の範囲で調整`,
      tip: '足の裏が床に平らに着き、膝が約90°になる高さ',
      icon: '🪑',
    },
    {
      label: 'デスクの高さ',
      value: `${r.desk} cm`,
      sub: `${r.desk - 2}〜${r.desk + 2} cm`,
      tip: '座ったとき肘が自然に乗る高さ。昇降デスクなら1cm単位で合わせると○',
      icon: '🗃️',
    },
    {
      label: '目線の高さ（床から）',
      value: `${r.eyeLevel} cm`,
      sub: '着座時の目の高さ',
      tip: 'モニター上端がこの高さに来るよう配置すると首が疲れにくい',
      icon: '👁️',
    },
    {
      label: 'モニター中心の高さ',
      value: `${r.monitorCenter} cm`,
      sub: `床から ${r.monitorCenter} cm`,
      tip: '目線より 10〜15 cm 下が理想。スタンドかアームで調整しよう',
      icon: '🖥️',
    },
    {
      label: 'モニターとの距離',
      value: `${r.monitorDistMin}〜${r.monitorDistMax} cm`,
      sub: '顔からパネルまで',
      tip: '腕を伸ばして画面に指先が届くくらいが目安。近すぎると目が疲れる',
      icon: '📏',
    },
  ]
}

export default function ErgonomicsPage() {
  const [height, setHeight] = useState(170)
  const results = rows(height)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          📐 人間工学チェッカー
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mt-2">
          身長を入力するだけで、デスク・椅子・モニターの最適な高さと距離を計算します。
        </p>
      </div>

      {/* Height input */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6 mb-6">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              身長
            </label>
            <input
              type="range"
              min={140}
              max={200}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-stone-400 mt-1">
              <span>140 cm</span>
              <span>200 cm</span>
            </div>
          </div>
          <div className="text-center w-24">
            <input
              type="number"
              min={140}
              max={200}
              value={height}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v >= 140 && v <= 200) setHeight(v)
              }}
              className="w-full text-center text-2xl font-bold text-amber-600 dark:text-amber-400 bg-transparent border-b-2 border-amber-400 focus:outline-none"
            />
            <span className="text-sm text-stone-500 dark:text-stone-400">cm</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 mb-8">
        {results.map((row) => (
          <div
            key={row.label}
            className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl leading-none mt-0.5">{row.icon}</span>
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">{row.label}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{row.sub}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{row.value}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800 rounded-lg px-3 py-2">
              💡 {row.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 mb-8">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          ⚠️ 計算値はJIS基準の目安です。体型・姿勢・作業内容によって最適値は異なります。実際にデスクや椅子を試して微調整してください。
        </p>
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5">
        <p className="font-medium text-stone-900 dark:text-stone-100 mb-3">
          昇降デスクで高さを細かく合わせているセットアップを参考にする
        </p>
        <Link
          href="/setups?hasStandingDesk=true"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
        >
          昇降デスクのセットアップを見る →
        </Link>
      </div>
    </div>
  )
}
