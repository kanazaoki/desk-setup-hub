import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/^﻿/, '').trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!.replace(/^﻿/, '').trim()
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  const payload = await req.json()

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('setup_submissions')
    .insert({ ...payload, status: 'pending' })
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const resend = new Resend(resendKey)
    const adminUrl = `https://desk-setup-hub.vercel.app/admin`
    const usageLabel: Record<string, string> = {
      gaming: 'ゲーミング', programming: 'プログラミング', design: 'デザイン',
      remote: 'リモートワーク', video: '動画編集', streaming: '配信',
      music: '音楽制作', study: '勉強・学習', trading: 'トレーダー', cad: '3D・CAD', writing: '執筆・ブログ',
    }

    await resend.emails.send({
      from: 'DeskHub <onboarding@resend.dev>',
      to: 'koma.games26@gmail.com',
      subject: `【DeskHub】新しい投稿が届きました — ${payload.title}`,
      html: `
        <h2 style="color:#92400e;">新しいセットアップ投稿</h2>
        <table style="border-collapse:collapse;width:100%;max-width:480px;">
          <tr><td style="padding:6px 0;color:#78716c;width:100px;">タイトル</td><td style="padding:6px 0;font-weight:bold;">${payload.title}</td></tr>
          <tr><td style="padding:6px 0;color:#78716c;">投稿者</td><td style="padding:6px 0;">${payload.author}</td></tr>
          <tr><td style="padding:6px 0;color:#78716c;">総額</td><td style="padding:6px 0;">¥${Number(payload.total_cost).toLocaleString()}</td></tr>
          <tr><td style="padding:6px 0;color:#78716c;">用途</td><td style="padding:6px 0;">${(payload.usage as string[]).map((u) => usageLabel[u] ?? u).join('・')}</td></tr>
          ${payload.sns_url ? `<tr><td style="padding:6px 0;color:#78716c;">SNS</td><td style="padding:6px 0;"><a href="${payload.sns_url}">${payload.sns_url}</a></td></tr>` : ''}
          ${payload.description ? `<tr><td style="padding:6px 0;color:#78716c;vertical-align:top;">説明</td><td style="padding:6px 0;">${payload.description}</td></tr>` : ''}
        </table>
        <p style="margin-top:24px;">
          <a href="${adminUrl}" style="background:#f59e0b;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
            管理画面で確認する →
          </a>
        </p>
      `,
    })
  }

  return NextResponse.json({ id: data?.id })
}
