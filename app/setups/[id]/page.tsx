import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import { setups } from '@/lib/data/setups'
import type { Setup } from '@/lib/types'
import ShareButtons from '@/components/ShareButtons'
import SetupCard from '@/components/SetupCard'

export const dynamicParams = true

const amazonSearchUrl = (name: string) =>
  `https://www.amazon.co.jp/s?k=${encodeURIComponent(name)}`

const usageLabel: Record<string, string> = {
  gaming: 'ゲーミング', programming: 'プログラミング', design: 'デザイン',
  remote: 'リモートワーク', video: '動画編集', streaming: '配信',
  music: '音楽制作', study: '勉強・学習', trading: 'トレーダー', cad: '3D・CAD', writing: '執筆・ブログ',
}
const styleLabel: Record<string, string> = {
  minimal: 'ミニマル', rgb: 'RGB', cafe: 'カフェ風', monochrome: 'モノトーン', wood: 'ウッド',
  white: '白統一', dark: 'ダーク', nordic: '北欧', industrial: 'インダストリアル', vintage: 'ヴィンテージ',
}
const categoryLabel: Record<string, string> = {
  desk: 'デスク', chair: 'チェア', monitor: 'モニター', keyboard: 'キーボード・マウス',
  mouse: 'マウス', audio: 'オーディオ', lighting: 'ライティング', peripheral: '周辺機器', other: 'その他',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToSetup(s: any): Setup {
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
    usage: s.usage,
    monitorCount: s.monitor_count,
    monitorSize: s.monitor_size,
    hasVerticalMonitor: s.has_vertical_monitor,
    hasUltrawide: s.has_ultrawide,
    hasStandingDesk: s.has_standing_desk,
    deskColor: s.desk_color,
    chairType: s.chair_type,
    style: s.style,
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
    items: s.items,
    description: s.description,
    snsUrl: s.sns_url ?? undefined,
    gadgetNotes: s.gadget_notes ?? undefined,
    createdAt: s.created_at,
  }
}

async function getSetup(id: string): Promise<Setup | null> {
  const static_ = setups.find((s) => s.id === id)
  if (static_) return static_

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null

  const supabase = createClient(url, key)
  const { data } = await supabase
    .from('setup_submissions')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .single()

  return data ? dbToSetup(data) : null
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const setup = await getSetup(id)
  if (!setup) return { title: 'Not Found | DeskHub' }

  return {
    title: `${setup.title} — ${setup.author}のデスク環境 | DeskHub`,
    description: setup.description || `¥${setup.totalCost.toLocaleString()}のデスク環境。${setup.usage.map(u => usageLabel[u]).join('・')}用途。`,
    openGraph: {
      title: setup.title,
      description: `¥${setup.totalCost.toLocaleString()} / ${setup.author}`,
      images: setup.imageUrl ? [setup.imageUrl] : [],
    },
  }
}

export async function generateStaticParams() {
  return setups.map((s) => ({ id: s.id }))
}

function getRelated(setup: Setup, count = 3): Setup[] {
  return setups
    .filter((s) => s.id !== setup.id)
    .map((s) => {
      const sharedUsage = s.usage.filter((u) => setup.usage.includes(u)).length
      const budgetDiff = Math.abs(s.totalCost - setup.totalCost) / (setup.totalCost || 1)
      const score = sharedUsage * 3 - budgetDiff
      return { s, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ s }) => s)
}

