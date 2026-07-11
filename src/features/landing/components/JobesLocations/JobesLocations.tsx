import { Link } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { useJobLocations } from '@/features/job/index.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { getCityImage } from '@/shared/utils/cityImage.ts'
import styles from './JobesLocations.module.scss'

/** Số lượng badge "Phổ biến" tỉ lệ theo tổng số khu vực: ≤3 khu vực → 1, ≤6 → 2, còn lại → 3. */
function getPopularCount(total: number): number {
  if (total <= 3) return 1
  if (total <= 6) return 2
  return 3
}

/* ─── Single location card ─── */

interface LocationCardProps {
  locationKey: string
  label: string
  count: number
  index: number
  isPopular: boolean
  imageUrl?: string | null
}

function LocationCard({ locationKey, label, count, index, isPopular, imageUrl }: LocationCardProps) {
  const imgSrc = imageUrl ?? getCityImage(label)

  return (
    <Link
      to={APP_ROUTES.jobs}
      state={{ location: locationKey }}
      className={styles['p-locations__card']}
      id={`location-card-${index}`}
      aria-label={`Xem việc làm tại ${label}, ${count} việc làm`}
    >
      {/* ── City photo (only this scales on card hover) ── */}
      <img
        className={styles['p-locations__card-img']}
        src={imgSrc}
        alt={`Khung cảnh thành phố ${label}`}
        loading="lazy"
        width={600}
        height={400}
      />

      {/* ── Popular badge ── */}
      {isPopular && (
        <span className={styles['p-locations__card-badge']} aria-label="Địa điểm phổ biến">
          Phổ biến
        </span>
      )}

      {/* ── Text overlay ── */}
      <div className={styles['p-locations__card-overlay']} aria-hidden="true">
        <h3 className={styles['p-locations__card-city']}>{label}</h3>
        <p className={styles['p-locations__card-count']}>
          Việc làm:{' '}
          <span className={styles['p-locations__card-count-num']}>{count}</span>
        </p>
      </div>
    </Link>
  )
}

/* ─── Main exported section ─── */

export function JobesLocations() {
  const { data: locations, isLoading } = useJobLocations()

  // Khu vực có nhiều tin tuyển dụng nhất (dữ liệu thật) mới được gắn "Phổ biến" — không phụ thuộc vị trí hiển thị.
  const popularCount = getPopularCount(locations?.length ?? 0)
  const popularKeys = new Set(
    [...(locations ?? [])]
      .sort((a, b) => b.count - a.count)
      .slice(0, popularCount)
      .map((loc) => loc.key),
  )

  return (
    <section
      className={styles['p-locations']}
      id="job-by-location-section"
      aria-labelledby="locations-heading"
    >
      <div className={`${styles['p-locations__container']} l-container`}>
        {/* ── Header ── */}
        <div className={styles['p-locations__header']}>
          <div className={styles['p-locations__header-left']}>
            <h2 className={styles['p-locations__header-title']} id="locations-heading">
              Việc làm theo{' '}
              <span className={styles['p-locations__header-accent']}>khu vực</span>
            </h2>
            <p className={styles['p-locations__header-subtitle']}>
              Chọn công việc mơ ước và xây dựng tương lai tươi sáng của bạn.
            </p>
          </div>
        </div>

        {/* ── Cards grid ── */}
        {isLoading ? (
          <div className={styles['p-locations__loading']}>
            <LoadingState />
          </div>
        ) : (
          <div
            className={styles['p-locations__grid']}
            role="list"
            aria-label="Khu vực việc làm"
          >
            {locations?.slice(0, 6).map((loc, idx) => (
              <div key={loc.key} role="listitem">
                <LocationCard
                  locationKey={loc.key}
                  label={loc.label}
                  count={loc.count}
                  index={idx}
                  isPopular={popularKeys.has(loc.key)}
                  imageUrl={loc.imageUrl}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
