'use client'

import { useState, useEffect, useCallback } from 'react'

type Submission = {
  id: string
  title: string
  author: string
  total_cost: number
  status: 'pending' | 'approved' | 'rejected'
  usage: string[]
  style: string[]
  image_url: string | null
  description: string
  created_at: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  const fetchSubmissions = useCallback(async (pw: string) => {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/submissions', {
      headers: { 'x-admin-password': pw },
    })
    if (res.status === 401) {
      setError('パスワードが違います')
      setAuthed(false)
    } else if (!res.ok) {
      setError('取得に失敗しました')
    } else {
      const data = await res.json()
      setSubmissions(data)
      setAuthed(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchSubmissions(password)
  }

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    const res = await fetch('/api/admin/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('admin-pw')
    if (saved) {
      setPassword(saved)
      fetchSubmissions(saved)
    }
  }, [fetchSubmissions])

  const handleLoginSuccess = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('admin-pw', password)
    fetchSubmissions(password)
  }

  const filtered = submissions.filter((s) => filter === 'all' || s.status === filter)
  const counts = {
    all: submissions.length,
    pending: submissions.filter((s) => s.status === 'pending').length,
    approved: submissions.filter((s) => s.status === 'approved').length,
    rejected: submissions.filter((s) => s.status === 'rejected').length,
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <form
          onSubmit={handleLoginSuccess}
          className="bg-white dark:bg-stone-900 rounded-2xl p-8 shadow-lg w-full max-w-sm space-y-4"
        >
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">管理者ログイン</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors disabled:opacity-50"
          >
            {loading ? '確認中...' : 'ログイン'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">投稿管理</h1>
        <button
          onClick={() => { sessionStorage.removeItem('admin-pw'); setAuthed(false) }}
          className="text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
        >
          ログアウト
        </button>
      </div>

      {/* フィルタータブ */}
      <div className="flex gap-2 mb-6">
        {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-amber-500 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {f === 'pending' ? '審査待ち' : f === 'approved' ? '承認済み' : f === 'rejected' ? '却下' : 'すべて'}
            <span className="ml-1.5 text-xs opacity-70">{counts[f]}</span>
          </button>
        ))}
        <button
          onClick={() => fetchSubmissions(password)}
          className="ml-auto text-sm text-amber-600 dark:text-amber-400 hover:underline"
        >
          更新
        </button>
      </div>

      {loading && <p className="text-stone-500 text-center py-12">読み込み中...</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-stone-500 dark:text-stone-400 text-center py-12">該当する投稿がありません</p>
      )}

      <div className="space-y-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden"
          >
            <div className="flex gap-4 p-4">
              {/* サムネイル */}
              <div
                className="w-24 h-20 rounded-lg shrink-0 bg-stone-200 dark:bg-stone-700 overflow-hidden"
              >
                {s.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.image_url} alt={s.title} className="w-full h-full object-cover" />
                )}
              </div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-semibold text-stone-900 dark:text-stone-100 truncate">{s.title}</h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{s.author} · ¥{s.total_cost.toLocaleString()}</p>
                  </div>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${
                    s.status === 'approved'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : s.status === 'rejected'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                  }`}>
                    {s.status === 'approved' ? '承認済み' : s.status === 'rejected' ? '却下' : '審査待ち'}
                  </span>
                </div>
                {s.description && (
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">{s.description}</p>
                )}
                <p className="mt-1 text-xs text-stone-400 dark:text-stone-600">
                  {new Date(s.created_at).toLocaleString('ja-JP')}
                </p>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex gap-2 px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => updateStatus(s.id, 'approved')}
                disabled={s.status === 'approved'}
                className="px-4 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 disabled:bg-green-300 dark:disabled:bg-green-900 text-white text-sm font-medium transition-colors"
              >
                承認
              </button>
              <button
                onClick={() => updateStatus(s.id, 'rejected')}
                disabled={s.status === 'rejected'}
                className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 disabled:bg-red-300 dark:disabled:bg-red-900 text-white text-sm font-medium transition-colors"
              >
                却下
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
