'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Setup } from '@/lib/types'

const usageLabel: Record<string, string> = {
  gaming: 'ゲーミング', programming: 'プログラミング', design: 'デザイン',
  remote: 'リモートワーク', video: '動画編集', streaming: '配信',
  music: '音楽制作', study: '勉強・学習', trading: 'トレーダー', cad: '3D・CAD', writing: '執筆・ブログ',
}

const styleLabel: Record<string, string> = {
  minimal: 'ミニマル', rgb: 'RGB', cafe: 'カフェ風', monochrome: 'モノトーン', wood: 'ウッド',
  white: '白統一', dark: 'ダーク', nordic: '北欧', industrial: 'インダストリアル', vintage: 'ヴィンテージ',
}

const usageEmoji: Record<string, string> = {
  gaming: '🎮', programming: '💻', design: '🎨', remote: '🏠',
  video: '🎬', streaming: '📡', music: '🎵', study: '📚',
  trading: '📈', cad: '🔧', writing: '✍️',
}

interface Props {
  setup: Setup
  compareSelected?: boolean
  onCompareToggle?: (id: string) => void
}

export default function SetupCard({ setup, compareSelected, onCompareToggle }: Props) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    const stored: string[] = JSON.parse(localStorage.getItem('deskhub_favorites') || '[]')
    setIsFav(stored.includes(setup.id))
  }, [setup.id])

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault()
    const stored: string[] = JSON.parse(localStorage.getItem('deskhub_favorites') || '[]')
    const next = stored.includes(setup.id)
      ? stored.filter((id) => id !== setup.id)
      : [...stored, setup.id]
    localStorage.setItem('deskhub_favorites', JSON.stringify(next))
    setIsFav(next.includes(setup.id))
  }

  return (
    <div className="relative group">
      {/* Favorite button */}
      <button
        onClick={toggleFav}
        className={`absolute top-2 left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-base transition-colors ${
          isFav
            ? 'bg-red-500 text-white'
            : 'bg-white/80 dark:bg-stone-900/80 text-stone-400 hover:text-red-400'
        }`}
        title={isFav ? 'お気に入りから外す' : 'お気に入りに追加'}
      >
        {isFav ? '♥' : '♡'}
      </button>

      {/* Compare button */}
      {onCompareToggle && (
        <button
          onClick={(e) => { e.preventDefault(); onCompareToggle(setup.id) }}
          className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
            compareSelected
              ? 'bg-amber-500 border-amber-500 text-white'
              : 'bg-white/80 dark:bg-stone-900/80 border-stone-300 dark:border-stone-600 text-stone-500 hover:border-amber-400'
          }`}
          title={compareSelected ? '比較から外す' : '比較に追加'}
        >
          {compareSelected ? '✓' : '＋'}
        </button>
      )}

      <Link href={`/setups/${setup.id}`} className="block">
        <div className={`rounded-xl overflow-hidden border transition-colors bg-white dark:bg-stone-900 ${
          compareSelected
            ? 'border-amber-400 dark:border-amber-500'
            : 'border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500'
        }`}>
          <div className="relative h-48 w-full overflow-hidden" style={{ backgroundColor: setup.imageColor }}>
            {setup.imageUrl ? (
              <Image
                src={setup.imageUrl}
                alt={setup.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 select-none">
                <span className="text-6xl opacity-20">
                  {usageEmoji[setup.usage[0]] ?? '🖥️'}
                </span>
                <span className="text-xs font-medium opacity-30 tracking-widest">
                  {setup.deskWidth} × {setup.deskDepth} cm
                </span>
              </div>
            )}
            <div className="absolute inset-0 flex items-end p-3 gap-1.5 flex-wrap">
              {setup.hasStandingDesk && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                  昇降デスク
                </span>
              )}
              {setup.hasUltrawide && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                  ウルトラワイド
                </span>
              )}
              {setup.hasVerticalMonitor && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                  縦置き
                </span>
              )}
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
              {setup.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{setup.author}</p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                ¥{setup.totalCost.toLocaleString()}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {setup.deskWidth}cm × {setup.deskDepth}cm
              </span>
            </div>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {setup.usage.slice(0, 2).map((u) => (
                <span key={u} className="px-2 py-0.5 rounded-full text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                  {usageLabel[u]}
                </span>
              ))}
              {setup.style.slice(0, 1).map((s) => (
                <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  {styleLabel[s]}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                {setup.monitorCount}画面
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
