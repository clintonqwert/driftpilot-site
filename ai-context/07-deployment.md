# Driftpilot deployment constraints

- Production is deployed on Vercel; preview deployments should be used for PR verification.
- Required production environment values must be configured in Vercel, not committed to the repository.
- `NEXT_PUBLIC_SITE_URL` is required for correct canonical and metadata output.
- `BOOKING_WEBHOOK_URL` is required for production lead delivery.
- Do not alter redirects, analytics, security headers, or form delivery without reviewing the related maintenance documentation and testing the deployed surface.
