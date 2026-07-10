import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^﻿/, '').trim()
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/^﻿/, '').trim()

export const supabase = url && key ? createClient(url, key) : null

export type SupabaseSetup = {
  id: string
  title: string
  author: string
  image_url: string | null
  total_cost: number
  desk_width: number
  desk_depth: number
  room_type?: string
  is_rental?: boolean
  os?: string
  pc_type?: string
  usage: string[]
  monitor_count: number
  monitor_size: number
  has_vertical_monitor: boolean
  has_ultrawide: boolean
  has_standing_desk: boolean
  desk_color: string
  chair_type: string
  style: string[]
  cable_management?: string
  has_mechanical_keyboard: boolean
  has_monitor_light: boolean
  has_stream_deck: boolean
  has_mic: boolean
  has_webcam: boolean
  has_monitor_arm?: boolean
  has_trackball?: boolean
  has_desk_mat?: boolean
  has_usb_hub?: boolean
  has_docking_station?: boolean
  has_laptop_stand?: boolean
  has_headphone_stand?: boolean
  has_footrest?: boolean
  has_nas?: boolean
  has_speaker?: boolean
  items: Array<{ name: string; category: string; price: number; rakutenUrl?: string }>
  description: string
  sns_url?: string | null
  gadget_notes?: string | null
  status: 'pending' | 'approved'
  created_at: string
}
