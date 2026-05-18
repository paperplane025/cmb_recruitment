# Hướng dẫn phát triển

## Biến môi trường

| Biến | Mô tả | Mặc định |
|------|--------|----------|
| `VITE_API_BASE_URL` | Base URL API | `/api` |
| `VITE_APP_NAME` | Tên hiển thị | `CMB Recruitment` |
| `VITE_ENABLE_MOCK_API` | Mock auth/jobs | `true` (dev) |

## Thêm feature mới

1. Tạo `src/features/<name>/` với `types.ts`, `index.ts`
2. Thêm `src/services/<name>Service.ts` nếu có API
3. Thêm `queryKeys` trong `shared/constants/queryKeys.ts`
4. Tạo hooks `useQuery` / `useMutation` trong `features/<name>/hooks/`
5. Tạo page trong `src/pages/` và đăng ký route trong `shared/routes/routes.tsx`
6. Lazy-load page component trong routes: `const Page = lazy(() => import(...))`

## Thêm trang

1. Component trong `src/pages/XxxPage.tsx`
2. Lazy import trong `routes.tsx` với `React.lazy()`
3. Bọc trong `<SuspenseWrapper>` — bọc `ProtectedRoute` hoặc `GuestRoute` nếu cần
4. Cập nhật `APP_ROUTES` trong `shared/constants/index.ts`

## Import

Dùng alias `@/`:

```ts
import { useAuth } from '@/shared/hooks/useAuth.ts'
```

Luôn thêm extension `.ts` / `.tsx` (verbatimModuleSyntax).

## UI

- Tailwind + CSS variables trong `styles/globals.css`
- Component tái sử dụng: `shared/components/ui/`
- Không hardcode màu ngoài theme nếu có thể dùng `var(--accent)`, `var(--text)`, …

## Thêm filter mới cho Job Listing

1. Thêm field vào `JobFilters` type trong `features/job/types.ts`
2. Cập nhật `applyFilters()` trong `services/jobService.ts`
3. Thêm UI control trong `features/job/components/JobFiltersBar.tsx`

## Xử lý lỗi

- **Global**: `ErrorBoundary` bọc toàn app trong `AppProviders`
- **API**: `getErrorMessage()` từ `shared/lib/getErrorMessage.ts`
- **UI**: `ErrorState`, `FormError`
- **Query**: `isError`, `refetch` trên listing/detail

## Testing

Thư mục `src/tests/`:

- `unit/` — utils, store, pure functions
- `integration/` — hooks + MSW
- `e2e/` — Playwright/Cypress

Chạy unit test (Vitest):

```bash
npm test
```

## TypeScript

- `strict: true` bật trong `tsconfig.app.json`
- `noUncheckedIndexedAccess: true` — array/object access trả `T | undefined`
- Luôn handle `undefined` case khi access array elements

## Performance best practices

- Lazy-load tất cả pages qua `React.lazy()`
- Dùng `placeholderData` trong `useQuery` để giữ UI ổn định
- React Compiler tự xử lý memoization — **không cần** `useMemo`/`useCallback` thủ công
- `gcTime: 5min` trong QueryClient để giới hạn cache

## Checklist trước PR

- [ ] `npm run lint` pass
- [ ] `npm run build` pass
- [ ] `npm test` pass
- [ ] Route + `APP_ROUTES` đồng bộ
- [ ] Query keys tập trung, không magic string
- [ ] Không commit `.env`
- [ ] Lazy-load page mới trong routes
- [ ] TypeScript strict — không `any`, handle `undefined`
