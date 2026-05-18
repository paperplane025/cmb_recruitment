import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { JobCard, useJobs } from '@/features/job/index.ts'
import { JobFiltersBar } from '@/features/job/components/JobFiltersBar.tsx'
import { ErrorState } from '@/shared/components/ui/ErrorState.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { Pagination } from '@/shared/components/ui/Pagination.tsx'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import type { JobFilters } from '@/features/job/types.ts'

function parseInitialFilters(params: URLSearchParams): JobFilters {
  const filters: JobFilters = {}
  const search = params.get('search')
  const category = params.get('category')
  const location = params.get('location')
  if (search) filters.search = search
  if (category) filters.category = category as JobFilters['category']
  if (location) filters.location = location
  return filters
}

export function JobListingPage() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<JobFilters>(() =>
    parseInitialFilters(searchParams),
  )
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState(filters.search ?? '')

  const { data, isLoading, isError, error, refetch } = useJobs(filters, page)

  const handleFiltersChange = (newFilters: JobFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, search: searchInput || undefined }))
    setPage(1)
  }

  return (
    <section>
      <h1 className="text-left">Danh sách tuyển dụng</h1>
      <p className="mt-2 text-left text-sm text-[var(--text)]">
        Các vị trí đang mở trong tổ chức.
        {data ? ` — ${data.total} kết quả` : ''}
      </p>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="mt-4 flex gap-2"
      >
        <input
          id="job-search"
          type="text"
          placeholder="Tìm kiếm theo tên vị trí..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 rounded-md border border-[var(--border)] bg-transparent px-4 py-2 text-sm text-[var(--text-h)] outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-bg)]"
        />
        <button
          type="submit"
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Tìm
        </button>
      </form>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Filters sidebar */}
        <JobFiltersBar filters={filters} onChange={handleFiltersChange} />

        {/* Results */}
        <div>
          {isLoading ? <LoadingState /> : null}

          {isError ? (
            <ErrorState
              message={getErrorMessage(
                error,
                'Không tải được danh sách việc làm.',
              )}
              onRetry={() => refetch()}
            />
          ) : null}

          {!isLoading && !isError ? (
            <>
              <div className="grid gap-4">
                {data?.items.length ? (
                  data.items.map((job) => <JobCard key={job.id} job={job} />)
                ) : (
                  <p className="text-left text-sm text-[var(--text)]">
                    Không tìm thấy tin tuyển dụng phù hợp.
                  </p>
                )}
              </div>

              {data && (
                <Pagination
                  page={data.page}
                  totalPages={data.totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
