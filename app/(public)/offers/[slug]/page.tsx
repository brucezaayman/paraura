import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import { Campaign } from '@/types'
import CampaignInterestForm from './CampaignInterestForm'

export const revalidate = 60

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('campaigns').select('title, tagline')
      .eq('slug', params.slug).eq('status', 'active').single()
    if (!data) return {}
    return {
      title: `${data.title} — Paraura`,
      description: data.tagline ?? undefined,
      robots: { index: false, follow: false },
    }
  } catch { return {} }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-ZA', { dateStyle: 'long' })
}

export default async function CampaignPage({ params }: Props) {
  let campaign: Campaign | null = null
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('campaigns').select('*')
      .eq('slug', params.slug).eq('status', 'active').single()
    campaign = data as Campaign
  } catch { notFound() }

  if (!campaign) notFound()

  const isExpired = campaign.valid_until
    ? new Date(campaign.valid_until) < new Date()
    : false

  return (
    <div style={{ backgroundColor: 'var(--surface-light)', minHeight: '100vh' }}>
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-night)', color: 'var(--color-cloud)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, var(--color-blue) 0%, transparent 60%)' }} />
        <div className="section relative z-10 max-w-3xl">
          <p className="eyebrow-dark mb-4">Special Offer</p>
          <h1 className="display-lg text-white mb-4">{campaign.title}</h1>
          {campaign.tagline && (
            <p className="text-xl font-light" style={{ color: 'var(--color-thermal)' }}>
              {campaign.tagline}
            </p>
          )}
          {campaign.valid_until && (
            <p className="mt-4 text-sm" style={{ color: 'rgba(107,163,214,0.7)' }}>
              {isExpired ? 'This offer has expired.' : `Valid until ${formatDate(campaign.valid_until)}`}
            </p>
          )}
        </div>
      </div>

      {campaign.cover_image && (
        <div className="w-full overflow-hidden" style={{ maxHeight: '440px' }}>
          <img src={campaign.cover_image} alt={campaign.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="py-16 lg:py-20">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {campaign.description && (
                <p className="text-lg font-light leading-relaxed mb-8" style={{ color: 'var(--color-carbon)' }}>
                  {campaign.description}
                </p>
              )}
              {campaign.content && (
                <div className="prose-paraura" dangerouslySetInnerHTML={{ __html: campaign.content }} />
              )}
            </div>
            <div className="lg:col-span-1">
              {isExpired ? (
                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
                  <p className="text-sm" style={{ color: 'var(--text-muted-light)' }}>
                    This offer has expired. Get in touch for current availability.
                  </p>
                </div>
              ) : (
                <CampaignInterestForm campaignId={campaign.id} campaignTitle={campaign.title} />
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`@media print { header, footer, nav { display: none !important; } }`}</style>
    </div>
  )
}
