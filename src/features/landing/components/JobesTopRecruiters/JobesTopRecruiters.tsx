import { Link } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import styles from './JobesTopRecruiters.module.scss'

// ─── Custom Company Logo Icons (High-Fidelity representation of mockup) ───

const NorlandLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#0A0B3C" />
    {/* Intersecting neon loops */}
    <path d="M14 20C14 16.6863 16.6863 14 20 14C23.3137 14 26 16.6863 26 20C26 23.3137 23.3137 26 20 26C16.6863 26 14 23.3137 14 20Z" stroke="#4285F4" strokeWidth="2.5" />
    <circle cx="20" cy="20" r="3" fill="#DB4437" />
  </svg>
)

const XYZLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#0D0628" />
    {/* Swirling shapes */}
    <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20" stroke="#9B5DE5" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M28 20C28 24.4183 24.4183 28 20 28C15.5817 28 12 24.4183 12 20" stroke="#F15BB5" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
)

const BistroLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#D4AF37" />
    {/* Chef hat or elegant lettering */}
    <text x="13" y="27" fill="#FFF" fontSize="20" fontWeight="950" fontFamily="var(--heading)">B</text>
    <circle cx="28" cy="14" r="2" fill="#FFF" />
  </svg>
)

const TechManLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#1A1A1A" />
    {/* Colorful Heart */}
    <path d="M20 28.5L14.5 23C12.5 21 11.5 19.2 11.5 17C11.5 14 13.8 11.5 17 11.5C18.8 11.5 20 12.5 20 12.5C20 12.5 21.2 11.5 23 11.5C26.2 11.5 28.5 14 28.5 17C28.5 19.2 27.5 21 25.5 23L20 28.5Z" fill="#FF4B4B" />
  </svg>
)

const GangsterLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#000000" />
    {/* Gold crest with G */}
    <circle cx="20" cy="20" r="16" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3" />
    <text x="14" y="26" fill="#D4AF37" fontSize="17" fontWeight="900" fontFamily="var(--heading)">G</text>
  </svg>
)

const EvalleyLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#4285F4" />
    {/* House silhouette */}
    <path d="M12 24V18L20 12L28 18V24C28 25.1 27.1 26 26 26H14C12.9 26 12 25.1 12 24Z" fill="white" />
    <rect x="18" y="20" width="4" height="6" fill="#4285F4" />
  </svg>
)

const UIUXLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#9B5DE5" />
    {/* Dual overlapping circles */}
    <circle cx="16" cy="20" r="8" stroke="white" strokeWidth="2.2" fill="none" />
    <circle cx="24" cy="20" r="8" stroke="white" strokeWidth="2.2" fill="none" />
  </svg>
)

const MarkoLandLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#1C1A17" />
    {/* Gold M */}
    <text x="13" y="27" fill="#D4AF37" fontSize="19" fontWeight="800" fontFamily="var(--heading)" fontStyle="italic">M</text>
    <path d="M9 30H31" stroke="#D4AF37" strokeWidth="1.2" />
  </svg>
)

interface Recruiter {
  id: string
  name: string
  peopleCount: number
  location: string
  logo: React.ReactNode
}

const RECRUITERS: Recruiter[] = [
  {
    id: 'recruiter-norland',
    name: 'Norland Company',
    peopleCount: 35,
    location: 'New-York, USA',
    logo: <NorlandLogo />
  },
  {
    id: 'recruiter-xyz',
    name: 'XYZ.UI Company',
    peopleCount: 25,
    location: 'Dhaka, Bangladesh',
    logo: <XYZLogo />
  },
  {
    id: 'recruiter-bistro',
    name: 'Bistro-Tech Ltd',
    peopleCount: 47,
    location: 'Chicago, Australia',
    logo: <BistroLogo />
  },
  {
    id: 'recruiter-techman',
    name: 'Tech-Man Hub',
    peopleCount: 83,
    location: 'Sylhet, Bangladesh',
    logo: <TechManLogo />
  },
  {
    id: 'recruiter-gangster',
    name: 'Gangster.Hide',
    peopleCount: 52,
    location: 'West London, UK',
    logo: <GangsterLogo />
  },
  {
    id: 'recruiter-evalley',
    name: 'Evalley.XYZ',
    peopleCount: 29,
    location: 'Sylhet, Bangladesh',
    logo: <EvalleyLogo />
  },
  {
    id: 'recruiter-uiux',
    name: 'UI.UX Group Ltd',
    peopleCount: 18,
    location: 'Dhaka, Bangladesh',
    logo: <UIUXLogo />
  },
  {
    id: 'recruiter-markoland',
    name: 'MarkoLand Company',
    peopleCount: 36,
    location: 'New-York, USA',
    logo: <MarkoLandLogo />
  }
]

export function JobesTopRecruiters() {
  return (
    <section
      className={styles['p-recruiters']}
      id="top-recruiters-section"
      aria-labelledby="recruiters-heading"
    >
      <div className={`${styles['p-recruiters__container']} l-container`}>
        {/* ─── Section Header ─── */}
        <div className={styles['p-recruiters__header']}>
          <h2 className={styles['p-recruiters__header-title']} id="recruiters-heading">
            Our Top <span className={styles['p-recruiters__header-accent']}>Recruiters</span>
          </h2>
          <p className={styles['p-recruiters__header-subtitle']}>
            To choose your trending job dream &amp; to make future bright.
          </p>
        </div>

        {/* ─── Grid of Recruiter Cards ─── */}
        <div className={styles['p-recruiters__grid']} role="list" aria-label="Top recruiters">
          {RECRUITERS.map((recruiter) => (
            <article
              key={recruiter.id}
              className={styles['p-recruiters__card']}
              role="listitem"
              id={`recruiter-card-${recruiter.id}`}
            >
              {/* Left: Logo */}
              <div className={styles['p-recruiters__card-logo']}>
                {recruiter.logo}
              </div>

              {/* Right: Info & CTA */}
              <div className={styles['p-recruiters__card-body']}>
                <h3 className={styles['p-recruiters__card-name']}>{recruiter.name}</h3>
                
                {/* Meta stats */}
                <div className={styles['p-recruiters__card-meta']}>
                  <div className={styles['p-recruiters__meta-item']}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles['p-recruiters__meta-icon']}
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{recruiter.peopleCount} People</span>
                  </div>

                  <div className={styles['p-recruiters__meta-item']}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles['p-recruiters__meta-icon']}
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{recruiter.location}</span>
                  </div>
                </div>

                {/* View Details Link */}
                <Link
                  to={`${APP_ROUTES.jobs}?company=${encodeURIComponent(recruiter.name)}`}
                  className={styles['p-recruiters__card-link']}
                  aria-label={`View recruitment details for ${recruiter.name}`}
                >
                  <span>View Details</span>
                  <span className={styles['p-recruiters__card-link-circle']}>
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
            </article>
          ))}
        </div>

        {/* ─── Footer: View All Link ─── */}
        <div className={styles['p-recruiters__footer']}>
          <Link
            to={APP_ROUTES.jobs}
            className={styles['p-recruiters__view-all']}
            id="recruiters-view-all"
            aria-label="View all recruiters list"
          >
            <span>View All Recruiters</span>
            <span className={styles['p-recruiters__view-all-circle']}>
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
      </div>
    </section>
  )
}
