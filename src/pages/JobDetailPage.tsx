import { useParams, Link } from 'react-router'
import { useJob, useJobs } from '@/features/job/index.ts'
import { useCompanyGallery } from '@/features/landing/index.ts'
import {
  getEmploymentTypeLabels,
  getCategoryLabel,
  getSalaryDisplayWithPeriod,
  getGenderLabel,
} from '@/features/job/utils.ts'
import { ErrorState } from '@/shared/components/ui/ErrorState.tsx'
import { PageLoadingOverlay } from '@/shared/components/ui/PageLoadingOverlay.tsx'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { jobDetailPath } from '@/shared/constants/index.ts'
import { ApplyJobModal } from '@/features/job/components/ApplyJobModal.tsx'

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
  const { data: galleryImages } = useCompanyGallery()

  const relatedSwiperRef = useRef<SwiperType | null>(null)

  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Apply job modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

  // Copy link feedback state (dùng chung cho nút copy link và Instagram)
  const [linkCopied, setLinkCopied] = useState(false)

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
    const galleryLength = galleryImages?.length ?? 0
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowLeft' && lightboxIndex !== null && galleryLength > 0) {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryLength) % galleryLength : null))
      } else if (e.key === 'ArrowRight' && lightboxIndex !== null && galleryLength > 0) {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryLength : null))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, galleryImages])

  if (isLoading) {
    return <PageLoadingOverlay />
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

  const logoColor = LOGO_COLORS[job.category] ?? '#005198'

  const postedDateFormatted = new Date(job.postedAt).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const deadlineFormatted = job.deadline
    ? new Date(job.deadline).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    : 'Không giới hạn'

  const genderLabel = getGenderLabel(job.gender)

  const shareUrl = window.location.href
  const encodedShareUrl = encodeURIComponent(shareUrl)
  const encodedShareTitle = encodeURIComponent(job.title)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setLinkCopied(true)
      window.setTimeout(() => setLinkCopied(false), 2000)
    } catch {
      // Trình duyệt không hỗ trợ clipboard API — bỏ qua, không chặn luồng người dùng.
    }
  }

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500')
  }

  return (
    <section>
      {/* ─── Breadcrumb Banner ─── */}
      <header className={styles['p-job-detail-banner']}>
        <div className={styles['p-job-detail-banner__ripple']} aria-hidden="true" />
        <div className={styles['p-job-detail-banner__content']}>
          <h1 className={styles['p-job-detail-banner__title']}>Chi tiết việc làm</h1>
          <nav className={styles['p-job-detail-banner__breadcrumbs']} aria-label="Breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className={styles['p-job-detail-banner__breadcrumbs-separator']} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <span className={styles['p-job-detail-banner__breadcrumbs-current']}>Chi tiết việc làm</span>
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
                  <button
                    className={styles['p-job-detail-header-card__apply']}
                    onClick={() => setIsApplyModalOpen(true)}
                  >
                    Ứng tuyển ngay
                  </button>
                </div>
              </div>

              <div className={styles['p-job-detail-header-card__meta']}>
                <div className={styles['p-job-detail-header-card__meta-item']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Địa điểm: <strong>{job.locationLabel ?? job.location}</strong></span>
                </div>
                <div className={styles['p-job-detail-header-card__meta-item']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span>Loại hình: <strong>{getEmploymentTypeLabels(job.employmentType)}</strong></span>
                </div>
                <div className={styles['p-job-detail-header-card__meta-item']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Danh mục: <strong>{job.categoryLabel ?? getCategoryLabel(job.category)}</strong></span>
                </div>
                <div className={styles['p-job-detail-header-card__meta-item']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span>Mức lương: <strong>{getSalaryDisplayWithPeriod(job)}</strong></span>
                </div>
              </div>
            </article>

            {/* Description */}
            <section className={styles['p-job-detail-main__section']}>
              <h3 className={styles['p-job-detail-main__section-title']}>Mô tả công việc:</h3>
              <div
                className={styles['p-job-detail-main__text']}
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </section>

            {/* Candidate Requirements */}
            {job.requirements.length > 0 && (
              <section className={styles['p-job-detail-main__section']}>
                <h3 className={styles['p-job-detail-main__section-title']}>Yêu cầu ứng viên:</h3>
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

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <section className={styles['p-job-detail-main__section']}>
                <h3 className={styles['p-job-detail-main__section-title']}>Quyền lợi:</h3>
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

            {/* Application Documents */}
            {(job.applicationDocuments?.length ?? 0) > 0 && (
              <section className={styles['p-job-detail-main__section']}>
                <h3 className={styles['p-job-detail-main__section-title']}>Hồ sơ dự tuyển:</h3>
                <ul className={styles['p-job-detail-main__list']}>
                  {job.applicationDocuments.map((doc, idx) => (
                    <li key={idx} className={styles['p-job-detail-main__list-item']}>
                      <span className={styles['p-job-detail-main__bullet']} />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* How to Apply */}
            {(job.howToApply?.length ?? 0) > 0 && (
              <section className={styles['p-job-detail-main__section']}>
                <h3 className={styles['p-job-detail-main__section-title']}>Cách thức ứng tuyển:</h3>
                <ul className={styles['p-job-detail-main__list']}>
                  {job.howToApply.map((step, idx) => (
                    <li key={idx} className={styles['p-job-detail-main__list-item']}>
                      <span className={styles['p-job-detail-main__bullet']} />
                      <span>{step}</span>
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
              <h3 className={styles['p-job-summary-card__title']}>Thông tin tuyển dụng:</h3>
              <ul className={styles['p-job-summary-card__list']}>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Ngày đăng:</span>
                  <span className={styles['p-job-summary-card__value']}>{postedDateFormatted}</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Hết hạn:</span>
                  <span className={styles['p-job-summary-card__value']}>{deadlineFormatted}</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Số lượng tuyển:</span>
                  <span className={styles['p-job-summary-card__value']}>{job.vacancies ?? 1} người.</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Kinh nghiệm:</span>
                  <span className={styles['p-job-summary-card__value']}>{job.experience || 'Không yêu cầu'}</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Học vấn:</span>
                  <span className={styles['p-job-summary-card__value']}>{job.education || 'Không yêu cầu'}</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Giới tính:</span>
                  <span className={styles['p-job-summary-card__value']}>{genderLabel}</span>
                </li>
                <li className={styles['p-job-summary-card__item']}>
                  <span className={styles['p-job-summary-card__dot']} />
                  <span className={styles['p-job-summary-card__label']}>Đã ứng tuyển:</span>
                  <span className={styles['p-job-summary-card__value']}>{job.applicationCount ?? 0} người</span>
                </li>
              </ul>
            </div>

            {/* Social Link Share */}
            <div className={styles['p-job-detail-share']}>
              <span className={styles['p-job-detail-share__title']}>Chia sẻ tin tuyển dụng:</span>
              <ul className={styles['p-job-detail-share__list']}>
                <li className={styles['p-job-detail-share__item']}>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Sao chép liên kết"
                    title={linkCopied ? 'Đã sao chép!' : 'Sao chép liên kết'}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </button>
                </li>
                <li className={styles['p-job-detail-share__item']}>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chia sẻ Facebook"
                    onClick={(e) => {
                      e.preventDefault()
                      openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`)
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </li>
                <li className={styles['p-job-detail-share__item']}>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedShareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chia sẻ Twitter"
                    onClick={(e) => {
                      e.preventDefault()
                      openShareWindow(`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedShareTitle}`)
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </a>
                </li>
                <li className={styles['p-job-detail-share__item']}>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chia sẻ LinkedIn"
                    onClick={(e) => {
                      e.preventDefault()
                      openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`)
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </li>
              </ul>
              {linkCopied && (
                <span className={styles['p-job-detail-share__toast']} role="status">
                  Đã sao chép liên kết!
                </span>
              )}
            </div>

          </aside>
        </div>

        {/* ─── Company Gallery (Full Width - Outside Grid) ─── */}
        {galleryImages && galleryImages.length > 0 && (
          <section className={styles['p-job-detail-gallery']}>
            <h3 className={styles['p-job-detail-gallery__title']}>Hình ảnh công ty</h3>
            <Swiper
              spaceBetween={16}
              slidesPerView={2}
              grabCursor={true}
              loop={galleryImages.length > 5}
              breakpoints={{
                480: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              className={styles['p-job-detail-gallery__slider']}
            >
              {galleryImages.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className={styles['p-job-detail-gallery__img-wrap']}
                    onClick={() => setLightboxIndex(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={src} alt={`Hình ảnh văn phòng ${idx + 1}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* ─── Related Jobs Grid (Full Width - Outside Grid) ─── */}
        {relatedJobs.length > 0 && (
          <footer className={styles['p-job-detail-related']}>
            <div className={styles['p-job-detail-related__header']}>
              <h3 className={styles['p-job-detail-related__title']}>Việc làm liên quan:</h3>
              <div className={styles['p-job-detail-related__nav']}>
                <button
                  className={`${styles['p-job-detail-related__nav-btn']} ${styles['p-job-detail-related__nav-btn--prev']}`}
                  onClick={() => relatedSwiperRef.current?.slidePrev()}
                  aria-label="Việc làm liên quan trước"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className={`${styles['p-job-detail-related__nav-btn']} ${styles['p-job-detail-related__nav-btn--next']}`}
                  onClick={() => relatedSwiperRef.current?.slideNext()}
                  aria-label="Việc làm liên quan tiếp theo"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
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
                const relLogoColor = LOGO_COLORS[relJob.category] ?? '#005198'
                const relDeadlineFormatted = relJob.deadline
                  ? new Date(relJob.deadline).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                  : 'Không giới hạn'

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
                            {getEmploymentTypeLabels(relJob.employmentType)}
                          </div>
                        </div>
                      </div>

                      <ul className={styles['c-related-job-card__meta']}>
                        <li className={styles['c-related-job-card__meta-item']}>
                          <span className={styles['c-related-job-card__dot']} />
                          <span>Mức lương: <strong>{getSalaryDisplayWithPeriod(relJob)}</strong></span>
                        </li>
                        <li className={styles['c-related-job-card__meta-item']}>
                          <span className={styles['c-related-job-card__dot']} />
                          <span>Số lượng: <strong>{relJob.vacancies ?? 1} người</strong></span>
                        </li>
                        <li className={styles['c-related-job-card__meta-item']}>
                          <span className={styles['c-related-job-card__dot']} />
                          <span>Hạn nộp: <strong>{relDeadlineFormatted}</strong></span>
                        </li>
                      </ul>

                      <Link to={jobDetailPath(relJob.id)} className={styles['c-related-job-card__apply']}>
                        <span className={styles['c-related-job-card__explore-span']}>
                          <img src={exploreElliose} alt="" className={styles['c-related-job-card__explore-circle']} />
                          <img src={exploreArrow} alt="" className={styles['c-related-job-card__explore-arrow']} />
                        </span>
                        Ứng tuyển ngay
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
        {lightboxIndex !== null && galleryImages && (
          <div className={styles['p-job-detail-lightbox__content']} onClick={(e) => e.stopPropagation()}>
            <button className={styles['p-job-detail-lightbox__close']} onClick={() => setLightboxIndex(null)}>
              &times;
            </button>
            <button
              className={`${styles['p-job-detail-lightbox__btn']} ${styles['p-job-detail-lightbox__btn--prev']}`}
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <img
              src={galleryImages[lightboxIndex]}
              alt={`Hình ảnh phóng to ${lightboxIndex + 1}`}
              className={styles['p-job-detail-lightbox__img']}
            />
            <button
              className={`${styles['p-job-detail-lightbox__btn']} ${styles['p-job-detail-lightbox__btn--next']}`}
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ─── Apply Job Modal ─── */}
      {isApplyModalOpen && (
        <ApplyJobModal
          jobId={job.id}
          jobTitle={job.title}
          company={job.company}
          onClose={() => setIsApplyModalOpen(false)}
        />
      )}
    </section>
  )
}
