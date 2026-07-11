import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useBlogPosts, BlogCard } from '@/features/blog/index.ts'
import { ErrorState } from '@/shared/components/ui/ErrorState.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import type { BlogFilters } from '@/features/blog/types.ts'

import styles from './BlogListingPage.module.scss'
import exploreElliose from '@/assets/images/explore-elliose.svg'
import exploreArrow from '@/assets/images/explore-arrow.svg'

function parseInitialFilters(params: URLSearchParams): BlogFilters {
  const filters: BlogFilters = {}
  const search = params.get('search')
  if (search) filters.search = search
  return filters
}

export function BlogListingPage() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<BlogFilters>(() => parseInitialFilters(searchParams))
  const [searchInput, setSearchInput] = useState(filters.search ?? '')
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, isError, error, refetch } = useBlogPosts(filters, page)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, search: searchInput || undefined }))
    setPage(1)
  }

  return (
    <section>
      {/* ─── Breadcrumb Banner ─── */}
      <header className={styles['p-blog-listing-banner']}>
        <div className={styles['p-blog-listing-banner__ripple']} aria-hidden="true" />
        <div className={styles['p-blog-listing-banner__content']}>
          <h1 className={styles['p-blog-listing-banner__title']}>Blog</h1>
          <nav className={styles['p-blog-listing-banner__breadcrumbs']} aria-label="Breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className={styles['p-blog-listing-banner__breadcrumbs-separator']} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </span>
            <span className={styles['p-blog-listing-banner__breadcrumbs-current']}>Blog</span>
          </nav>
        </div>
      </header>

      <div className={`${styles['p-blog-listing']} l-container`}>
        <form onSubmit={handleSearch} className={styles['p-blog-listing__search']}>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles['p-blog-listing__search-input']}
          />
          <button type="submit" className={styles['p-blog-listing__search-btn']}>
            Tìm kiếm
          </button>
        </form>

        <p className={styles['p-blog-listing__results-count']}>
          Hiển thị <strong>{data?.items.length ?? 0}</strong> trên tổng <strong>{data?.total ?? 0}</strong> bài viết
        </p>

        {(isLoading || isFetching) && (
          <div className={styles['p-blog-listing__loading']}>
            <LoadingState />
          </div>
        )}

        {isError && (
          <ErrorState
            message={getErrorMessage(error, 'Không tải được danh sách bài viết.')}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isFetching && !isError && (
          <>
            {data?.items.length ? (
              <div className={styles['p-blog-listing__grid']}>
                {data.items.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p>Không tìm thấy bài viết phù hợp.</p>
            )}

            {data && data.totalPages > 1 && (
              <nav className={styles['c-pagination']} aria-label="Điều hướng phân trang">
                <button
                  className={`${styles['c-pagination__btn']} ${styles['c-pagination__btn--prev']}`}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  aria-label="Trang trước"
                >
                  <span className={styles['c-pagination__explore-span']} aria-hidden="true">
                    <img src={exploreElliose} alt="" className={styles['c-pagination__explore-circle']} />
                    <img src={exploreArrow} alt="" className={styles['c-pagination__explore-arrow']} />
                  </span>
                </button>
                {Array.from({ length: data.totalPages }).map((_, idx) => {
                  const p = idx + 1
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`${styles['c-pagination__btn']} ${page === p ? styles['c-pagination__btn--active'] : ''}`}
                      aria-label={`Đi đến trang ${p}`}
                    >
                      {String(p).padStart(2, '0')}
                    </button>
                  )
                })}
                <button
                  className={`${styles['c-pagination__btn']} ${styles['c-pagination__btn--next']}`}
                  onClick={() => setPage((prev) => Math.min(data.totalPages, prev + 1))}
                  disabled={page === data.totalPages}
                  aria-label="Trang sau"
                >
                  <span className={styles['c-pagination__explore-span']} aria-hidden="true">
                    <img src={exploreElliose} alt="" className={styles['c-pagination__explore-circle']} />
                    <img src={exploreArrow} alt="" className={styles['c-pagination__explore-arrow']} />
                  </span>
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  )
}
