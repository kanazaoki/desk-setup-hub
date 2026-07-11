import { Usage } from '../types'

export interface ProductSuggestion {
  minAmount: number
  name: string
  note?: string
}

export interface BudgetCategory {
  name: string
  key: string
  ratio: number
  color: string
  suggestions: ProductSuggestion[]
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
      {
        name: 'モニター', key: 'monitor', ratio: 0.30, color: '#E8873A',
        suggestions: [
          { minAmount: 0, name: 'AOC 24G2SP', note: '24インチ 165Hz IPS' },
          { minAmount: 18000, name: 'LG 27GP850-B', note: '27インチ 165Hz Nano IPS' },
          { minAmount: 35000, name: 'ASUS ROG Swift PG279QM', note: '27インチ 240Hz' },
          { minAmount: 70000, name: 'ASUS ROG Swift PG32UQXR', note: '32インチ 4K 144Hz' },
        ],
      },
      {
        name: 'チェア', key: 'chair', ratio: 0.18, color: '#3A7BE8',
        suggestions: [
          { minAmount: 0, name: 'ニトリ デスクチェア', note: 'メッシュ 回転昇降' },
          { minAmount: 40000, name: 'AKRacing WOLF', note: 'ゲーミングチェア 入門' },
          { minAmount: 65000, name: 'Secretlab TITAN Evo', note: '高耐久 ランバーサポート' },
          { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード Bサイズ' },
        ],
      },
      {
        name: 'デスク', key: 'desk', ratio: 0.14, color: '#E83A7B',
        suggestions: [
          { minAmount: 0, name: 'ニトリ デスク 120cm', note: 'シンプル入門' },
          { minAmount: 8000, name: 'IKEA LINNMON＋ADILS脚', note: 'コスパ' },
          { minAmount: 20000, name: 'Bauhutte BHD-1000M', note: 'ゲーミングデスク 100cm' },
          { minAmount: 40000, name: 'カナデモノ 天板＋FLEXISPOT脚', note: 'カスタムデスク' },
        ],
      },
      {
        name: 'キーボード', key: 'keyboard', ratio: 0.10, color: '#3AE88D',
        suggestions: [
          { minAmount: 0, name: 'Logicool G213', note: 'メンブレン ゲーミング' },
          { minAmount: 7000, name: 'Keychron K2 赤軸', note: 'メカニカル コンパクト' },
          { minAmount: 15000, name: 'Logicool G915 TKL', note: '薄型 ワイヤレス' },
          { minAmount: 25000, name: 'REALFORCE R3 テンキーレス', note: '静電容量無接点' },
        ],
      },
      {
        name: 'マウス', key: 'mouse', ratio: 0.08, color: '#22C55E',
        suggestions: [
          { minAmount: 0, name: 'Logicool G304', note: 'ワイヤレス 軽量' },
          { minAmount: 5000, name: 'Logicool G703h', note: 'HERO 25K センサー' },
          { minAmount: 25000, name: 'Logicool G PRO X SUPERLIGHT 2', note: '60g 超軽量' },
          { minAmount: 18000, name: 'Razer DeathAdder V3 Pro', note: 'エルゴノミクス ワイヤレス' },
        ],
      },
      {
        name: 'ヘッドセット・スピーカー', key: 'audio', ratio: 0.09, color: '#B03AE8',
        suggestions: [
          { minAmount: 0, name: 'Logicool G433', note: 'DTS Headphone:X' },
          { minAmount: 8000, name: 'SteelSeries Arctis Nova 3', note: 'Hi-Fiドライバー' },
          { minAmount: 15000, name: 'ASTRO A40 TR', note: 'Mixamp付き プロゲーマー仕様' },
          { minAmount: 30000, name: 'SteelSeries Arctis Nova Pro Wireless', note: 'アクティブノイキャン' },
        ],
      },
      {
        name: 'ライティング（RGB等）', key: 'lighting', ratio: 0.06, color: '#F59E0B',
        suggestions: [
          { minAmount: 0, name: 'Govee LEDテープ 2m', note: 'デスク背面RGB' },
          { minAmount: 5000, name: 'Elgato Key Light Mini', note: 'ストリーム向け小型ライト' },
          { minAmount: 12000, name: 'Elgato Key Light Air', note: 'アプリ制御 高輝度' },
        ],
      },
      {
        name: 'コントローラー・アクセサリ', key: 'other', ratio: 0.05, color: '#888',
        suggestions: [
          { minAmount: 0, name: 'デスクマット XL', note: 'ケーブル整理兼用' },
          { minAmount: 4000, name: 'Xbox ワイヤレスコントローラー', note: 'PC対応' },
          { minAmount: 10000, name: 'モニターアーム（シングル）', note: 'エルゴトロン LX互換' },
        ],
      },
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
      {
        name: 'チェア', key: 'chair', ratio: 0.28, color: '#3A7BE8',
        suggestions: [
          { minAmount: 0, name: 'ニトリ デスクチェア', note: 'メッシュ 回転昇降' },
          { minAmount: 35000, name: 'イトーキ サリダ YL8', note: 'ランバーサポート付き' },
          { minAmount: 70000, name: 'オカムラ シルフィー', note: 'メッシュ 長時間向け' },
          { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード Bサイズ' },
        ],
      },
      {
        name: 'モニター', key: 'monitor', ratio: 0.26, color: '#E8873A',
        suggestions: [
          { minAmount: 0, name: 'IODATA LCD-MF241FDB', note: '23.8インチ FHD' },
          { minAmount: 18000, name: 'LG 27QN600-B', note: '27インチ WQHD IPS' },
          { minAmount: 35000, name: 'LG 27UK850-W', note: '27インチ 4K USB-C' },
          { minAmount: 70000, name: 'EIZO FlexScan EV2795', note: '27インチ USB-C ハブ搭載' },
        ],
      },
      {
        name: 'デスク（昇降含む）', key: 'desk', ratio: 0.20, color: '#E83A7B',
        suggestions: [
          { minAmount: 0, name: 'IKEA LINNMON＋ADILS脚', note: 'コスパ' },
          { minAmount: 15000, name: 'カナデモノ 天板＋脚セット', note: 'シンプル固定' },
          { minAmount: 55000, name: 'FLEXISPOT E7 昇降脚＋天板', note: '電動スタンディング' },
          { minAmount: 70000, name: 'FLEXISPOT E7 Pro＋天板', note: '揺れ対策強化版' },
        ],
      },
      {
        name: 'キーボード', key: 'keyboard', ratio: 0.13, color: '#3AE88D',
        suggestions: [
          { minAmount: 0, name: 'Logicool K380', note: 'Bluetooth コンパクト' },
          { minAmount: 6000, name: 'Keychron K2 赤軸', note: 'メカニカル ホットスワップ' },
          { minAmount: 12000, name: 'Logicool MX Keys S', note: 'バックライト 静音' },
          { minAmount: 30000, name: 'HHKB Professional HYBRID', note: '静電容量 無刻印可' },
        ],
      },
      {
        name: 'マウス', key: 'mouse', ratio: 0.07, color: '#22C55E',
        suggestions: [
          { minAmount: 0, name: 'Logicool M350', note: 'Pebble 静音ワイヤレス' },
          { minAmount: 4000, name: 'Logicool M750', note: 'ホイールカスタム可' },
          { minAmount: 8000, name: 'Logicool MX Master 3S', note: '多機能 高精度' },
          { minAmount: 12000, name: 'Logicool MX Vertical', note: 'エルゴノミクス 縦持ち' },
        ],
      },
      {
        name: 'ヘッドフォン・スピーカー', key: 'audio', ratio: 0.04, color: '#B03AE8',
        suggestions: [
          { minAmount: 0, name: 'Sony WH-CH520', note: 'Bluetooth ライトウェイト' },
          { minAmount: 5000, name: 'Sony WH-1000XM5', note: 'ノイキャン旗艦' },
          { minAmount: 15000, name: 'YAMAHA YH-L700A', note: '空間音響対応' },
        ],
      },
      {
        name: 'ハブ・アクセサリ', key: 'other', ratio: 0.02, color: '#888',
        suggestions: [
          { minAmount: 0, name: 'Anker 4-in-1 USB-C ハブ', note: 'コンパクト' },
          { minAmount: 3000, name: 'Anker 575 USB-C ドッキングステーション', note: '13-in-1' },
        ],
      },
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
      {
        name: 'モニター（色域重視）', key: 'monitor', ratio: 0.34, color: '#E8873A',
        suggestions: [
          { minAmount: 0, name: 'BenQ GW2490', note: '24インチ sRGB 99%' },
          { minAmount: 20000, name: 'LG 27UP850-W', note: '27インチ 4K DCI-P3 95%' },
          { minAmount: 45000, name: 'ASUS ProArt PA278QV', note: '27インチ WQHD AdobeRGB 99%' },
          { minAmount: 170000, name: 'EIZO ColorEdge CS2740', note: '27インチ 4K ハードウェアキャリブレーション' },
        ],
      },
      {
        name: 'チェア', key: 'chair', ratio: 0.23, color: '#3A7BE8',
        suggestions: [
          { minAmount: 0, name: 'ニトリ デスクチェア', note: 'メッシュ 回転昇降' },
          { minAmount: 35000, name: 'イトーキ サリダ YL8', note: 'ランバーサポート付き' },
          { minAmount: 70000, name: 'オカムラ シルフィー', note: 'ランバーサポート 高耐久' },
          { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード' },
        ],
      },
      {
        name: 'デスク', key: 'desk', ratio: 0.16, color: '#E83A7B',
        suggestions: [
          { minAmount: 0, name: 'IKEA LINNMON＋脚', note: 'ホワイト コスパ' },
          { minAmount: 15000, name: 'カナデモノ 天板＋脚セット', note: 'シンプル固定' },
          { minAmount: 55000, name: 'FLEXISPOT E7 昇降＋天板', note: '電動スタンディング' },
        ],
      },
      {
        name: 'ペンタブレット', key: 'tablet', ratio: 0.12, color: '#3AE88D',
        suggestions: [
          { minAmount: 0, name: 'Wacom Intuos S', note: 'CTL-4100 入門' },
          { minAmount: 8000, name: 'Wacom Intuos Pro M', note: 'PTH-660 傾き検知' },
          { minAmount: 25000, name: 'Wacom Intuos Pro L', note: 'PTH-860 大判' },
          { minAmount: 75000, name: 'Wacom Cintiq 16', note: '液晶ペンタブ 直描き' },
        ],
      },
      {
        name: 'キーボード', key: 'keyboard', ratio: 0.06, color: '#22C55E',
        suggestions: [
          { minAmount: 0, name: 'Apple Magic Keyboard', note: 'シルバー Touch ID付き' },
          { minAmount: 8000, name: 'Logicool MX Keys S', note: 'バックライト マルチデバイス' },
          { minAmount: 15000, name: 'Keychron K3 Pro', note: '薄型 ホットスワップ' },
        ],
      },
      {
        name: 'マウス', key: 'mouse', ratio: 0.05, color: '#6EE7B7',
        suggestions: [
          { minAmount: 0, name: 'Apple Magic Mouse', note: 'シルバー' },
          { minAmount: 5000, name: 'Logicool MX Master 3S', note: '多機能 高精度 静音' },
          { minAmount: 12000, name: 'Logicool MX Vertical', note: 'エルゴノミクス 腱鞘炎対策' },
        ],
      },
      {
        name: '照明・その他', key: 'other', ratio: 0.04, color: '#888',
        suggestions: [
          { minAmount: 0, name: 'BenQ ScreenBar', note: 'モニター掛け式ライト' },
          { minAmount: 8000, name: 'BenQ ScreenBar Plus', note: 'コントローラー付き' },
          { minAmount: 15000, name: 'Elgato Key Light Air', note: 'アプリ制御 高輝度' },
        ],
      },
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
      {
        name: 'チェア', key: 'chair', ratio: 0.30, color: '#3A7BE8',
        suggestions: [
          { minAmount: 0, name: 'ニトリ デスクチェア', note: 'メッシュ 回転昇降' },
          { minAmount: 35000, name: 'イトーキ サリダ YL8', note: 'ランバーサポート付き' },
          { minAmount: 70000, name: 'オカムラ シルフィー', note: 'メッシュ ランバーサポート' },
          { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード Bサイズ' },
        ],
      },
      {
        name: 'モニター', key: 'monitor', ratio: 0.23, color: '#E8873A',
        suggestions: [
          { minAmount: 0, name: 'IODATA LCD-MF241FDB', note: '23.8インチ FHD' },
          { minAmount: 15000, name: 'LG 27QN600-B', note: '27インチ WQHD IPS' },
          { minAmount: 55000, name: 'LG 34WP65C-B', note: '34インチ ウルトラワイド' },
          { minAmount: 70000, name: 'EIZO FlexScan EV2795', note: 'USB-C ハブ一体型' },
        ],
      },
      {
        name: 'デスク（昇降推奨）', key: 'desk', ratio: 0.18, color: '#E83A7B',
        suggestions: [
          { minAmount: 0, name: 'IKEA LINNMON＋ADILS脚', note: 'コスパ' },
          { minAmount: 15000, name: 'カナデモノ 天板＋脚セット', note: 'シンプル固定' },
          { minAmount: 55000, name: 'FLEXISPOT E7 昇降脚＋天板', note: '電動スタンディング' },
        ],
      },
      {
        name: 'マイク', key: 'mic', ratio: 0.10, color: '#B03AE8',
        suggestions: [
          { minAmount: 0, name: 'Anker PowerConf S500', note: 'スピーカーフォン兼用' },
          { minAmount: 5000, name: 'Blue Snowball iCE', note: 'USB コンデンサー入門' },
          { minAmount: 10000, name: 'Blue Yeti X', note: 'USB 4極性パターン' },
          { minAmount: 25000, name: 'Shure MV7', note: 'USB/XLR ダイナミック' },
        ],
      },
      {
        name: 'Webカメラ', key: 'webcam', ratio: 0.08, color: '#8B5CF6',
        suggestions: [
          { minAmount: 0, name: 'Logicool C920n', note: 'FHD 30fps 定番' },
          { minAmount: 8000, name: 'Logicool StreamCam', note: 'FHD 60fps 縦横両対応' },
          { minAmount: 15000, name: 'Logicool Brio 4K', note: '4K AI フレーム' },
          { minAmount: 30000, name: 'Sony ZV-E10＋キャプチャ', note: 'ミラーレス転用 最高画質' },
        ],
      },
      {
        name: 'キーボード・マウス', key: 'input', ratio: 0.07, color: '#3AE88D',
        suggestions: [
          { minAmount: 0, name: 'Logicool MK470', note: 'ワイヤレスセット' },
          { minAmount: 5000, name: 'Logicool MX Keys Mini＋MX Anywhere 3', note: 'コンパクトセット' },
          { minAmount: 15000, name: 'Logicool MX Keys S＋MX Master 3S', note: 'フル多機能セット' },
        ],
      },
      {
        name: 'ハブ・その他', key: 'other', ratio: 0.04, color: '#888',
        suggestions: [
          { minAmount: 0, name: 'Anker 4-in-1 USB-C ハブ', note: 'コンパクト' },
          { minAmount: 5000, name: 'Anker 575 USB-C ドッキングステーション', note: '13-in-1' },
        ],
      },
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
      {
        name: 'モニター（色域最優先）', key: 'monitor', ratio: 0.35, color: '#E8873A',
        suggestions: [
          { minAmount: 0, name: 'BenQ GW2490', note: '24インチ sRGB 99%' },
          { minAmount: 20000, name: 'LG 27UP850-W', note: '27インチ 4K DCI-P3 95%' },
          { minAmount: 45000, name: 'ASUS ProArt PA278QV', note: '27インチ WQHD AdobeRGB 99%' },
          { minAmount: 170000, name: 'EIZO ColorEdge CS2740', note: '27インチ 4K キャリブレーション' },
        ],
      },
      {
        name: 'チェア', key: 'chair', ratio: 0.20, color: '#3A7BE8',
        suggestions: [
          { minAmount: 0, name: 'ニトリ デスクチェア', note: 'メッシュ 回転昇降' },
          { minAmount: 40000, name: 'AKRacing WOLF', note: 'ゲーミング 長時間対応' },
          { minAmount: 70000, name: 'オカムラ シルフィー', note: 'メッシュ 高耐久' },
          { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード' },
        ],
      },
      {
        name: 'デスク', key: 'desk', ratio: 0.16, color: '#E83A7B',
        suggestions: [
          { minAmount: 0, name: 'IKEA LINNMON＋脚', note: 'コスパ' },
          { minAmount: 15000, name: 'カナデモノ 天板＋脚セット', note: '広め 固定' },
          { minAmount: 55000, name: 'FLEXISPOT E7 昇降＋天板', note: '電動スタンディング' },
        ],
      },
      {
        name: 'Stream Deck・コントローラー', key: 'controller', ratio: 0.10, color: '#3AE88D',
        suggestions: [
          { minAmount: 0, name: 'Elgato Stream Deck Mini', note: '6キー コンパクト' },
          { minAmount: 8000, name: 'Elgato Stream Deck MK.2', note: '15キー スタンダード' },
          { minAmount: 20000, name: 'Elgato Stream Deck XL', note: '32キー フル' },
          { minAmount: 35000, name: 'Blackmagic DaVinci Resolve Speed Editor', note: 'プロ編集用コントローラー' },
        ],
      },
      {
        name: '外付けSSD・キャプチャ', key: 'storage', ratio: 0.09, color: '#F59E0B',
        suggestions: [
          { minAmount: 0, name: 'Samsung T7 1TB', note: 'USB-C 外付けSSD' },
          { minAmount: 10000, name: 'Samsung T9 2TB', note: '高速 外付けSSD' },
          { minAmount: 20000, name: 'AverMedia Live Gamer Ultra 2.1', note: '4Kキャプチャカード' },
        ],
      },
      {
        name: 'キーボード', key: 'keyboard', ratio: 0.06, color: '#22C55E',
        suggestions: [
          { minAmount: 0, name: 'Logicool MX Keys Mini', note: 'コンパクト バックライト' },
          { minAmount: 8000, name: 'Logicool MX Keys S', note: 'フルサイズ バックライト' },
          { minAmount: 15000, name: 'REALFORCE R3 テンキーレス', note: '静電容量無接点' },
        ],
      },
      {
        name: 'マウス', key: 'mouse', ratio: 0.04, color: '#6EE7B7',
        suggestions: [
          { minAmount: 0, name: 'Logicool M750', note: 'マルチデバイス 静音' },
          { minAmount: 5000, name: 'Logicool MX Master 3S', note: '多機能 高精度 静音' },
        ],
      },
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
      {
        name: 'モニター（多画面）', key: 'monitor', ratio: 0.20, color: '#E8873A',
        suggestions: [
          { minAmount: 0, name: 'IODATA 23.8インチ FHD', note: '配信確認サブ用' },
          { minAmount: 15000, name: 'LG 27QN600-B', note: '27インチ WQHD メイン' },
          { minAmount: 55000, name: 'LG 34WP65C-B', note: '34インチ ウルトラワイド' },
          { minAmount: 50000, name: 'LG 27QN600-B × 2台', note: '27インチ WQHD デュアル構成' },
        ],
      },
      {
        name: 'マイク', key: 'mic', ratio: 0.18, color: '#B03AE8',
        suggestions: [
          { minAmount: 0, name: 'Blue Snowball iCE', note: 'USB コンデンサー入門' },
          { minAmount: 8000, name: 'Blue Yeti X', note: 'USB 4極性パターン' },
          { minAmount: 18000, name: 'Shure MV7', note: 'USB/XLR ダイナミック' },
          { minAmount: 35000, name: 'SHURE SM7B＋オーディオIF', note: 'プロ放送レベル' },
        ],
      },
      {
        name: 'チェア', key: 'chair', ratio: 0.16, color: '#3A7BE8',
        suggestions: [
          { minAmount: 0, name: 'ニトリ デスクチェア', note: 'メッシュ 回転昇降' },
          { minAmount: 40000, name: 'AKRacing WOLF', note: 'ゲーミング 長時間対応' },
          { minAmount: 65000, name: 'Secretlab TITAN Evo', note: '高耐久 ランバーサポート' },
          { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード' },
        ],
      },
      {
        name: 'カメラ', key: 'camera', ratio: 0.14, color: '#8B5CF6',
        suggestions: [
          { minAmount: 0, name: 'Logicool C920n', note: 'FHD 30fps 定番' },
          { minAmount: 8000, name: 'Logicool StreamCam', note: 'FHD 60fps 縦横対応' },
          { minAmount: 20000, name: 'Sony ZV-1F＋キャプチャ', note: 'コンデジ転用 高画質' },
          { minAmount: 50000, name: 'Sony ZV-E10＋キャプチャ', note: 'ミラーレス ボケ感' },
        ],
      },
      {
        name: 'デスク', key: 'desk', ratio: 0.12, color: '#E83A7B',
        suggestions: [
          { minAmount: 0, name: 'Bauhutte BHD-1000M', note: 'ゲーミングデスク 100cm' },
          { minAmount: 15000, name: 'カナデモノ 天板＋脚セット', note: 'シンプル固定' },
          { minAmount: 55000, name: 'FLEXISPOT E7 昇降＋天板', note: '電動スタンディング' },
        ],
      },
      {
        name: '照明（キーライト等）', key: 'lighting', ratio: 0.10, color: '#F59E0B',
        suggestions: [
          { minAmount: 0, name: 'Elgato Key Light Mini', note: '小型 アプリ制御' },
          { minAmount: 6000, name: 'Elgato Key Light Air', note: 'アプリ制御 高輝度' },
          { minAmount: 12000, name: 'Elgato Key Light×2台', note: '両サイドライティング' },
          { minAmount: 25000, name: 'Neewer 480 LEDパネル×2', note: 'プロ照明セット' },
        ],
      },
      {
        name: 'Stream Deck・キャプチャ', key: 'capture', ratio: 0.10, color: '#3AE88D',
        suggestions: [
          { minAmount: 0, name: 'Elgato Stream Deck Mini', note: '6キー コンパクト' },
          { minAmount: 8000, name: 'Elgato Stream Deck MK.2＋HD60 S+', note: '15キー＋4Kキャプチャ' },
          { minAmount: 25000, name: 'Elgato Stream Deck XL＋4K60 Pro', note: 'フルセット構成' },
        ],
      },
    ],
    recommendations: [
      { minBudget: 0, label: '〜5万円', description: 'Blue Yeti＋既存PC活用＋リングライト' },
      { minBudget: 50000, label: '5〜15万円', description: 'Shure MV7＋27インチ＋Stream Deck MK.2＋ソニーカメラ' },
      { minBudget: 150000, label: '15〜30万円', description: '27インチ×2〜3枚体制＋マイクアーム＋キーライト' },
      { minBudget: 300000, label: '30万円〜', description: '3画面フル配信環境＋ハーマンミラー＋プロ照明セット' },
    ],
  },
  music: {
    label: '音楽制作',
    description: 'オーディオインターフェースとモニタースピーカーが制作クオリティを決める',
    categories: [
      { name: 'オーディオ機器', key: 'audio', ratio: 0.35, color: '#B03AE8', suggestions: [
        { minAmount: 0, name: 'Focusrite Scarlett Solo', note: 'USB-C オーディオIF 入門' },
        { minAmount: 15000, name: 'Focusrite Scarlett 2i2', note: '2in2out スタジオ定番' },
        { minAmount: 30000, name: 'YAMAHA HS5', note: 'モニタースピーカー ペア' },
        { minAmount: 200000, name: 'Universal Audio Apollo Twin X', note: 'UADプラグイン対応' },
      ]},
      { name: 'チェア', key: 'chair', ratio: 0.20, color: '#3A7BE8', suggestions: [
        { minAmount: 0, name: 'ニトリ デスクチェア', note: 'メッシュ 入門' },
        { minAmount: 20000, name: 'オカムラ シルフィー', note: '長時間座り作業向け' },
        { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード Bサイズ' },
      ]},
      { name: 'デスク', key: 'desk', ratio: 0.18, color: '#E83A7B', suggestions: [
        { minAmount: 0, name: 'ニトリ 幅140cmデスク', note: '機材を置ける広さ' },
        { minAmount: 25000, name: 'カナデモノ 天板 150cm', note: 'DIYカスタム' },
        { minAmount: 60000, name: 'FLEXISPOT E7 昇降デスク', note: '140cm天板セット' },
      ]},
      { name: 'ヘッドホン', key: 'peripheral', ratio: 0.15, color: '#3AE88D', suggestions: [
        { minAmount: 0, name: 'Audio-Technica ATH-M20x', note: 'モニターヘッドホン 入門' },
        { minAmount: 10000, name: 'Sony MDR-7506', note: 'スタジオ定番' },
        { minAmount: 30000, name: 'Beyerdynamic DT 770 PRO', note: '密閉型 フラット特性' },
      ]},
      { name: 'モニター', key: 'monitor', ratio: 0.12, color: '#E8873A', suggestions: [
        { minAmount: 0, name: 'IODATA 24インチ FHD', note: 'DAW操作用' },
        { minAmount: 20000, name: 'LG 27UL500-W', note: '4K 27インチ トラック数表示向け' },
      ]},
    ],
    recommendations: [
      { minBudget: 0, label: '〜5万円', description: 'Scarlett Solo＋ATH-M20x＋ニトリデスク' },
      { minBudget: 50000, label: '5〜15万円', description: 'Scarlett 2i2＋YAMAHA HS5＋快適チェア' },
      { minBudget: 150000, label: '15〜30万円', description: 'Apollo Twin＋HS8＋昇降デスク' },
      { minBudget: 300000, label: '30万円〜', description: 'プロスタジオ相当の音響環境＋ハーマンミラー' },
    ],
  },
  study: {
    label: '勉強・学習',
    description: '集中できる環境と目に優しいモニターが鍵',
    categories: [
      { name: 'デスク', key: 'desk', ratio: 0.28, color: '#E83A7B', suggestions: [
        { minAmount: 0, name: 'ニトリ デスク 120cm', note: 'シンプル入門' },
        { minAmount: 12000, name: 'IKEA MICKE', note: 'コンパクト 引き出し付き' },
        { minAmount: 35000, name: 'FLEXISPOT EG1', note: '昇降 座り疲れ軽減' },
        { minAmount: 80000, name: 'カナデモノ＋FLEXISPOT E7', note: 'カスタム昇降デスク' },
      ]},
      { name: 'チェア', key: 'chair', ratio: 0.28, color: '#3A7BE8', suggestions: [
        { minAmount: 0, name: 'ニトリ デスクチェア メッシュ', note: '入門' },
        { minAmount: 35000, name: 'イトーキ サリダ YL8', note: '背もたれメッシュ' },
        { minAmount: 70000, name: 'オカムラ シルフィー', note: 'ランバーサポート' },
        { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード' },
      ]},
      { name: 'モニター', key: 'monitor', ratio: 0.22, color: '#E8873A', suggestions: [
        { minAmount: 0, name: 'BenQ GW2480', note: '24インチ アイケア' },
        { minAmount: 18000, name: 'BenQ EW2780U', note: '4K 27インチ ブルーライト軽減' },
        { minAmount: 40000, name: 'DELL U2723QE', note: '4K USB-C 目に優しい' },
      ]},
      { name: 'ライティング', key: 'lighting', ratio: 0.12, color: '#F59E0B', suggestions: [
        { minAmount: 0, name: 'Baseus モニターライト', note: 'グレア防止' },
        { minAmount: 5000, name: 'BenQ ScreenBar Plus', note: '手元調光 アンビエント' },
        { minAmount: 15000, name: 'BenQ ScreenBar Halo', note: 'バックライト付き' },
      ]},
      { name: 'その他', key: 'other', ratio: 0.10, color: '#888', suggestions: [
        { minAmount: 0, name: 'タイマー・ポモドーロ', note: '集中管理' },
        { minAmount: 3000, name: 'ノイズキャンセリングイヤホン', note: '図書館・カフェ勉向け' },
        { minAmount: 20000, name: 'Sony WH-1000XM5', note: 'ANC ヘッドホン' },
      ]},
    ],
    recommendations: [
      { minBudget: 0, label: '〜3万円', description: 'ニトリデスク＋チェア＋アイケアモニター基本セット' },
      { minBudget: 30000, label: '3〜10万円', description: 'BenQ ScreenBar＋4Kモニター＋良いチェア' },
      { minBudget: 100000, label: '10〜20万円', description: '昇降デスク＋オカムラチェア＋4K27インチ' },
      { minBudget: 200000, label: '20万円〜', description: 'ハーマンミラー＋フル昇降環境＋ANC完備' },
    ],
  },
  trading: {
    label: 'トレーダー',
    description: '複数モニターとリアルタイム情報表示が生命線',
    categories: [
      { name: 'モニター', key: 'monitor', ratio: 0.38, color: '#E8873A', suggestions: [
        { minAmount: 0, name: 'IODATA 27インチ FHD ×2', note: 'デュアルモニター入門' },
        { minAmount: 40000, name: 'LG 27UK850-W ×2', note: '4K USB-C デュアル' },
        { minAmount: 80000, name: 'DELL U2723QE ×3', note: 'トリプル4K体制' },
        { minAmount: 250000, name: 'DELL U2723QE × 4台', note: 'Bloomberg風 4K4画面構成' },
      ]},
      { name: 'チェア', key: 'chair', ratio: 0.22, color: '#3A7BE8', suggestions: [
        { minAmount: 0, name: 'ニトリ デスクチェア', note: '入門' },
        { minAmount: 40000, name: 'AKRacing WOLF', note: '長時間対応 入門ゲーミング' },
        { minAmount: 70000, name: 'オカムラ シルフィー', note: 'ビジネス向け高耐久' },
        { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード 長時間最適' },
      ]},
      { name: 'デスク', key: 'desk', ratio: 0.18, color: '#E83A7B', suggestions: [
        { minAmount: 0, name: 'ニトリ 幅160cmデスク', note: 'マルチモニター対応幅' },
        { minAmount: 30000, name: 'Bauhutte トレーダー向けデスク', note: '多段 モニターアーム付き' },
        { minAmount: 70000, name: 'カナデモノ 180cm＋FLEXISPOT', note: '昇降 広面積' },
      ]},
      { name: 'モニターアーム', key: 'peripheral', ratio: 0.12, color: '#3AE88D', suggestions: [
        { minAmount: 0, name: 'エルゴトロン互換 シングル', note: '1画面用' },
        { minAmount: 8000, name: 'エルゴトロン LX', note: 'デュアル用 ×2' },
        { minAmount: 25000, name: 'エルゴトロン HX＋LX', note: 'トリプル体制' },
      ]},
      { name: 'その他', key: 'other', ratio: 0.10, color: '#888', suggestions: [
        { minAmount: 0, name: 'UPS（無停電電源装置）', note: '停電対策 必須' },
        { minAmount: 15000, name: 'KVMスイッチ', note: 'PC切替 ×2台管理' },
      ]},
    ],
    recommendations: [
      { minBudget: 0, label: '〜8万円', description: 'デュアル27インチ＋ニトリ幅広デスク＋モニターアーム' },
      { minBudget: 80000, label: '8〜20万円', description: 'トリプル4K＋良いチェア＋昇降デスク' },
      { minBudget: 200000, label: '20〜40万円', description: '4K×4画面＋ハーマンミラー＋UPS完備' },
      { minBudget: 400000, label: '40万円〜', description: 'ブルームバーグ端末並みフル環境' },
    ],
  },
  cad: {
    label: '3D・CAD',
    description: 'GPU性能と色再現性の高いモニターが最重要',
    categories: [
      { name: 'モニター', key: 'monitor', ratio: 0.30, color: '#E8873A', suggestions: [
        { minAmount: 0, name: 'BenQ PD2700U', note: '4K 27インチ sRGB100%' },
        { minAmount: 170000, name: 'EIZO ColorEdge CS2740', note: '4K 自己校正 AdobeRGB' },
        { minAmount: 570000, name: 'EIZO ColorEdge CG319X', note: '31インチ DCI-P3 98%' },
      ]},
      { name: 'チェア', key: 'chair', ratio: 0.22, color: '#3A7BE8', suggestions: [
        { minAmount: 0, name: 'オカムラ バロン', note: '長時間フィット' },
        { minAmount: 70000, name: 'オカムラ シルフィー', note: '背面メッシュ 高耐久' },
        { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード' },
      ]},
      { name: 'デスク', key: 'desk', ratio: 0.18, color: '#E83A7B', suggestions: [
        { minAmount: 0, name: 'ニトリ 幅140cmデスク', note: 'A3図面・タブレット対応幅' },
        { minAmount: 40000, name: 'カナデモノ 150cm＋脚', note: 'クリエイター向け' },
        { minAmount: 80000, name: 'FLEXISPOT E7 昇降 150cm', note: '高さ変更可 長時間対策' },
      ]},
      { name: 'ペンタブレット', key: 'peripheral', ratio: 0.18, color: '#3AE88D', suggestions: [
        { minAmount: 0, name: 'Wacom Intuos S', note: 'ペンタブ 入門' },
        { minAmount: 15000, name: 'Wacom Intuos Pro M', note: 'プロ向け 傾き検知' },
        { minAmount: 75000, name: 'Wacom Cintiq 16', note: '液晶ペンタブレット 16インチ' },
        { minAmount: 105000, name: 'Wacom Cintiq 22', note: '21.5インチ 液晶ペンタブ FHD' },
        { minAmount: 460000, name: 'Wacom Cintiq Pro 27', note: '4K 液晶ペンタブ フラッグシップ' },
      ]},
      { name: 'キーボード・マウス', key: 'keyboard', ratio: 0.12, color: '#22C55E', suggestions: [
        { minAmount: 0, name: 'Logicool MX Keys', note: 'テンキー付き CADショートカット向け' },
        { minAmount: 10000, name: 'Logicool MX Master 3S', note: '精密スクロール' },
      ]},
    ],
    recommendations: [
      { minBudget: 0, label: '〜8万円', description: 'BenQ 4K＋Wacom Intuos Pro＋快適チェア' },
      { minBudget: 80000, label: '8〜20万円', description: 'EIZO 4K＋Cintiq 16＋昇降デスク' },
      { minBudget: 200000, label: '20〜40万円', description: 'Cintiq Pro 27＋ハーマンミラー＋広面積デスク' },
      { minBudget: 400000, label: '40万円〜', description: 'ColorEdge自己校正＋Cintiq Proフル環境' },
    ],
  },
  writing: {
    label: '執筆・ブログ',
    description: 'キーボードの打鍵感と集中できる静かな環境が大切',
    categories: [
      { name: 'キーボード', key: 'keyboard', ratio: 0.30, color: '#3AE88D', suggestions: [
        { minAmount: 0, name: 'Logicool K380', note: 'Bluetooth コンパクト' },
        { minAmount: 20000, name: 'Keychron Q1', note: 'アルミ ガスケット 静音赤軸' },
        { minAmount: 30000, name: 'HHKB Professional HYBRID', note: '静電容量 無接点 コンパクト' },
        { minAmount: 40000, name: 'HHKB Studio', note: 'ポインティングデバイス内蔵' },
      ]},
      { name: 'チェア', key: 'chair', ratio: 0.28, color: '#3A7BE8', suggestions: [
        { minAmount: 0, name: 'ニトリ デスクチェア', note: '入門' },
        { minAmount: 20000, name: 'イトーキ エフチェア', note: '腰サポート 長時間向け' },
        { minAmount: 80000, name: 'オカムラ シルフィー', note: 'ランバーサポート メッシュ' },
        { minAmount: 200000, name: 'ハーマンミラー アーロン', note: 'リマスタード' },
      ]},
      { name: 'デスク', key: 'desk', ratio: 0.18, color: '#E83A7B', suggestions: [
        { minAmount: 0, name: 'IKEA LINNMON 120cm', note: 'シンプル' },
        { minAmount: 20000, name: 'カナデモノ 天板 120cm', note: '木目 落ち着く' },
        { minAmount: 60000, name: 'FLEXISPOT 昇降デスク', note: '長時間立ち姿勢OK' },
      ]},
      { name: 'モニター', key: 'monitor', ratio: 0.14, color: '#E8873A', suggestions: [
        { minAmount: 0, name: 'BenQ GW2480 24インチ', note: 'ブルーライト軽減' },
        { minAmount: 20000, name: 'LG 27UN880-B', note: '4K Ergo アーム付き' },
        { minAmount: 45000, name: 'DELL U2722DE', note: '27インチ USB-C 長時間向け' },
      ]},
      { name: 'その他', key: 'other', ratio: 0.10, color: '#888', suggestions: [
        { minAmount: 0, name: 'Kindle / タブレット スタンド', note: '参考書・資料表示' },
        { minAmount: 3000, name: 'ノイズキャンセリングイヤホン', note: '執筆中の集中維持' },
        { minAmount: 15000, name: 'Sony WH-1000XM5', note: 'ANC 最高峰' },
      ]},
    ],
    recommendations: [
      { minBudget: 0, label: '〜5万円', description: 'HHKB入門＋BenQ 24インチ＋ニトリチェア' },
      { minBudget: 50000, label: '5〜15万円', description: 'REALFORCE静音＋4Kモニター＋良いチェア' },
      { minBudget: 150000, label: '15〜25万円', description: '昇降デスク＋オカムラ＋HHKBフル環境' },
      { minBudget: 250000, label: '25万円〜', description: 'ハーマンミラー＋ANC完備＋最上位キーボード' },
    ],
  },
}
