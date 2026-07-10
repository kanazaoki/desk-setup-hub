'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Usage, Style, ItemCategory } from '@/lib/types'

type FormItem = { name: string; category: ItemCategory; price: string }

const usageOptions: { value: Usage; label: string }[] = [
  { value: 'gaming', label: 'ゲーミング' },
  { value: 'programming', label: 'プログラミング' },
  { value: 'design', label: 'デザイン' },
  { value: 'remote', label: 'リモートワーク' },
  { value: 'video', label: '動画編集' },
  { value: 'streaming', label: '配信' },
  { value: 'music', label: '音楽制作' },
  { value: 'study', label: '勉強・学習' },
  { value: 'trading', label: 'トレーダー' },
  { value: 'cad', label: '3D・CAD' },
  { value: 'writing', label: '執筆・ブログ' },
]

const styleOptions: { value: Style; label: string }[] = [
  { value: 'minimal', label: 'ミニマル' },
  { value: 'white', label: '白統一' },
  { value: 'dark', label: 'ダーク' },
  { value: 'rgb', label: 'RGB' },
  { value: 'wood', label: 'ウッド' },
  { value: 'cafe', label: 'カフェ風' },
  { value: 'nordic', label: '北欧' },
  { value: 'industrial', label: 'インダストリアル' },
  { value: 'monochrome', label: 'モノトーン' },
  { value: 'vintage', label: 'ヴィンテージ' },
]

const categoryOptions: { value: ItemCategory; label: string }[] = [
  { value: 'desk', label: 'デスク' },
  { value: 'chair', label: 'チェア' },
  { value: 'monitor', label: 'モニター' },
  { value: 'keyboard', label: 'キーボード' },
  { value: 'mouse', label: 'マウス' },
  { value: 'audio', label: 'オーディオ' },
  { value: 'lighting', label: 'ライティング' },
  { value: 'peripheral', label: '周辺機器' },
  { value: 'other', label: 'その他' },
]

const inputCls = 'w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400'
const labelCls = 'block text-xs text-stone-500 dark:text-stone-400 mb-1'
const sectionCls = 'space-y-4 pb-6 border-b border-stone-200 dark:border-stone-800'
const h2Cls = 'text-base font-semibold text-stone-900 dark:text-stone-100'

