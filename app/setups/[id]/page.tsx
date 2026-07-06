import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { setups } from '@/lib/data/setups'

const usageLabel: Record<string, string> = {
  gaming: 'ゲーミング', programming: 'プログラミング', design: 'デザイン',
  remote: 'リモートワーク', video: '動画編集', streaming: '配信',
}
const styleLabel: Record<string, string> = {
  minimal: 'ミニマル', rgb: 'RGB', cafe: 'カフェ風', monochrome: 'モノトーン', wood: 'ウッド',
}
const categoryLabel: Record<string, string> = {
  desk: 'デスク', chair: 'チェア', monitor: 'モニター', keyboard: 'キーボード・マウス',
  mouse: 'マウス', audio: 'オーディオ', lighting: 'ライティング', peripheral: '周辺機器', other: 'その他',
}

export function generateStaticParams() {
  return setups.map((s) => ({ id: s.id }))
}

export default async function SetupDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const setup = setups.find((s) => s.id === id)
  if (!setup) notFound()

  const grouped = setup.items.reduce<Record<string, typeof setup.items>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    },
    {}
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/setups" className="text-sm text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
        ← セットアップ一覧に戻る
      </Link>

      <div className="mt-4 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        {/* Image */}
        <div className="relative h-64 sm:h-96 w-full" style={{ backgroundColor: setup.imageColor }}>
          {setup.imageUrl && (
            <Image
              src={setup.imageUrl}
              alt={setup.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{setup.title}</h1>
              <p className="text-stone-500 dark:text-stone-400 mt-1">{setup.author}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                ¥{setup.totalCost.toLocaleString()}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">総額</p>
            </div>
          </div>

          <p className="mt-4 text-stone-700 dark:text-stone-300 leading-relaxed">{setup.description}</p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {setup.usage.map((u) => (
              <span key={u} className="px-3 py-1 rounded-full text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                {usageLabel[u]}
              </span>
            ))}
            {setup.style.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full text-sm bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                {styleLabel[s]}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'デスクサイズ', value: `${setup.deskWidth}×${setup.deskDepth}cm` },
              { label: 'モニター', value: `${setup.monitorCount}枚 / ${setup.monitorSize}インチ` },
              { label: '昇降デスク', value: setup.hasStandingDesk ? 'あり' : 'なし' },
              { label: '配線整理', value: setup.cableManagement === 'clean' ? '整理済' : 'ゆるい' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-stone-50 dark:bg-stone-800 rounded-lg p-3">
                <p className="text-xs text-stone-500 dark:text-stone-400">{label}</p>
                <p className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Items */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">使用アイテム</h2>
            <div className="space-y-4">
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat}>
                  <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                    {categoryLabel[cat] ?? cat}
                  </h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-stone-50 dark:bg-stone-800">
                        <span className="text-sm text-stone-800 dark:text-stone-200 mr-4">{item.name}</span>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                            ¥{item.price.toLocaleString()}
                          </span>
                          {item.rakutenUrl && (
                            <a
                              href={item.rakutenUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2.5 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
                            >
                              楽天
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end items-center gap-3 py-3 border-t border-stone-200 dark:border-stone-700">
              <span className="text-stone-600 dark:text-stone-400 text-sm">合計</span>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                ¥{setup.totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
