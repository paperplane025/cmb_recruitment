import { Link } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { useJobCategories } from '@/features/job/index.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import styles from './JobesCategories.module.scss'

// Fallback ảnh nền mặt sau card khi admin chưa upload ảnh riêng cho danh mục (wp-admin → Danh mục tuyển dụng).
const CARD_BG_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=500&auto=format&fit=crop',
]

// Helper to format counts, e.g. 5 -> "05 việc làm"
function formatCount(count: number) {
  const padded = count < 10 ? `0${count}` : `${count}`
  return `${padded} việc làm`
}

export function JobesCategories() {
  const { data: categories, isLoading } = useJobCategories()
  const displayCards = categories ?? []

  return (
    <section className={styles['p-categories']} id="jobs-category-list-section">
      <div className={`${styles['p-categories__container']} l-container`}>
        {/* Header Info */}
        <div className={styles['p-categories__header']}>
          <h2 className={styles['p-categories__title']}>
            Danh sách <span className={styles['p-categories__title-accent']}>danh mục</span> việc làm
          </h2>
          <p className={styles['p-categories__subtitle']}>
            Chọn công việc mơ ước và xây dựng tương lai tươi sáng của bạn.
          </p>
        </div>
        {isLoading ? (
          <div className={styles['p-categories__loading']}>
            <LoadingState />
          </div>
        ) : (
        <div className={styles['p-categories__grid']}>
          {/* Render category cards with 3D Flip — 1 card = 1 danh mục thật, khớp đúng sidebar /jobs */}
          {displayCards.map((cat, idx) => (
            <Link
              key={cat.key}
              to={APP_ROUTES.jobs}
              state={{ category: cat.key }}
              className={styles['p-categories__card']}
              id={`cat-card-${cat.key}`}
            >
              <div className={styles['p-categories__card-inner']}>
                {/* Front Side: Clean White Background, soft teal border */}
                <div className={styles['p-categories__card-front']}>
                  <h3 className={styles['p-categories__card-title']}>{cat.label}</h3>
                  <span className={styles['p-categories__card-count']}>
                    {formatCount(cat.count)}
                  </span>
                  <span className={styles['p-categories__card-link']}>Xem tất cả việc làm</span>
                </div>

                {/* Back Side: Photo Background with teal-dark overlay */}
                <div
                  className={styles['p-categories__card-back']}
                  style={{ backgroundImage: `url(${cat.imageUrl ?? CARD_BG_IMAGES[idx % CARD_BG_IMAGES.length]})` }}
                >
                  <div className={styles['p-categories__card-overlay']} />
                  <div className={styles['p-categories__card-back-content']}>
                    <h3 className={styles['p-categories__card-back-title']}>{cat.label}</h3>
                    <span className={styles['p-categories__card-back-count']}>
                      {formatCount(cat.count)}
                    </span>
                    <span className={styles['p-categories__card-back-link']}>
                      Xem tất cả việc làm
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
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Render the 10th special text link box */}
          <div className={styles['p-categories__list-box']} id="cat-card-list-box">
            <h3 className={styles['p-categories__list-box-title']}>Danh sách danh mục</h3>
            <Link
              to={APP_ROUTES.jobs}
              className={styles['p-categories__list-box-link']}
              id="cat-view-all-link"
            >
              Xem tất cả danh mục
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
            </Link>
          </div>
        </div>
        )}
      </div>
    </section>
  )
}
