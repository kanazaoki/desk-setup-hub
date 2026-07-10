export type Usage = 'gaming' | 'programming' | 'design' | 'remote' | 'video' | 'streaming' | 'music' | 'study' | 'trading' | 'cad' | 'writing'
export type DeskColor = 'white' | 'black' | 'wood' | 'other'
export type ChairType = 'gaming' | 'office' | 'other'
export type Style = 'minimal' | 'rgb' | 'cafe' | 'monochrome' | 'wood' | 'white' | 'dark' | 'nordic' | 'industrial' | 'vintage'
export type RoomType = 'studio' | 'larger' | 'dedicated'
export type OsType = 'mac' | 'windows' | 'linux' | 'other'
export type PcType = 'desktop' | 'laptop' | 'both'
export type CableManagement = 'clean' | 'loose'
export type ItemCategory = 'desk' | 'chair' | 'monitor' | 'keyboard' | 'mouse' | 'audio' | 'lighting' | 'peripheral' | 'other'

export interface SetupItem {
  name: string
  category: ItemCategory
  price: number
  rakutenUrl?: string
  amazonUrl?: string
}

export interface Setup {
  id: string
  title: string
  author: string
  imageColor: string
  imageUrl?: string
  totalCost: number
  deskWidth: number
  deskDepth: number
  roomType?: RoomType
  isRental?: boolean
  os?: OsType
  pcType?: PcType
  usage: Usage[]
  monitorCount: number
  monitorSize: number
  hasVerticalMonitor: boolean
  hasUltrawide: boolean
  hasStandingDesk: boolean
  deskColor: DeskColor
  chairType: ChairType
  style: Style[]
  cableManagement?: CableManagement
  hasMechanicalKeyboard: boolean
  hasMonitorLight: boolean
  hasStreamDeck: boolean
  hasMic: boolean
  hasWebcam: boolean
  hasMonitorArm?: boolean
  hasTrackball?: boolean
  hasDeskMat?: boolean
  hasUsbHub?: boolean
  hasDockingStation?: boolean
  hasLaptopStand?: boolean
  hasHeadphoneStand?: boolean
  hasFootrest?: boolean
  hasNas?: boolean
  hasSpeaker?: boolean
  items: SetupItem[]
  description: string
  snsUrl?: string
  gadgetNotes?: string
  createdAt: string
}

export interface FilterState {
  budgetMin: number | null
  budgetMax: number | null
  deskWidthMin: number | null
  usage: Usage | null
  monitorCount: number | null
  hasStandingDesk: boolean | null
  hasUltrawide: boolean | null
  hasVerticalMonitor: boolean | null
  style: Style | null
  chairType: ChairType | null
  os: OsType | null
  pcType: PcType | null
}
