'use client'

import { useState } from 'react'

export default function CompareShareButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent('デスクセットアップを比較してみた #DeskHub')}&url=${encodeURIComponent(url)}`

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={handleCopy}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          copied
            ? 'bg-green-500 text-white'
            : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
        }`}
      >
        {copied ? '✓ コピーしました' : '🔗 URLをコピー'}
      </button>
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
      >
        X でシェア
      </a>
    </div>
  )
}
