# replit.md

## Overview

This is a **one-page landing site** for recruiting independent insurance agents into a private healthcare sales opportunity. The site's goals are to make the opportunity clear within 10 seconds, guide visitors to a commission calculator, and collect lead applications (name, email, phone, licensing status). The brand tone is premium, calm, and adult — using gold/navy/cream colors with serif headings and clean sans-serif body text.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) — single-page app with just `/` (Home) and a 404 fallback
- **Styling**: Tailwind CSS with CSS variables for theming, shadcn/ui component library (new-york style), custom brand colors (Gold `#C5A059`, Navy `#0F172A`, Cream `#F9F9F7`)
- **Typography**: Playfair Display (serif, headings) and DM Sans (sans-serif, body) loaded via Google Fonts
- **Animations**: Framer Motion for scroll-triggered fade-in and hover effects
- **State/Data Fetching**: TanStack React Query for server state; react-hook-form with zod validation for forms
- **Key Components**:
  - `Navigation` — fixed top nav with smooth-scroll section links and an "Apply" dialog
  - `LeadForm` — application form in a dialog, validates with zod, submits to `/api/leads`
  - `CommissionCalculator` — interactive slider-based calculator showing projected income
- **Path Aliases**: `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`

### Backend
- **Framework**: Express 5 on Node.js, TypeScript compiled with tsx (dev) and esbuild (production)
- **API Structure**: REST endpoints:
  - `POST /api/leads` — creates a lead record (name, email, phone, isLicensed, smsConsent, licensingContext)
  - `GET /api/scheduling/available` — proxies to CRM (`CRM_BASE_URL`) to fetch available booking slots
  - `POST /api/scheduling/book` — proxies to CRM to book a slot (slot_id, email, name, phone)
- **CRM Integration**: Booking flow proxies through server to Sakred CRM (`CRM_BASE_URL` env var, defaults to `https://sakredcrm.com`). CRM handles confirmation emails, Zoom links, calendar invites, and agent notifications.
- **Validation**: Zod schemas shared between client and server via `shared/` directory. The `insertLeadSchema` is generated from the Drizzle table definition using `drizzle-zod`
- **Storage Layer**: `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class — abstracts database operations

### Shared Code (`shared/`)
- `schema.ts` — Drizzle ORM table definitions and Zod schemas (single `leads` table)
- `routes.ts` — Typed API route definitions with input/output schemas, used by both client and server

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: Uses `SUPABASE_POOLER_URL` or `SUPABASE_DATABASE_URL` environment variable via `pg.Pool` with SSL enabled. Falls back to `DATABASE_URL` for Drizzle Kit migrations.
- **Schema Push**: `npm run db:push` runs `drizzle-kit push` to sync schema to database
- **Tables**:
  - `recruits` — id (serial PK), first_name, last_name, email, phone, is_licensed (boolean), npn, licensed_states (text[]), licensing_context, sms_consent (boolean), created_at (timestamp)

### Build & Dev
- **Dev**: `npm run dev` — runs tsx with Vite dev server middleware (HMR via `/vite-hmr`)
- **Production Build**: `npm run build` — Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Production Start**: `npm start` — runs the bundled Node.js server which serves static files

### Project Structure
```
client/          → React frontend
  src/
    components/  → App components (Navigation, LeadForm, CommissionCalculator)
    components/ui/ → shadcn/ui primitives
    hooks/       → Custom hooks (use-leads, use-toast, use-mobile)
    lib/         → Utilities (queryClient, cn helper)
    pages/       → Page components (Home, not-found)
server/          → Express backend
  index.ts       → Server entry point
  routes.ts      → API route handlers
  storage.ts     → Database storage layer
  db.ts          → Database connection
  vite.ts        → Vite dev server integration
  static.ts      → Production static file serving
shared/          → Shared types, schemas, route definitions
  schema.ts      → Drizzle table definitions + Zod schemas
  routes.ts      → Typed API contract
migrations/      → Drizzle migration files
attached_assets/ → Design reference files and brand assets
```

## External Dependencies

- **Database**: PostgreSQL via Supabase (connection pooler). Requires `SUPABASE_POOLER_URL` or `SUPABASE_DATABASE_URL` environment variable. `DATABASE_URL` is needed for Drizzle Kit migrations.
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **UI Component Library**: shadcn/ui (Radix UI primitives + Tailwind CSS)
- **Animation**: Framer Motion
- **Charts**: Recharts (referenced in requirements, likely for calculator visualization)
- **Fonts**: Google Fonts (Playfair Display, DM Sans, Geist Mono, Fira Code, Architects Daughter)
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` (dev only)