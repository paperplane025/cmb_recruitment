# Hướng dẫn Onboarding cho Lập trình viên mới

Tài liệu tổng quan về dự án **CMB Recruitment** (Trang tuyển dụng nội bộ) giúp các lập trình viên mới nhanh chóng nắm bắt kiến trúc, công nghệ và quy chuẩn làm việc.

---

## Bắt đầu nhanh (Getting Started)

```bash
# 1. Clone repo
git clone <repo-url>
cd cmb_recruitment

# 2. Cài dependencies
npm install

# 3. Tạo file biến môi trường
cp .env.example .env

# 4. Chạy dev server
npm run dev          # → http://localhost:5173

# 5. Đăng nhập mock
# Mock API mặc định bật — dùng bất kỳ email/password hợp lệ để đăng nhập
```

**Các lệnh thường dùng:**

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run lint     # ESLint
npm test         # Vitest (unit test)
npm run preview  # Xem bản build production
```

---

## 1. Công nghệ (thư viện) sử dụng và mục đích

| Công nghệ | Mục đích trong dự án |
| :--- | :--- |
| **React 19 + React Compiler** | Xây dựng giao diện (UI) và tự động tối ưu hóa hiệu năng (auto-memoization) mà không cần viết `useMemo`/`useCallback` thủ công. |
| **TypeScript (strict)** | Đảm bảo an toàn kiểu dữ liệu (type safety), phát hiện lỗi logic và null/undefined ngay lúc viết code. |
| **Vite** | Công cụ build và dev server tốc độ cao, tích hợp React Compiler qua Babel preset. |
| **React Router 7** | Quản lý định tuyến (routing) và hỗ trợ lazy loading (code splitting) cho tất cả các trang. |
| **TanStack Query (v5)** | Quản lý server state, xử lý bộ nhớ đệm (caching), đồng bộ dữ liệu API và thực hiện các mutations (login, register). |
| **Zustand (v5)** | Quản lý client state (trạng thái xác thực auth: token, user) với khả năng đồng bộ tự động vào `localStorage`. |
| **Axios** | HTTP client chuyên dụng để giao tiếp với các endpoint API. |
| **Tailwind CSS 4** | Tạo kiểu giao diện (styling) nhanh chóng dựa trên hệ thống design tokens và CSS variables. |
| **Vitest** | Chạy Unit Test cho các tiện ích (utils), store và pure functions. |

### Code mẫu thực tế trong dự án

#### 1. React 19 + React Compiler & Tailwind CSS 4

Component viết dưới dạng hàm thông thường, sử dụng Tailwind kết hợp CSS variables. React Compiler tự động tối ưu hóa (memoize) mà không cần `useMemo` hoặc `useCallback`.

```tsx
// src/features/job/components/JobCard.tsx
import { Link } from 'react-router'
import { jobDetailPath } from '@/shared/constants/index.ts'
import { formatDate } from '@/shared/utils/dateUtils.ts'
import { getEmploymentTypeLabel, getCategoryLabel, formatSalary } from '../utils.ts'
import type { Job } from '../types.ts'

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group rounded-lg border border-[var(--border)] p-5 text-left transition-shadow hover:shadow-[var(--shadow)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg text-[var(--text-h)]">{job.title}</h2>
          <p className="mt-1 text-sm text-[var(--text)]">
            {job.company} · {job.location}
          </p>
        </div>
        {job.isFeatured && (
          <span className="shrink-0 rounded-full bg-[var(--accent-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
            Nổi bật
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md bg-[var(--code-bg)] px-2 py-0.5 text-xs text-[var(--text-h)]">
          {getCategoryLabel(job.category)}
        </span>
        <span className="rounded-md bg-[var(--code-bg)] px-2 py-0.5 text-xs text-[var(--text-h)]">
          {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-[var(--text)]">{formatDate(job.postedAt)}</span>
        <Link
          to={jobDetailPath(job.id)}
          className="text-sm font-medium text-[var(--accent)] transition-opacity group-hover:opacity-80"
        >
          Xem chi tiết →
        </Link>
      </div>
    </article>
  )
}
```

#### 2. TypeScript (strict mode & noUncheckedIndexedAccess)

Đảm bảo định nghĩa kiểu chặt chẽ và luôn kiểm tra `undefined` khi truy cập mảng/object.

```ts
// src/features/job/types.ts
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship'

export type JobCategory =
  | 'engineering'
  | 'design'
  | 'marketing'
  | 'sales'
  | 'hr'
  | 'finance'
  | 'operations'
  | 'product'

export type SalaryRange = {
  min: number
  max: number
  currency: string
}

export type Job = {
  id: string
  title: string
  company: string
  location: string
  description: string
  postedAt: string
  category: JobCategory
  employmentType: EmploymentType
  salary: SalaryRange
  requirements: string[]
  benefits: string[]
  isFeatured: boolean
}

// Ví dụ xử lý mảng an toàn (noUncheckedIndexedAccess)
function getFirstRequirement(job: Job): string {
  const first = job.requirements[0]
  // first có kiểu là `string | undefined`, bắt buộc phải kiểm tra trước khi dùng
  return first ?? 'Không có yêu cầu'
}
```

#### 3. Vite (Build tool & React Compiler)

Cấu hình tích hợp React Compiler qua Babel preset, Tailwind CSS plugin, và alias `@/` cho import.

```ts
// vite.config.ts
import path from 'node:path'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),  // ← React Compiler
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },  // ← Import alias @/
  },
})
```

#### 4. React Router 7 (Lazy loading & Routing)

Sử dụng `createBrowserRouter` kết hợp `React.lazy` và component `SuspenseWrapper` (bọc `<LoadingState>`) để tối ưu hóa tải trang.

```tsx
// src/shared/routes/routes.tsx
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { Layout } from '@/shared/components/layout/Layout.tsx'
import { ProtectedRoute } from '@/shared/components/routing/ProtectedRoute.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'

