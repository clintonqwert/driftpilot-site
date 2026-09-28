# Driftpilot deployment constraints

- Production is deployed on Vercel; preview deployments should be used for PR verification.
- Required production environment values must be configured in Vercel, not committed to the repository.
- `NEXT_PUBLIC_SITE_URL` is required for correct canonical and metadata output; the production build throws without it.
- The two funnels deliver to separate webhooks and both must be set in production: `CRM_WEBHOOK_URL` for the contact form, `AUTOMOTIVE_WEBHOOK_URL` for early access. Setting only one silently loses the other funnel's leads.
- `SLACK_ALERT_WEBHOOK_URL` (a Slack incoming webhook for `#driftpilot-alerts`) must be set in production. It is where a lead that failed to deliver is posted in full; without it, that lead exists only in a runtime log that Vercel keeps for 1 hour on Hobby and 1 day on Pro. Set it for Preview too only if preview failures should alert; each alert names its environment.
- `NEXT_PUBLIC_CALENDLY_URL` drives the booking embed.
- `.env.example` is the full list. Check it against `process.env` usage in `src/` before assuming a variable exists.
- Do not alter redirects, analytics, security headers, or form delivery without reviewing the related maintenance documentation and testing the deployed surface.
