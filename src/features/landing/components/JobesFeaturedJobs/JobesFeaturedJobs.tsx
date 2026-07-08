import { Link } from 'react-router'
import { APP_ROUTES, jobDetailPath } from '@/shared/constants/index.ts'
import { useFeaturedJobs } from '@/features/job/index.ts'
import { formatSalary } from '@/features/job/index.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { formatDate } from '@/shared/utils/dateUtils.ts'
import type { Job } from '@/features/job/types.ts'
import styles from './JobesFeaturedJobs.module.scss'
import exploreElliose from '@/assets/images/explore-elliose.svg'
import exploreArrow from '@/assets/images/explore-arrow.svg'

/* ─── Employment type badge labels ─── */
const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Toàn thời gian',
  'part-time': 'Bán thời gian',
  contract: 'Từ xa',
  internship: 'Thực tập',
}

/* ─── Category → company logo colour (seeded) ─── */
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

interface FeaturedJobCardProps {
  job: Job
  index: number
}

function FeaturedJobCard({ job, index }: FeaturedJobCardProps) {
  const initials = job.company
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const logoColor = LOGO_COLORS[job.category] ?? '#005198'
  const types = [job.employmentType]
  // Add "Remote" badge for contract, otherwise show at most 2 relevant tags
  const tags: Array<{ key: string; label: string }> = types.flatMap((t) => {
    const label = TYPE_LABELS[t]
    return label ? [{ key: t, label }] : []
  })
  // Simulate extra tags from design (up to 3 pills)
  if (job.employmentType === 'full-time') tags.push({ key: 'part-time', label: TYPE_LABELS['part-time']! })
  if (job.employmentType === 'full-time') tags.push({ key: 'remote', label: TYPE_LABELS['contract']! })

  const salaryText = formatSalary(job.salary.min, job.salary.max, job.salary.currency)
  const dateText = formatDate(job.postedAt)

  // Fake "applied" count seeded from index
  const appliedCount = String((index + 1) * 2 + 5).padStart(2, '0')

  return (
    <article
      className={styles['p-featured-jobs__card']}
      id={`featured-job-card-${job.id}`}
      aria-label={`Việc làm: ${job.title} tại ${job.company}`}
    >
      <Link to={jobDetailPath(job.id)} className='p-featured-jobs__card__mark'></Link>
      {/* ── Top Row ── */}
      <div className={styles['p-featured-jobs__card-top']}>
        <div className={styles['p-featured-jobs__card-list-content']}>
          <div className={styles['p-featured-jobs__card-company-area']}>
            {/* Company Logo */}
            <div
              className={styles['p-featured-jobs__card-logo']}
              style={{ backgroundColor: logoColor }}
              aria-hidden="true"
            >
              {initials}
            </div>

            {/* Title + Company */}
            <div className={styles['p-featured-jobs__card-info']}>
              <h3 className={styles['p-featured-jobs__card-title']}>{job.title}</h3>
              <p className={styles['p-featured-jobs__card-company']}>{job.company}</p>
            </div>
          </div>

          {/* Meta dots — in the centre column */}
          <ul className={styles['p-featured-jobs__card-meta']} aria-label="Chi tiết việc làm">
            <li className={styles['p-featured-jobs__card-meta-item']}>
              <span className={styles['p-featured-jobs__card-dot']} aria-hidden="true" />
              <span>
                Địa điểm: <strong>{job.location}</strong>
              </span>
            </li>
            <li className={styles['p-featured-jobs__card-meta-item']}>
              <span className={styles['p-featured-jobs__card-dot']} aria-hidden="true" />
              <span>
                Mức lương: <strong>{salaryText}</strong>
              </span>
            </li>
            <li className={styles['p-featured-jobs__card-meta-item']}>
              <span className={styles['p-featured-jobs__card-dot']} aria-hidden="true" />
              <span>
                Kinh nghiệm: <strong>1.5–3 Năm</strong>
              </span>
            </li>
            <li className={styles['p-featured-jobs__card-meta-item']}>
              <span className={styles['p-featured-jobs__card-dot']} aria-hidden="true" />
              <span>
                Ngày đăng: <strong>{dateText}</strong>
              </span>
            </li>
          </ul>
        </div>

        {/* Bookmark */}
        <button
          className={styles['p-featured-jobs__card-bookmark']}
          aria-label={`Lưu tin ${job.title}`}
          id={`bookmark-btn-${job.id}`}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* ── Divider ── */}
      <hr className={styles['p-featured-jobs__card-divider']} />

      {/* ── Bottom Row ── */}
      <div className={styles['p-featured-jobs__card-bottom']}>
        {/* Applied count */}
        <span className={styles['p-featured-jobs__card-applied']}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Đã ứng tuyển:{' '}
          <strong>{appliedCount} người</strong>
        </span>

        {/* Type tags */}
        <div className={styles['p-featured-jobs__card-tags']} role="list" aria-label="Loại hình công việc">
          {tags.map((tag) => (
            <span
              key={tag.key}
              className={`${styles['p-featured-jobs__card-tag']} ${styles[`p-featured-jobs__card-tag--${tag.key}`] ?? ''}`}
              role="listitem"
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Apply Now */}
        <Link
          to={jobDetailPath(job.id)}
          className={styles['p-featured-jobs__card-apply']}
          id={`apply-btn-${job.id}`}
          aria-label={`Ứng tuyển ngay cho ${job.title}`}
        >
          <span className={styles['p-featured-jobs__explore-span']} aria-hidden="true">
            <img src={exploreElliose} alt="" className={styles['p-featured-jobs__explore-circle']} />
            <img src={exploreArrow} alt="" className={styles['p-featured-jobs__explore-arrow']} />
          </span>
          Ứng tuyển ngay
        </Link>
      </div>
    </article>
  )
}

/* ─── Main exported section ─── */

export function JobesFeaturedJobs() {
  const { data: jobs, isLoading } = useFeaturedJobs()

  return (
    <section className={styles['p-featured-jobs']} id="featured-job-list-section" aria-labelledby="featured-jobs-heading">
      {/* ── Section Header ── */}
      <div className={`${styles['p-featured-jobs__container']} l-container`}>
        <div className={styles['p-featured-jobs__header']}>
          <div className={styles['p-featured-jobs__header-left']}>
            <h2 className={styles['p-featured-jobs__header-title']} id="featured-jobs-heading">
              Danh sách việc làm <span className={styles['p-featured-jobs__header-accent']}>nổi bật</span>
            </h2>
            <p className={styles['p-featured-jobs__header-subtitle']}>
              Chọn công việc mơ ước và xây dựng tương lai tươi sáng của bạn.
            </p>
          </div>

          <Link
            to={APP_ROUTES.jobs}
            className={styles['p-featured-jobs__explore-link']}
            id="featured-jobs-explore-more"
            aria-label="Xem thêm danh sách việc làm"
          >
            Xem thêm
            <span className={styles['p-featured-jobs__explore-span']} aria-hidden="true">
              <img src={exploreElliose} alt="" className={styles['p-featured-jobs__explore-circle']} />
              <img src={exploreArrow} alt="" className={styles['p-featured-jobs__explore-arrow']} />
            </span>
          </Link>
        </div>

        {/* ── Job Cards List ── */}
        {isLoading ? (
          <LoadingState />
        ) : (
          <div className={styles['p-featured-jobs__list']} role="list" aria-label="Việc làm nổi bật">
            {jobs?.slice(0, 4).map((job, idx) => (
              <FeaturedJobCard key={job.id} job={job} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
