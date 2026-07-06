import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null

export type SupabaseSetup = {
  id: string
  title: string
  author: string
  image_url: string | null
  total_cost: number
  desk_width: number
  desk_depth: number
  room_type: string
  is_rental: boolean
  usage: string[]
  monitor_count: number
  monitor_size: number
  has_vertical_monitor: boolean
  has_ultrawide: boolean
  has_standing_desk: boolean
  desk_color: string
  chair_type: string
  style: string[]
  cable_management: string
  has_mechanical_keyboard: boolean
  has_monitor_light: boolean
  has_stream_deck: boolean
  has_mic: boolean
  has_webcam: boolean
  items: Array<{ name: string; category: string; price: number; rakutenUrl?: string }>
  description: string
  status: 'pending' | 'approved'
  created_at: string
}
