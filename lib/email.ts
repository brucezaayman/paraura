import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'info@paraura.com'
const FROM_EMAIL = 'Paraura <info@paraura.com>'

// ── New advice request notification ─────────────────────────
export async function sendAdviceNotification(data: {
  name: string
  email: string
  whatsapp?: string
  pilot_level?: string
  weight?: number
  wing_of_interest?: string
  flying_goal?: string
  message: string
  source: string
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New advice request from ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1A3A5C; margin-bottom: 4px;">New Advice Request</h2>
          <p style="color: #6B7280; margin-top: 0; margin-bottom: 24px;">via paraura.com</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; width: 140px; font-size: 13px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #111827; font-weight: 500;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB;">
                <a href="mailto:${data.email}" style="color: #2B6CB0;">${data.email}</a>
              </td>
            </tr>
            ${data.whatsapp ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">WhatsApp</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB;">
                <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #2B6CB0;">${data.whatsapp}</a>
              </td>
            </tr>` : ''}
            ${data.pilot_level ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">Pilot level</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #111827;">EN-${data.pilot_level}</td>
            </tr>` : ''}
            ${data.weight ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">Weight</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #111827;">${data.weight} kg</td>
            </tr>` : ''}
            ${data.wing_of_interest ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">Wing interest</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #111827;">${data.wing_of_interest}</td>
            </tr>` : ''}
            ${data.flying_goal ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">Flying goal</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #111827;">${data.flying_goal}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; color: #6B7280; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #111827;">${data.message || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #F0EFED; border-radius: 8px;">
            <p style="margin: 0; font-size: 13px; color: #6B7280;">Source: ${data.source} &nbsp;·&nbsp; View in <a href="https://www.paraura.com/admin/leads" style="color: #2B6CB0;">Paraura Admin</a></p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    // Don't block the form submission if email fails
    console.error('Failed to send advice notification email:', err)
  }
}

// ── Pilot confirmation email ─────────────────────────────────
export async function sendAdviceConfirmation(data: {
  name: string
  email: string
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'We received your request — Paraura',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1A3A5C; margin-bottom: 4px;">Thanks, ${data.name}.</h2>
          <p style="color: #2D2D2D; margin-top: 8px; line-height: 1.7;">
            We've received your request and will be in touch shortly — usually within 24 hours.
          </p>
          <p style="color: #2D2D2D; line-height: 1.7;">
            If you'd prefer to chat sooner, WhatsApp us directly:
          </p>
          <p style="margin: 16px 0;">
            <a href="https://wa.me/27826363666" style="color: #2B6CB0; font-weight: 500;">+27 82 636 3666 (SA)</a><br/>
            <a href="https://wa.me/447983345203" style="color: #2B6CB0; font-weight: 500;">+44 79 8334 5203 (UK)</a>
          </p>
          <p style="color: #2D2D2D; line-height: 1.7;">
            In the meantime, feel free to browse the full Skywalk range at
            <a href="https://www.paraura.com/wings" style="color: #2B6CB0;">paraura.com/wings</a>.
          </p>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #E5E7EB;">
            <p style="margin: 0; color: #6B7280; font-size: 13px;">
              Paraura — Official Skywalk Paragliders Importer &amp; Distributor, South Africa<br/>
              <a href="https://www.paraura.com" style="color: #2B6CB0;">www.paraura.com</a>
            </p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Failed to send advice confirmation email:', err)
  }
}

// ── Campaign interest notification ───────────────────────────
export async function sendCampaignNotification(data: {
  name: string
  email: string
  whatsapp?: string
  message?: string
  campaignTitle: string
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Campaign interest: ${data.campaignTitle} — ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1A3A5C; margin-bottom: 4px;">Campaign Interest</h2>
          <p style="color: #6B7280; margin-top: 0; margin-bottom: 8px;">${data.campaignTitle}</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; width: 140px; font-size: 13px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #111827; font-weight: 500;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB;">
                <a href="mailto:${data.email}" style="color: #2B6CB0;">${data.email}</a>
              </td>
            </tr>
            ${data.whatsapp ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">WhatsApp</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB;">
                <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #2B6CB0;">${data.whatsapp}</a>
              </td>
            </tr>` : ''}
            ${data.message ? `
            <tr>
              <td style="padding: 10px 0; color: #6B7280; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #111827;">${data.message}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #F0EFED; border-radius: 8px;">
            <p style="margin: 0; font-size: 13px; color: #6B7280;">View in <a href="https://www.paraura.com/admin/leads" style="color: #2B6CB0;">Paraura Admin</a></p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Failed to send campaign notification email:', err)
  }
}
