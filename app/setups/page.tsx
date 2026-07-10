'use client'

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import SetupCard from '@/components/SetupCard'
import FilterBar from '@/components/FilterBar'
import { setups as staticSetups } from '@/lib/data/setups'
import { FilterState, Setup, Usage, Style, ChairType, OsType, PcType } from '@/lib/types'
import { supabase, SupabaseSetup } from '@/lib/supabase'

type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'monitors'

const defaultFilters: FilterState = {
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
}

function parseParams(sp: URLSearchParams): { filters: FilterState; sort: SortKey; query: string } {
  return {
    query: sp.get('q') ?? '',
    sort: (sp.get('sort') as SortKey) ?? 'newest',
    filters: {
      budgetMin: sp.get('budgetMin') ? Number(sp.get('budgetMin')) : null,
      budgetMax: sp.get('budgetMax') ? Number(sp.get('budgetMax')) : null,
      deskWidthMin: sp.get('deskWidthMin') ? Number(sp.get('deskWidthMin')) : null,
      usage: (sp.get('usage') as Usage) || null,
      monitorCount: sp.get('monitorCount') ? Number(sp.get('monitorCount')) : null,
      hasStandingDesk: sp.get('hasStandingDesk') === 'true' ? true : null,
      hasUltrawide: sp.get('hasUltrawide') === 'true' ? true : null,
      hasVerticalMonitor: sp.get('hasVerticalMonitor') === 'true' ? true : null,
      style: (sp.get('style') as Style) || null,
      chairType: (sp.get('chairType') as ChairType) || null,
      os: (sp.get('os') as OsType) || null,
      pcType: (sp.get('pcType') as PcType) || null,
    },
  }
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
    os: s.os as Setup['os'] ?? undefined,
    pcType: s.pc_type as Setup['pcType'] ?? undefined,
    usage: s.usage as Setup['usage'],
    monitorCount: s.monitor_count,
    monitorSize: s.monitor_size,
    hasVerticalMonitor: s.has_vertical_monitor,
    hasUltrawide: s.has_ultrawide,
    hasStandingDesk: s.has_standing_desk,
    deskColor: s.desk_color as Setup['deskColor'],
    chairType: s.chair_type as Setup['chairType'],
    style: s.style as Setup['style'],
    hasMechanicalKeyboard: s.has_mechanical_keyboard,
    hasMonitorLight: s.has_monitor_light,
    hasStreamDeck: s.has_stream_deck,
    hasMic: s.has_mic,
    hasWebcam: s.has_webcam,
    hasMonitorArm: s.has_monitor_arm,
    hasTrackball: s.has_trackball,
    hasDeskMat: s.has_desk_mat,
    hasUsbHub: s.has_usb_hub,
    hasDockingStation: s.has_docking_station,
    hasLaptopStand: s.has_laptop_stand,
    hasHeadphoneStand: s.has_headphone_stand,
    hasFootrest: s.has_footrest,
    hasNas: s.has_nas,
    hasSpeaker: s.has_speaker,
    items: s.items as Setup['items'],
    description: s.description,
    createdAt: s.created_at,
  }
}

function SetupsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initial = useMemo(() => parseParams(searchParams), [searchParams])

  const [filters, setFilters] = useState<FilterState>(initial.filters)
  const [query, setQuery] = useState(initial.query)
  const [sort, setSort] = useState<SortKey>(initial.sort)
  const [userSetups, setUserSetups] = useState<Setup[]>([])
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)

  // URL同期
  useEffect(() => {
    const sp = new URLSearchParams()
    if (query) sp.set('q', query)
    if (sort !== 'newest') sp.set('sort', sort)
    if (filters.usage) sp.set('usage', filters.usage)
    if (filters.budgetMin) sp.set('budgetMin', String(filters.budgetMin))
    if (filters.budgetMax) sp.set('budgetMax', String(filters.budgetMax))
    if (filters.deskWidthMin) sp.set('deskWidthMin', String(filters.deskWidthMin))
    if (filters.monitorCount) sp.set('monitorCount', String(filters.monitorCount))
    if (filters.hasStandingDesk) sp.set('hasStandingDesk', 'true')
    if (filters.hasUltrawide) sp.set('hasUltrawide', 'true')
    if (filters.hasVerticalMonitor) sp.set('hasVerticalMonitor', 'true')
    if (filters.style) sp.set('style', filters.style)
    if (filters.chairType) sp.set('chairType', filters.chairType)
    if (filters.os) sp.set('os', filters.os)
    if (filters.pcType) sp.set('pcType', filters.pcType)
    const search = sp.toString()
    router.replace(search ? `/setups?${search}` : '/setups', { scroll: false })
  }, [filters, query, sort, router])

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
    const q = query.trim().toLowerCase()
    return allSetups.filter((s) => {
      if (filters.budgetMin !== null && s.totalCost < filters.budgetMin) return false
      if (filters.budgetMax !== null && s.totalCost > filters.budgetMax) return false
      if (filters.deskWidthMin !== null && s.deskWidth < filters.deskWidthMin) return false
      if (filters.usage !== null && !s.usage.includes(filters.usage)) return false
      if (filters.monitorCount !== null) {
        if (filters.monitorCount === 3 && s.monitorCount < 3) return false
        if (filters.monitorCount !== 3 && s.monitorCount !== filters.monitorCount) return false
      }
      if (filters.hasStandingDesk === true && !s.hasStandingDesk) return false
      if (filters.hasUltrawide === true && !s.hasUltrawide) return false
      if (filters.hasVerticalMonitor === true && !s.hasVerticalMonitor) return false
      if (filters.style !== null && !s.style.includes(filters.style)) return false
      if (filters.chairType !== null && s.chairType !== filters.chairType) return false
      if (filters.os !== null && s.os !== filters.os) return false
      if (filters.pcType !== null && s.pcType !== filters.pcType) return false
      if (q && !(
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      )) return false
      return true
    })
  }, [allSetups, filters, query])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return a.totalCost - b.totalCost
      if (sort === 'price-desc') return b.totalCost - a.totalCost
      if (sort === 'monitors') return b.monitorCount - a.monitorCount
      return b.createdAt.localeCompare(a.createdAt)
    })
  }, [filtered, sort])

  const hasActiveFilters = Object.values(filters).some((v) => v !== null) || Boolean(query.trim())

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 2) return prev
      return [...prev, id]
    })
  }, [])

  const handleCompare = () => {
    if (compareIds.length === 2) {
      router.push(`/compare?a=${compareIds[0]}&b=${compareIds[1]}`)
    }
  }

  const resetAll = () => {
    setFilters(defaultFilters)
    setQuery('')
    setSort('newest')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
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

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="タイトル・著者・説明文で検索…"
          className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500 text-sm"
        />
        {query && (
          <button onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-sm">
            ✕
          </button>
        )}
      </div>

      {/* Mobile controls */}
      <div className="lg:hidden flex items-center gap-2 mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
            Object.values(filters).some((v) => v !== null)
              ? 'border-amber-400 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
              : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M7 12h10m-6 6h2" />
          </svg>
          フィルター
        </button>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
          className="flex-1 px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-sm focus:outline-none focus:border-amber-400">
          <option value="newest">新着順</option>
          <option value="price-asc">価格が安い順</option>
          <option value="price-desc">価格が高い順</option>
          <option value="monitors">モニター枚数順</option>
        </select>
        <span className="text-sm text-stone-500 dark:text-stone-400 shrink-0">{sorted.length}件</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 shrink-0 gap-3">
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-sm focus:outline-none focus:border-amber-400">
            <option value="newest">新着順</option>
            <option value="price-asc">価格が安い順</option>
            <option value="price-desc">価格が高い順</option>
            <option value="monitors">モニター枚数順</option>
          </select>
          <FilterBar filters={filters} onChange={setFilters} totalCount={sorted.length} />
          {hasActiveFilters && (
            <button onClick={resetAll}
              className="text-xs text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300">
              すべてリセット
            </button>
          )}
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {sorted.length === 0 ? (
            <div className="text-center py-20 text-stone-500 dark:text-stone-400">
              <p className="text-4xl mb-3">🔍</p>
              <p>条件に合うセットアップが見つかりません</p>
              <button onClick={resetAll} className="mt-4 text-sm text-amber-600 dark:text-amber-400 hover:underline">
                フィルターをリセット
              </button>
            </div>
          ) : (
            <>
              {compareIds.length === 0 && (
                <p className="text-xs text-stone-400 dark:text-stone-500 mb-3">
                  カードの ＋ ボタンで2件選ぶと比較できます
                </p>
              )}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {sorted.map((setup) => (
                  <SetupCard
                    key={setup.id}
                    setup={setup}
                    compareSelected={compareIds.includes(setup.id)}
                    onCompareToggle={toggleCompare}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Compare bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
            <span className="text-sm text-stone-600 dark:text-stone-400">
              比較中: <span className="font-medium text-stone-900 dark:text-stone-100">{compareIds.length} / 2件</span>
            </span>
            {compareIds.length === 1 && (
              <span className="text-xs text-stone-400 dark:text-stone-500">あと1件選択してください</span>
            )}
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => setCompareIds([])}
                className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
                キャンセル
              </button>
              <button onClick={handleCompare} disabled={compareIds.length < 2}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors">
                比較する →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-stone-950 rounded-t-2xl shadow-xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800 shrink-0">
              <span className="font-semibold text-stone-900 dark:text-stone-100">フィルター</span>
              <div className="flex items-center gap-4">
                {Object.values(filters).some((v) => v !== null) && (
                  <button onClick={() => setFilters(defaultFilters)}
                    className="text-sm text-amber-600 dark:text-amber-400">リセット</button>
                )}
                <button onClick={() => setDrawerOpen(false)}
                  className="text-stone-500 dark:text-stone-400 text-xl leading-none">✕</button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              <FilterBar filters={filters} onChange={setFilters} totalCount={sorted.length} />
            </div>
            <div className="px-4 py-4 border-t border-stone-200 dark:border-stone-800 shrink-0">
              <button onClick={() => setDrawerOpen(false)}
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors">
                {sorted.length}件を表示
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function SetupsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-stone-200 dark:bg-stone-800 rounded animate-pulse mb-6" />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-xl bg-stone-100 dark:bg-stone-800 animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <SetupsContent />
    </Suspense>
  )
}
