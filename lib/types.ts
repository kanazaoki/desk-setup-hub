export type Usage = 'gaming' | 'programming' | 'design' | 'remote' | 'video' | 'streaming'
export type DeskColor = 'white' | 'black' | 'wood' | 'other'
export type ChairType = 'gaming' | 'office' | 'other'
export type Style = 'minimal' | 'rgb' | 'cafe' | 'monochrome' | 'wood'
export type RoomType = 'studio' | 'larger' | 'dedicated'
export type CableManagement = 'clean' | 'loose'
export type ItemCategory = 'desk' | 'chair' | 'monitor' | 'keyboard' | 'mouse' | 'audio' | 'lighting' | 'peripheral' | 'other'

export interface SetupItem {
  name: string
  category: ItemCategory
  price: number
  amazonUrl?: string
}

export interface Setup {
  id: string
  title: string
  author: string
  imageColor: string
  totalCost: number
  deskWidth: number
  deskDepth: number
  roomType: RoomType
  isRental: boolean
  usage: Usage[]
  monitorCount: number
  monitorSize: number
  hasVerticalMonitor: boolean
  hasUltrawide: boolean
  hasStandingDesk: boolean
  deskColor: DeskColor
  chairType: ChairType
  style: Style[]
  cableManagement: CableManagement
  hasMechanicalKeyboard: boolean
  hasMonitorLight: boolean
  hasStreamDeck: boolean
  hasMic: boolean
  hasWebcam: boolean
  items: SetupItem[]
  description: string
  createdAt: string
}

export interface FilterState {
  budgetMax: number | null
  deskWidthMin: number | null
  usage: Usage | null
  monitorCount: number | null
  hasStandingDesk: boolean | null
  style: Style | null
  chairType: ChairType | null
  roomType: RoomType | null
}
