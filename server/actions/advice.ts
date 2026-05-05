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
  try {
    const supabase = createServerClient()

    // Test connection first
    const { error: testError } = await supabase
      .from('pilots')
      .select('id')
      .limit(1)

    if (testError) {
      console.error('DB connection test failed:', JSON.stringify(testError))
      return { success: false, error: `DB error: ${testError.message}` }
    }

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
      console.error('Pilot upsert error:', JSON.stringify(pilotError))
      return { success: false, error: `Pilot error: ${pilotError.message}` }
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
      console.error('Inquiry insert error:', JSON.stringify(inquiryError))
      return { success: false, error: `Inquiry error: ${inquiryError.message}` }
    }

    // Fire emails non-blocking
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
    }).catch((err) => console.error('Notification email failed:', err))

    sendAdviceConfirmation({
      name: data.name,
      email: data.email,
    }).catch((err) => console.error('Confirmation email failed:', err))

    return { success: true }

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Unexpected error in submitAdviceRequest:', message)
    return { success: false, error: message }
  }
}