export default function SubmitPage() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [snsUrl, setSnsUrl] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [deskWidth, setDeskWidth] = useState('120')
  const [deskDepth, setDeskDepth] = useState('60')
  const [deskColor, setDeskColor] = useState('wood')
  const [hasStandingDesk, setHasStandingDesk] = useState(false)
  const [os, setOs] = useState('windows')
  const [pcType, setPcType] = useState('desktop')

  const [monitorCount, setMonitorCount] = useState('1')
  const [monitorSize, setMonitorSize] = useState('27')
  const [hasVerticalMonitor, setHasVerticalMonitor] = useState(false)
  const [hasUltrawide, setHasUltrawide] = useState(false)

  const [chairType, setChairType] = useState('office')
  const [selectedUsage, setSelectedUsage] = useState<Usage[]>([])
  const [selectedStyle, setSelectedStyle] = useState<Style[]>([])

  const [gadgetNotes, setGadgetNotes] = useState('')
  const [hasMechanicalKeyboard, setHasMechanicalKeyboard] = useState(false)
  const [hasMonitorLight, setHasMonitorLight] = useState(false)
  const [hasStreamDeck, setHasStreamDeck] = useState(false)
  const [hasMic, setHasMic] = useState(false)
  const [hasWebcam, setHasWebcam] = useState(false)
  const [hasMonitorArm, setHasMonitorArm] = useState(false)
  const [hasTrackball, setHasTrackball] = useState(false)
  const [hasDeskMat, setHasDeskMat] = useState(false)
  const [hasUsbHub, setHasUsbHub] = useState(false)
  const [hasDockingStation, setHasDockingStation] = useState(false)
  const [hasLaptopStand, setHasLaptopStand] = useState(false)
  const [hasHeadphoneStand, setHasHeadphoneStand] = useState(false)
  const [hasFootrest, setHasFootrest] = useState(false)
  const [hasNas, setHasNas] = useState(false)
  const [hasSpeaker, setHasSpeaker] = useState(false)

  const [items, setItems] = useState<FormItem[]>([
    { name: '', category: 'desk', price: '' },
  ])

  const [status, setStatus] = useState<'idle' | 'uploading' | 'submitting' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const toggleUsage = (v: Usage) =>
    setSelectedUsage((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])
  const toggleStyle = (v: Style) =>
    setSelectedStyle((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])

  const addItem = () =>
    setItems((prev) => [...prev, { name: '', category: 'desk', price: '' }])
  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i))
  const updateItem = (i: number, field: keyof FormItem, value: string) =>
    setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, [field]: value } : it))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const totalCost = items.reduce((sum, it) => sum + (parseInt(it.price) || 0), 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      setErrorMsg('Supabaseが設定されていません。.env.localにキーを追加してください。')
      setStatus('error')
      return
    }
    if (!title || !author || selectedUsage.length === 0) {
      setErrorMsg('タイトル・名前・用途は必須です')
      setStatus('error')
      return
    }

    setStatus('uploading')
    setErrorMsg('')

    let imageUrl: string | null = null

    if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      const path = `${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('setup-images')
        .upload(path, imageFile, { contentType: imageFile.type })
      if (uploadError) {
        setErrorMsg(`画像アップロード失敗: ${uploadError.message}`)
        setStatus('error')
        return
      }
      const { data: urlData } = supabase.storage.from('setup-images').getPublicUrl(path)
      imageUrl = urlData.publicUrl
    }

    setStatus('submitting')

    const payload = {
      title,
      author,
      sns_url: snsUrl || null,
      description,
      image_url: imageUrl,
      total_cost: totalCost,
      desk_width: parseInt(deskWidth) || 120,
      desk_depth: parseInt(deskDepth) || 60,
      desk_color: deskColor,
      has_standing_desk: hasStandingDesk,
      os,
      pc_type: pcType,
      monitor_count: parseInt(monitorCount) || 1,
      monitor_size: parseInt(monitorSize) || 27,
      has_vertical_monitor: hasVerticalMonitor,
      has_ultrawide: hasUltrawide,
      chair_type: chairType,
      usage: selectedUsage,
      style: selectedStyle,
      has_mechanical_keyboard: hasMechanicalKeyboard,
      has_monitor_light: hasMonitorLight,
      has_stream_deck: hasStreamDeck,
      has_mic: hasMic,
      has_webcam: hasWebcam,
      has_monitor_arm: hasMonitorArm,
      has_trackball: hasTrackball,
      has_desk_mat: hasDeskMat,
      has_usb_hub: hasUsbHub,
      has_docking_station: hasDockingStation,
      has_laptop_stand: hasLaptopStand,
      has_headphone_stand: hasHeadphoneStand,
      has_footrest: hasFootrest,
      has_nas: hasNas,
      has_speaker: hasSpeaker,
      gadget_notes: gadgetNotes || null,
      items: items
        .filter((it) => it.name)
        .map((it) => ({
          name: it.name,
          category: it.category,
          price: parseInt(it.price) || 0,
        })),
    }

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setErrorMsg(`送信失敗: ${body.error ?? res.statusText}`)
      setStatus('error')
      return
    }
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-5xl">🎉</p>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">送信完了！</h1>
        <p className="text-stone-600 dark:text-stone-400">
          投稿を受け付けました。確認後、公開されます。
        </p>
        <a href="/setups" className="inline-block mt-4 px-6 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors">
          セットアップ一覧へ
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
        セットアップを投稿する
      </h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-8">
        確認後に公開されます。投稿は無料です。
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 基本情報 */}
        <div className={sectionCls}>
          <h2 className={h2Cls}>基本情報</h2>
          <div>
            <label className={labelCls}>タイトル <span className="text-red-500">*</span></label>
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ミニマル白統一 プログラマーデスク" required />
          </div>
          <div>
            <label className={labelCls}>名前・ハンドル <span className="text-red-500">*</span></label>
            <input className={inputCls} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="@username" required />
          </div>
          <div>
            <label className={labelCls}>SNS・ブログリンク（任意）</label>
            <input className={inputCls} type="url" value={snsUrl} onChange={(e) => setSnsUrl(e.target.value)} placeholder="https://twitter.com/username" />
          </div>
          <div>
            <label className={labelCls}>説明</label>
            <textarea className={`${inputCls} resize-none h-24`} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="デスクのこだわりや構築の経緯を書いてください" />
          </div>

          {/* Image upload */}
          <div>
            <label className={labelCls}>写真</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="cursor-pointer border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-lg overflow-hidden hover:border-amber-400 transition-colors"
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="preview" className="w-full h-52 object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-36 text-stone-400 dark:text-stone-600 gap-2">
                  <span className="text-3xl">📷</span>
                  <span className="text-sm">クリックして写真を選択</span>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
        </div>

        {/* デスク・部屋 */}
        <div className={sectionCls}>
          <h2 className={h2Cls}>デスク・部屋</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>デスク幅 (cm)</label>
              <input type="number" className={inputCls} value={deskWidth} onChange={(e) => setDeskWidth(e.target.value)} placeholder="120" />
            </div>
            <div>
              <label className={labelCls}>デスク奥行き (cm)</label>
              <input type="number" className={inputCls} value={deskDepth} onChange={(e) => setDeskDepth(e.target.value)} placeholder="60" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>デスクカラー</label>
              <select className={inputCls} value={deskColor} onChange={(e) => setDeskColor(e.target.value)}>
                {[['white', '白'], ['black', '黒'], ['wood', '木目'], ['other', 'その他']].map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-stone-700 dark:text-stone-300">
              <input type="checkbox" checked={hasStandingDesk} onChange={(e) => setHasStandingDesk(e.target.checked)} className="accent-amber-500" />
              昇降デスクあり
            </label>
          </div>
          <div>
            <label className={labelCls}>OS / メインPC</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {([['mac', 'Mac'], ['windows', 'Windows'], ['linux', 'Linux'], ['other', 'その他']] as const).map(([v, l]) => (
                <button key={v} type="button" onClick={() => setOs(v)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${os === v ? 'bg-amber-500 border-amber-500 text-white' : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>PC種別</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {([['desktop', 'デスクトップ'], ['laptop', 'ノートPC'], ['both', '両方']] as const).map(([v, l]) => (
                <button key={v} type="button" onClick={() => setPcType(v)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${pcType === v ? 'bg-amber-500 border-amber-500 text-white' : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* モニター */}
        <div className={sectionCls}>
          <h2 className={h2Cls}>モニター</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>枚数</label>
              <select className={inputCls} value={monitorCount} onChange={(e) => setMonitorCount(e.target.value)}>
                {['1', '2', '3', '4'].map((n) => <option key={n} value={n}>{n}枚</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>メインサイズ (インチ)</label>
              <input type="number" className={inputCls} value={monitorSize} onChange={(e) => setMonitorSize(e.target.value)} placeholder="27" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              [hasVerticalMonitor, setHasVerticalMonitor, '縦置きあり'],
              [hasUltrawide, setHasUltrawide, 'ウルトラワイド'],
            ].map(([val, setter, label]) => (
              <label key={label as string} className="flex items-center gap-2 cursor-pointer text-sm text-stone-700 dark:text-stone-300">
                <input type="checkbox" checked={val as boolean} onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)} className="accent-amber-500" />
                {label as string}
              </label>
            ))}
          </div>
        </div>

        {/* 用途・スタイル */}
        <div className={sectionCls}>
          <h2 className={h2Cls}>用途・スタイル</h2>
          <div>
            <label className={labelCls}>用途 <span className="text-red-500">*</span>（複数選択可）</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {usageOptions.map(({ value, label }) => (
                <button key={value} type="button" onClick={() => toggleUsage(value)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedUsage.includes(value) ? 'bg-amber-500 border-amber-500 text-white' : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>スタイル（複数選択可）</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {styleOptions.map(({ value, label }) => (
                <button key={value} type="button" onClick={() => toggleStyle(value)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedStyle.includes(value) ? 'bg-amber-500 border-amber-500 text-white' : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>チェア種別</label>
            <select className={inputCls} value={chairType} onChange={(e) => setChairType(e.target.value)}>
              <option value="gaming">ゲーミング</option>
              <option value="office">オフィスチェア</option>
              <option value="other">その他</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>ガジェット</label>
            <div className="flex flex-wrap gap-4">
              {[
                [hasMechanicalKeyboard, setHasMechanicalKeyboard, 'メカニカルキーボード'],
                [hasTrackball, setHasTrackball, 'トラックボール'],
                [hasMonitorArm, setHasMonitorArm, 'モニターアーム'],
                [hasMonitorLight, setHasMonitorLight, 'モニターライト'],
                [hasDeskMat, setHasDeskMat, 'デスクマット'],
                [hasSpeaker, setHasSpeaker, 'スピーカー'],
                [hasHeadphoneStand, setHasHeadphoneStand, 'ヘッドホンスタンド'],
                [hasUsbHub, setHasUsbHub, 'USBハブ'],
                [hasDockingStation, setHasDockingStation, 'ドッキングステーション'],
                [hasLaptopStand, setHasLaptopStand, 'ノートPCスタンド'],
                [hasFootrest, setHasFootrest, 'フットレスト'],
                [hasStreamDeck, setHasStreamDeck, 'Stream Deck'],
                [hasMic, setHasMic, 'マイク'],
                [hasWebcam, setHasWebcam, 'Webカメラ'],
                [hasNas, setHasNas, 'NAS'],
              ].map(([val, setter, label]) => (
                <label key={label as string} className="flex items-center gap-2 cursor-pointer text-sm text-stone-700 dark:text-stone-300">
                  <input type="checkbox" checked={val as boolean} onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)} className="accent-amber-500" />
                  {label as string}
                </label>
              ))}
            </div>
            <div className="mt-3">
              <label className={labelCls}>その他のガジェット・こだわりアイテム（自由記述）</label>
              <textarea
                className={`${inputCls} resize-none h-20`}
                value={gadgetNotes}
                onChange={(e) => setGadgetNotes(e.target.value)}
                placeholder="KVMスイッチ、チェアマット、アームレスト、ラズパイ、タブレット、ケーブルトレー など"
              />
            </div>
          </div>
        </div>

        {/* アイテムリスト */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className={h2Cls}>使用アイテム</h2>
            <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
              合計 ¥{totalCost.toLocaleString()}
            </span>
          </div>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="rounded-lg border border-stone-200 dark:border-stone-800 p-3 space-y-2 bg-stone-50 dark:bg-stone-900">
                <div className="flex gap-2">
                  <input className={`${inputCls} flex-1`} placeholder="商品名" value={item.name} onChange={(e) => updateItem(i, 'name', e.target.value)} />
                  <button type="button" onClick={() => removeItem(i)} className="text-stone-400 hover:text-red-500 px-2 transition-colors shrink-0">✕</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select className={inputCls} value={item.category} onChange={(e) => updateItem(i, 'category', e.target.value)}>
                    {categoryOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                  </select>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">¥</span>
                    <input className={`${inputCls} pl-6`} type="number" placeholder="価格" value={item.price} onChange={(e) => updateItem(i, 'price', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addItem} className="w-full py-2 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 text-sm text-stone-500 hover:border-amber-400 hover:text-amber-600 transition-colors">
            ＋ アイテムを追加
          </button>
        </div>

        {/* Error */}
        {status === 'error' && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">{errorMsg}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'uploading' || status === 'submitting'}
          className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold transition-colors"
        >
          {status === 'uploading' ? '画像アップロード中...' : status === 'submitting' ? '送信中...' : '投稿する'}
        </button>
      </form>
    </div>
  )
}
