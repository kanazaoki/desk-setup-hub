import { Usage } from '../types'

export interface BudgetCategory {
  name: string
  key: string
  ratio: number
  color: string
}

export interface BudgetRecommendation {
  minBudget: number
  label: string
  description: string
}

export interface UsageProfile {
  label: string
  description: string
  categories: BudgetCategory[]
  recommendations: BudgetRecommendation[]
}

export const usageProfiles: Record<Usage, UsageProfile> = {
  gaming: {
    label: 'ゲーミング',
    description: 'FPS・高リフレッシュレートモニターが最優先',
    categories: [
      { name: 'モニター', key: 'monitor', ratio: 0.35, color: '#E8873A' },
      { name: 'チェア', key: 'chair', ratio: 0.20, color: '#3A7BE8' },
      { name: 'キーボード・マウス', key: 'input', ratio: 0.15, color: '#3AE88D' },
      { name: 'デスク', key: 'desk', ratio: 0.15, color: '#E83A7B' },
      { name: 'ヘッドセット・スピーカー', key: 'audio', ratio: 0.10, color: '#B03AE8' },
      { name: 'その他（ライティング等）', key: 'other', ratio: 0.05, color: '#888' },
    ],
    recommendations: [
      { minBudget: 0, label: '〜5万円', description: '中古チェア＋ニトリ机＋24インチ144Hz入門機' },
      { minBudget: 50000, label: '5〜15万円', description: '27インチ144Hz＋AKRacingチェア＋メカニカルキーボード' },
      { minBudget: 150000, label: '15〜30万円', description: '27インチ240Hz＋Secretlab＋ゲーミングマウス高級機' },
      { minBudget: 300000, label: '30万円〜', description: '4K144Hz＋ハーマンミラー＋フルRGB照明完備' },
    ],
  },
  programming: {
    label: 'プログラミング',
    description: 'チェアとモニター画素数が生産性を左右する',
    categories: [
      { name: 'チェア', key: 'chair', ratio: 0.30, color: '#3A7BE8' },
      { name: 'モニター', key: 'monitor', ratio: 0.30, color: '#E8873A' },
      { name: 'デスク（昇降機能含む）', key: 'desk', ratio: 0.20, color: '#E83A7B' },
      { name: 'キーボード', key: 'input', ratio: 0.12, color: '#3AE88D' },
      { name: 'その他', key: 'other', ratio: 0.08, color: '#888' },
    ],
    recommendations: [
      { minBudget: 0, label: '〜5万円', description: '中古オフィスチェア＋24インチFHD＋ニトリ机' },
      { minBudget: 50000, label: '5〜15万円', description: 'コンテッサ中古＋27インチWQHD＋静電容量キーボード' },
      { minBudget: 150000, label: '15〜30万円', description: 'カナデモノ＋FLEXISPOT E7＋デュアル27インチ4K' },
      { minBudget: 300000, label: '30万円〜', description: 'ハーマンミラー＋32インチ4K×2枚＋HHKB' },
    ],
  },
  design: {
    label: 'デザイン',
    description: '色再現性の高いモニターと手首に優しい入力環境が重要',
    categories: [
      { name: 'モニター（色域重視）', key: 'monitor', ratio: 0.38, color: '#E8873A' },
      { name: 'チェア', key: 'chair', ratio: 0.25, color: '#3A7BE8' },
      { name: 'デスク', key: 'desk', ratio: 0.17, color: '#E83A7B' },
      { name: 'ペンタブ・入力', key: 'input', ratio: 0.13, color: '#3AE88D' },
      { name: 'その他', key: 'other', ratio: 0.07, color: '#888' },
    ],
    recommendations: [
      { minBudget: 0, label: '〜5万円', description: '24インチsRGBモニター＋Wacom Intuos S＋ニトリ机' },
      { minBudget: 50000, label: '5〜15万円', description: '27インチAdobe RGB対応＋Intuos Pro M＋コスパチェア' },
      { minBudget: 150000, label: '15〜30万円', description: '32インチDCI-P3 95%＋ハーマンミラー中古＋Intuos Pro L' },
      { minBudget: 300000, label: '30万円〜', description: 'Studio Display＋アーロンチェア＋Intuos Pro L＋昇降机' },
    ],
  },
  remote: {
    label: 'リモートワーク',
    description: '長時間座るのでチェア最優先。会議のためのオーディオも重要',
    categories: [
      { name: 'チェア', key: 'chair', ratio: 0.35, color: '#3A7BE8' },
      { name: 'モニター', key: 'monitor', ratio: 0.25, color: '#E8873A' },
      { name: 'デスク（昇降推奨）', key: 'desk', ratio: 0.20, color: '#E83A7B' },
      { name: 'マイク・カメラ', key: 'audio', ratio: 0.12, color: '#B03AE8' },
      { name: 'その他', key: 'other', ratio: 0.08, color: '#888' },
    ],
    recommendations: [
      { minBudget: 0, label: '〜5万円', description: '中古オフィスチェア＋24インチFHD＋USB会議マイク' },
      { minBudget: 50000, label: '5〜15万円', description: 'コンテッサ中古＋27インチ＋ニトリ机＋Logicool C920' },
      { minBudget: 150000, label: '15〜30万円', description: 'エルゴヒューマン＋ウルトラワイド＋昇降机＋Jabra' },
      { minBudget: 300000, label: '30万円〜', description: 'アーロン＋34インチ以上＋FLEXISPOT E7 Pro＋Shure MV7' },
    ],
  },
  video: {
    label: '動画編集',
    description: 'カラグレ用の高色域モニターとスペックの高い外部デバイス',
    categories: [
      { name: 'モニター（色域最優先）', key: 'monitor', ratio: 0.40, color: '#E8873A' },
      { name: 'チェア', key: 'chair', ratio: 0.22, color: '#3A7BE8' },
      { name: 'デスク', key: 'desk', ratio: 0.18, color: '#E83A7B' },
      { name: 'コントローラー（Stream Deck等）', key: 'input', ratio: 0.12, color: '#3AE88D' },
      { name: 'その他', key: 'other', ratio: 0.08, color: '#888' },
    ],
    recommendations: [
      { minBudget: 0, label: '〜5万円', description: 'sRGBモニター＋中古チェア（まず始めることが最優先）' },
      { minBudget: 50000, label: '5〜15万円', description: '27インチAdobe RGB＋AKRacingチェア＋Stream Deck MK.2' },
      { minBudget: 150000, label: '15〜30万円', description: '32インチDCI-P3＋ハーマンミラー中古＋Stream Deck XL' },
      { minBudget: 300000, label: '30万円〜', description: 'Studio Display＋BenQ カラグレモニター＋アーロン' },
    ],
  },
  streaming: {
    label: '配信',
    description: '画質・音質の配信クオリティと複数アプリ管理のための多画面',
    categories: [
      { name: 'マイク・カメラ・照明', key: 'audio', ratio: 0.30, color: '#B03AE8' },
      { name: 'モニター（多画面）', key: 'monitor', ratio: 0.28, color: '#E8873A' },
      { name: 'チェア', key: 'chair', ratio: 0.18, color: '#3A7BE8' },
      { name: 'デスク', key: 'desk', ratio: 0.14, color: '#E83A7B' },
      { name: 'キャプチャー・周辺', key: 'input', ratio: 0.10, color: '#3AE88D' },
    ],
    recommendations: [
      { minBudget: 0, label: '〜5万円', description: 'Blue Yeti＋既存PC活用＋リングライト' },
      { minBudget: 50000, label: '5〜15万円', description: 'Shure MV7＋27インチ＋Stream Deck MK.2＋ソニーカメラ' },
      { minBudget: 150000, label: '15〜30万円', description: '27インチ×2〜3枚体制＋マイクアーム＋キーライト' },
      { minBudget: 300000, label: '30万円〜', description: '3画面フル配信環境＋ハーマンミラー＋プロ照明セット' },
    ],
  },
}
