import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import styles from './JobesTestimonials.module.scss'

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
    quote: 'On the other hand, we denounce with righteous indignation and to the dislike men who are so the beguiled and demoralized.',
    name: 'Mr. Jacoline Frankly',
    role: 'UI/UX Engineer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop'
  },
  {
    quote: 'On the other hand, we denounce with righteous indignation and to the dislike men who are so the beguiled and demoralized.',
    name: 'Mr. Robertson Maike',
    role: 'PHP Developer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'
  },
  {
    quote: 'On the other hand, we denounce with righteous indignation and to the dislike men who are so the beguiled and demoralized.',
    name: 'David Williumson',
    role: 'WordPress Developer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop'
  },
  {
    quote: 'On the other hand, we denounce with righteous indignation and to the dislike men who are so the beguiled and demoralized.',
    name: 'Ms. Sarah Jenkins',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'
  },
  {
    quote: 'On the other hand, we denounce with righteous indignation and to the dislike men who are so the beguiled and demoralized.',
    name: 'Mr. John Doe',
    role: 'Backend Engineer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop'
  },
  {
    quote: 'On the other hand, we denounce with righteous indignation and to the dislike men who are so the beguiled and demoralized.',
    name: 'Ms. Emily Watson',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop'
  }
]

// Width of inactive bullet + horizontal margin on both sides
const BULLET_WIDTH = 65
const BULLET_MARGIN = 24 // 12px on each side (margin: 0 12px)
const BULLET_STEP = BULLET_WIDTH + BULLET_MARGIN // 89px per inactive bullet step

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
  const avatarsRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  /** Translate the avatar strip so the active bullet is centred in the wrapper */
  const scrollAvatars = (realIndex: number) => {
    if (!avatarsRef.current || !wrapperRef.current) return
    const wrapperWidth = wrapperRef.current.clientWidth
    // Left-edge position of the active bullet's centre
    const activeCentreX = realIndex * BULLET_STEP + BULLET_WIDTH / 2
    const translateX = wrapperWidth / 2 - activeCentreX
    avatarsRef.current.style.transform = `translateX(${translateX}px)`
  }

  // Set initial position after mount so first bullet is centred
  useEffect(() => {
    scrollAvatars(0)
  }, [])

  const handleRealIndexChange = (swiper: SwiperType) => {
    const idx = swiper.realIndex
    setActiveIndex(idx)
    scrollAvatars(idx)
  }

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper
    // Ensure initial scroll position is correct after Swiper initialises
    scrollAvatars(swiper.realIndex)
  }

  return (
    <section
      className={styles['p-testimonials']}
      id="client-testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      {/* ─── Header ─── */}
      <div className={styles['p-testimonials__header']}>
        <div className={styles['p-testimonials__header-left']}>
          <h2 className={styles['p-testimonials__header-title']} id="testimonials-heading">
            <span className={styles['p-testimonials__header-accent']}>Feedback</span> From Our Clients
          </h2>
          <p className={styles['p-testimonials__header-subtitle']}>
            To choose your trending job dream &amp; to make future bright.
          </p>
        </div>

        {/* ─── Navigation Arrows ─── */}
        <div className={styles['p-testimonials__nav']}>
          <button
            className={styles['p-testimonials__nav-btn']}
            aria-label="Previous testimonial"
            id="testimonial-prev-btn"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button
            className={styles['p-testimonials__nav-btn']}
            aria-label="Next testimonial"
            id="testimonial-next-btn"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
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
                aria-label={`Testimonial from ${item.name}`}
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
        ref={wrapperRef}
        className={styles['p-testimonials__avatars-wrapper']}
        role="tablist"
        aria-label="Select testimonial slide"
      >
        <div ref={avatarsRef} className={styles['p-testimonials__avatars']}>
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={idx}
              className={`${styles['p-testimonials__avatar-bullet']}${
                activeIndex === idx ? ` ${styles['p-testimonials__avatar-bullet--active']}` : ''
              }`}
              onClick={() => {
                swiperRef.current?.slideToLoop(idx)
                setActiveIndex(idx)
                scrollAvatars(idx)
              }}
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Go to slide ${idx + 1}: ${item.name}`}
              id={`testimonial-bullet-${idx}`}
            >
              <img
                src={item.avatar}
                alt={`${item.name} headshot`}
                className={styles['p-testimonials__avatar-img']}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
