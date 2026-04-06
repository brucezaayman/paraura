'use server'

import { createServerClient } from '@/lib/supabase'

interface CampaignInterestData {
  campaign_id: string
  name: string
  email: string
  whatsapp?: string
  message?: string
}

export async function submitCampaignInterest(
  data: CampaignInterestData
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServerClient()

    // Upsert pilot
    const { data: pilot, error: pilotError } = await supabase
      .from('pilots')
      .upsert(
        { name: data.name, email: data.email, whatsapp: data.whatsapp ?? null, updated_at: new Date().toISOString() },
        { onConflict: 'email' }
      )
      .select('id')
      .single()

    if (pilotError || !pilot) {
      return { success: false, error: 'Failed to save your details.' }
    }

    // Create campaign interest record
    const { error: interestError } = await supabase
      .from('campaign_interests')
      .insert({
        campaign_id: data.campaign_id,
        pilot_id: pilot.id,
        message: data.message ?? null,
        created_at: new Date().toISOString(),
      })

    if (interestError) {
      return { success: false, error: 'Failed to register interest.' }
    }

    // Also create a CRM inquiry so it appears in the leads dashboard
    await supabase.from('inquiries').insert({
      pilot_id: pilot.id,
      source: 'campaign',
      message: data.message
        ? `Campaign interest. Message: ${data.message}`
        : 'Campaign interest registered.',
      status: 'new',
      created_at: new Date().toISOString(),
    })

    return { success: true }
  } catch (err) {
    console.error('Campaign interest error:', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
