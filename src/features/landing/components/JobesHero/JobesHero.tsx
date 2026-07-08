import { useState, type FormEvent, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import { useJobCategories } from '@/features/job/index.ts'
import styles from './JobesHero.module.scss'
import heroWoman from '@/assets/images/jobes_hero_woman.png'
import bannerImage from '@/assets/images/banner.png'

// Tạm thời tắt banner cũ, hiển thị ảnh banner mới
const SHOW_OLD_HERO_BANNER = false

export function JobesHero() {
  const { isAuthenticated } = useAuth()
  const [searchTitle, setSearchTitle] = useState('')
  const [searchCategory, setSearchCategory] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const { data: categories } = useJobCategories()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
    <section
      className={`${styles['p-hero']} ${!SHOW_OLD_HERO_BANNER ? styles['p-hero--banner-only'] : ''}`}
    >
      {!SHOW_OLD_HERO_BANNER && (
        <div className={styles['p-hero__banner']}>
          <img
            src={bannerImage}
            alt="CMB Recruitment"
            className={styles['p-hero__banner-img']}
          />
          <div className={styles['p-hero__banner-overlay']}>
            <h2 className={styles['p-hero__banner-title']}>Gia nhập CMB hôm nay</h2>
            <p className={styles['p-hero__banner-subtitle']}>
              Để có nhiều cơ hội phát triển nghề nghiệp
            </p>
            <Link
              to={isAuthenticated ? APP_ROUTES.jobs : APP_ROUTES.register}
              className={styles['p-hero__banner-cta']}
            >
              Tham gia ngay
            </Link>
          </div>
        </div>
      )}
      {SHOW_OLD_HERO_BANNER && (
        <div className={`${styles['p-hero__container']} l-container`}>
          {/* Left Side Info */}
          <div className={styles['p-hero__content']}>
            <h1 className={styles['p-hero__headline']}>
              Đảm bảo cho bạn
              <span className={styles['p-hero__headline-stroke']}>Cơ hội việc làm.</span>
            </h1>

            <p className={styles['p-hero__subtitle']}>
              2400 người tìm kiếm mỗi ngày trên cổng thông tin này, 100 người dùng đăng việc làm mỗi ngày!
              Khám phá những công việc chất lượng và mức lương hấp dẫn nhất trong lĩnh vực công nghệ, quản lý,
              thiết kế và marketing. Nắm quyền kiểm soát sự nghiệp của bạn ngay hôm nay.
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
                  placeholder="Vị trí tuyển dụng"
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
                <div className={styles['p-hero__custom-select-container']} ref={dropdownRef}>
                  <button
                    type="button"
                    className={styles['p-hero__custom-select-trigger']}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    id="hero-search-category-trigger"
                  >
                    <span>
                      {categories?.find((cat) => cat.key === searchCategory)?.label || 'Danh mục'}
                    </span>
                    <svg
                      className={`${styles['p-hero__custom-select-chevron']} ${isDropdownOpen ? styles['p-hero__custom-select-chevron--open'] : ''
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <ul className={styles['p-hero__custom-select-dropdown']}>
                      <li
                        className={`${styles['p-hero__custom-select-option']} ${searchCategory === '' ? styles['p-hero__custom-select-option--active'] : ''
                          }`}
                        onClick={() => {
                          setSearchCategory('')
                          setIsDropdownOpen(false)
                        }}
                      >
                        Danh mục
                      </li>
                      {categories?.map((cat) => (
                        <li
                          key={cat.key}
                          className={`${styles['p-hero__custom-select-option']} ${searchCategory === cat.key ? styles['p-hero__custom-select-option--active'] : ''
                            }`}
                          onClick={() => {
                            setSearchCategory(cat.key)
                            setIsDropdownOpen(false)
                          }}
                        >
                          {cat.label}
                        </li>
                      ))}
                    </ul>
                  )}
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
                <span>24 việc làm</span>
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
                Gợi ý từ khóa:
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
                  alt="Nữ nhân viên chuyên nghiệp mỉm cười khi làm việc trên máy tính bảng"
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
      )}
    </section>
  )
}
