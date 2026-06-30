# Blog Frontend (Next.js + TypeScript + Tailwind)

Standalone Next.js frontend — talks to the separate **Express + TypeScript backend** over HTTP. This project contains **no API routes and no database code**; all data comes from `NEXT_PUBLIC_API_URL`.

## Setup

```bash
npm install
cp .env.local.example .env.local
# set NEXT_PUBLIC_API_URL to your Express backend, e.g. http://localhost:5000/api
npm run dev
```

Runs at `http://localhost:3000`. Make sure the Express backend is running at the URL configured above, and that its `CLIENT_URL` env var is set to `http://localhost:3000` (for CORS).

## Project structure

```
src/
  app/
    (site)/            Public site: home, /blogs, /blogs/[slug], /login, /register
    admin/
      login, register/  Admin auth pages (public)
      (panel)/           Protected admin UI: dashboard, blogs (list/new/edit), comments
    layout.tsx           Root layout (wraps AuthProvider)
    globals.css          Tailwind layers + design tokens
  components/ui/         shadcn-style primitives (Button, Input, Textarea, Badge, Card)
  hooks/useAuth.tsx       Auth context, calls /api/auth/me on the Express backend
  lib/api.ts              fetch wrapper (adds credentials, JSON headers, error handling)
  lib/utils.ts             cn() className helper
  types/                   Shared TypeScript interfaces
```

## Config files included

- `package.json` — Next.js 14, React 18, Tailwind, shadcn-related deps (`clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`)
- `next.config.ts`
- `tsconfig.json` (with `@/*` path alias to `src/*`)
- `tailwind.config.ts` (shadcn-compatible CSS variable theme)
- `postcss.config.js`
- `components.json` (shadcn/ui config — run `npx shadcn@latest add <component>` to add more primitives)
- `eslint.config.js` (flat config wrapping `next/core-web-vitals`)
- `public/` — static assets folder

## Auth

This frontend does **not** use NextAuth — it's a thin client over the Express backend's JWT-cookie auth. `src/lib/api.ts` sends `credentials: "include"` on every request so the httpOnly cookie set by Express is included automatically (cross-origin, hence the CORS + cookie setup on the backend side).

- Admin panel pages under `/admin/(panel)/*` are guarded **client-side** in `layout.tsx` (checks `useAuth()` and redirects to `/admin/login` if not an admin) — this is necessary because the JWT cookie lives on the Express backend's origin, not this app's, so Next.js middleware here can't read it directly.
- Public user auth: `/login`, `/register`.
- Admin auth: `/admin/login`, `/admin/register` (requires the backend's `ADMIN_REGISTER_SECRET`).

## Connecting to the backend

Use the `express-backend` project shared earlier (Node.js + Express + TypeScript + MongoDB). Start both:

```bash
# terminal 1
cd express-backend && npm install && npm run dev   # http://localhost:5000

# terminal 2
cd blog-frontend && npm install && npm run dev      # http://localhost:3000
```
