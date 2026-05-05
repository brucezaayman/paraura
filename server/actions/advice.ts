'use server'

import { createServerClient } from '@/lib/supabase'
import { sendAdviceNotification, sendAdviceConfirmation } from '@/lib/email'

export interface AdviceFormData {
  name: string
  email: string
  whatsapp?: string
  pilot_level?: string
  weight?: number
  wing_of_interest?: string
  flying_goal?: string
  message: string
  source: 'selector' | 'product' | 'homepage'
}

export interface AdviceResult {
  success: boolean
  error?: string
}

export async function submitAdviceRequest(data: AdviceFormData): Promise<AdviceResult> {
  const supabase = createServerClient()

  // Upsert pilot
  const { data: pilot, error: pilotError } = await supabase
    .from('pilots')
    .upsert(
      {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp ?? null,
        pilot_level: data.pilot_level ?? null,
        weight: data.weight ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    )
    .select('id')
    .single()

  if (pilotError) {
    console.error('Pilot upsert error:', pilotError)
    return { success: false, error: 'Failed to save your details.' }
  }

  // Build message
  const fullMessage = [
    data.wing_of_interest ? `Wing of interest: ${data.wing_of_interest}` : null,
    data.flying_goal ? `Flying goal: ${data.flying_goal}` : null,
    data.message ? `Message: ${data.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  // Insert inquiry
  const { error: inquiryError } = await supabase.from('inquiries').insert({
    pilot_id: pilot.id,
    source: data.source,
    message: fullMessage,
    status: 'new',
    created_at: new Date().toISOString(),
  })

  if (inquiryError) {
    console.error('Inquiry insert error:', inquiryError)
    return { success: false, error: 'Failed to submit your request.' }
  }

  // Emails sent after we return — completely non-blocking
  // Using setTimeout(0) ensures the response is sent first
  try {
    sendAdviceNotification({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      pilot_level: data.pilot_level,
      weight: data.weight,
      wing_of_interest: data.wing_of_interest,
      flying_goal: data.flying_goal,
      message: data.message,
      source: data.source,
    }).catch(console.error)

    sendAdviceConfirmation({
      name: data.name,
      email: data.email,
    }).catch(console.error)
  } catch {
    // Never block form submission for email issues
  }

  return { success: true }
}
