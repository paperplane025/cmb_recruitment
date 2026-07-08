import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useJobs } from '@/features/job/index.ts'
import { ErrorState } from '@/shared/components/ui/ErrorState.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import type { JobFilters, JobCategory, EmploymentType } from '@/features/job/types.ts'

import styles from './JobListingPage.module.scss'
import exploreElliose from '@/assets/images/explore-elliose.svg'
import exploreArrow from '@/assets/images/explore-arrow.svg'
import cardBanner1 from '@/assets/images/card_banner_1.png'
import cardBanner2 from '@/assets/images/card_banner_2.png'

/* ─── Breadcrumb and Page Constants ─── */
const MOCK_CATEGORIES = [
  { label: 'Y tế', count: 80, val: 'hr' as JobCategory },
  { label: 'Kế toán & Tài chính', count: 80, val: 'finance' as JobCategory },
  { label: 'Vận tải', count: 100, val: 'operations' as JobCategory },
  { label: 'Y tế & Tài chính', count: 120, val: 'finance' as JobCategory },
  { label: 'Phát triển phần mềm', count: 30, val: 'engineering' as JobCategory },
  { label: 'Kỹ thuật', count: 10, val: 'engineering' as JobCategory },
  { label: 'Lễ tân', count: 70, val: 'hr' as JobCategory },
  { label: 'Tổ chức phi lợi nhuận', count: 100, val: 'product' as JobCategory },
]

const MOCK_EMPLOYMENTS = [
  { label: 'Toàn thời gian', count: 30, val: 'full-time' as EmploymentType },
  { label: 'Tự do', count: 10, val: 'contract' as EmploymentType },
  { label: 'Bán thời gian', count: 100, val: 'part-time' as EmploymentType },
  { label: 'Từ xa', count: 60, val: 'contract' as EmploymentType },
  { label: 'Tạm thời', count: 40, val: 'contract' as EmploymentType },
  { label: 'Lâu dài', count: 30, val: 'full-time' as EmploymentType },
  { label: 'Thực tập', count: 80, val: 'internship' as EmploymentType },
]

const MOCK_POST_DATES = [
  { label: 'Hôm nay', count: 80, val: 'today' as const },
  { label: 'Tuần trước', count: 100, val: 'this-week' as const },
  { label: 'Tháng trước', count: 100, val: 'this-month' as const },
  { label: '3 tháng trước', count: 30, val: 'all' as const },
  { label: '1 năm trước', count: 30, val: 'all' as const },
]

const MOCK_SALARIES = [
  { label: '$5K-$15K', count: 80, min: 5_000_000, max: 15_000_000 },
  { label: '$20K-$30K', count: 100, min: 20_000_000, max: 30_000_000 },
  { label: '$35K-$50K', count: 100, min: 35_000_000, max: 50_000_000 },
  { label: '$55K-$70K', count: 120, min: 55_000_000, max: 70_000_000 },
  { label: '$75K-$100K', count: 30, min: 75_000_000, max: 100_000_000 },
]

const SIDEBAR_TAGS = [
  'Technology', 'Marketing', 'Sales',
  'Transport', 'Medical', 'Design',
  'Data Analyst', 'Development',
  'Non-Profit', 'Manager', 'Health'
]

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

/* ─── Local custom formatter to match mockup USD/VND style ─── */
function formatJobSalary(min: number, max: number, currency: string) {
  if (currency === 'VND') {
    return `$${min / 1_000_000}K-$${max / 1_000_000}K / Tháng`
  }
  return `$${min / 1000}K-$${max / 1000}K / Tháng`
}

