'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import SetupCard from '@/components/SetupCard'
import FilterBar from '@/components/FilterBar'
import { setups as staticSetups } from '@/lib/data/setups'
import { FilterState, Setup } from '@/lib/types'
import { supabase, SupabaseSetup } from '@/lib/supabase'

const defaultFilters: FilterState = {
  budgetMax: null,
  deskWidthMin: null,
  usage: null,
  monitorCount: null,
  hasStandingDesk: null,
  style: null,
  chairType: null,
  roomType: null,
}

function dbToSetup(s: SupabaseSetup): Setup {
  return {
    id: s.id,
    title: s.title,
    author: s.author,
    imageColor: '#8B7355',
    imageUrl: s.image_url ?? undefined,
    totalCost: s.total_cost,
    deskWidth: s.desk_width,
    deskDepth: s.desk_depth,
    roomType: s.room_type as Setup['roomType'],
    isRental: s.is_rental,
    usage: s.usage as Setup['usage'],
    monitorCount: s.monitor_count,
    monitorSize: s.monitor_size,
    hasVerticalMonitor: s.has_vertical_monitor,
    hasUltrawide: s.has_ultrawide,
    hasStandingDesk: s.has_standing_desk,
    deskColor: s.desk_color as Setup['deskColor'],
    chairType: s.chair_type as Setup['chairType'],
    style: s.style as Setup['style'],
    cableManagement: s.cable_management as Setup['cableManagement'],
    hasMechanicalKeyboard: s.has_mechanical_keyboard,
    hasMonitorLight: s.has_monitor_light,
    hasStreamDeck: s.has_stream_deck,
    hasMic: s.has_mic,
    hasWebcam: s.has_webcam,
    items: s.items as Setup['items'],
    description: s.description,
    createdAt: s.created_at,
  }
}

export default function SetupsPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [userSetups, setUserSetups] = useState<Setup[]>([])

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('setup_submissions')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setUserSetups(data.map(dbToSetup))
      })
  }, [])

  const allSetups = useMemo(() => [...userSetups, ...staticSetups], [userSetups])

  const filtered = useMemo(() => {
    return allSetups.filter((s) => {
      if (filters.budgetMax !== null && s.totalCost > filters.budgetMax) return false
      if (filters.deskWidthMin !== null && s.deskWidth < filters.deskWidthMin) return false
      if (filters.usage !== null && !s.usage.includes(filters.usage)) return false
      if (filters.monitorCount !== null) {
        if (filters.monitorCount === 3 && s.monitorCount < 3) return false
        if (filters.monitorCount !== 3 && s.monitorCount !== filters.monitorCount) return false
      }
      if (filters.hasStandingDesk === true && !s.hasStandingDesk) return false
      if (filters.style !== null && !s.style.includes(filters.style)) return false
      if (filters.chairType !== null && s.chairType !== filters.chairType) return false
      if (filters.roomType !== null && s.roomType !== filters.roomType) return false
      return true
    })
  }, [allSetups, filters])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          セットアップ一覧
        </h1>
        <Link
          href="/submit"
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
        >
          ＋ 投稿する
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 shrink-0">
          <FilterBar filters={filters} onChange={setFilters} totalCount={filtered.length} />
        </aside>
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-stone-500 dark:text-stone-400">
              <p className="text-4xl mb-3">🔍</p>
              <p>条件に合うセットアップが見つかりません</p>
              <button onClick={() => setFilters(defaultFilters)} className="mt-4 text-sm text-amber-600 dark:text-amber-400 hover:underline">
                フィルターをリセット
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((setup) => (
                <SetupCard key={setup.id} setup={setup} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
