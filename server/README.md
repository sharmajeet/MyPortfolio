# Portfolio Server

Backend API for the portfolio: **visitor analytics, resume lead-capture, moderated
comments, and contact**. Node.js + Express + TypeScript + MongoDB (Mongoose).

## What it tracks

Every action on the site is an **event** (`POST /api/events`) — page views, section
views, outbound link clicks (LinkedIn/GitHub redirects), resume views, and so on. Each
event is enriched server-side with the visitor's IP → **country/city** (geoip-lite),
**browser/OS/device** (ua-parser-js), referrer, and a `sessionId` the frontend sends via
the `X-Session-Id` header. The session id ties an anonymous visitor's events together;
when they later submit the resume form or a comment, that becomes a **lead/identity**
linked to the same session — so earlier anonymous activity is attributed to a real person.

## Architecture

Layered per module, dependencies point inward (`controller → service → repository → DB`).
The service never imports Mongoose — it depends on a repository interface (DIP), so the
database can be swapped by writing one class.

```
src/
├── config/             env validation (zod) + Mongo connection
├── shared/             cross-cutting: errors, jwt, csv, async handler,
│                       client-context (IP/geo/device enrichment)
├── middlewares/         request validation, JWT auth guard, error handler
├── modules/
│   ├── auth/           admin login (JWT) + first-boot seeding
│   ├── events/         generic action tracking + aggregated stats
│   ├── leads/          resume gate: capture details → serve PDF → log event
│   ├── comments/       public Q&A with admin moderation
│   └── contact/        contact messages
├── routes/             mounts every module router under /api
├── app.ts              express assembly
└── server.ts           bootstrap, admin seed, graceful shutdown
```

## Setup

```bash
cp .env.example .env      # set MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run dev               # http://localhost:4000
```

Needs a running MongoDB (local or Atlas). The admin account is created automatically on
first boot from `ADMIN_EMAIL` / `ADMIN_PASSWORD`. The resume served by the lead gate is
`RESUME_PATH` (defaults to the frontend's `../public/Jeet_Sharma_Resume.pdf`).

## API

Public endpoints (called by the site):

| Method | Route             | Body / notes                                  |
| ------ | ----------------- | --------------------------------------------- |
| POST   | `/api/events`     | `{ type, path?, metadata? }` → `202`          |
| POST   | `/api/leads/resume` | `{ name, email, company?, note? }` → streams the PDF |
| POST   | `/api/comments`   | `{ name, email?, message, targetSlug? }` → `201` (unapproved) |
| GET    | `/api/comments`   | approved comments only (safe projection)      |
| POST   | `/api/contact`    | `{ name, email, message }` → `201`            |

Admin endpoints (require `Authorization: Bearer <token>` from `POST /api/auth/login`):

| Method | Route                       | Purpose                          |
| ------ | --------------------------- | -------------------------------- |
| POST   | `/api/auth/login`           | `{ email, password }` → `{ token }` |
| GET    | `/api/events/stats`         | aggregated analytics (`?from`/`?to` ISO dates) |
| GET    | `/api/leads`                | all captured leads               |
| GET    | `/api/leads/export`         | leads as CSV download            |
| GET    | `/api/comments/all`         | every comment incl. unapproved   |
| PATCH  | `/api/comments/:id/approve` | publish a comment                |
| DELETE | `/api/comments/:id`         | delete a comment                 |

`/api/events/stats` returns totals, unique visitors, and top-N breakdowns by type, path,
referrer, clicked link, country, browser, plus a daily timeseries.

Validation failures return `422` with per-field `details`; missing/invalid tokens return `401`.

## Frontend integration (next step)

The frontend must: generate a `sessionId` once (e.g. `crypto.randomUUID()` in
`localStorage`) and send it as `X-Session-Id` on every request; fire `POST /api/events`
on page load, section views, and outbound link clicks; and replace the static resume
link with the `POST /api/leads/resume` form that downloads the returned PDF blob.

## Adding a module

Copy a module folder's shape (validation · types · model · repository · service ·
controller · routes), then mount its router in `src/routes/index.ts`. No existing code changes.
