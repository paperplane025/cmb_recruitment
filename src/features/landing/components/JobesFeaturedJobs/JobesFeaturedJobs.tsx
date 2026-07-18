import { Link } from 'react-router'
import { APP_ROUTES, jobDetailPath } from '@/shared/constants/index.ts'
import { useFeaturedJobs } from '@/features/job/index.ts'
import { getSalaryDisplay, getEmploymentTypeLabel } from '@/features/job/index.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { formatDate } from '@/shared/utils/dateUtils.ts'
import type { Job } from '@/features/job/types.ts'
import styles from './JobesFeaturedJobs.module.scss'
import exploreElliose from '@/assets/images/explore-elliose.svg'
import exploreArrow from '@/assets/images/explore-arrow.svg'

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
}

function FeaturedJobCard({ job }: FeaturedJobCardProps) {
  const initials = job.company
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const logoColor = LOGO_COLORS[job.category] ?? '#005198'
  const tags = job.employmentType.map((type) => ({ key: type, label: getEmploymentTypeLabel(type) }))

  const salaryText = getSalaryDisplay(job)
  const dateText = formatDate(job.postedAt)

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
                Địa điểm: <strong>{job.locationLabel ?? job.location}</strong>
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
                Kinh nghiệm: <strong>{job.experience || 'Không yêu cầu'}</strong>
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
      </div>

      {/* ── Divider ── */}
      <hr className={styles['p-featured-jobs__card-divider']} />

      {/* ── Bottom Row ── */}
      <div className={styles['p-featured-jobs__card-bottom']}>
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
          <div className={styles['p-featured-jobs__loading']}>
            <LoadingState />
          </div>
        ) : (
          <div className={styles['p-featured-jobs__list']} role="list" aria-label="Việc làm nổi bật">
            {jobs?.slice(0, 5).map((job) => (
              <FeaturedJobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
