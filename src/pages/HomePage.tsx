import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/shared/components/ui/Button.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { env } from '@/configs/env.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import {
  useFeaturedJobs,
  useJobCategories,
  useJobLocations,
  JobCard,
} from '@/features/job/index.ts'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="space-y-16 py-4">
      <HeroSection isAuthenticated={isAuthenticated} />
      <CategoriesSection />
      <FeaturedJobsSection isAuthenticated={isAuthenticated} />
      <LocationsSection />
    </div>
  )
}

/* ─── Hero + Search ─── */

function HeroSection({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [searchTitle, setSearchTitle] = useState('')
  const [searchCategory, setSearchCategory] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTitle) params.set('search', searchTitle)
    if (searchCategory) params.set('category', searchCategory)
    const target = isAuthenticated ? APP_ROUTES.jobs : APP_ROUTES.login
    navigate(`${target}?${params.toString()}`)
  }

  return (
    <section className="mx-auto max-w-3xl text-center">
      <h1>{env.appName}</h1>
      <p className="mt-4 text-lg text-[var(--text)]">
        Nền tảng tuyển dụng nội bộ — tìm kiếm và ứng tuyển các vị trí trong tổ
        chức.
      </p>

      <form
        onSubmit={handleSearch}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <input
          id="search-title"
          type="text"
          placeholder="Tên vị trí (VD: Frontend Developer)"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="flex-1 rounded-md border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm text-[var(--text-h)] outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-bg)]"
        />
        <select
          id="search-category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="rounded-md border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm text-[var(--text-h)] outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-bg)]"
        >
          <option value="">Tất cả danh mục</option>
          <option value="engineering">Kỹ thuật</option>
          <option value="design">Thiết kế</option>
          <option value="marketing">Marketing</option>
          <option value="sales">Kinh doanh</option>
          <option value="hr">Nhân sự</option>
          <option value="finance">Tài chính</option>
          <option value="operations">Vận hành</option>
          <option value="product">Sản phẩm</option>
        </select>
        <Button type="submit">Tìm kiếm</Button>
      </form>

      {!isAuthenticated && (
        <div className="mt-6 flex justify-center gap-3">
          <Link to={APP_ROUTES.login}>
            <Button variant="secondary">Đăng nhập</Button>
          </Link>
          <Link to={APP_ROUTES.register}>
            <Button variant="secondary">Đăng ký tài khoản</Button>
          </Link>
        </div>
      )}
    </section>
  )
}

/* ─── Categories ─── */

function CategoriesSection() {
  const { data: categories, isLoading } = useJobCategories()

  return (
    <section className="text-left">
      <h2 className="text-2xl">Danh mục việc làm</h2>
      <p className="mt-1 text-sm text-[var(--text)]">
        Khám phá các vị trí theo lĩnh vực chuyên môn
      </p>

      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories?.map((cat) => (
            <Link
              key={cat.key}
              to={`${APP_ROUTES.jobs}?category=${cat.key}`}
              className="group rounded-lg border border-[var(--border)] p-4 text-center transition-colors hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]"
            >
              <span className="text-sm font-medium text-[var(--text-h)] group-hover:text-[var(--accent)]">
                {cat.label}
              </span>
              <span className="mt-1 block text-xs text-[var(--text)]">
                {cat.count} vị trí
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

/* ─── Featured Jobs ─── */

function FeaturedJobsSection({
  isAuthenticated,
}: {
  isAuthenticated: boolean
}) {
  const { data: jobs, isLoading } = useFeaturedJobs()

  return (
    <section className="text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Việc làm nổi bật</h2>
          <p className="mt-1 text-sm text-[var(--text)]">
            Các vị trí được ưu tiên tuyển dụng
          </p>
        </div>
        <Link
          to={isAuthenticated ? APP_ROUTES.jobs : APP_ROUTES.login}
          className="text-sm font-medium text-[var(--accent)]"
        >
          Xem tất cả →
        </Link>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {jobs?.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </section>
  )
}

/* ─── Locations ─── */

function LocationsSection() {
  const { data: locations, isLoading } = useJobLocations()

  return (
    <section className="text-left">
      <h2 className="text-2xl">Việc làm theo khu vực</h2>
      <p className="mt-1 text-sm text-[var(--text)]">
        Tìm cơ hội gần bạn nhất
      </p>

      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {locations?.map((loc) => (
            <Link
              key={loc.name}
              to={`${APP_ROUTES.jobs}?location=${encodeURIComponent(loc.name)}`}
              className="group flex items-center justify-between rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]"
            >
              <span className="text-sm font-medium text-[var(--text-h)] group-hover:text-[var(--accent)]">
                📍 {loc.name}
              </span>
              <span className="rounded-full bg-[var(--code-bg)] px-2 py-0.5 text-xs text-[var(--text)]">
                {loc.count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
