import { useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router'
import { useJobs, useJobFacets, getSalaryDisplayWithPeriod, getEmploymentTypeLabel } from '@/features/job/index.ts'
import { ErrorState } from '@/shared/components/ui/ErrorState.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import type { JobFilters } from '@/features/job/types.ts'

import styles from './JobListingPage.module.scss'
import exploreElliose from '@/assets/images/explore-elliose.svg'
import exploreArrow from '@/assets/images/explore-arrow.svg'
import cardBanner1 from '@/assets/images/card_banner_1.png'
import cardBanner2 from '@/assets/images/card_banner_2.png'

/* ─── Breadcrumb and Page Constants ─── */
const LOGO_COLORS: Record<string, string> = {
  engineering: '#5b2d8e',
  design: '#c0392b',
  marketing: '#e67e22',
  sales: '#2980b9',
  hr: '#27ae60',
  finance: '#16a085',
  operations: '#8e44ad',
  product: '#d35400',
}

const PAGINATION_ELLIPSIS = 'ellipsis'

// Rút gọn dải số trang khi có nhiều trang (VD: 1 ... 4 5 6 ... 20), tránh liệt kê hết toàn bộ số trang.
function getPaginationRange(current: number, total: number, siblingCount = 1): (number | typeof PAGINATION_ELLIPSIS)[] {
  const totalVisible = siblingCount * 2 + 5

  if (total <= totalVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblingCount, 1)
  const rightSibling = Math.min(current + siblingCount, total)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + siblingCount * 2
    return [...Array.from({ length: leftItemCount }, (_, i) => i + 1), PAGINATION_ELLIPSIS, total]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + siblingCount * 2
    return [1, PAGINATION_ELLIPSIS, ...Array.from({ length: rightItemCount }, (_, i) => total - rightItemCount + i + 1)]
  }

  return [
    1,
    PAGINATION_ELLIPSIS,
    ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i),
    PAGINATION_ELLIPSIS,
    total,
  ]
}

