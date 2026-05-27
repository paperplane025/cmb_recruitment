import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import { useJobCategories } from '@/features/job/index.ts'
import styles from './JobesHero.module.scss'
import heroWoman from '@/assets/images/jobes_hero_woman.png'

export function JobesHero() {
  const { isAuthenticated } = useAuth()
  const [searchTitle, setSearchTitle] = useState('')
  const [searchCategory, setSearchCategory] = useState('')
  const navigate = useNavigate()

  const { data: categories } = useJobCategories()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTitle) params.set('search', searchTitle)
    if (searchCategory) params.set('category', searchCategory)
    const target = isAuthenticated ? APP_ROUTES.jobs : APP_ROUTES.login
    navigate(`${target}?${params.toString()}`)
  }

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams()
    params.set('search', tag)
    const target = isAuthenticated ? APP_ROUTES.jobs : APP_ROUTES.login
    navigate(`${target}?${params.toString()}`)
  }

  const suggestedTags = [
    'Engineering',
    'Marketing',
    'UI/UX Design',
    'Data Analyst',
    'Programming',
  ]

  return (
    <section className={styles['p-hero']}>
      {/* Scroll Down Indicator */}
      <div className={styles['p-hero__scroll']}>
        <span>Scroll Down</span>
        <span className={styles['p-hero__scroll-line']} />
      </div>

      <div className={`${styles['p-hero__container']} l-container-1320`}>
        {/* Left Side Info */}
        <div className={styles['p-hero__content']}>
          <h1 className={styles['p-hero__headline']}>
            To The Make Sure Job
            <span className={styles['p-hero__headline-stroke']}>Opportunity.</span>
          </h1>

          <p className={styles['p-hero__subtitle']}>
            2400 Peoples are daily search in this portal, 100 user added job portal!
            Explore the most refined and high-paying jobs in technology, management, 
            design, and marketing. Take control of your career today.
          </p>

          {/* Search Form Box */}
          <form onSubmit={handleSearch} className={styles['p-hero__search-bar']}>
            {/* Search Input: Job Title */}
            <div className={styles['p-hero__search-field']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <input
                id="hero-search-title"
                type="text"
                placeholder="Job Title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>

            {/* Select Input: Category */}
            <div
              className={`${styles['p-hero__search-field']} ${styles['p-hero__search-field--category']}`}
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
                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
              </svg>
              <div className={styles['p-hero__search-field-select-wrapper']}>
                <select
                  id="hero-search-category"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  {categories?.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <svg
                  className={styles['p-hero__search-field-chevron']}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className={styles['p-hero__search-btn']}
              id="hero-search-submit"
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
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              24 Jobs
            </button>
          </form>

          {/* Suggested Tags Area */}
          <div className={styles['p-hero__tags']}>
            <span className={styles['p-hero__tags-title']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              Suggested Tag:
            </span>
            <ul className={styles['p-hero__tags-list']}>
              {suggestedTags.map((tag, index) => (
                <li key={index} className={styles['p-hero__tags-item']}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handleTagClick(tag)
                    }}
                  >
                    {tag}
                    {index < suggestedTags.length - 1 && ', '}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side Frame & Decors */}
        <div className={styles['p-hero__visual']}>
          {/* Glowing oval/stadium frame */}
          <div className={styles['p-hero__frame']}>
            <div className={styles['p-hero__frame-inner']}>
              <img
                src={heroWoman}
                alt="Smiling professional woman working on tablet"
                className={styles['p-hero__frame-img']}
              />
            </div>
            {/* Glowing bottom center dot */}
            <div className={styles['p-hero__frame-dot']} />
          </div>

          {/* Starburst Line Drawing (Teal) */}
          <div className={styles['p-hero__starburst']}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              {/* Starburst geometric line rays */}
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="22" y1="22" x2="78" y2="78" />
              <line x1="22" y1="78" x2="78" y2="22" />
              <line x1="50" y1="25" x2="50" y2="75" strokeWidth="2.5" />
              <line x1="25" y1="50" x2="75" y2="50" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="4" fill="currentColor" />
              <circle cx="50" cy="50" r="16" strokeDasharray="2,2" />
            </svg>
          </div>

          {/* 4-Point Pulse Star */}
          <div className={styles['p-hero__star-four']}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M2 12h20M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
