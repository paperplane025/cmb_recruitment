import { Link } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { useJobCategories } from '@/features/job/index.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import styles from './JobesCategories.module.scss'

interface CategoryCardItem {
  id: string
  title: string
  defaultCount: number
  keys: string[]
  primaryCategoryKey: string
  bgImage: string
}

export function JobesCategories() {
  const { data: categories, isLoading } = useJobCategories()

  // Map the 9 visually unique categories from the mockup design with custom Unsplash images
  const displayCards: CategoryCardItem[] = [
    {
      id: 'marketing-sales',
      title: 'Marketing & Sales',
      defaultCount: 50,
      keys: ['marketing', 'sales'],
      primaryCategoryKey: 'marketing',
      bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop',
    },
    {
      id: 'technology',
      title: 'Technology',
      defaultCount: 55,
      keys: ['engineering'],
      primaryCategoryKey: 'engineering',
      bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop',
    },
    {
      id: 'finance-account',
      title: 'Finance & Account',
      defaultCount: 110,
      keys: ['finance'],
      primaryCategoryKey: 'finance',
      bgImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=500&auto=format&fit=crop',
    },
    {
      id: 'medical-nurse',
      title: 'Medical & Nurse',
      defaultCount: 14,
      keys: [],
      primaryCategoryKey: 'medical',
      bgImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=500&auto=format&fit=crop',
    },
    {
      id: 'designing-part',
      title: 'Designing Part',
      defaultCount: 33,
      keys: ['design'],
      primaryCategoryKey: 'design',
      bgImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop',
    },
    {
      id: 'transportation',
      title: 'Transportation',
      defaultCount: 5,
      keys: [],
      primaryCategoryKey: 'transportation',
      bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=500&auto=format&fit=crop',
    },
    {
      id: 'non-profit',
      title: 'Non Profit Org.',
      defaultCount: 23,
      keys: ['operations'],
      primaryCategoryKey: 'operations',
      bgImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=500&auto=format&fit=crop',
    },
    {
      id: 'architecture',
      title: 'Architecture',
      defaultCount: 67,
      keys: [],
      primaryCategoryKey: 'architecture',
      bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500&auto=format&fit=crop',
    },
    {
      id: 'development',
      title: 'Development',
      defaultCount: 56,
      keys: ['engineering', 'product'],
      primaryCategoryKey: 'engineering',
      bgImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=500&auto=format&fit=crop',
    },
  ]

  // Helper to format counts, e.g. 5 -> "05 Jobs Available"
  const formatCount = (count: number) => {
    const padded = count < 10 ? `0${count}` : `${count}`
    return `${padded} Jobs Available`
  }

  // Sum live database category counts if available, otherwise use design defaults
  const getCategoryCountText = (card: CategoryCardItem) => {
    if (!categories || card.keys.length === 0) {
      return formatCount(card.defaultCount)
    }

    const liveSum = categories
      .filter((cat) => card.keys.includes(cat.key))
      .reduce((sum, cat) => sum + cat.count, 0)

    // Fallback to the mockup's design count if dynamic sum is 0
    return formatCount(liveSum > 0 ? liveSum : card.defaultCount)
  }

  return (
    <section className={styles['p-categories']} id="jobs-category-list-section">
      {/* Header Info */}
      <div className={styles['p-categories__header']}>
        <h2 className={styles['p-categories__title']}>
          Jobs <span className={styles['p-categories__title-accent']}>Category</span> List
        </h2>
        <p className={styles['p-categories__subtitle']}>
          To choose your trending job dream & to make future bright.
        </p>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : (
        <div className={styles['p-categories__grid']}>
          {/* Render first 9 visual category cards with 3D Flip */}
          {displayCards.map((card) => (
            <div
              key={card.id}
              className={styles['p-categories__card']}
              id={`cat-card-${card.id}`}
            >
              <div className={styles['p-categories__card-inner']}>
                {/* Front Side: Clean White Background, soft teal border */}
                <div className={styles['p-categories__card-front']}>
                  <h3 className={styles['p-categories__card-title']}>{card.title}</h3>
                  <span className={styles['p-categories__card-count']}>
                    {getCategoryCountText(card)}
                  </span>
                  <span className={styles['p-categories__card-link']}>View All Jobs</span>
                </div>

                {/* Back Side: Photo Background with teal-dark overlay */}
                <Link
                  to={`${APP_ROUTES.jobs}?category=${card.primaryCategoryKey}`}
                  className={styles['p-categories__card-back']}
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                >
                  <div className={styles['p-categories__card-overlay']} />
                  <div className={styles['p-categories__card-back-content']}>
                    <h3 className={styles['p-categories__card-back-title']}>{card.title}</h3>
                    <span className={styles['p-categories__card-back-count']}>
                      {getCategoryCountText(card)}
                    </span>
                    <span className={styles['p-categories__card-back-link']}>
                      View All Jobs
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
                </Link>
              </div>
            </div>
          ))}

          {/* Render the 10th special text link box */}
          <div className={styles['p-categories__list-box']} id="cat-card-list-box">
            <h3 className={styles['p-categories__list-box-title']}>Category List</h3>
            <Link
              to={APP_ROUTES.jobs}
              className={styles['p-categories__list-box-link']}
              id="cat-view-all-link"
            >
              View All Category
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
    </section>
  )
}
