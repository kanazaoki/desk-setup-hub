'use client'

import { useState } from 'react'

type Props = { title: string; url: string }

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false)

  const xText = encodeURIComponent(`${title}\n\n#デスク環境 #個人開発\n`)
  const xUrl = `https://twitter.com/intent/tweet?text=${xText}&url=${encodeURIComponent(url)}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700">
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">このセットアップをシェア</p>
      <div className="flex gap-2">
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-700 dark:bg-stone-100 dark:hover:bg-stone-300 text-white dark:text-stone-900 text-sm font-medium transition-colors"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Xでシェア
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 hover:border-amber-400 dark:hover:border-amber-500 text-stone-700 dark:text-stone-300 text-sm font-medium transition-colors"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              コピーしました
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              リンクをコピー
            </>
          )}
        </button>
      </div>
    </div>
  )
}
