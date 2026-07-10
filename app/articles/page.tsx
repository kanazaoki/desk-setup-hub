import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "記事・ガイド",
  description: "デスクセットアップに関する実践的なガイド記事。デスク幅の選び方、モニター配置、ケーブル管理など。",
};

export default function ArticlesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">記事・ガイド</h1>
      <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">デスクセットアップに役立つ実践的なガイド</p>

      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="block group">
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all duration-200">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-bold text-stone-900 dark:text-stone-100 text-[15px] leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1.5">
                {article.title}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                {article.description}
              </p>
              <p className="text-xs text-stone-400 mt-3">
                {new Date(article.publishedAt).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
