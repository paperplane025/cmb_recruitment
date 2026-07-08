import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import styles from './JobesTestimonials.module.scss'
import exploreElliose from '@/assets/images/explore-elliose.svg'
import exploreArrow from '@/assets/images/explore-arrow.svg'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

interface Testimonial {
  quote: string
  name: string
  role: string
  avatar: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Mặt khác, chúng tôi lên án một cách chính đáng và không ưa những người bị mê hoặc và suy đồi.',
    name: 'Ông Jacoline Frankly',
    role: 'Kỹ sư UI/UX',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop'
  },
  {
    quote: 'Mặt khác, chúng tôi lên án một cách chính đáng và không ưa những người bị mê hoặc và suy đồi.',
    name: 'Ông Robertson Maike',
    role: 'Lập trình viên PHP',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'
  },
  {
    quote: 'Mặt khác, chúng tôi lên án một cách chính đáng và không ưa những người bị mê hoặc và suy đồi.',
    name: 'David Williumson',
    role: 'Lập trình viên WordPress',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop'
  },
  {
    quote: 'Mặt khác, chúng tôi lên án một cách chính đáng và không ưa những người bị mê hoặc và suy đồi.',
    name: 'Bà Sarah Jenkins',
    role: 'Nhà thiết kế sản phẩm',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'
  },
  {
    quote: 'Mặt khác, chúng tôi lên án một cách chính đáng và không ưa những người bị mê hoặc và suy đồi.',
    name: 'Ông John Doe',
    role: 'Kỹ sư Backend',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop'
  }
]

const QuoteIcon = () => (
  <svg
    width="32"
    height="22"
    viewBox="0 0 32 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles['p-testimonials__card-quote-icon']}
    aria-hidden="true"
  >
    <path
      d="M0 12.6C0 5.4 4.8 0.9 11.4 0L12.9 2.4C8.7 3.9 6.6 6.9 6.6 9.6H12.6V21.6H0V12.6ZM19.2 12.6C19.2 5.4 24 0.9 30.6 0L32.1 2.4C27.9 3.9 25.8 6.9 25.8 9.6H31.8V21.6H19.2V12.6Z"
      fill="currentColor"
    />
  </svg>
)

export function JobesTestimonials() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleRealIndexChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper
  }

  // Get the 5 visible avatar indices relative to the activeIndex
  const getVisibleIndices = (active: number, total: number) => {
    return [
      (active - 2 + total) % total,
      (active - 1 + total) % total,
      active,
      (active + 1) % total,
      (active + 2) % total,
    ]
  }

  return (
    <section
      className={styles['p-testimonials']}
      id="client-testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div className={`${styles['p-testimonials__container']} l-container`}>
        {/* ─── Header ─── */}
        <div className={styles['p-testimonials__header']}>
          <div className={styles['p-testimonials__header-left']}>
            <h2 className={styles['p-testimonials__header-title']} id="testimonials-heading">
              <span className={styles['p-testimonials__header-accent']}>Phản hồi</span> từ khách hàng của chúng tôi
            </h2>
            <p className={styles['p-testimonials__header-subtitle']}>
              Chọn công việc mơ ước và xây dựng tương lai tươi sáng của bạn.
            </p>
          </div>

          {/* ─── Navigation Arrows ─── */}
          <div className={styles['p-testimonials__nav']}>
            <button
              className={`${styles['p-testimonials__nav-btn']} ${styles['p-testimonials__nav-btn--prev']}`}
              aria-label="Đánh giá trước"
              id="testimonial-prev-btn"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <span className={styles['p-testimonials__nav-span']} aria-hidden="true">
                <img src={exploreElliose} alt="" className={styles['p-testimonials__nav-circle']} />
                <img src={exploreArrow} alt="" className={styles['p-testimonials__nav-arrow']} />
              </span>
            </button>
            <button
              className={`${styles['p-testimonials__nav-btn']} ${styles['p-testimonials__nav-btn--next']}`}
              aria-label="Đánh giá tiếp theo"
              id="testimonial-next-btn"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <span className={styles['p-testimonials__nav-span']} aria-hidden="true">
                <img src={exploreElliose} alt="" className={styles['p-testimonials__nav-circle']} />
                <img src={exploreArrow} alt="" className={styles['p-testimonials__nav-arrow']} />
              </span>
            </button>
          </div>
        </div>

        {/* ─── Swiper Slider ─── */}
        <div className={styles['p-testimonials__slider-wrapper']}>
          <Swiper
            modules={[Navigation]}
            onSwiper={handleSwiperInit}
            onRealIndexChange={handleRealIndexChange}
            loop={true}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: true,
              },
            }}
            className={styles['p-testimonials__slider']}
          >
            {TESTIMONIALS.map((item, idx) => (
              <SwiperSlide key={idx} className={styles['p-testimonials__slide']}>
                <article
                  className={styles['p-testimonials__card']}
                  aria-label={`Đánh giá từ ${item.name}`}
                  id={`testimonial-card-${idx}`}
                >
                  <div className={styles['p-testimonials__card-quote-wrapper']}>
                    <QuoteIcon />
                  </div>
                  <p className={styles['p-testimonials__card-quote']}>{item.quote}</p>
                  <div className={styles['p-testimonials__card-meta']}>
                    <h3 className={styles['p-testimonials__card-name']}>{item.name}</h3>
                    <p className={styles['p-testimonials__card-role']}>{item.role}</p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ─── Custom Avatar Pagination ─── */}
        <div
          className={styles['p-testimonials__avatars-wrapper']}
          role="tablist"
          aria-label="Chọn đánh giá"
        >
          <div className={styles['p-testimonials__avatars']}>
            {getVisibleIndices(activeIndex, TESTIMONIALS.length).map((originalIdx) => {
              const item = TESTIMONIALS[originalIdx]
              if (!item) return null
              const isActive = activeIndex === originalIdx
              return (
                <button
                  key={originalIdx}
                  className={`${styles['p-testimonials__avatar-bullet']}${
                    isActive ? ` ${styles['p-testimonials__avatar-bullet--active']}` : ''
                  }`}
                  onClick={() => {
                    swiperRef.current?.slideToLoop(originalIdx)
                    setActiveIndex(originalIdx)
                  }}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Đi đến slide ${originalIdx + 1}: ${item.name}`}
                  id={`testimonial-bullet-${originalIdx}`}
                >
                  <img
                    src={item.avatar}
                    alt={`Ảnh chân dung ${item.name}`}
                    className={styles['p-testimonials__avatar-img']}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
