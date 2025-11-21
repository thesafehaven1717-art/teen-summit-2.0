import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Default "from" email address (must be verified domain in Resend)
const FROM_EMAIL = process.env.FROM_EMAIL || 'Teen Summit <noreply@teensummit.com>';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send an email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    // Log when email service is not configured (for monitoring)
    console.log('\n========================================');
    console.log('📧 EMAIL (not sent - RESEND_API_KEY not configured)');
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Body preview: ${options.html.substring(0, 200)}...`);
    console.log('========================================\n');
    // Return false for monitoring/metrics, but this is expected in dev
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully:', data?.id);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, resetLink: string, expiresAt: Date): Promise<{ success: boolean; error?: string }> {
  const expiryTime = new Date(expiresAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #ff6b35 0%, #1e90ff 100%);
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .button {
            display: inline-block;
            background: #ff6b35;
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
          }
          .button:hover {
            background: #ff5722;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Teen Summit 2.0</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Password Reset Request</p>
        </div>
        <div class="content">
          <p>Hello,</p>
          
          <p>We received a request to reset your password for your Teen Summit 2.0 account. Click the button below to create a new password:</p>
          
          <div style="text-align: center;">
            <a href="${resetLink}" class="button">Reset Password</a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #1e90ff;">${resetLink}</p>
          
          <div class="warning">
            <strong>⏰ This link expires on ${expiryTime}</strong><br>
            For security reasons, this password reset link will only work once and expires in 1 hour.
          </div>
          
          <p><strong>Didn't request this?</strong><br>
          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
          
          <div class="footer">
            <p><strong>Teen Summit 2.0</strong><br>
            University of Illinois Urbana-Champaign<br>
            This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Your Teen Summit 2.0 Password',
    html,
  });
}

/**
 * Send contact form confirmation email
 */
export async function sendContactConfirmation(email: string, name: string): Promise<{ success: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #ff6b35 0%, #1e90ff 100%);
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Teen Summit 2.0</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Message Received</p>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting Teen Summit 2.0! We've received your message and our team will get back to you as soon as possible.</p>
          
          <p>We typically respond within 1-2 business days. If your inquiry is urgent, please call our office directly.</p>
          
          <p>Thank you for your interest in Teen Summit 2.0!</p>
          
          <div class="footer">
            <p><strong>Teen Summit 2.0</strong><br>
            University of Illinois Urbana-Champaign<br>
            This is an automated confirmation, please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'We Received Your Message - Teen Summit 2.0',
    html,
  });
}

/**
 * Send application submission confirmation email
 */
export async function sendApplicationConfirmation(
  email: string, 
  name: string, 
  applicationType: 'Summiteer' | 'Guest' | 'Volunteer'
): Promise<{ success: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #ff6b35 0%, #1e90ff 100%);
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .success-badge {
            background: #4caf50;
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            display: inline-block;
            margin: 20px 0;
            font-weight: 600;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Teen Summit 2.0</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Application Received</p>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          
          <div style="text-align: center;">
            <div class="success-badge">✓ Application Successfully Submitted</div>
          </div>
          
          <p>Thank you for your ${applicationType} application to Teen Summit 2.0! We're excited about your interest in joining our program.</p>
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Our selection committee will carefully review your application</li>
            <li>We'll contact you within 2-3 weeks with next steps</li>
            ${applicationType === 'Summiteer' ? '<li>Selected candidates will be invited for an interview</li>' : ''}
            <li>Final decisions will be communicated via email</li>
          </ul>
          
          ${applicationType === 'Summiteer' ? `
            <p><strong>Important Dates:</strong></p>
            <ul>
              <li><strong>Filming:</strong> Spring 2026 at University of Illinois Urbana-Champaign</li>
              <li><strong>Release:</strong> Fall 2026</li>
              <li><strong>Commitment:</strong> 12-week program</li>
            </ul>
          ` : ''}
          
          <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
          
          <p>Thank you for your interest in Teen Summit 2.0!</p>
          
          <div class="footer">
            <p><strong>Teen Summit 2.0</strong><br>
            University of Illinois Urbana-Champaign<br>
            This is an automated confirmation, please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Your ${applicationType} Application - Teen Summit 2.0`,
    html,
  });
}