export default async function SetupDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const setup = await getSetup(id)
  if (!setup) notFound()

  const related = getRelated(setup)
  const pageUrl = `https://desk-setup-hub.vercel.app/setups/${id}`

  const grouped = setup.items.reduce<Record<string, typeof setup.items>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    },
    {}
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'DeskHub', item: 'https://desk-setup-hub.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'セットアップ一覧', item: 'https://desk-setup-hub.vercel.app/setups' },
          { '@type': 'ListItem', position: 3, name: setup.title },
        ],
      },
      {
        '@type': 'Article',
        headline: setup.title,
        description: setup.description,
        author: { '@type': 'Person', name: setup.author },
        datePublished: setup.createdAt,
        publisher: { '@type': 'Organization', name: 'DeskHub', url: 'https://desk-setup-hub.vercel.app' },
        ...(setup.imageUrl ? { image: setup.imageUrl } : {}),
      },
    ],
  }

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/setups" className="text-sm text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
        ← セットアップ一覧に戻る
      </Link>

      <div className="mt-4 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <div className="relative h-48 sm:h-64 w-full flex items-center justify-center" style={{ backgroundColor: setup.imageColor }}>
          {setup.imageUrl ? (
            <Image
              src={setup.imageUrl}
              alt={setup.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex flex-col items-center gap-3 select-none opacity-25">
              <span className="text-8xl">
                {
                  ({ gaming: '🎮', programming: '💻', design: '🎨', video: '🎬', streaming: '📡', music: '🎵', study: '📚', trading: '📈', cad: '📐', writing: '✍️', remote: '🏠' } as Record<string, string>)[setup.usage[0]] ?? '🏠'
                }
              </span>
              <span className="text-sm font-medium tracking-widest">
                {setup.deskWidth} × {setup.deskDepth} cm
              </span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{setup.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-stone-500 dark:text-stone-400">{setup.author}</p>
                {setup.snsUrl && (
                  <a href={setup.snsUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline">
                    🔗 リンク
                  </a>
                )}
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                ¥{setup.totalCost.toLocaleString()}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">総額</p>
            </div>
          </div>

          <p className="mt-4 text-stone-700 dark:text-stone-300 leading-relaxed">{setup.description}</p>

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

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'デスクサイズ', value: `${setup.deskWidth}×${setup.deskDepth}cm` },
              { label: 'モニター', value: `${setup.monitorCount}枚 / ${setup.monitorSize}インチ` },
              { label: '昇降デスク', value: setup.hasStandingDesk ? 'あり' : 'なし' },
              { label: 'チェア', value: setup.chairType === 'gaming' ? 'ゲーミング' : setup.chairType === 'office' ? 'オフィス' : 'その他' },
              ...(setup.os ? [{ label: 'OS', value: setup.os === 'mac' ? 'Mac' : setup.os === 'windows' ? 'Windows' : setup.os === 'linux' ? 'Linux' : 'その他' }] : []),
              ...(setup.pcType ? [{ label: 'PC種別', value: setup.pcType === 'desktop' ? 'デスクトップ' : setup.pcType === 'laptop' ? 'ノートPC' : '両方' }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="bg-stone-50 dark:bg-stone-800 rounded-lg p-3">
                <p className="text-xs text-stone-500 dark:text-stone-400">{label}</p>
                <p className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Cost breakdown */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">カテゴリ別コスト</h2>
            <div className="space-y-2">
              {Object.entries(grouped)
                .map(([cat, items]) => {
                  const subtotal = items.reduce((sum, i) => sum + i.price, 0)
                  const pct = Math.round((subtotal / setup.totalCost) * 100)
                  return { cat, subtotal, pct }
                })
                .sort((a, b) => b.subtotal - a.subtotal)
                .map(({ cat, subtotal, pct }) => (
                  <div key={cat}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-stone-600 dark:text-stone-400">{categoryLabel[cat] ?? cat}</span>
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        ¥{subtotal.toLocaleString()} <span className="text-stone-400">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400 dark:bg-amber-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

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
                            <a href={item.rakutenUrl} target="_blank" rel="noopener noreferrer"
                              className="text-xs px-2.5 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors">
                              楽天
                            </a>
                          )}
                          <a href={item.amazonUrl ?? amazonSearchUrl(item.name)} target="_blank" rel="noopener noreferrer"
                            className="text-xs px-2.5 py-1 rounded-md bg-amber-400 hover:bg-amber-500 text-stone-900 transition-colors">
                            Amazon
                          </a>
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

          {setup.gadgetNotes && (
            <div className="mt-6 mx-6 sm:mx-8 p-4 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1">その他のこだわりアイテム</p>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{setup.gadgetNotes}</p>
            </div>
          )}

          <div className="px-6 sm:px-8 pb-8 mt-6">
            <ShareButtons title={setup.title} url={pageUrl} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
            似たセットアップ
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((s) => (
              <SetupCard key={s.id} setup={s} />
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  )
}