// Lazy-load tất cả pages
const JobListingPage = lazy(() =>
  import('@/pages/JobListingPage.tsx').then((m) => ({ default: m.JobListingPage }))
)

// Component bọc Suspense — dùng chung cho tất cả lazy pages
function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingState label="Đang tải trang..." />}>
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'jobs',
            element: (
              <SuspenseWrapper>
                <JobListingPage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
])
```

#### 5. TanStack Query v5 (Queries & Mutations)

Quản lý server state với `placeholderData` để giữ UX mượt mà khi phân trang, và `useMutation` để xử lý login kèm redirect.

```ts
// src/features/job/hooks/useJobs.ts (Query)
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { jobService } from '@/services/jobService.ts'
import type { JobFilters } from '../types.ts'

export function useJobs(filters: JobFilters = {}, page = 1) {
  return useQuery({
    queryKey: queryKeys.jobs.list(filters, page),
    queryFn: () => jobService.getAll(filters, page),
    placeholderData: (previousData) => previousData, // Giữ dữ liệu cũ trong lúc fetch trang mới
  })
}
```

```ts
// src/features/auth/hooks/useLogin.ts (Mutation)
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'
import { authService } from '@/services/authService.ts'
import { useAuthStore } from '../store/authStore.ts'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import type { LoginCredentials } from '../types.ts'

export function useLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (session) => {
      setSession(session)
      // Redirect về trang trước đó (nếu có) hoặc về danh sách jobs
      const redirectTo =
        (location.state as { from?: string } | null)?.from ?? APP_ROUTES.jobs
      navigate(redirectTo, { replace: true })
    },
  })
}
```

#### 6. Zustand v5 (Client & Auth State)

Quản lý trạng thái người dùng và token, tự động đồng bộ (persist) vào `localStorage` cả token lẫn user.

```ts
// src/features/auth/store/authStore.ts
import { create } from 'zustand'
import { STORAGE_KEYS } from '@/shared/constants/index.ts'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '@/shared/lib/localStorage.ts'
import type { AuthSession, User } from '../types.ts'

type AuthState = {
  token: string | null
  user: User | null
  setSession: (session: AuthSession) => void
  clearSession: () => void
}

// Đọc user từ localStorage an toàn (parse JSON, trả null nếu lỗi)
function readStoredUser(): User | null {
  const raw = getStorageItem(STORAGE_KEYS.authUser)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getStorageItem(STORAGE_KEYS.authToken),
  user: readStoredUser(), // Khôi phục session từ localStorage khi khởi tạo
  setSession: ({ token, user }) => {
    setStorageItem(STORAGE_KEYS.authToken, token)
    setStorageItem(STORAGE_KEYS.authUser, JSON.stringify(user)) // Persist cả user
    set({ token, user })
  },
  clearSession: () => {
    removeStorageItem(STORAGE_KEYS.authToken)
    removeStorageItem(STORAGE_KEYS.authUser)
    set({ token: null, user: null })
  },
}))
```

#### 7. Axios (HTTP Client & Interceptors)

Cấu hình client gọi API chung, tự động đính kèm Token và xử lý đăng xuất khi gặp lỗi `401 Unauthorized`.

```ts
// src/services/client.ts
import axios from 'axios'
import { env } from '@/configs/env.ts'
import { useAuthStore } from '@/features/auth/store/authStore.ts'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
})

