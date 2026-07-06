export interface DeskTop {
  id: string
  brand: string
  model: string
  widths: number[]
  depth: number
  hasFrameBeam: boolean
  notes?: string
}

export interface DeskLeg {
  id: string
  brand: string
  model: string
  minWidth: number
  maxWidth: number
  minDepth: number
  maxLoad: number
  mountType: 'bolt' | 'clamp' | 'both'
  notes?: string
}

export type CompatibilityResult = 'ok' | 'warning' | 'ng'

export interface CompatibilityCheck {
  result: CompatibilityResult
  reasons: string[]
  tips: string[]
}

export const deskTops: DeskTop[] = [
  { id: 'kanade-140-70', brand: 'カナデモノ', model: '140×70cm', widths: [140], depth: 70, hasFrameBeam: false },
  { id: 'kanade-160-70', brand: 'カナデモノ', model: '160×70cm', widths: [160], depth: 70, hasFrameBeam: false },
  { id: 'kanade-120-70', brand: 'カナデモノ', model: '120×70cm', widths: [120], depth: 70, hasFrameBeam: false },
  { id: 'kanade-180-70', brand: 'カナデモノ', model: '180×70cm', widths: [180], depth: 70, hasFrameBeam: false },
  { id: 'flexispot-140-70', brand: 'FLEXISPOT純正', model: '140×70cm', widths: [140], depth: 70, hasFrameBeam: false },
  { id: 'flexispot-120-60', brand: 'FLEXISPOT純正', model: '120×60cm', widths: [120], depth: 60, hasFrameBeam: false },
  { id: 'nitori-120-60', brand: 'ニトリ', model: '学習机 120×60cm', widths: [120], depth: 60, hasFrameBeam: true, notes: '天板裏に補強フレームあり。クランプ式モニターアームは取付位置に注意' },
  { id: 'nitori-100-50', brand: 'ニトリ', model: '学習机 100×50cm', widths: [100], depth: 50, hasFrameBeam: true, notes: '天板裏に補強フレームあり。昇降脚は幅が不足する可能性あり' },
  { id: 'ikea-linnmon-150', brand: 'IKEA', model: 'LINNMON 150×75cm', widths: [150], depth: 75, hasFrameBeam: false, notes: '天板が薄い（約3.4cm）のでボルト留めは注意。クランプ推奨' },
  { id: 'ikea-linnmon-120', brand: 'IKEA', model: 'LINNMON 120×60cm', widths: [120], depth: 60, hasFrameBeam: false, notes: '天板が薄い（約3.4cm）のでボルト留めは注意。クランプ推奨' },
  { id: 'ikea-bekant-160', brand: 'IKEA', model: 'BEKANT 160×80cm', widths: [160], depth: 80, hasFrameBeam: false },
  { id: 'cainz-120-60', brand: 'カインズ', model: 'ワークデスク 120×60cm', widths: [120], depth: 60, hasFrameBeam: true },
  { id: 'muji-130-65', brand: '無印良品', model: 'パイン材デスク 130×65cm', widths: [130], depth: 65, hasFrameBeam: false },
]

export const deskLegs: DeskLeg[] = [
  {
    id: 'flexispot-e7',
    brand: 'FLEXISPOT',
    model: 'E7',
    minWidth: 120,
    maxWidth: 200,
    minDepth: 60,
    maxLoad: 125,
    mountType: 'bolt',
    notes: '幅120cm以上の天板が必要。フレーム幅は42〜72cmで調整可能',
  },
  {
    id: 'flexispot-e7pro',
    brand: 'FLEXISPOT',
    model: 'E7 Pro',
    minWidth: 120,
    maxWidth: 210,
    minDepth: 60,
    maxLoad: 160,
    mountType: 'bolt',
    notes: 'ロの字フレームで安定性が高い。幅・奥行きともに余裕があるとベスト',
  },
  {
    id: 'flexispot-ef1',
    brand: 'FLEXISPOT',
    model: 'EF1',
    minWidth: 100,
    maxWidth: 190,
    minDepth: 50,
    maxLoad: 70,
    mountType: 'bolt',
    notes: 'エントリーモデル。最大積載70kgのため重いモニター複数台は注意',
  },
  {
    id: 'flexispot-eg8',
    brand: 'FLEXISPOT',
    model: 'EG8',
    minWidth: 100,
    maxWidth: 160,
    minDepth: 50,
    maxLoad: 50,
    mountType: 'bolt',
    notes: 'コンパクトモデル。対応天板幅が160cmまでなので注意',
  },
  {
    id: 'sanodesk-e150',
    brand: 'SANODESK',
    model: 'E150',
    minWidth: 120,
    maxWidth: 200,
    minDepth: 60,
    maxLoad: 100,
    mountType: 'bolt',
    notes: 'FLEXISPOTの互換品に近い仕様。品質は個体差あり',
  },
  {
    id: 'bauhutte-bhd1000',
    brand: 'Bauhutte',
    model: 'BHD-1000M',
    minWidth: 100,
    maxWidth: 160,
    minDepth: 50,
    maxLoad: 60,
    mountType: 'bolt',
    notes: 'ゲーミングデスク向け。対応幅が最大160cmなのでワイドデスクは不可',
  },
]

export function checkCompatibility(
  topId: string,
  legId: string
): CompatibilityCheck {
  const top = deskTops.find((d) => d.id === topId)
  const leg = deskLegs.find((l) => l.id === legId)

  if (!top || !leg) {
    return { result: 'ng', reasons: ['データが見つかりません'], tips: [] }
  }

  const reasons: string[] = []
  const tips: string[] = []
  let result: CompatibilityResult = 'ok'

  const width = top.widths[0]

  if (width < leg.minWidth) {
    result = 'ng'
    reasons.push(`天板幅 ${width}cm は ${leg.brand} ${leg.model} の最小対応幅 ${leg.minWidth}cm を下回っています`)
  } else if (width > leg.maxWidth) {
    result = 'ng'
    reasons.push(`天板幅 ${width}cm は ${leg.brand} ${leg.model} の最大対応幅 ${leg.maxWidth}cm を超えています`)
  }

  if (top.depth < leg.minDepth) {
    if (result !== 'ng') result = 'warning'
    reasons.push(`天板奥行き ${top.depth}cm は推奨値 ${leg.minDepth}cm を下回っています。固定が不安定になる可能性があります`)
  }

  if (top.hasFrameBeam) {
    if (result !== 'ng') result = 'warning'
    reasons.push('この天板の裏面には補強フレームがあります。ボルト穴の位置がフレームと干渉する可能性があります')
    tips.push('取付前に天板裏のフレーム位置を確認し、ボルト穴がフレームの外側に来るか確認してください')
  }

  if (top.brand === 'IKEA' && top.model.includes('LINNMON')) {
    if (result !== 'ng') result = 'warning'
    tips.push('LINNMON天板は内部がハニカム構造で薄いため、ボルト締め付けを強くしすぎると破損します。クランプ式アダプターの使用を推奨します')
  }

  if (leg.notes) tips.push(leg.notes)
  if (top.notes) tips.push(top.notes)

  if (result === 'ok') {
    reasons.push(`天板幅 ${width}cm は ${leg.brand} ${leg.model} の対応範囲内です`)
    reasons.push(`天板奥行き ${top.depth}cm は取り付け可能です`)
  }

  return { result, reasons, tips }
}
