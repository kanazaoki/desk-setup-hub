import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { setups } from '@/lib/data/setups'
import { articles } from '@/lib/data/articles'

const BASE = 'https://desk-setup-hub.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/setups`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/submit`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/articles`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/tools/budget`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/tools/compatibility`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/tools/ergonomics`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/tools/monitor-size`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const staticSetupPages: MetadataRoute.Sitemap = setups.map((s) => ({
    url: `${BASE}/setups/${s.id}`,
    lastModified: new Date(s.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  let dbSetupPages: MetadataRoute.Sitemap = []
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (url && key) {
    const supabase = createClient(url, key)
    const { data } = await supabase
      .from('setup_submissions')
      .select('id, created_at')
      .eq('status', 'approved')
    if (data) {
      const staticIds = new Set(setups.map((s) => s.id))
      dbSetupPages = data
        .filter((row) => !staticIds.has(row.id))
        .map((row) => ({
          url: `${BASE}/setups/${row.id}`,
          lastModified: new Date(row.created_at),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }))
    }
  }

  return [...staticPages, ...articlePages, ...staticSetupPages, ...dbSetupPages]
}
