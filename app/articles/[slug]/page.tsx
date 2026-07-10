import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { articles, getArticle, type Article } from "@/lib/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: { title: article.title, description: article.description },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related: Article[] = article.relatedSlugs
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a): a is Article => !!a);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Back */}
      <Link href="/articles" className="text-sm text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
        ← 記事一覧
      </Link>

      {/* Header */}
      <div className="mt-6 mb-8">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 leading-tight mb-3">
          {article.title}
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-500">
          {new Date(article.publishedAt).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })} 公開
        </p>
      </div>

      {/* Content */}
      <article className="space-y-8">
        {article.sections.map((section, i) => (
          <section key={i} className="space-y-3">
            {section.heading && (
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 border-l-4 border-amber-500 pl-3">
                {section.heading}
              </h2>
            )}
            {section.body && (
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[15px]">
                {section.body}
              </p>
            )}
            {section.table && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-100 dark:bg-stone-800">
                      {section.table.headers.map((h) => (
                        <th key={h} className="text-left px-3 py-2 font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => (
                      <tr key={ri} className="even:bg-stone-50 dark:even:bg-stone-900/40">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {section.table.note && (
                  <p className="text-xs text-stone-400 mt-1.5">{section.table.note}</p>
                )}
              </div>
            )}
            {section.list && (
              <ul className="space-y-1.5">
                {section.list.map((item, li) => (
                  <li key={li} className="flex gap-2 text-stone-700 dark:text-stone-300 text-[15px]">
                    <span className="text-amber-500 mt-0.5 shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.tip && (
              <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-3">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  💡 {section.tip}
                </p>
              </div>
            )}
          </section>
        ))}
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4">関連記事</h2>
          <div className="space-y-3">
            {related.map((rel) => (
              <Link key={rel.slug} href={`/articles/${rel.slug}`} className="group flex gap-3 p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-700 bg-white dark:bg-stone-900 transition-all">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {rel.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                    {rel.title}
                  </p>
                </div>
                <span className="text-stone-300 dark:text-stone-600 shrink-0 self-center">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 p-5 rounded-2xl bg-stone-100 dark:bg-stone-800 text-center space-y-3">
        <p className="font-bold text-stone-800 dark:text-stone-200">{article.cta.text}</p>
        <p className="text-sm text-stone-500">DeskHub のセットアップ事例で実際の使用例を確認できます</p>
        <Link
          href={article.cta.href}
          className="inline-block px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-colors"
        >
          {article.cta.label}
        </Link>
      </div>
    </div>
  );
}
