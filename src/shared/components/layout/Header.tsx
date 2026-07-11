import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import styles from './Header.module.scss'
import companyLogo from '@/assets/images/Company Logo.svg'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Navigation Links structure
  const navItems = [
    {
      label: 'Trang chủ',
      hasDropdown: false,
      path: '/'
    },
    {
      label: 'Danh sách việc làm',
      hasDropdown: false,
      path: '/jobs'
    },
    {
      label: 'Blog',
      hasDropdown: false,
      path: '/blog'
    },
    {
      label: 'Liên hệ',
      hasDropdown: false,
      path: '/contact',
    },
  ]

  const isNavItemActive = (item: typeof navItems[0]) => {
    const pathname = location.pathname
    if (item.label === 'Trang chủ') {
      return pathname === '/' || pathname.startsWith('/home-')
    }
    return pathname === item.path
  }

  return (
    <>
      <header className={styles['p-header']}>
        <div className={`${styles['p-header__container']} l-container`}>
          {/* Logo */}
          <Link to="/" className={styles['p-header__logo']} id="header-logo">
            <img src={companyLogo} alt="CMB Recruitment" className={styles['p-header__logo-img']} />
            <div className={styles['p-header__logo-text']}>
              <span className={styles['p-header__logo-title']}>Công ty Cổ phần Tư vấn</span>
              <span className={styles['p-header__logo-subtitle']}>Xây dựng công trình hàng hải</span>
            </div>
          </Link>

          {/* Right Group: Nav + Actions */}
          <div className={styles['p-header__right']}>
            {/* Desktop Navigation */}
            <nav className={styles['p-header__nav']} aria-label="Điều hướng chính">
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

            {/* Actions */}
            <div className={styles['p-header__actions']}>
              {/* Mobile Hamburger Button */}
              <button
                className={styles['p-header__toggle']}
                onClick={toggleMobileMenu}
                aria-label="Bật/tắt menu di động"
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
            <img src={companyLogo} alt="CMB Recruitment" className={styles['p-header__logo-img']} />
            <div className={styles['p-header__logo-text']}>
              <span className={styles['p-header__logo-title']}>Công ty Cổ phần Tư vấn</span>
              <span className={styles['p-header__logo-subtitle']}>Xây dựng công trình hàng hải</span>
            </div>
          </Link>

          {/* Close Button */}
          <button
            className={styles['p-header__drawer-close']}
            onClick={closeMobileMenu}
            aria-label="Đóng menu"
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

      </div>
    </>
  )
}
