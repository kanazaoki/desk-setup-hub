import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { setups } from '@/lib/data/setups'
import type { Setup } from '@/lib/types'
import type { Metadata } from 'next'
import CompareShareButton from '@/components/CompareShareButton'

export const metadata: Metadata = { title: 'セットアップ比較 | DeskHub' }

const usageLabel: Record<string, string> = {
  gaming: 'ゲーミング', programming: 'プログラミング', design: 'デザイン',
  remote: 'リモートワーク', video: '動画編集', streaming: '配信',
  music: '音楽制作', study: '勉強・学習', trading: 'トレーダー', cad: '3D・CAD', writing: '執筆・ブログ',
}
const styleLabel: Record<string, string> = {
  minimal: 'ミニマル', rgb: 'RGB', cafe: 'カフェ風', monochrome: 'モノトーン', wood: 'ウッド',
  white: '白統一', dark: 'ダーク', nordic: '北欧', industrial: 'インダストリアル', vintage: 'ヴィンテージ',
}
const chairLabel: Record<string, string> = {
  gaming: 'ゲーミング', office: 'オフィス', other: 'その他',
}
const osLabel: Record<string, string> = {
  mac: 'Mac', windows: 'Windows', linux: 'Linux', other: 'その他',
}
const pcTypeLabel: Record<string, string> = {
  desktop: 'デスクトップ', laptop: 'ノートPC', both: '両方',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToSetup(s: any): Setup {
  return {
    id: s.id, title: s.title, author: s.author,
    imageColor: '#8B7355', imageUrl: s.image_url ?? undefined,
    totalCost: s.total_cost, deskWidth: s.desk_width, deskDepth: s.desk_depth,
    os: s.os, pcType: s.pc_type,
    usage: s.usage, monitorCount: s.monitor_count, monitorSize: s.monitor_size,
    hasVerticalMonitor: s.has_vertical_monitor, hasUltrawide: s.has_ultrawide,
    hasStandingDesk: s.has_standing_desk, deskColor: s.desk_color,
    chairType: s.chair_type, style: s.style,
    hasMechanicalKeyboard: s.has_mechanical_keyboard, hasMonitorLight: s.has_monitor_light,
    hasStreamDeck: s.has_stream_deck, hasMic: s.has_mic, hasWebcam: s.has_webcam,
    items: s.items, description: s.description, createdAt: s.created_at,
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
    .from('setup_submissions').select('*')
    .eq('id', id).eq('status', 'approved').single()
  return data ? dbToSetup(data) : null
}

function Cell({ items, label }: {
  items: { value: string | number | boolean }[]
  label: string
}) {
  const fmt = (v: string | number | boolean) =>
    typeof v === 'boolean' ? (v ? 'あり' : 'なし') : String(v)
  const allSame = items.every((it) => it.value === items[0].value)

  return (
    <tr className="border-b border-stone-100 dark:border-stone-800">
      <td className="py-3 px-4 text-xs text-stone-500 dark:text-stone-400 w-28 shrink-0">{label}</td>
      {items.map((it, i) => (
        <td
          key={i}
          className={`py-3 px-4 text-sm font-medium text-center ${
            !allSame ? 'text-amber-600 dark:text-amber-400' : 'text-stone-800 dark:text-stone-200'
          }`}
        >
          {fmt(it.value)}
        </td>
      ))}
    </tr>
  )
}

function row(label: string, setups: Setup[], getValue: (s: Setup) => string | number | boolean) {
  return <Cell key={label} label={label} items={setups.map((s) => ({ value: getValue(s) }))} />
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string; c?: string }>
}) {
  const { a, b, c } = await searchParams
  if (!a || !b) notFound()

  const fetched = await Promise.all([
    getSetup(a),
    getSetup(b),
    c ? getSetup(c) : Promise.resolve(null),
  ])

  if (!fetched[0] || !fetched[1]) notFound()
  const setupList = fetched.filter(Boolean) as Setup[]

  const shareUrl = `https://desk-setup-hub.vercel.app/compare?a=${a}&b=${b}${c ? `&c=${c}` : ''}`

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/setups" className="text-sm text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
          ← セットアップ一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-3">セットアップ比較</h1>
      </div>

      {/* Header cards */}
      <div className={`grid gap-4 mb-6 ${setupList.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {setupList.map((s) => (
          <Link key={s.id} href={`/setups/${s.id}`} className="group block rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 transition-colors bg-white dark:bg-stone-900">
            <div className="relative h-32 w-full" style={{ backgroundColor: s.imageColor }}>
              {s.imageUrl && (
                <Image src={s.imageUrl} alt={s.title} fill sizes="(max-width: 768px) 33vw, 320px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              )}
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">{s.title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{s.author}</p>
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1">¥{s.totalCost.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Comparison table */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-white dark:bg-stone-900 overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
              <th className="py-2 px-4 text-left text-xs text-stone-400 dark:text-stone-500 font-medium w-28"></th>
              {setupList.map((s) => (
                <th key={s.id} className="py-2 px-4 text-center text-xs text-stone-600 dark:text-stone-400 font-semibold">{s.author}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {row('総額', setupList, (s) => `¥${s.totalCost.toLocaleString()}`)}
            {row('デスク幅', setupList, (s) => `${s.deskWidth}cm`)}
            {row('デスク奥行', setupList, (s) => `${s.deskDepth}cm`)}
            {row('モニター', setupList, (s) => `${s.monitorCount}枚 / ${s.monitorSize}インチ`)}
            {row('昇降デスク', setupList, (s) => s.hasStandingDesk)}
            {row('ウルトラワイド', setupList, (s) => s.hasUltrawide)}
            {row('縦置きモニター', setupList, (s) => s.hasVerticalMonitor)}
            {row('チェア', setupList, (s) => chairLabel[s.chairType])}
            {row('OS', setupList, (s) => s.os ? osLabel[s.os] : '—')}
            {row('PC種別', setupList, (s) => s.pcType ? pcTypeLabel[s.pcType] : '—')}
            {row('メカニカルKB', setupList, (s) => s.hasMechanicalKeyboard)}
            {row('モニターライト', setupList, (s) => s.hasMonitorLight)}
            {row('マイク', setupList, (s) => s.hasMic)}
            {row('Webカメラ', setupList, (s) => s.hasWebcam)}
            {row('用途', setupList, (s) => s.usage.map((u) => usageLabel[u]).join('・'))}
            {row('スタイル', setupList, (s) => s.style.map((st) => styleLabel[st]).join('・'))}
            {row('アイテム数', setupList, (s) => `${s.items.length}点`)}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-stone-400 dark:text-stone-500">
          差異のある項目はオレンジ色で表示されます
        </p>
        <CompareShareButton url={shareUrl} />
      </div>
    </div>
  )
}
