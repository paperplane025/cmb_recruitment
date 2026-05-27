import { Link } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { useJobLocations } from '@/features/job/index.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import styles from './JobesLocations.module.scss'

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
      aria-label={`Browse jobs in ${name}, ${count} jobs available`}
    >
      {/* ── City photo (only this scales on card hover) ── */}
      <img
        className={styles['p-locations__card-img']}
        src={imgSrc}
        alt={`${name} cityscape`}
        loading="lazy"
        width={600}
        height={400}
      />

      {/* ── Popular badge ── */}
      {isPopular && (
        <span className={styles['p-locations__card-badge']} aria-label="Popular location">
          Popular
        </span>
      )}

      {/* ── Text overlay ── */}
      <div className={styles['p-locations__card-overlay']} aria-hidden="true">
        <h3 className={styles['p-locations__card-city']}>{name}</h3>
        <p className={styles['p-locations__card-count']}>
          Job Available:{' '}
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
      {/* ── Header ── */}
      <div className={styles['p-locations__header']}>
        <div className={styles['p-locations__header-left']}>
          <h2 className={styles['p-locations__header-title']} id="locations-heading">
            Job By Your{' '}
            <span className={styles['p-locations__header-accent']}>Location</span>
          </h2>
          <p className={styles['p-locations__header-subtitle']}>
            To choose your trending job dream &amp; to make future bright.
          </p>
        </div>

        <Link
          to={APP_ROUTES.jobs}
          className={styles['p-locations__explore-link']}
          id="locations-view-all"
          aria-label="View all job locations"
        >
          View All Location
          <span className={styles['p-locations__explore-badge']} aria-hidden="true">
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
        </Link>
      </div>

      {/* ── Cards grid ── */}
      {isLoading ? (
        <LoadingState />
      ) : (
        <div
          className={styles['p-locations__grid']}
          role="list"
          aria-label="Job locations"
        >
          {locations?.slice(0, 6).map((loc, idx) => (
            <div key={loc.name} role="listitem">
              <LocationCard name={loc.name} count={loc.count} index={idx} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
