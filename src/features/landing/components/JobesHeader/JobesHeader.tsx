import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import styles from './JobesHeader.module.scss'

export function JobesHeader() {
  const { isAuthenticated, logout, user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Navigation Links structure
  const navItems = [
    {
      label: 'Home',
      hasDropdown: false,
      path: '/'
    },
    {
      label: 'Job Listing',
      hasDropdown: false,
      path: '/jobs'
    },
    {
      label: 'Blog',
      hasDropdown: false,
      path: '/blog'
    },
    {
      label: 'Contact',
      hasDropdown: false,
      path: '/contact',
    },
  ]

  const isNavItemActive = (item: typeof navItems[0]) => {
    const pathname = location.pathname
    if (item.label === 'Home') {
      return pathname === '/' || pathname.startsWith('/home-')
    }
    if (item.hasDropdown) {
      return item.subItems?.some((sub) => {
        if (sub.path === '/') return false
        return pathname === sub.path || (sub.path !== '/jobs' && pathname.startsWith(sub.path))
      }) ?? false
    }
    return pathname === item.path
  }

  return (
    <>
      <header className={styles['p-header']}>
        <div className={`${styles['p-header__container']} l-container`}>
          {/* Logo */}
          <Link to="/" className={styles['p-header__logo']} id="header-logo">
            <div className={styles['p-header__logo-icon']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div className={styles['p-header__logo-text']}>
              <span className={styles['p-header__logo-title']}>
                JOB<span>ES</span>
              </span>
              <span className={styles['p-header__logo-subtitle']}>Job Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles['p-header__nav']} aria-label="Main Navigation">
            {navItems.map((item, index) => {
              const isActive = isNavItemActive(item)
              return (
                <div key={index} className={styles['p-header__nav-item']}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        className={`${styles['p-header__nav-link']} ${isActive ? styles['p-header__nav-link--active'] : ''
                          }`}
                        id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        {item.label}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      <ul className={styles['p-header__dropdown']}>
                        {item.subItems?.map((sub, idx) => {
                          const isSubActive = location.pathname === sub.path
                          return (
                            <li key={idx} className={styles['p-header__dropdown-item']}>
                              <Link
                                to={sub.path}
                                className={`${styles['p-header__dropdown-link']} ${isSubActive ? styles['p-header__dropdown-link--active'] : ''
                                  }`}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={item.path || '/'}
                      className={`${styles['p-header__nav-link']} ${isActive ? styles['p-header__nav-link--active'] : ''
                        }`}
                      id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className={styles['p-header__actions']}>
            {/* Notification Bell */}
            <button
              className={styles['p-header__notification']}
              aria-label="View notifications"
              id="notification-bell"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className={styles['p-header__notification-badge']} />
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <span className="hidden text-sm font-semibold text-[#0c2121] md:inline">
                  {user?.fullName}
                </span>
                <button
                  onClick={logout}
                  className={`${styles['p-header__btn']} ${styles['p-header__btn--signin']}`}
                  id="auth-logout-btn"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link
                to={APP_ROUTES.login}
                className={`${styles['p-header__btn']} ${styles['p-header__btn--signin']}`}
                id="auth-signin-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Sign In
              </Link>
            )}

            <Link
              to={isAuthenticated ? APP_ROUTES.jobs : APP_ROUTES.login}
              className={`${styles['p-header__btn']} ${styles['p-header__btn--postjob']}`}
              id="header-postjob-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
              Post Job
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className={styles['p-header__toggle']}
              onClick={toggleMobileMenu}
              aria-label="Toggle Mobile Menu"
              aria-expanded={isMobileMenuOpen}
              id="mobile-menu-toggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 24, height: 24 }}
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backing Backdrop */}
      <div
        className={`${styles['p-header__backdrop']} ${isMobileMenuOpen ? styles['p-header__backdrop--open'] : ''
          }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`${styles['p-header__drawer']} ${isMobileMenuOpen ? styles['p-header__drawer--open'] : ''
          }`}
      >
        <div className={styles['p-header__drawer-header']}>
          {/* Drawer Logo */}
          <Link to="/" className={styles['p-header__logo']} onClick={closeMobileMenu}>
            <div className={styles['p-header__logo-icon']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div className={styles['p-header__logo-text']}>
              <span className={styles['p-header__logo-title']}>
                JOB<span>ES</span>
              </span>
            </div>
          </Link>

          {/* Close Button */}
          <button
            className={styles['p-header__drawer-close']}
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 20, height: 20 }}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer Menu Links */}
        <ul className={styles['p-header__drawer-nav']}>
          {navItems.map((item, index) => {
            const isActive = isNavItemActive(item)
            return (
              <li key={index}>
                <Link
                  to={item.hasDropdown ? '/jobs' : (item.path || '/')}
                  className={`${styles['p-header__drawer-link']} ${isActive ? styles['p-header__drawer-link--active'] : ''
                    }`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Drawer Action buttons */}
        <div className={styles['p-header__drawer-actions']}>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout()
                closeMobileMenu()
              }}
              className={`${styles['p-header__btn']} ${styles['p-header__btn--signin']}`}
            >
              Đăng xuất ({user?.fullName})
            </button>
          ) : (
            <Link
              to={APP_ROUTES.login}
              className={`${styles['p-header__btn']} ${styles['p-header__btn--signin']}`}
              onClick={closeMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Sign In
            </Link>
          )}

          <Link
            to={isAuthenticated ? APP_ROUTES.jobs : APP_ROUTES.login}
            className={`${styles['p-header__btn']} ${styles['p-header__btn--postjob']}`}
            onClick={closeMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
            Post Job
          </Link>
        </div>
      </div>
    </>
  )
}
