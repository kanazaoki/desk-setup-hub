-- DeskHub: setup_submissions テーブル
create table public.setup_submissions (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  author text not null,
  image_url text,
  total_cost integer not null,
  desk_width integer not null,
  desk_depth integer not null,
  room_type text not null default 'larger',
  is_rental boolean not null default false,
  usage text[] not null default '{}',
  monitor_count integer not null default 1,
  monitor_size integer not null default 24,
  has_vertical_monitor boolean not null default false,
  has_ultrawide boolean not null default false,
  has_standing_desk boolean not null default false,
  desk_color text not null default 'other',
  chair_type text not null default 'office',
  style text[] not null default '{}',
  cable_management text not null default 'loose',
  has_mechanical_keyboard boolean not null default false,
  has_monitor_light boolean not null default false,
  has_stream_deck boolean not null default false,
  has_mic boolean not null default false,
  has_webcam boolean not null default false,
  items jsonb not null default '[]',
  description text not null default '',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- RLS（Row Level Security）
alter table public.setup_submissions enable row level security;

-- 誰でも投稿可能
create policy "anyone can insert" on public.setup_submissions
  for insert with check (true);

-- 承認済みのみ閲覧可能
create policy "read approved only" on public.setup_submissions
  for select using (status = 'approved');

-- Storage: setup-images バケット作成
-- Supabase ダッシュボードの Storage から手動で作成してください
-- バケット名: setup-images
-- 公開: ON
