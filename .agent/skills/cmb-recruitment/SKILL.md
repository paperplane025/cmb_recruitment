---
name: cmb-recruitment
description: Conventions and architecture for the CMB internal recruitment React app. Use when editing code in cmb_recruitment, adding pages, features, API calls, or auth flows.
---

# CMB Recruitment — Project Skill

## Stack

React 19 + React Compiler, TypeScript (strict), Vite, React Router 7, TanStack Query, Zustand, Axios, Tailwind CSS 4.

## Pages & routes

| Path | Page | Access |
|------|------|--------|
| `/` | HomePage | public |
| `/login` | LoginPage | guest (`GuestRoute`) |
| `/register` | RegisterPage | guest |
| `/jobs` | JobListingPage | auth (`ProtectedRoute`) |
| `/jobs/:id` | JobDetailPage | auth |

All pages are **lazy-loaded** via `React.lazy()` + `Suspense` in `routes.tsx`.

Route constants: `shared/constants/index.ts` → `APP_ROUTES`, `jobDetailPath(id)`.

## Rules

1. **No axios in pages/components** — only in `src/services/*`.
2. **Server state** — TanStack Query hooks in `features/*/hooks/`, keys in `shared/constants/queryKeys.ts`.
3. **Auth state** — Zustand `features/auth/store/authStore.ts`; use `useAuth()` facade, not duplicate context.
4. **Imports** — `@/` alias with `.ts`/`.tsx` extensions.
5. **New feature** — `src/features/<domain>/` + optional `services/<domain>Service.ts` + barrel `index.ts`.
6. **Mock API** — respect `env.enableMockApi` in services (see `configs/env.ts`).
7. **Vietnamese UI copy** for user-facing strings unless asked otherwise.
8. **Do not** reintroduce `AuthProvider` context — auth is Zustand-only.
9. **TypeScript strict** — `strict: true`, `noUncheckedIndexedAccess: true`. Handle `undefined` from array access.
10. **Lazy-load** new pages — use `React.lazy()` + `SuspenseWrapper` in routes.
11. **No manual memoization** — React Compiler handles it. Do not add `useMemo`/`useCallback`.
12. **ErrorBoundary** wraps entire app in `AppProviders`.

## Job data model

```ts
type Job = {
  id, title, company, location, description, postedAt,
  category: JobCategory,
  employmentType: EmploymentType,
  salary: { min, max, currency },
  requirements: string[],
  benefits: string[],
  isFeatured: boolean,
}
```

## Query keys (centralized)

```ts
queryKeys.jobs.all
queryKeys.jobs.list(filters, page)
queryKeys.jobs.detail(id)
queryKeys.jobs.featured
queryKeys.jobs.categories
queryKeys.jobs.locations
```

## Key paths

- Router: `src/shared/routes/routes.tsx`
- Providers: `src/shared/providers/AppProviders.tsx`
- API client: `src/services/client.ts`
- Layout: `src/shared/components/layout/`
- Job filters: `src/features/job/components/JobFiltersBar.tsx`
- Shared delay: `src/shared/lib/delay.ts`

## Docs

- `README.md`, `docs/ARCHITECTURE.md`, `docs/DEVELOPMENT.md`
