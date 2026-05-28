import { useParams, Link } from 'react-router'
import { useJob, useJobs } from '@/features/job/index.ts'
import {
  getEmploymentTypeLabel,
  getCategoryLabel,
  formatSalary,
} from '@/features/job/utils.ts'
import { ErrorState } from '@/shared/components/ui/ErrorState.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { jobDetailPath } from '@/shared/constants/index.ts'

import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import styles from './JobDetailPage.module.scss'
import exploreElliose from '@/assets/images/explore-elliose.svg'
import exploreArrow from '@/assets/images/explore-arrow.svg'

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

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
]

function getInitials(company: string) {
  return company
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: job, isLoading, isError, error, refetch } = useJob(id)
  
  const relatedSwiperRef = useRef<SwiperType | null>(null)
  
  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Fetch related jobs by same category (exclude current job)
  const { data: relatedData } = useJobs(
    job ? { category: job.category } : {},
    1,
  )

  // Get related jobs
  const relatedJobs =
    relatedData?.items.filter((j) => j.id !== id) ?? []

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null))
      } else if (e.key === 'ArrowRight' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return (
      <ErrorState
        message={getErrorMessage(
          error,
          'Không tải được chi tiết tin tuyển dụng.',
        )}
        onRetry={() => refetch()}
      />
    )
  }

  if (!job) {
    return <ErrorState message="Không tìm thấy tin tuyển dụng." />
  }

  const logoColor = LOGO_COLORS[job.category] ?? '#00a7ac'
  
  // Format dates
  const postedDateFormatted = new Date(job.postedAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  
  // Expiry date (posted date + 30 days)
  const expiryDate = new Date(new Date(job.postedAt).getTime() + 30 * 24 * 60 * 60 * 1000)
  const expiryDateFormatted = expiryDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <section>
      {/* ─── Breadcrumb Banner ─── */}
      <header className={styles['p-job-detail-banner']}>
        <div className={styles['p-job-detail-banner__ripple']} aria-hidden="true" />
        <div className={styles['p-job-detail-banner__content']}>
          <h1 className={styles['p-job-detail-banner__title']}>Job Details</h1>
          <nav className={styles['p-job-detail-banner__breadcrumbs']} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className={styles['p-job-detail-banner__breadcrumbs-separator']} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </span>
            <span className={styles['p-job-detail-banner__breadcrumbs-current']}>Job Details</span>
          </nav>
        </div>
      </header>

      <div className={`${styles['p-job-detail']} l-container`}>
        {/* Main Grid Layout (Left Column + Right Sidebar) */}
        <div className={styles['p-job-detail__grid']}>
          
          {/* ─── Left Main Column ─── */}
          <div className={styles['p-job-detail-main']}>
            
            {/* Header info card */}
            <article className={styles['p-job-detail-header-card']}>
              <div className={styles['p-job-detail-header-card__top']}>
                <div className={styles['p-job-detail-header-card__left']}>
                  <div
                    className={styles['p-job-detail-header-card__logo']}
                    style={{ backgroundColor: logoColor }}
                  >
                    {getInitials(job.company)}
                  </div>
                  <div className={styles['p-job-detail-header-card__info']}>
                    <h2 className={styles['p-job-detail-header-card__title']}>{job.title}</h2>
                    <p className={styles['p-job-detail-header-card__company']}>{job.company}</p>
                  </div>
                </div>

                <div className={styles['p-job-detail-header-card__actions']}>
                  <button className={styles['p-job-detail-header-card__bookmark']} aria-label="Save Job">
                    <span>Save Job</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                  <button className={styles['p-job-detail-header-card__apply']}>
                    Apply Position
                  </button>
                </div>
              </div>

              <div className={styles['p-job-detail-header-card__meta']}>
                <div className={styles['p-job-detail-header-card__meta-item']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Location: <strong>{job.location}</strong></span>
                </div>
                <div className={styles['p-job-detail-header-card__meta-item']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span>Job Type: <strong>{getEmploymentTypeLabel(job.employmentType)}</strong></span>
                </div>
                <div className={styles['p-job-detail-header-card__meta-item']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Category: <strong>{getCategoryLabel(job.category)}</strong></span>
                </div>
                <div className={styles['p-job-detail-header-card__meta-item']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span>Salary: <strong>{formatSalary(job.salary.min, job.salary.max, job.salary.currency)} / Per Month</strong></span>
                </div>
              </div>
            </article>

            {/* Description */}
            <section className={styles['p-job-detail-main__section']}>
              <h3 className={styles['p-job-detail-main__section-title']}>Job Description:</h3>
              <p className={styles['p-job-detail-main__text']}>{job.description}</p>
            </section>

            {/* Responsibilities / Requirements */}
            {job.requirements.length > 0 && (
              <section className={styles['p-job-detail-main__section']}>
                <h3 className={styles['p-job-detail-main__section-title']}>Job Responsibility:</h3>
                <ul className={styles['p-job-detail-main__list']}>
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className={styles['p-job-detail-main__list-item']}>
                      <span className={styles['p-job-detail-main__bullet']} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Educational Requirements */}
            <section className={styles['p-job-detail-main__section']}>
              <h3 className={styles['p-job-detail-main__section-title']}>Educational Requirements:</h3>
              <ul className={styles['p-job-detail-main__list']}>
                <li className={styles['p-job-detail-main__list-item']}>
                  <span className={styles['p-job-detail-main__bullet']} />
                  <span>Bachelor degree to complete any reputational university.</span>
                </li>
                <li className={styles['p-job-detail-main__list-item']}>
                  <span className={styles['p-job-detail-main__bullet']} />
                  <span>Professional training or certification in relevant field is highly preferred.</span>
                </li>
              </ul>
            </section>

            {/* Experience Requirements */}
            <section className={styles['p-job-detail-main__section']}>
              <h3 className={styles['p-job-detail-main__section-title']}>Experiences:</h3>
              <ul className={styles['p-job-detail-main__list']}>
                <li className={styles['p-job-detail-main__list-item']}>
                  <span className={styles['p-job-detail-main__bullet']} />
                  <span>2-3 Years in this field.</span>
                </li>
              </ul>
            </section>

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <section className={styles['p-job-detail-main__section']}>
                <h3 className={styles['p-job-detail-main__section-title']}>Extra Benefits:</h3>
                <ul className={styles['p-job-detail-main__list']}>
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className={styles['p-job-detail-main__list-item']}>
                      <span className={styles['p-job-detail-main__bullet']} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* ─── Right Sidebar Column ─── */}
          <aside className={styles['p-job-detail-sidebar']}>
            
            {/* Job Summary Panel */}
            <div className={styles['p-job-summary-card']}>
              <h3 className={styles['p-job-summary-card__title']}>Job Summary:</h3>
              <ul className={styles['p-job-summary-card__list']}>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Job Posted:</span>
                  <span className={styles['p-job-summary-card__value']}>{postedDateFormatted}</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Expiration:</span>
                  <span className={styles['p-job-summary-card__value']}>{expiryDateFormatted}</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Vacancy:</span>
                  <span className={styles['p-job-summary-card__value']}>07 Person.</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Experiences:</span>
                  <span className={styles['p-job-summary-card__value']}>2-3 Years.</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Education:</span>
                  <span className={styles['p-job-summary-card__value']}>Bachelor Degree.</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Gender:</span>
                  <span className={styles['p-job-summary-card__value']}>Both.</span>
                </li>
              </ul>
            </div>

            {/* View All Company Jobs */}
            <Link to={`/jobs?search=${encodeURIComponent(job.company)}`} className={styles['p-job-detail-sidebar__link']}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>View All Jobs In This Company</span>
            </Link>

            {/* Social Link Share */}
            <div className={styles['p-job-detail-share']}>
              <span className={styles['p-job-detail-share__title']}>Job Link Share:</span>
              <ul className={styles['p-job-detail-share__list']}>
                <li className={styles['p-job-detail-share__item']}>
                  <a href="#" aria-label="Share Link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </a>
                </li>
                <li className={styles['p-job-detail-share__item']}>
                  <a href="#" aria-label="Share Facebook">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </li>
                <li className={styles['p-job-detail-share__item']}>
                  <a href="#" aria-label="Share Twitter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </a>
                </li>
                <li className={styles['p-job-detail-share__item']}>
                  <a href="#" aria-label="Share LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </li>
                <li className={styles['p-job-detail-share__item']}>
                  <a href="#" aria-label="Share Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Email card CTA */}
            <div className={styles['p-job-detail-email-card']}>
              <div className={styles['p-job-detail-email-card__icon']}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h4 className={styles['p-job-detail-email-card__title']}>Email Now</h4>
              <p className={styles['p-job-detail-email-card__subtitle']}>
                Send your resume at <a href="mailto:info@example.com">info@example.com</a>
              </p>
            </div>

            {/* Map Widget */}
            <div className={styles['p-job-detail-map']}>
              <h4 className={styles['p-job-detail-map__title']}>Get Location:</h4>
              <div className={styles['p-job-detail-map__wrapper']}>
                <iframe
                  title="Google Map Location"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(job.location || 'Dhaka, Bangladesh')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* ─── Company Gallery (Full Width - Outside Grid) ─── */}
        <section className={styles['p-job-detail-gallery']}>
          <h3 className={styles['p-job-detail-gallery__title']}>Company Gallery View</h3>
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            grabCursor={true}
            loop={true}
            breakpoints={{
              480: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className={styles['p-job-detail-gallery__slider']}
          >
            {GALLERY_IMAGES.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={styles['p-job-detail-gallery__img-wrap']}
                  onClick={() => setLightboxIndex(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={src} alt={`Office Gallery ${idx + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* ─── Related Jobs Grid (Full Width - Outside Grid) ─── */}
        {relatedJobs.length > 0 && (
          <footer className={styles['p-job-detail-related']}>
            <div className={styles['p-job-detail-related__header']}>
              <h3 className={styles['p-job-detail-related__title']}>Related Jobs:</h3>
              <div className={styles['p-job-detail-related__nav']}>
                <button
                  className={`${styles['p-job-detail-related__nav-btn']} ${styles['p-job-detail-related__nav-btn--prev']}`}
                  onClick={() => relatedSwiperRef.current?.slidePrev()}
                  aria-label="Previous Related Job"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  className={`${styles['p-job-detail-related__nav-btn']} ${styles['p-job-detail-related__nav-btn--next']}`}
                  onClick={() => relatedSwiperRef.current?.slideNext()}
                  aria-label="Next Related Job"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <Swiper
              onSwiper={(swiper) => { relatedSwiperRef.current = swiper }}
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              grabCursor={true}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className={styles['p-job-detail-related__slider']}
            >
              {relatedJobs.map((relJob) => {
                const relLogoColor = LOGO_COLORS[relJob.category] ?? '#00a7ac'
                const relDeadline = new Date(new Date(relJob.postedAt).getTime() + 30 * 24 * 60 * 60 * 1000)
                const relDeadlineFormatted = relDeadline.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })

                return (
                  <SwiperSlide key={relJob.id}>
                    <article className={styles['c-related-job-card']}>
                      <div className={styles['c-related-job-card__top']}>
                        <div
                          className={styles['c-related-job-card__logo']}
                          style={{ backgroundColor: relLogoColor }}
                        >
                          {getInitials(relJob.company)}
                        </div>
                        <div className={styles['c-related-job-card__info']}>
                          <h4 className={styles['c-related-job-card__title']}>
                            <Link to={jobDetailPath(relJob.id)}>{relJob.title}</Link>
                          </h4>
                          <div className={styles['c-related-job-card__types']}>
                            {getEmploymentTypeLabel(relJob.employmentType)}
                          </div>
                        </div>

                        <button className={styles['c-related-job-card__bookmark']} aria-label="Bookmark Job">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </button>
                      </div>

                      <ul className={styles['c-related-job-card__meta']}>
                        <li className={styles['c-related-job-card__meta-item']}>
                          <span className={styles['c-related-job-card__dot']} />
                          <span>Salary: <strong>{formatSalary(relJob.salary.min, relJob.salary.max, relJob.salary.currency)} / Per month</strong></span>
                        </li>
                        <li className={styles['c-related-job-card__meta-item']}>
                          <span className={styles['c-related-job-card__dot']} />
                          <span>Vacancy: <strong>05 Person (Both)</strong></span>
                        </li>
                        <li className={styles['c-related-job-card__meta-item']}>
                          <span className={styles['c-related-job-card__dot']} />
                          <span>Deadline: <strong>{relDeadlineFormatted}</strong></span>
                        </li>
                      </ul>

                      <Link to={jobDetailPath(relJob.id)} className={styles['c-related-job-card__apply']}>
                        <span className={styles['c-related-job-card__explore-span']}>
                          <img src={exploreElliose} alt="" className={styles['c-related-job-card__explore-circle']} />
                          <img src={exploreArrow} alt="" className={styles['c-related-job-card__explore-arrow']} />
                        </span>
                        Apply Now
                      </Link>
                    </article>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </footer>
        )}
      </div>

      {/* ─── Lightbox Modal overlay ─── */}
      <div
        className={`${styles['p-job-detail-lightbox']} ${lightboxIndex !== null ? styles['p-job-detail-lightbox--active'] : ''}`}
        onClick={() => setLightboxIndex(null)}
      >
        {lightboxIndex !== null && (
          <div className={styles['p-job-detail-lightbox__content']} onClick={(e) => e.stopPropagation()}>
            <button className={styles['p-job-detail-lightbox__close']} onClick={() => setLightboxIndex(null)}>
              &times;
            </button>
            <button
              className={`${styles['p-job-detail-lightbox__btn']} ${styles['p-job-detail-lightbox__btn--prev']}`}
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null))}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <img
              src={GALLERY_IMAGES[lightboxIndex]}
              alt={`Gallery Zoomed ${lightboxIndex + 1}`}
              className={styles['p-job-detail-lightbox__img']}
            />
            <button
              className={`${styles['p-job-detail-lightbox__btn']} ${styles['p-job-detail-lightbox__btn--next']}`}
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null))}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
