import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { useTestimonials } from '../../hooks/useTestimonials.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import styles from './JobesTestimonials.module.scss'
import exploreElliose from '@/assets/images/explore-elliose.svg'
import exploreArrow from '@/assets/images/explore-arrow.svg'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

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
  const { data: testimonials, isLoading } = useTestimonials()
  const items = testimonials ?? []
  const [activeIndex, setActiveIndex] = useState(0)

  // Bắt đầu ở giữa danh sách khi dữ liệu vừa tải xong — nếu bắt đầu ở phần tử đầu
  // (index 0), Swiper không đủ chỗ để căn giữa (bị chặn ở biên) nên khi vừa load
  // xong sẽ thấy lệch trái. Đồng bộ lại mỗi khi số lượng đánh giá thay đổi.
  const [syncedItemsCount, setSyncedItemsCount] = useState(0)
  if (items.length > 0 && items.length !== syncedItemsCount) {
    setSyncedItemsCount(items.length)
    setActiveIndex(Math.floor((items.length - 1) / 2))
  }

  const handleRealIndexChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper
  }

  // Cửa sổ tối đa 5 avatar xoay quanh activeIndex, luôn đối xứng để active nằm giữa
  // (kể cả khi total < 5, VD 3 đánh giá) — windowSize <= total nên không bị trùng index.
  const getVisibleIndices = (active: number, total: number) => {
    const windowSize = Math.min(5, total)
    const start = -Math.floor((windowSize - 1) / 2)
    return Array.from({ length: windowSize }, (_, i) => {
      const offset = start + i
      return ((active + offset) % total + total) % total
    })
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

        {isLoading && (
          <div className={styles['p-testimonials__loading']}>
            <LoadingState />
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <>
            {/* ─── Swiper Slider ─── */}
            <div className={styles['p-testimonials__slider-wrapper']}>
              <Swiper
                modules={[Navigation]}
                onSwiper={handleSwiperInit}
                onRealIndexChange={handleRealIndexChange}
                initialSlide={activeIndex}
                // Loop cần nhiều slide hơn slidesPerView tối đa (3 ở breakpoint 1024) mới
                // hoạt động đúng — quá ít đánh giá (VD 3) sẽ báo lỗi khi kéo.
                loop={items.length > 3}
                spaceBetween={24}
                slidesPerView={1}
                centeredSlides={true}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    centeredSlides: true,
                  },
                  1024: {
                    slidesPerView: 3,
                    centeredSlides: true,
                  },
                }}
                className={styles['p-testimonials__slider']}
              >
                {items.map((item, idx) => (
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
                {getVisibleIndices(activeIndex, items.length).map((originalIdx) => {
                  const item = items[originalIdx]
                  if (!item) return null
                  const isActive = activeIndex === originalIdx
                  return (
                    <button
                      key={originalIdx}
                      className={`${styles['p-testimonials__avatar-bullet']}${
                        isActive ? ` ${styles['p-testimonials__avatar-bullet--active']}` : ''
                      }`}
                      onClick={() => {
                        // slideToLoop chỉ dùng được khi Swiper bật loop; đủ ít đánh giá thì loop tắt.
                        if (items.length > 3) {
                          swiperRef.current?.slideToLoop(originalIdx)
                        } else {
                          swiperRef.current?.slideTo(originalIdx)
                        }
                        setActiveIndex(originalIdx)
                      }}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Đi đến slide ${originalIdx + 1}: ${item.name}`}
                      id={`testimonial-bullet-${originalIdx}`}
                    >
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={`Ảnh chân dung ${item.name}`}
                          className={styles['p-testimonials__avatar-img']}
                        />
                      ) : (
                        <span className={styles['p-testimonials__avatar-fallback']}>
                          {getInitials(item.name)}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
