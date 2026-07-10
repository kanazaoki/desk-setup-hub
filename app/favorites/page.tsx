'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SetupCard from '@/components/SetupCard'
import { setups } from '@/lib/data/setups'

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored: string[] = JSON.parse(localStorage.getItem('deskhub_favorites') || '[]')
    setFavoriteIds(stored)
  }, [])

  // Re-sync when storage changes (e.g. toggled from another card)
  useEffect(() => {
    const onStorage = () => {
      const stored: string[] = JSON.parse(localStorage.getItem('deskhub_favorites') || '[]')
      setFavoriteIds(stored)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const favoriteSetups = setups.filter((s) => favoriteIds.includes(s.id))

  if (!mounted) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          ♥ お気に入り
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          このデバイスのブラウザに保存されます
        </p>
      </div>

      {favoriteSetups.length === 0 ? (
        <div className="text-center py-20 text-stone-400 dark:text-stone-600">
          <p className="text-5xl mb-4">♡</p>
          <p className="text-stone-500 dark:text-stone-400">お気に入りがまだありません</p>
          <Link
            href="/setups"
            className="inline-block mt-4 text-sm text-amber-600 dark:text-amber-400 hover:underline"
          >
            セットアップを探す →
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteSetups.map((setup) => (
            <SetupCard key={setup.id} setup={setup} />
          ))}
        </div>
      )}
    </div>
  )
}