function getInitials(company: string) {
  return company
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [salaryRangeVal, setSalaryRangeVal] = useState<number>(350)
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [sortOption, setSortOption] = useState<string>('default')

  const { data, isLoading, isError, error, refetch } = useJobs(filters, page)

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

  const handleSalaryRangeChange = (val: number) => {
    setSalaryRangeVal(val)
    setFilters((prev) => ({
      ...prev,
      salaryMin: undefined,
      salaryMax: val * 1_000_000
    }))
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
                {MOCK_CATEGORIES.map((cat, idx) => {
                  const isActive = filters.category === cat.val
                  return (
                    <li
                      key={idx}
                      className={styles['p-job-filter-sidebar__item']}
                      onClick={() => handleFilterSelect('category', cat.val)}
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

            {/* Type of Employments */}
            <div className={styles['p-job-filter-sidebar__group']}>
              <h2 className={styles['p-job-filter-sidebar__title']}>Loại hình công việc</h2>
              <ul className={styles['p-job-filter-sidebar__list']}>
                {MOCK_EMPLOYMENTS.map((emp, idx) => {
                  const isActive = filters.employmentType === emp.val
                  return (
                    <li
                      key={idx}
                      className={styles['p-job-filter-sidebar__item']}
                      onClick={() => handleFilterSelect('employmentType', emp.val)}
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
                {MOCK_POST_DATES.map((post, idx) => {
                  const isActive = filters.datePosted === post.val
                  return (
                    <li
                      key={idx}
                      className={styles['p-job-filter-sidebar__item']}
                      onClick={() => handleFilterSelect('datePosted', post.val)}
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
              <div className={styles['p-job-filter-sidebar__slider-wrap']}>
                <div className={styles['p-job-filter-sidebar__slider-range']}>
                  $10K-${salaryRangeVal}K
                </div>
                <input
                  type="range"
                  min="10"
                  max="700"
                  value={salaryRangeVal}
                  onChange={(e) => handleSalaryRangeChange(Number(e.target.value))}
                  className={styles['p-job-filter-sidebar__slider']}
                />
              </div>
              <ul className={styles['p-job-filter-sidebar__list']}>
                {MOCK_SALARIES.map((sal, idx) => {
                  const isActive = filters.salaryMin === sal.min && filters.salaryMax === sal.max
                  return (
                    <li
                      key={idx}
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

            {/* Popular Tags / Date of Post bottom */}
            <div className={styles['p-job-filter-sidebar__group']}>
              <h2 className={styles['p-job-filter-sidebar__title']}>Ngày đăng</h2>
              <div className={styles['p-job-filter-sidebar__tags-container']}>
                {SIDEBAR_TAGS.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => {
                      setSelectedTag((prev) => (prev === tag ? '' : tag))
                      setFilters((prev) => ({ ...prev, search: selectedTag === tag ? undefined : tag }))
                    }}
                    className={`${styles['p-job-filter-sidebar__tag']} ${selectedTag === tag ? styles['p-job-filter-sidebar__tag--active'] : ''}`}
                  >
                    {tag},
                  </span>
                ))}
              </div>
            </div>

            <button className={styles['p-job-filter-sidebar__alert-btn']}>
              Đến trang thông báo việc làm
            </button>
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
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className={styles['p-job-listing-content__sort-select']}
                >
                  <option value="default">Sắp xếp (Mặc định)</option>
                  <option value="salary">Sắp xếp theo lương</option>
                  <option value="newest">Sắp xếp mới nhất</option>
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
            {isLoading && <LoadingState />}

            {isError && (
              <ErrorState
                message={getErrorMessage(error, 'Không tải được danh sách việc làm.')}
                onRetry={() => refetch()}
              />
            )}

            {!isLoading && !isError && (
              <>
                {data?.items.length ? (
                  viewMode === 'list' ? (
                    <div className={styles['p-job-listing-content__list']}>
                      {data.items.map((job) => {
                        const logoColor = LOGO_COLORS[job.category] ?? '#005198'
                        const isPartTime = job.employmentType === 'part-time'
                        const isRemote = job.employmentType === 'contract'
                        const formattedDate = new Date(job.postedAt).toLocaleDateString('en-GB', {
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
                                  <span>Mức lương: <strong>{formatJobSalary(job.salary.min, job.salary.max, job.salary.currency)}</strong></span>
                                </div>
                                <div className={styles['c-job-card-list__meta-item']}>
                                  <span className={styles['c-job-card-list__dot']} />
                                  <span>Hạn nộp: <strong>{formattedDate}</strong></span>
                                </div>
                              </div>

                              <button className={styles['c-job-card-list__bookmark']} aria-label="Lưu tin">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                              </button>
                            </div>

                            <div className={styles['c-job-card-list__bottom']}>
                              <div className={styles['c-job-card-list__tags']}>
                                <span className={styles['c-job-card-list__tag']}>Toàn thời gian</span>
                                {isPartTime && <span className={`${styles['c-job-card-list__tag']} ${styles['c-job-card-list__tag--part-time']}`}>Bán thời gian</span>}
                                {isRemote && <span className={`${styles['c-job-card-list__tag']} ${styles['c-job-card-list__tag--remote']}`}>Từ xa</span>}
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
                        const bannerSrc = idx % 2 === 0 ? cardBanner1 : cardBanner2
                        const formattedDate = new Date(job.postedAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })

                        return (
                          <article key={job.id} className={styles['c-job-card-grid']}>
                            <div className={styles['c-job-card-grid__banner-wrap']}>
                              <img src={bannerSrc} alt="" className={styles['c-job-card-grid__banner']} />
                              <button className={styles['c-job-card-grid__bookmark']} aria-label="Lưu tin">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                              </button>
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
                                  <p className={styles['c-job-card-grid__company']}>{job.company} | Hạn nộp: {formattedDate}</p>
                                </div>
                              </div>

                              <hr className={styles['c-job-card-grid__divider']} />

                              <ul className={styles['c-job-card-grid__meta']}>
                                <li className={styles['c-job-card-grid__meta-item']}>
                                  <span className={styles['c-job-card-grid__dot']} />
                                  <span>Mức lương: <strong>{formatJobSalary(job.salary.min, job.salary.max, job.salary.currency)}</strong></span>
                                </li>
                                <li className={styles['c-job-card-grid__meta-item']}>
                                  <span className={styles['c-job-card-grid__dot']} />
                                  <span>Kinh nghiệm: <strong>2-2.5 năm</strong></span>
                                </li>
                                <li className={styles['c-job-card-grid__meta-item']}>
                                  <span className={styles['c-job-card-grid__dot']} />
                                  <span>Địa điểm: <strong>{job.location}</strong></span>
                                </li>
                              </ul>

                              <div className={styles['c-job-card-grid__footer']}>
                                <span className={styles['c-job-card-grid__tag']}>Toàn thời gian</span>
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
        </div>
      </div>
    </section>
  )
}
