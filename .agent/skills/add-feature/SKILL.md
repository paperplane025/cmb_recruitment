---
name: add-feature
description: Step-by-step guide to add a new domain feature to cmb_recruitment. Use when the user asks to add a module, feature folder, or new business domain.
---

# Add Feature — CMB Recruitment

## 1. Scaffold

```
src/features/<name>/
├── components/
├── hooks/
├── types.ts
├── utils.ts          # optional helpers
├── index.ts          # public exports only
└── store/            # optional Zustand if client-only state
```

## 2. Service (if API)

Create `src/services/<name>Service.ts`:

- Use `apiClient` from `./client.ts`
- If endpoints unavailable in dev, gate with `env.enableMockApi` and data from `src/mocks/`
- Use `delay()` from `@/shared/lib/delay.ts` for mock network latency

## 3. Query keys

Add to `src/shared/constants/queryKeys.ts`:

```ts
export const queryKeys = {
  // ...
  <name>: {
    all: ['<name>'] as const,
    list: (filters: Filters, page: number) => ['<name>', 'list', filters, page] as const,
    detail: (id: string) => ['<name>', 'detail', id] as const,
  },
}
```

## 4. Hooks

```ts
// features/<name>/hooks/useThings.ts
export function useThings(filters: Filters, page: number) {
  return useQuery({
    queryKey: queryKeys.<name>.list(filters, page),
    queryFn: () => thingService.getAll(filters, page),
    placeholderData: (previousData) => previousData,
  })
}
```

Mutations: `useMutation` + invalidate queries in `onSuccess`.

## 5. Page & route

1. `src/pages/<Name>Page.tsx` — compose hooks + feature components
2. Lazy import in `src/shared/routes/routes.tsx`:
   ```ts
   const MyPage = lazy(() => import('@/pages/MyPage.tsx').then(m => ({ default: m.MyPage })))
   ```
3. Wrap in `<SuspenseWrapper>` inside route config
4. Add `APP_ROUTES` entry
5. Use `ProtectedRoute` if auth required

## 6. TypeScript

- Respect `strict: true` + `noUncheckedIndexedAccess`
- Handle `undefined` from array access (e.g., `arr[0]`)
- Do not use `any` — prefer `unknown` + type narrowing

## 7. Verify

```bash
npm run lint
npm run build
npm test
```

Do not add unrelated refactors or new dependencies without asking.