// Tự động đính kèm Bearer token vào header
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Tự động clear session nếu token hết hạn (401)
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      useAuthStore.getState().clearSession()
    }
    return Promise.reject(error)
  },
)
```

#### 8. TanStack Query — Cấu hình QueryClient

Cấu hình mặc định cho toàn app: staleTime 1 phút, gcTime 5 phút, tắt refetch khi focus cửa sổ.

```ts
// src/shared/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,           // 1 phút — data được coi là "fresh"
      gcTime: 5 * 60_000,          // 5 phút — garbage collection
      retry: 1,                    // Retry 1 lần khi lỗi
      refetchOnWindowFocus: false,  // Không refetch khi chuyển tab
    },
    mutations: {
      retry: 0,                    // Mutation không retry
    },
  },
})
```

#### 9. Vitest (Unit Testing)

Viết Unit Test kiểm tra các hàm tiện ích hoặc pure functions.

```ts
// src/tests/unit/dateUtils.test.ts
import { describe, expect, it } from 'vitest'
import { formatDate } from '@/shared/utils/dateUtils.ts'

describe('formatDate', () => {
  it('formats ISO date for vi-VN locale correctly', () => {
    const result = formatDate('2026-05-01', 'vi-VN')
    expect(result).toMatch(/01/)
    expect(result).toMatch(/05/)
    expect(result).toMatch(/2026/)
  })
})
```

---

## 2. Quy chuẩn code (Coding Conventions)

### Cấu trúc thư mục (Feature-based)

```
src/
├── features/       # Theo domain (auth, job, …)
│   ├── auth/       # Login, Register, Zustand store
│   └── job/        # JobCard, JobFiltersBar, hooks, types
├── shared/         # UI, hooks, routing, constants, lib
│   ├── components/ # ui/ (Button, Input, Pagination, ErrorBoundary), layout/, routing/
│   ├── constants/  # APP_ROUTES, STORAGE_KEYS, queryKeys
│   ├── hooks/      # useAuth
│   ├── lib/        # queryClient, localStorage, delay, getErrorMessage
│   ├── providers/  # AppProviders (ErrorBoundary + QueryClient)
│   ├── routes/     # Lazy-loaded route definitions
│   ├── types/      # ApiResponse, PaginatedResponse
│   └── utils/      # dateUtils
├── pages/          # Trang (thin layer — chỉ ghép component và hook)
├── services/       # API layer (axios) — nơi DUY NHẤT gọi HTTP
├── configs/        # env
├── mocks/          # Dữ liệu mock (12 jobs)
├── styles/         # globals.css
└── tests/          # unit | integration | e2e
```

### Quy ước đặt tên

| Loại | Quy ước | Ví dụ |
| :--- | :--- | :--- |
| Component | PascalCase | `JobCard.tsx`, `LoadingState.tsx` |
| Hook | camelCase, prefix `use` | `useJobs.ts`, `useAuth.ts` |
| Service | camelCase, suffix `Service` | `jobService.ts`, `authService.ts` |
| Type file | `types.ts` trong mỗi feature | `features/job/types.ts` |
| Barrel file | `index.ts` trong mỗi feature | `features/job/index.ts` |
| Test file | suffix `.test.ts` | `dateUtils.test.ts` |

### Quy tắc chính

- **Quản lý State & API**:
  - **Không** gọi Axios trực tiếp tại pages/components; chỉ thực hiện trong lớp `src/services/*`.
  - **Server state**: Bắt buộc dùng hooks của TanStack Query đặt tại `features/*/hooks/`.
  - **Query Keys**: Không dùng magic string, tất cả query keys phải được khai báo tập trung tại `shared/constants/queryKeys.ts`.
  - **Client/Auth state**: Quản lý duy nhất bằng Zustand (`authStore.ts`). Không tạo thêm React Context cho auth; sử dụng hook facade `useAuth()`.
- **Import & Naming**:
  - Sử dụng alias `@/` (trỏ vào `./src/*`) và bắt buộc ghi rõ phần mở rộng `.ts`/`.tsx` (quy định bởi `verbatimModuleSyntax`).
- **TypeScript Strict**:
  - Bật `strict: true` và `noUncheckedIndexedAccess: true`. Bắt buộc kiểm tra kỹ trường hợp `undefined` khi truy cập phần tử trong mảng hoặc object (ví dụ: `array[0]` trả về `T | undefined`).
- **Không Memoization thủ công**:
  - Để React Compiler tự xử lý. Tuyệt đối không thêm `useMemo` hoặc `useCallback`.
- **UI & Styling**:
  - Dùng Tailwind CSS kết hợp CSS variables (`var(--accent)`, `var(--text)` trong `globals.css`), không hardcode màu ngoài theme. Copy hiển thị trên UI sử dụng tiếng Việt.

---

## 3. Quy chuẩn tài liệu (Documentation Standards)

Hệ thống tài liệu nội bộ được lưu trữ tại thư mục gốc và `docs/`:
- **`README.md`**: Tổng quan dự án, hướng dẫn cài đặt, chạy scripts và cấu trúc thư mục cơ bản.
- **`docs/ARCHITECTURE.md`**: Giải thích luồng dữ liệu, phân lớp kiến trúc, cơ chế routing, quản lý state và các quyết định thiết kế.
- **`docs/DEVELOPMENT.md`**: Hướng dẫn phát triển chi tiết (các bước thêm feature, thêm page, thêm filter, xử lý lỗi, testing và checklist trước PR).
- **Agent Skills (`.agent/skills/`)**: Chứa quy chuẩn dự án dưới dạng file SKILL.md — được AI Agent đọc tự động khi thao tác trên codebase. Dev có thể xem để hiểu thêm về conventions nhưng không cần thao tác trực tiếp.
- **Duy trì tài liệu**: Mọi thay đổi lớn về luồng, biến môi trường hoặc query keys cần được cập nhật đồng bộ vào các file tài liệu này.

---

## 4. Cấu hình (Configuration)

- **Biến môi trường (`.env`)**:
  - `VITE_API_BASE_URL`: Base URL của API (mặc định `/api`).
  - `VITE_APP_NAME`: Tên hiển thị của ứng dụng (mặc định `CMB Recruitment`).
  - `VITE_ENABLE_MOCK_API`: Bật/tắt chế độ Mock API (mặc định `true` trong môi trường dev).
- **Cấu hình API & Mock Data (`src/configs/env.ts`)**:
  - Khi chạy dev, hệ thống tự động sử dụng mock data (12 jobs đầy đủ thể loại) nếu bật Mock API. Có thể đăng nhập bằng bất kỳ email/mật khẩu hợp lệ nào.
- **Cấu hình TypeScript & Linting**: Khai báo chặt chẽ trong `tsconfig.app.json` và `eslint.config.js`.
- **Cấu hình Cache (QueryClient)**: Cấu hình tại `src/shared/lib/queryClient.ts` — xem code mẫu ở mục 1.8.

---

## 5. Các lưu ý quan trọng (Important Notes & Gotchas)

- **Lazy Loading**: Tất cả các trang mới khi thêm vào `shared/routes/routes.tsx` bắt buộc phải bọc bằng `React.lazy()` và `SuspenseWrapper` (kết hợp `ProtectedRoute` hoặc `GuestRoute` nếu cần) để đảm bảo tối ưu hóa bundle.
- **Trải nghiệm phân trang (Pagination UX)**: Luôn sử dụng `placeholderData` trong `useQuery` (tại hook `useJobs`) để giữ giao diện ổn định, không bị giật lag hoặc mất nội dung khi chuyển trang.
- **Checklist bắt buộc trước khi tạo PR**:
  - [ ] `npm run lint` pass
  - [ ] `npm run build` pass
  - [ ] `npm test` pass
  - [ ] Route và `APP_ROUTES` đồng bộ
  - [ ] Query keys tập trung trong `queryKeys.ts`, không magic string
  - [ ] Không commit file `.env`
  - [ ] Lazy-load page mới trong routes
  - [ ] TypeScript strict — không `any`, handle `undefined`

---

## 6. Bảo mật dự án (Project Security)

- **Xử lý lỗi an toàn (Global Error Boundary)**: Toàn bộ ứng dụng được bọc bởi `ErrorBoundary` tại `AppProviders`. Các lỗi phát sinh được bắt gọn và hiển thị giao diện thân thiện (`ErrorState`), không làm rò rỉ chi tiết lỗi (stack trace/error details) ra màn hình người dùng.
- **Bảo mật xác thực & Token**:
  - Token được quản lý qua Zustand và lưu trữ tại `localStorage` với key chuẩn hóa (`STORAGE_KEYS`).
  - Lớp Axios interceptor (`src/services/client.ts`) tự động theo dõi lỗi `401 Unauthorized` để tiến hành auto-logout và xóa token ngay lập tức khi hết hạn.
- **Phòng chống XSS**: Không sử dụng `dangerouslySetInnerHTML`. Tận dụng cơ chế auto-escaping mặc định của React.
- **Bảo mật cấp độ biên dịch (Compile-time Safety)**: Tuân thủ TypeScript strict mode giúp giảm thiểu đáng kể các lỗ hổng tiềm ẩn do xử lý thiếu null/undefined trước khi code được build ra production.
