'use server'

import { createServerClient } from '@/lib/supabase'

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
  try {
    const supabase = createServerClient()

    // Upsert pilot — match on email
    const pilotData = {
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp ?? null,
      pilot_level: data.pilot_level ?? null,
      weight: data.weight ?? null,
      updated_at: new Date().toISOString(),
    }

    const { data: pilot, error: pilotError } = await supabase
      .from('pilots')
      .upsert(pilotData, { onConflict: 'email' })
      .select('id')
      .single()

    if (pilotError) {
      console.error('Pilot upsert error:', pilotError)
      return { success: false, error: 'Failed to save your details.' }
    }

    // Build full message with context
    const fullMessage = [
      data.wing_of_interest ? `Wing of interest: ${data.wing_of_interest}` : null,
      data.flying_goal ? `Flying goal: ${data.flying_goal}` : null,
      data.message ? `Message: ${data.message}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    // Create inquiry
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

    return { success: true }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
