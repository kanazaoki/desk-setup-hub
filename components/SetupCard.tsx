import Link from 'next/link'
import { Setup } from '@/lib/types'

const usageLabel: Record<string, string> = {
  gaming: 'ゲーミング',
  programming: 'プログラミング',
  design: 'デザイン',
  remote: 'リモートワーク',
  video: '動画編集',
  streaming: '配信',
}

const styleLabel: Record<string, string> = {
  minimal: 'ミニマル',
  rgb: 'RGB',
  cafe: 'カフェ風',
  monochrome: 'モノトーン',
  wood: 'ウッド',
}

export default function SetupCard({ setup }: { setup: Setup }) {
  return (
    <Link href={`/setups/${setup.id}`} className="group block">
      <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 transition-colors bg-white dark:bg-stone-900">
        {/* Image placeholder */}
        <div
          className="h-48 w-full relative"
          style={{ backgroundColor: setup.imageColor }}
        >
          <div className="absolute inset-0 flex items-end p-3 gap-1.5 flex-wrap">
            {setup.hasStandingDesk && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-sm">
                昇降デスク
              </span>
            )}
            {setup.hasUltrawide && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-sm">
                ウルトラワイド
              </span>
            )}
            {setup.cableManagement === 'clean' && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-sm">
                配線整理済
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
              <span
                key={u}
                className="px-2 py-0.5 rounded-full text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
              >
                {usageLabel[u]}
              </span>
            ))}
            {setup.style.slice(0, 1).map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
              >
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
  )
}
