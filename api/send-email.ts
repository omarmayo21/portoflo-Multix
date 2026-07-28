import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { createClient } from '@sanity/client';

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL || 'khhhyf4@gmail.com';
const sanityProjectId = process.env.VITE_SANITY_PROJECT_ID || 'dtj815fl';
const sanityDataset = process.env.VITE_SANITY_DATASET || 'production';
const sanityToken = process.env.VITE_SANITY_WRITE_TOKEN;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2024-01-01',
  token: sanityToken,
  useCdn: false,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  const { leadId } = req.body;

  if (!leadId) {
    return res.status(400).json({ error: 'Missing leadId' });
  }

  console.log(`[Resend Email API] Processing lead notification for: ${leadId}`);

  try {
    let lead: any = null;

    // 1. If leadId starts with "lead_", check Sanity first
    // If it's a local/offline lead ID, we won't find it in Sanity but we can still send the emails from post data if provided,
    // or fetch from Sanity.
    if (leadId.startsWith('lead_') && !sanityToken) {
      // Local fallback lead or Sanity not configured, we'll extract details directly from body
      lead = req.body.leadData || {};
    } else {
      try {
        lead = await sanityClient.getDocument(leadId);
      } catch (err: any) {
        console.warn(`[Resend Email API] Document ${leadId} not found in Sanity. Fetching from request fallback.`);
        lead = req.body.leadData || {};
      }
    }

    if (!lead || Object.keys(lead).length === 0) {
      return res.status(404).json({ error: 'Lead details not found' });
    }

    // 2. Prevent duplicate email sending
    if (lead.emailSent === true) {
      console.log(`[Resend Email API] Emails already sent for lead: ${leadId}. Preventing duplicates.`);
      return res.status(200).json({ success: true, message: 'Emails already sent previously' });
    }

    const name = lead.fullName || 'Unspecified';
    const phone = lead.phone || 'Unspecified';
    const email = lead.email && !lead.email.endsWith('@lead.multix.studio') ? lead.email : 'Not Provided';
    const projectDetails = lead.message || 'No project details provided';
    const submissionTime = lead.submissionDate ? new Date(lead.submissionDate).toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC' : new Date().toLocaleString();
    const source = lead.projectType || 'Web Development Landing Page';
    
    // Extract metadata
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'Unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    console.log(`[Resend Email API] Sending emails for: ${name} (${phone})`);

    // 3. Send emails
    try {
      if (!resend) {
        throw new Error('Resend client is not initialized. Please configure RESEND_API_KEY.');
      }
      // A. Admin Notification Email
      await resend.emails.send({
        from: 'Multix Notification <noreply@multix.studio>',
        to: adminEmail,
        subject: `🚨 New Lead: ${name} - Multix Studio`,
        html: `
          <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #2A4073, #FF5E3A); padding: 24px; text-align: center; color: white;">
              <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">New Project Lead Received</h2>
              <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 13px;">Source: ${source}</p>
            </div>
            <div style="padding: 24px; background-color: #ffffff; color: #333333;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666; width: 140px;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666;">Phone Number</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333; font-weight: 600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666;">Email Address</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666;">Submission Time</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 13px;">${submissionTime}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666;">IP Address</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 12px; font-family: monospace;">${ip}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666;">User Agent</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #777; font-size: 11px;">${userAgent}</td>
                </tr>
              </table>
              <div style="background-color: #f7f9fc; padding: 16px; border-radius: 8px; border-left: 4px solid #FF5E3A;">
                <h4 style="margin: 0 0 8px 0; color: #2A4073; font-size: 13px; font-weight: bold;">Project Details & Requirements:</h4>
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #444; white-space: pre-line;">${projectDetails}</p>
              </div>
            </div>
            <div style="background-color: #fafafa; padding: 16px; text-align: center; border-top: 1px solid #eeeeee; font-size: 11px; color: #999;">
              This is an automated security notification from your Multix Studio lead workflow pipeline.
            </div>
          </div>
        `,
      });

      // B. User Confirmation Email (Bilingual / Arabic focused)
      if (email !== 'Not Provided') {
        await resend.emails.send({
          from: 'Multix Studio <noreply@multix.studio>',
          to: email,
          subject: 'شكرًا لتواصلك مع Multix Studio | Thank you for contacting us',
          html: `
            <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e8e8e8; border-radius: 12px; overflow: hidden; text-align: right; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
              <div style="background-color: #0F1D38; padding: 30px; text-align: center; border-bottom: 4px solid #FF5E3A;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">MULTIX<span style="color:#FF5E3A">.</span></h1>
                <p style="color: #a5c0ee; margin: 5px 0 0 0; font-size: 12px; font-weight: bold; letter-spacing: 1px;">Creative Web Development Studio</p>
              </div>
              <div style="padding: 30px; background-color: #ffffff; color: #333333; line-height: 1.8;">
                <h3 style="color: #0F1D38; margin-top: 0; font-size: 18px;">مرحباً ${name}،</h3>
                <p style="font-size: 14px;">شكرًا لتواصلك معنا واهتمامك بخدماتنا في تطوير المواقع والأنظمة الرقمية.</p>
                <p style="font-size: 14px;">لقد تم استلام تفاصيل مشروعك بنجاح، ويقوم فريقنا الهندسي حالياً بمراجعة متطلباتك بعناية لإعداد عرض سعر مناسب وخطة تنفيذ دقيقة.</p>
                <p style="font-size: 14px; font-weight: bold; color: #FF5E3A;">سنتواصل معك خلال أقل من 12 ساعة لتنسيق الخطوات التالية ومناقشة تفاصيل المشروع.</p>
                
                <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 25px 0;" />
                
                <div style="font-size: 11px; color: #777777; text-align: left; direction: ltr;">
                  <h4 style="margin: 0 0 5px 0; color: #0F1D38;">Dear ${name},</h4>
                  <p style="margin: 0 0 5px 0;">Thank you for reaching out to Multix Studio. We have successfully received your project inquiry.</p>
                  <p style="margin: 0;">Our engineering team is currently reviewing your details. We will contact you within 12 hours to discuss the next steps.</p>
                </div>
              </div>
              <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #edf2f7; font-size: 12px; color: #64748b;">
                <p style="margin: 0;">Multix Studio — Creative Web Development & Digital Engineering Agency</p>
              </div>
            </div>
          `,
        });
      }
    } catch (err: any) {
      console.error('[Resend Email API] Failed to send email via Resend:', err.message || err);
      // We catch this error specifically so we do not interrupt the database save / user response flow
    }

    // 4. Update Sanity document to prevent duplicate notifications
    if (sanityToken && leadId.startsWith('lead_') === false) {
      try {
        await sanityClient
          .patch(leadId)
          .set({ emailSent: true })
          .commit();
        console.log(`[Resend Email API] Sanity lead ${leadId} updated with emailSent: true`);
      } catch (err: any) {
        console.warn(`[Resend Email API] Failed to update Sanity emailSent status:`, err.message || err);
      }
    }

    return res.status(200).json({ success: true, message: 'Notification workflow completed successfully' });

  } catch (err: any) {
    console.error('[Resend Email API] System error:', err.message || err);
    // Return success to client so user flow is never interrupted, but log the error
    return res.status(200).json({ success: true, error: err.message, message: 'Fallback success' });
  }
}
