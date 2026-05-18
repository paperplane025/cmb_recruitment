# CMB Recruitment

Trang tuyển dụng nội bộ — React + TypeScript.

## Công nghệ

| Công nghệ | Mục đích |
|-----------|----------|
| React 19 + React Compiler | UI + auto-memoization |
| TypeScript (strict) | Type safety |
| Vite | Build tool |
| React Router 7 | Định tuyến + lazy loading |
| TanStack Query | Server state, mutations |
| Zustand | Client state (auth) |
| Axios | HTTP client |
| Tailwind CSS 4 | Styling |

## Trang

| Route | Trang | Quyền | Tính năng |
|-------|-------|-------|-----------|
| `/` | Home | Public | Search, Categories, Featured Jobs, Locations |
| `/login` | Đăng nhập | Guest | Form login + redirect |
| `/register` | Đăng ký | Guest | Form register |
| `/jobs` | Danh sách việc làm | Đã đăng nhập | Filters, Search, Pagination |
| `/jobs/:id` | Chi tiết tin tuyển dụng | Đã đăng nhập | Full info, Related Jobs |

## Bắt đầu

```bash
cp .env.example .env
npm install
npm run dev
```

Mặc định **mock API** bật khi chạy dev (`VITE_ENABLE_MOCK_API`). Đăng nhập bằng bất kỳ email/mật khẩu hợp lệ.

## Scripts

```bash
npm run dev      # http://localhost:5173
npm run build    # Production build
npm run preview  # Xem bản build
npm run lint     # ESLint
npm test         # Vitest (unit)
```

## Cấu trúc thư mục

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
├── pages/          # Trang (thin layer)
├── services/       # API layer (axios)
├── configs/        # env
├── mocks/          # Dữ liệu mock (12 jobs)
├── styles/         # globals.css
└── tests/          # unit | integration | e2e
```

Chi tiết: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) · [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)

## Tính năng chính

### Home Page
- **Search**: Tìm kiếm theo Job Title + Category
- **Categories**: Grid các danh mục với số lượng vị trí
- **Featured Jobs**: Danh sách việc làm nổi bật
- **Locations**: Việc làm theo khu vực

### Job Listing
- **Filters**: Category, Employment Type, Date Posted, Salary Range
- **Search**: Tìm kiếm theo tên vị trí
- **Pagination**: Phân trang 6 jobs/page
- **Deep linking**: URL params từ Home search

### Job Detail
- **Full info**: Category, salary, type, requirements, benefits
- **Related Jobs**: Các vị trí cùng danh mục

### Auth
- Login / Register với Zustand + TanStack Query mutations
- Route protection (ProtectedRoute / GuestRoute)
- Token persistence via localStorage

## Kiến trúc highlights

- **Lazy loading**: Tất cả pages được lazy-loaded (code splitting)
- **Error Boundary**: Global ErrorBoundary bọc toàn app
- **TypeScript strict**: `strict: true` + `noUncheckedIndexedAccess`
- **React Compiler**: Auto-memoization, không cần manual useMemo/useCallback
- **Query key factory**: Centralized trong `shared/constants/queryKeys.ts`

## Agent Skills

Skills nằm tại `.agent/skills/`. Agent tự áp dụng khi làm việc trong repo này.

- `cmb-recruitment` — quy ước dự án
- `add-feature` — thêm feature mới
