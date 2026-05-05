import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { count, error } = await supabase
      .from('pilots')
      .select('*', { count: 'exact', head: true })

    if (error) throw error

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      pilots: count,
    })
  } catch (err) {
    console.error('Keep-alive failed:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
