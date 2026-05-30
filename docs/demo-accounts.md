# nxted.ai - demo accounts & analytics

## Demo logins (all roles)

These accounts are created by `prisma/seed.ts`. They are also shown as
one-click buttons on the login page (`/auth/login`).

| Role | Email | Password | Lands on |
|------|-------|----------|----------|
| **Super Admin** | `admin@nxted.ai` | `Admin@NXTED2026!` | `/admin/dashboard` (full site overview) |
| **Client** | `client@example.co.uk` | `Client@2026!` | `/portal/dashboard` |
| **Contributor** | `priya.rao@example.com` | `Contributor@2026!` | `/me/dashboard` |

Extra seeded contributors (same password `Contributor@2026!`):
`arjun.menon@example.com`, `meera.iyer@example.com`.

## ⚠️ Security note (you chose to show these publicly)

The one-click demo panel is visible to **anyone** on the live login page, and the
Super Admin can see **all business metrics and customer data**. To switch the panel
off without a code change, set on the server and rebuild:

```
NEXT_PUBLIC_SHOW_DEMO_LOGINS=false
```

When you're done demoing, also **rotate these passwords** (or delete the demo
users) so the admin account isn't publicly accessible.

## Super Admin dashboard - what it shows

`/admin/dashboard` (Super Admin only) shows, for the last 30 days:

- **Visitors & traffic** - unique visitors, page views (with vs-previous-period
  trend), a 30-day traffic chart (views + visitors), top pages, traffic sources
  (direct / organic / AI assistants / referral / social), and device split.
- **Commerce** - revenue (delivered capture + paid expert), invoiced (paid),
  pipeline value, order/project counts, and a recent orders feed.
- **People** - clients, contributors, total users, recent signups.
- **Pipeline** - leads by stage; plus operational queues (awaiting assignment,
  capture quotes > 24h, contributors pending).

### How traffic is measured

A first-party, cookie-less tracker (`components/analytics/PageViewTracker.tsx`)
sends one anonymous beacon per public page view to `/api/track`, which writes a
`PageView` row (no PII; an anonymous, client-generated visitor id only). Bots and
the app's own admin/portal areas are excluded. The dashboard is seeded with ~30
days of realistic **demo** traffic (rows marked `sessionId='demo'`) so it looks
complete immediately; real visits accrue alongside and a reseed only regenerates
the demo rows.
