# Driftpilot technology stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js App Router with React and TypeScript strict mode |
| Styling | Tailwind CSS v4, with tokens in `src/app/globals.css` |
| Content | Typed accessor modules in `src/lib/content/` |
| Validation | Zod in Server Actions |
| Lead delivery | Server Action to CRM webhook via `src/lib/crm.ts` |
| SEO | `src/lib/seo.ts`, JSON-LD builders, sitemap, robots, Open Graph image |
| Hosting and telemetry | Vercel, Vercel Analytics, Vercel Speed Insights |

Do not add client-state, data-fetching, CMS, or component-library dependencies without a demonstrated need.