function getInitials(company: string) {
  return company
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

type JobListingNavState = { category?: string; location?: string } | null | undefined

function parseInitialFilters(params: URLSearchParams, navState: JobListingNavState): JobFilters {
  const filters: JobFilters = {}
  const search = params.get('search')
  const category = params.get('category')
  const location = params.get('location')
  if (search) filters.search = search
  if (category) filters.category = category as JobFilters['category']
  if (location) filters.location = location
  // Danh mục/khu vực chọn từ trang chủ được truyền qua location.state để không lộ trên URL.
  if (navState?.category) filters.category = navState.category as JobFilters['category']
  if (navState?.location) filters.location = navState.location
  return filters
}

export function JobListingPage() {
  const [searchParams] = useSearchParams()
  const routerLocation = useLocation()
  const [filters, setFilters] = useState<JobFilters>(() =>
    parseInitialFilters(searchParams, routerLocation.state as JobListingNavState),
  )
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  // React Router không remount lại trang khi vẫn ở cùng route (VD: bấm danh mục ở
  // trang chủ trong lúc đã đang ở /jobs) — cần đồng bộ lại filter mỗi khi có điều
  // hướng mới tới trang này, chứ không chỉ đọc một lần lúc mount. `location.key` đổi
  // ở mọi lần điều hướng (kể cả khi URL không đổi, chỉ khác location.state).
  const [syncedLocationKey, setSyncedLocationKey] = useState(routerLocation.key)
  if (routerLocation.key !== syncedLocationKey) {
    setSyncedLocationKey(routerLocation.key)
    setFilters(parseInitialFilters(searchParams, routerLocation.state as JobListingNavState))
    setPage(1)
  }

  const { data, isLoading, isFetching, isError, error, refetch } = useJobs(filters, page)
  const { data: facets } = useJobFacets()

  const handleFilterSelect = <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => {
    setFilters((prev) => {
      // Toggle if already selected
      if (prev[key] === value) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: value }
    })
    setPage(1)
  }

  // Loại hình công việc cho phép chọn nhiều cùng lúc — lưu dạng chuỗi cách nhau bởi dấu phẩy, khớp job có BẤT KỲ loại hình nào trong danh sách.
  const handleEmploymentTypeToggle = (key: string) => {
    setFilters((prev) => {
      const current = prev.employmentType?.split(',').filter(Boolean) ?? []
      const next = current.includes(key)
        ? current.filter((k) => k !== key)
        : [...current, key]
      return { ...prev, employmentType: next.length ? next.join(',') : undefined }
    })
    setPage(1)
  }

  const handleSortChange = (sort: JobFilters['sort']) => {
    setFilters((prev) => ({ ...prev, sort }))
    setPage(1)
  }

  const handleSalaryOptionSelect = (min: number, max: number) => {
    setFilters((prev) => {
      if (prev.salaryMin === min && prev.salaryMax === max) {
        return { ...prev, salaryMin: undefined, salaryMax: undefined }
      }
      return { ...prev, salaryMin: min, salaryMax: max }
    })
    setPage(1)
  }

  return (
    <section>
      {/* ─── Breadcrumb Banner ─── */}
      <header className={styles['p-job-listing-banner']}>
        <div className={styles['p-job-listing-banner__ripple']} aria-hidden="true" />
        <div className={styles['p-job-listing-banner__content']}>
          <h1 className={styles['p-job-listing-banner__title']}>Danh sách việc làm</h1>
          <nav className={styles['p-job-listing-banner__breadcrumbs']} aria-label="Breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className={styles['p-job-listing-banner__breadcrumbs-separator']} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </span>
            <span className={styles['p-job-listing-banner__breadcrumbs-current']}>Danh sách việc làm</span>
          </nav>
        </div>
      </header>

      <div className={`${styles['p-job-listing']} l-container`}>
        <div className={styles['p-job-listing__grid']}>
          
          {/* ─── Left Sidebar Filters ─── */}
          <aside className={styles['p-job-filter-sidebar']}>
            {/* Job Category */}
            <div className={styles['p-job-filter-sidebar__group']}>
              <h2 className={styles['p-job-filter-sidebar__title']}>Danh mục việc làm</h2>
              <ul className={`${styles['p-job-filter-sidebar__list']} ${styles['p-job-filter-sidebar__list--scrollable']}`}>
                {facets?.categories.map((cat) => {
                  // filters.category có thể chứa nhiều danh mục cách nhau bởi dấu phẩy
                  // (VD: "marketing,sales" khi vào từ card gộp ở trang chủ)
                  const isActive = (filters.category?.split(',') ?? []).includes(cat.key)
                  return (
                    <li
                      key={cat.key}
                      className={styles['p-job-filter-sidebar__item']}
                      onClick={() => handleFilterSelect('category', cat.key as JobFilters['category'])}
                    >
                      <div className={styles['p-job-filter-sidebar__label-area']}>
                        <span className={`${styles['p-job-filter-sidebar__circle']} ${isActive ? styles['p-job-filter-sidebar__circle--active'] : ''}`} />
                        <span>{cat.label}</span>
                      </div>
                      <span className={styles['p-job-filter-sidebar__count']}>({cat.count})</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Khu vực */}
            <div className={styles['p-job-filter-sidebar__group']}>
              <h2 className={styles['p-job-filter-sidebar__title']}>Khu vực</h2>
              <ul className={`${styles['p-job-filter-sidebar__list']} ${styles['p-job-filter-sidebar__list--scrollable']}`}>
                {facets?.locations.map((loc) => {
                  // filters.location có thể chứa nhiều khu vực cách nhau bởi dấu phẩy
                  const isActive = (filters.location?.split(',') ?? []).includes(loc.key)
                  return (
                    <li
                      key={loc.key}
                      className={styles['p-job-filter-sidebar__item']}
                      onClick={() => handleFilterSelect('location', loc.key)}
                    >
                      <div className={styles['p-job-filter-sidebar__label-area']}>
                        <span className={`${styles['p-job-filter-sidebar__circle']} ${isActive ? styles['p-job-filter-sidebar__circle--active'] : ''}`} />
                        <span>{loc.label}</span>
                      </div>
                      <span className={styles['p-job-filter-sidebar__count']}>({loc.count})</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Type of Employments */}
            <div className={styles['p-job-filter-sidebar__group']}>
              <h2 className={styles['p-job-filter-sidebar__title']}>Loại hình công việc</h2>
              <ul className={styles['p-job-filter-sidebar__list']}>
                {facets?.employmentTypes.map((emp) => {
                  const isActive = (filters.employmentType?.split(',') ?? []).includes(emp.key)
                  return (
                    <li
                      key={emp.key}
                      className={styles['p-job-filter-sidebar__item']}
                      onClick={() => handleEmploymentTypeToggle(emp.key)}
                    >
                      <div className={styles['p-job-filter-sidebar__label-area']}>
                        <span className={`${styles['p-job-filter-sidebar__circle']} ${isActive ? styles['p-job-filter-sidebar__circle--active'] : ''}`} />
                        <span>{emp.label}</span>
                      </div>
                      <span className={styles['p-job-filter-sidebar__count']}>({emp.count})</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Date of Post */}
            <div className={styles['p-job-filter-sidebar__group']}>
              <h2 className={styles['p-job-filter-sidebar__title']}>Ngày đăng</h2>
              <ul className={styles['p-job-filter-sidebar__list']}>
                {facets?.datePosted.map((post) => {
                  const isActive = filters.datePosted === post.key
                  return (
                    <li
                      key={post.key}
                      className={styles['p-job-filter-sidebar__item']}
                      onClick={() =>
                        handleFilterSelect('datePosted', post.key as JobFilters['datePosted'])
                      }
                    >
                      <div className={styles['p-job-filter-sidebar__label-area']}>
                        <span className={`${styles['p-job-filter-sidebar__circle']} ${isActive ? styles['p-job-filter-sidebar__circle--active'] : ''}`} />
                        <span>{post.label}</span>
                      </div>
                      <span className={styles['p-job-filter-sidebar__count']}>({post.count})</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Salary Range Slider */}
            <div className={styles['p-job-filter-sidebar__group']}>
              <h2 className={styles['p-job-filter-sidebar__title']}>Mức lương</h2>
              <ul className={styles['p-job-filter-sidebar__list']}>
                {facets?.salaryRanges.map((sal) => {
                  const isActive = filters.salaryMin === sal.min && filters.salaryMax === sal.max
                  return (
                    <li
                      key={sal.label}
                      className={styles['p-job-filter-sidebar__item']}
                      onClick={() => handleSalaryOptionSelect(sal.min, sal.max)}
                    >
                      <div className={styles['p-job-filter-sidebar__label-area']}>
                        <span className={`${styles['p-job-filter-sidebar__circle']} ${isActive ? styles['p-job-filter-sidebar__circle--active'] : ''}`} />
                        <span>{sal.label}</span>
                      </div>
                      <span className={styles['p-job-filter-sidebar__count']}>({sal.count})</span>
                    </li>
                  )
                })}
              </ul>
            </div>

          </aside>

          {/* ─── Right Content Panel ─── */}
          <div className={styles['p-job-listing-content']}>
            
            {/* Header / Top Control Row */}
            <div className={styles['p-job-listing-content__header']}>
              <p className={styles['p-job-listing-content__results-count']}>
                Hiển thị <strong>{data?.items.length ?? 0}</strong> trên tổng <strong>{data?.total ?? 0}</strong> việc làm
              </p>
              
              <div className={styles['p-job-listing-content__controls']}>
                <select
                  value={filters.sort ?? 'default'}
                  onChange={(e) => handleSortChange(e.target.value as JobFilters['sort'])}
                  className={styles['p-job-listing-content__sort-select']}
                >
                  <option value="default">Sắp xếp (Mặc định)</option>
                  <option value="salary">Sắp xếp theo lương</option>
                  <option value="applications">Ứng tuyển nhiều nhất</option>
                </select>

                <div className={styles['p-job-listing-content__view-toggle']}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`${styles['p-job-listing-content__layout-btn']} ${viewMode === 'grid' ? styles['p-job-listing-content__layout-btn--active'] : ''}`}
                    aria-label="Xem dạng lưới"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`${styles['p-job-listing-content__layout-btn']} ${viewMode === 'list' ? styles['p-job-listing-content__layout-btn--active'] : ''}`}
                    aria-label="Xem dạng danh sách"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Core Listing Content */}
            {(isLoading || isFetching) && (
              <div className={styles['p-job-listing-content__loading']}>
                <LoadingState />
              </div>
            )}

            {isError && (
              <ErrorState
                message={getErrorMessage(error, 'Không tải được danh sách việc làm.')}
                onRetry={() => refetch()}
              />
            )}

            {!isLoading && !isFetching && !isError && (
              <div className={styles['p-job-listing-content__results']}>
                {data?.items.length ? (
                  viewMode === 'list' ? (
                    <div className={styles['p-job-listing-content__list']}>
                      {data.items.map((job) => {
                        const logoColor = LOGO_COLORS[job.category] ?? '#005198'
                        const formattedDate = new Date(job.postedAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })

                        return (
                          <article key={job.id} className={styles['c-job-card-list']}>
                            <div className={styles['c-job-card-list__top']}>
                              <div className={styles['c-job-card-list__left']}>
                                <div
                                  className={styles['c-job-card-list__logo']}
                                  style={{ backgroundColor: logoColor }}
                                >
                                  {getInitials(job.company)}
                                </div>
                                <div className={styles['c-job-card-list__info']}>
                                  <h3 className={styles['c-job-card-list__title']}>
                                    <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                                  </h3>
                                  <p className={styles['c-job-card-list__company']}>{job.company}</p>
                                </div>
                              </div>

                              <div className={styles['c-job-card-list__middle']}>
                                <div className={styles['c-job-card-list__meta-item']}>
                                  <span className={styles['c-job-card-list__dot']} />
                                  <span>Mức lương: <strong>{getSalaryDisplayWithPeriod(job)}</strong></span>
                                </div>
                                <div className={styles['c-job-card-list__meta-item']}>
                                  <span className={styles['c-job-card-list__dot']} />
                                  <span>Ngày đăng: <strong>{formattedDate}</strong></span>
                                </div>
                              </div>

                            </div>

                            <div className={styles['c-job-card-list__bottom']}>
                              <div className={styles['c-job-card-list__tags']}>
                                {job.employmentType.map((type) => (
                                  <span
                                    key={type}
                                    className={`${styles['c-job-card-list__tag']} ${styles[`c-job-card-list__tag--${type}`] ?? ''}`}
                                  >
                                    {getEmploymentTypeLabel(type)}
                                  </span>
                                ))}
                              </div>
                              <Link to={`/jobs/${job.id}`} className={styles['c-job-card-list__apply']}>
                                <span className={styles['c-job-card-list__explore-span']}>
                                  <img src={exploreElliose} alt="" className={styles['c-job-card-list__explore-circle']} />
                                  <img src={exploreArrow} alt="" className={styles['c-job-card-list__explore-arrow']} />
                                </span>
                                Ứng tuyển ngay
                              </Link>
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  ) : (
                    <div className={styles['p-job-listing-content__grid-layout']}>
                      {data.items.map((job, idx) => {
                        const logoColor = LOGO_COLORS[job.category] ?? '#005198'
                        const bannerSrc = job.image || (idx % 2 === 0 ? cardBanner1 : cardBanner2)
                        const formattedDate = new Date(job.postedAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })

                        return (
                          <article key={job.id} className={styles['c-job-card-grid']}>
                            <div className={styles['c-job-card-grid__banner-wrap']}>
                              <img src={bannerSrc} alt="" className={styles['c-job-card-grid__banner']} />
                              {job.isFeatured && (
                                <div className={styles['c-job-card-grid__urgent-badge']}>
                                  Gấp
                                </div>
                              )}
                            </div>

                            <div className={styles['c-job-card-grid__body']}>
                              <div className={styles['c-job-card-grid__company-row']}>
                                <div
                                  className={styles['c-job-card-grid__logo']}
                                  style={{ backgroundColor: logoColor }}
                                >
                                  {getInitials(job.company)}
                                </div>
                                <div className={styles['c-job-card-grid__company-info']}>
                                  <h3 className={styles['c-job-card-grid__title']}>
                                    <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                                  </h3>
                                  <p className={styles['c-job-card-grid__company']}>{job.company} | Ngày đăng: {formattedDate}</p>
                                </div>
                              </div>

                              <hr className={styles['c-job-card-grid__divider']} />

                              <ul className={styles['c-job-card-grid__meta']}>
                                <li className={styles['c-job-card-grid__meta-item']}>
                                  <span className={styles['c-job-card-grid__dot']} />
                                  <span>Mức lương: <strong>{getSalaryDisplayWithPeriod(job)}</strong></span>
                                </li>
                                <li className={styles['c-job-card-grid__meta-item']}>
                                  <span className={styles['c-job-card-grid__dot']} />
                                  <span>Kinh nghiệm: <strong>{job.experience || 'Không yêu cầu'}</strong></span>
                                </li>
                                <li className={styles['c-job-card-grid__meta-item']}>
                                  <span className={styles['c-job-card-grid__dot']} />
                                  <span>Địa điểm: <strong>{job.locationLabel ?? job.location}</strong></span>
                                </li>
                              </ul>

                              <div className={styles['c-job-card-grid__footer']}>
                                <div className={styles['c-job-card-grid__tags']}>
                                  {job.employmentType.map((type) => (
                                    <span key={type} className={styles['c-job-card-grid__tag']}>
                                      {getEmploymentTypeLabel(type)}
                                    </span>
                                  ))}
                                </div>
                                <Link to={`/jobs/${job.id}`} className={styles['c-job-card-grid__apply']}>
                                  <span className={styles['c-job-card-grid__explore-span']}>
                                    <img src={exploreElliose} alt="" className={styles['c-job-card-grid__explore-circle']} />
                                    <img src={exploreArrow} alt="" className={styles['c-job-card-grid__explore-arrow']} />
                                  </span>
                                  Ứng tuyển ngay
                                </Link>
                              </div>
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  )
                ) : (
                  <p>Không tìm thấy việc làm phù hợp với tiêu chí của bạn.</p>
                )}

                {/* Styled Pagination Controls */}
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
                    {getPaginationRange(page, data.totalPages).map((p, idx) =>
                      p === PAGINATION_ELLIPSIS ? (
                        <span key={`ellipsis-${idx}`} className={styles['c-pagination__ellipsis']} aria-hidden="true">
                          …
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`${styles['c-pagination__btn']} ${page === p ? styles['c-pagination__btn--active'] : ''}`}
                          aria-label={`Đi đến trang ${p}`}
                          aria-current={page === p ? 'page' : undefined}
                        >
                          {String(p).padStart(2, '0')}
                        </button>
                      ),
                    )}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
