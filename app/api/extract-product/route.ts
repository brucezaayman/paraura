import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL required' }, { status: 400 })
  }

  // Only allow skywalk.info
  try {
    const parsed = new URL(url)
    if (!parsed.hostname.includes('skywalk.info')) {
      return NextResponse.json({ error: 'Only skywalk.info URLs supported' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Paraura/1.0; product import tool)',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch page' }, { status: 502 })
    }

    const html = await res.text()

    // Extract title
    const titleMatch =
      html.match(/<h1[^>]*>([^<]+)<\/h1>/i) ??
      html.match(/<title>([^<]+)<\/title>/i)
    const rawTitle = titleMatch?.[1]?.trim() ?? ''
    // Strip "| Skywalk" suffix if present
    const name = rawTitle.replace(/\s*[|–—-]\s*[Ss]kywalk.*$/, '').trim()

    // Extract meta description
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)
    const description = descMatch?.[1]?.trim() ?? ''

    return NextResponse.json({ name, description })
  } catch (err) {
    console.error('Extract error:', err)
    return NextResponse.json({ error: 'Failed to parse page' }, { status: 500 })
  }
}
