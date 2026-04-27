# Parcela — Product Requirements Document

## Original problem statement
Build a complete production-ready web application for **Parcela**, a courier-delivery brand for Kigali, Rwanda. React (frontend) + Node.js Express (backend), Google Sheets-based waitlist, four languages (Kinyarwanda default, English, French, Swahili), Instagram + TikTok links, brand colors blue `#00A1DE` and yellow `#FAD201`, **no “Made with Emergent” badge**, no secrets committed (only `.env.example`).

## Architecture
- **Frontend**: React (CRA) + TailwindCSS + Framer Motion + Lucide. Custom React-Context i18n (`/app/frontend/src/i18n.jsx`) with JSON locales in `/app/frontend/src/locales/{rw,en,fr,sw}.json`. Default language `rw`, persisted in `localStorage` under key `parcela.lang`.
- **Backend**: Node.js 18+ / Express on port `8001`, managed by a new supervisor program `backend-node` (the original Python `backend` program is intentionally stopped). Endpoints:
  - `GET  /api/health` → `{status:"ok", sheetsConfigured:bool}`
  - `POST /api/waitlist` (Zod-validated `{email, language ∈ rw|en|fr|sw}`) → `{success:true, sheets_status: "appended"|"failed"|"skipped"}`
- **Storage**: Google Sheets API v4 via service account (env-driven). MongoDB `parcela.waitlist` is used as a fallback / audit log and is always written to.

## User personas
- **Sender (primary)** — Kigali resident wanting to ship a parcel safely, prefers MoMo / Airtel Money / Cash on Delivery.
- **Receiver** — verifies delivery via 6-digit code at the door.
- **Early adopter / waitlist signup** — drops email to claim 40% first-month discount.

## Core requirements (static)
- Multilingual (rw/en/fr/sw), Kinyarwanda default and persisted across reloads.
- Hero (badge, title, subtitle, Send Parcel + Track Parcel CTAs), Problem, Promise, Features, Waitlist, Footer.
- Brand colors `#00A1DE` + `#FAD201`. No purple/violet AI-slop gradients. No “Made with Emergent” badge anywhere.
- Instagram and TikTok links to `@parcela.rw`.
- All secrets via `.env`; only `.env.example` committed; `.gitignore` blocks `*.env`, `credentials/`, `*.json` keys.

## What's been implemented (2026-04-27)
- ✅ React frontend with Header (sticky glass), Hero, Problem (3 cards), Our Promise, Features, Waitlist (animated CTA card), Footer (IG + TikTok).
- ✅ Multilingual setup (4 locales, full key parity), language switcher in top-right with localStorage persistence.
- ✅ Node.js Express backend (`/app/backend/server.js`) with Zod validation, Google Sheets append (when configured) and MongoDB fallback.
- ✅ Supervisor reconfigured (`/etc/supervisor/conf.d/backend-node.conf`) — Node serves port 8001 in place of Python.
- ✅ `.env.example`, `.gitignore`, README.md authored — repo is safe to push.
- ✅ E2E tested: 11/11 pytest backend tests + full frontend flow validated (testing-agent iteration 1).

## Backlog (P1)
- Google Sheets credentials provisioning + verification once the user shares them.
- Real Send Parcel / Track Parcel flows (currently anchor links to waitlist).
- Mobile menu for nav links on small screens (nav links currently hidden < md).

## Backlog (P2 / nice-to-have)
- Rate-limit `/api/waitlist` (e.g. `express-rate-limit`).
- Validate `setLang` against the supported list before persisting.
- Email confirmation to the user on successful waitlist signup (Resend / SendGrid).
- A simple `/admin` view of recent waitlist entries.

## Next tasks
1. Collect Google Service Account credentials and populate `backend/.env`.
2. Wire real Send-Parcel / Track-Parcel pages once those flows are designed.
3. Optional: add rate limiting + email confirmation.
