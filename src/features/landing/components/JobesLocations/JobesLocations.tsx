import { Link } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { useJobLocations } from '@/features/job/index.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import styles from './JobesLocations.module.scss'
import exploreElliose from '@/assets/images/explore-elliose.svg'
import exploreArrow from '@/assets/images/explore-arrow.svg'

/* ─── Indices that get the "Popular" badge ─── */
const POPULAR_INDICES = new Set([0, 2, 5])

/* ─── Deterministic city image from picsum (seed = location name) ─── */
function getCityImage(name: string) {
  const seed = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))
  return `https://picsum.photos/seed/${seed}/600/400`
}

/* ─── Single location card ─── */

interface LocationCardProps {
  name: string
  count: number
  index: number
}

function LocationCard({ name, count, index }: LocationCardProps) {
  const isPopular = POPULAR_INDICES.has(index)
  const imgSrc = getCityImage(name)

  return (
    <Link
      to={`${APP_ROUTES.jobs}?location=${encodeURIComponent(name)}`}
      className={styles['p-locations__card']}
      id={`location-card-${index}`}
      aria-label={`Xem việc làm tại ${name}, ${count} việc làm`}
    >
      {/* ── City photo (only this scales on card hover) ── */}
      <img
        className={styles['p-locations__card-img']}
        src={imgSrc}
        alt={`Khung cảnh thành phố ${name}`}
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
        <h3 className={styles['p-locations__card-city']}>{name}</h3>
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

          <Link
            to={APP_ROUTES.jobs}
            className={styles['p-locations__explore-link']}
            id="locations-view-all"
            aria-label="Xem tất cả khu vực việc làm"
          >
            Xem tất cả khu vực
            <span className={styles['p-locations__explore-span']} aria-hidden="true">
              <img src={exploreElliose} alt="" className={styles['p-locations__explore-circle']} />
              <img src={exploreArrow} alt="" className={styles['p-locations__explore-arrow']} />
            </span>
          </Link>
        </div>

        {/* ── Cards grid ── */}
        {isLoading ? (
          <LoadingState />
        ) : (
          <div
            className={styles['p-locations__grid']}
            role="list"
            aria-label="Khu vực việc làm"
          >
            {locations?.slice(0, 6).map((loc, idx) => (
              <div key={loc.name} role="listitem">
                <LocationCard name={loc.name} count={loc.count} index={idx} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
