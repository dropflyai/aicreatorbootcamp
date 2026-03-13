// Email templates and sending utilities for AI Creator Bootcamp
// Uses Resend (https://resend.com) — install with: npm install resend
// Required env vars: RESEND_API_KEY, RESEND_FROM_EMAIL

import { Resend } from 'resend'

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not set — email sending disabled')
    return null
  }
  return new Resend(apiKey)
}

function fromAddress(): string {
  return process.env.RESEND_FROM_EMAIL ?? 'noreply@aicreatorbootcamp.com'
}

// ---------------------------------------------------------------------------
// Shared branding helpers
// ---------------------------------------------------------------------------

function emailWrapper(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Creator Bootcamp</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0D0D0D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
    .logo { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
    .logo-icon { width: 40px; height: 40px; background-color: #BFFF00; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; font-size: 20px; }
    .logo-text { font-size: 18px; font-weight: 700; color: #ffffff; }
    .card { background-color: #161616; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; margin-bottom: 24px; }
    h1 { font-size: 24px; font-weight: 700; margin: 0 0 8px; color: #ffffff; }
    p { font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.7); margin: 0 0 16px; }
    .highlight { color: #BFFF00; font-weight: 600; }
    .btn { display: inline-block; background-color: #BFFF00; color: #000000; font-weight: 700; font-size: 15px; padding: 12px 28px; border-radius: 10px; text-decoration: none; margin-top: 8px; }
    .stat-row { display: flex; gap: 16px; margin: 20px 0; }
    .stat { flex: 1; background-color: rgba(255,255,255,0.05); border-radius: 10px; padding: 16px; text-align: center; }
    .stat-value { font-size: 28px; font-weight: 700; color: #BFFF00; }
    .stat-label { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px; }
    .footer { text-align: center; font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 24px; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0; }
    .badge-icon { font-size: 48px; text-align: center; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="logo">
      <div class="logo-icon">✦</div>
      <span class="logo-text">AI Creator Bootcamp</span>
    </div>
    ${body}
    <div class="footer">
      <p>AI Creator Bootcamp &bull; You're receiving this because you're enrolled in a class.<br />
      Questions? Reply to this email.</p>
    </div>
  </div>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// sendFeedbackNotification
// Called when someone leaves feedback on a project
// ---------------------------------------------------------------------------

export async function sendFeedbackNotification(
  to: string,
  fromName: string,
  projectTitle: string,
  warm: string,
  cool: string
): Promise<void> {
  const resend = getResendClient()
  if (!resend) return

  const html = emailWrapper(`
    <div class="card">
      <h1>Someone left feedback ✦</h1>
      <p><span class="highlight">${escapeHtml(fromName)}</span> reviewed your project <span class="highlight">"${escapeHtml(projectTitle)}"</span>.</p>
      <hr class="divider" />
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);margin-bottom:6px;">Warm feedback</p>
      <p style="color:#ffffff;">${escapeHtml(warm)}</p>
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);margin-bottom:6px;margin-top:16px;">Cool suggestion</p>
      <p style="color:#ffffff;">${escapeHtml(cool)}</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aicreatorbootcamp.com'}/gallery" class="btn">View Your Project</a>
    </div>
  `)

  const text = `${fromName} reviewed "${projectTitle}"\n\nWarm: ${warm}\n\nCool: ${cool}\n\nView your project at ${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aicreatorbootcamp.com'}/gallery`

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to,
    subject: `${fromName} left feedback on "${projectTitle}"`,
    html,
    text,
  })

  if (error) {
    console.error('[email] sendFeedbackNotification failed:', error)
  }
}

// ---------------------------------------------------------------------------
// sendWelcomeEmail
// Called when a student joins a class
// ---------------------------------------------------------------------------

export async function sendWelcomeEmail(
  to: string,
  name: string,
  className: string,
  classCode: string
): Promise<void> {
  const resend = getResendClient()
  if (!resend) return

  const html = emailWrapper(`
    <div class="card">
      <h1>Welcome to the Bootcamp 🎬</h1>
      <p>Hey <span class="highlight">${escapeHtml(name)}</span> — you're in!</p>
      <p>You've joined <span class="highlight">${escapeHtml(className)}</span>. Start completing lessons, submit your projects, and earn XP as you level up your creator skills.</p>
      <p style="font-size:13px;color:rgba(255,255,255,0.4);">Your class code: <span style="color:#ffffff;font-weight:600;">${escapeHtml(classCode)}</span></p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aicreatorbootcamp.com'}/learn" class="btn">Start Learning →</a>
    </div>
    <div class="card">
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);">What's next</p>
      <ul style="color:rgba(255,255,255,0.8);font-size:14px;line-height:2;padding-left:20px;margin:8px 0 0;">
        <li>Complete your profile</li>
        <li>Watch Week 1 lessons</li>
        <li>Submit your first project (+25 XP)</li>
        <li>Give feedback to classmates (+10 XP each)</li>
      </ul>
    </div>
  `)

  const text = `Hey ${name} — welcome to ${className}!\n\nYour class code is: ${classCode}\n\nGet started at ${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aicreatorbootcamp.com'}/learn`

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to,
    subject: `Welcome to ${className} — Let's create!`,
    html,
    text,
  })

  if (error) {
    console.error('[email] sendWelcomeEmail failed:', error)
  }
}

// ---------------------------------------------------------------------------
// sendWeeklyProgressEmail
// Called by the weekly digest cron job
// ---------------------------------------------------------------------------

export async function sendWeeklyProgressEmail(
  to: string,
  name: string,
  xp: number,
  level: number,
  completedLessons: number,
  streak: number
): Promise<void> {
  const resend = getResendClient()
  if (!resend) return

  const html = emailWrapper(`
    <div class="card">
      <h1>Your weekly progress ✦</h1>
      <p>Here's how you did this week, <span class="highlight">${escapeHtml(name)}</span>.</p>
      <div class="stat-row">
        <div class="stat">
          <div class="stat-value">${xp}</div>
          <div class="stat-label">Total XP</div>
        </div>
        <div class="stat">
          <div class="stat-value">${level}</div>
          <div class="stat-label">Level</div>
        </div>
        <div class="stat">
          <div class="stat-value">${completedLessons}</div>
          <div class="stat-label">Lessons done</div>
        </div>
        <div class="stat">
          <div class="stat-value">${streak}</div>
          <div class="stat-label">Week streak</div>
        </div>
      </div>
      <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aicreatorbootcamp.com'}/learn" class="btn">Keep the streak going →</a>
    </div>
  `)

  const text = `Weekly progress for ${name}\nXP: ${xp} | Level: ${level} | Lessons: ${completedLessons} | Streak: ${streak} weeks\n\nKeep it up at ${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aicreatorbootcamp.com'}/learn`

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to,
    subject: `Your week in review — Level ${level}, ${xp} XP`,
    html,
    text,
  })

  if (error) {
    console.error('[email] sendWeeklyProgressEmail failed:', error)
  }
}

// ---------------------------------------------------------------------------
// sendBadgeEarnedEmail
// Called when a student earns a badge
// ---------------------------------------------------------------------------

export async function sendBadgeEarnedEmail(
  to: string,
  name: string,
  badgeName: string,
  badgeDescription: string
): Promise<void> {
  const resend = getResendClient()
  if (!resend) return

  const html = emailWrapper(`
    <div class="card" style="text-align:center;">
      <div class="badge-icon">🏆</div>
      <h1 style="text-align:center;">New badge earned!</h1>
      <p style="text-align:center;">Congrats <span class="highlight">${escapeHtml(name)}</span> — you earned the <span class="highlight">${escapeHtml(badgeName)}</span> badge.</p>
      <p style="text-align:center;font-size:14px;color:rgba(255,255,255,0.5);">${escapeHtml(badgeDescription)}</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aicreatorbootcamp.com'}/profile" class="btn">View Your Badges</a>
    </div>
  `)

  const text = `Congrats ${name}! You earned the "${badgeName}" badge.\n${badgeDescription}\n\nView your profile at ${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aicreatorbootcamp.com'}/profile`

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to,
    subject: `You earned the "${badgeName}" badge!`,
    html,
    text,
  })

  if (error) {
    console.error('[email] sendBadgeEarnedEmail failed:', error)
  }
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
