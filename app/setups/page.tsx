'use client'

import { useState, useMemo } from 'react'
import SetupCard from '@/components/SetupCard'
import FilterBar from '@/components/FilterBar'
import { setups } from '@/lib/data/setups'
import { FilterState } from '@/lib/types'

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

export default function SetupsPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  const filtered = useMemo(() => {
    return setups.filter((s) => {
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
  }, [filters])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
        セットアップ一覧
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="lg:w-64 shrink-0">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            totalCount={filtered.length}
          />
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-stone-500 dark:text-stone-400">
              <p className="text-4xl mb-3">🔍</p>
              <p>条件に合うセットアップが見つかりません</p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-4 text-sm text-amber-600 dark:text-amber-400 hover:underline"
              >
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
