import { Link } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { useJobCategories } from '@/features/job/index.ts'
import { useFooterInfo } from '@/features/landing/hooks/useFooterInfo.ts'
import styles from './Footer.module.scss'

const NAV_LINKS = [
  { label: 'Trang chủ', to: APP_ROUTES.home },
  { label: 'Danh sách việc làm', to: APP_ROUTES.jobs },
  { label: 'Blog', to: APP_ROUTES.blog },
]

const POLICY_LINKS = [
  { label: 'Chính sách bảo mật', to: '/page/chinh-sach-bao-mat' },
  { label: 'Điều khoản dịch vụ', to: '/page/dieu-khoan-dich-vu' },
  { label: 'Sơ đồ trang web', to: '/page/so-do-trang-web' },
]

const MAX_CATEGORIES = 6

export function Footer() {
  const { data: categories } = useJobCategories()
  const { data: footerInfo } = useFooterInfo()
  const displayCategories = (categories ?? []).slice(0, MAX_CATEGORIES)

  const socialLinks = [
    {
      key: 'facebook',
      label: 'Facebook',
      url: footerInfo?.facebookUrl,
      path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      key: 'twitter',
      label: 'Twitter',
      url: footerInfo?.twitterUrl,
      path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      url: footerInfo?.linkedinUrl,
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      key: 'instagram',
      label: 'Instagram',
      url: footerInfo?.instagramUrl,
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    },
  ].filter((social) => social.url)

  return (
    <footer className={styles['p-footer']} id="site-footer">
      {/* ─── Top Section: Brand + Danh mục + Điều hướng + Chính sách ─── */}
      <div className={styles['p-footer__top']}>
        <div className="l-container">
          <div className={styles['p-footer__grid']}>
            <div className={styles['p-footer__col']}>
              <h3 className={styles['p-footer__col-heading']}>Danh mục việc làm</h3>
              <ul className={styles['p-footer__links']}>
                {displayCategories.map((cat) => (
                  <li key={cat.key} className={styles['p-footer__links-item']}>
                    <Link
                      to={APP_ROUTES.jobs}
                      state={{ category: cat.key }}
                      className={styles['p-footer__links-anchor']}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
                <li className={styles['p-footer__links-item']}>
                  <Link to={APP_ROUTES.jobs} className={styles['p-footer__links-anchor']}>
                    Xem tất cả danh mục
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles['p-footer__col']}>
              <h3 className={styles['p-footer__col-heading']}>Điều hướng</h3>
              <ul className={styles['p-footer__links']}>
                {NAV_LINKS.map((link) => (
                  <li key={link.label} className={styles['p-footer__links-item']}>
                    <Link to={link.to} className={styles['p-footer__links-anchor']}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles['p-footer__col']}>
              <h3 className={styles['p-footer__col-heading']}>Về công ty</h3>
              <ul className={styles['p-footer__links']}>
                {POLICY_LINKS.map((link) => (
                  <li key={link.label} className={styles['p-footer__links-item']}>
                    <Link to={link.to} className={styles['p-footer__links-anchor']}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className={styles['p-footer__bottom']}>
        <div className="l-container">
          <div className={styles['p-footer__bottom-inner']}>
            {/* ─── Left: Support + Copyright ─── */}
            <div className={styles['p-footer__bottom-left']}>
              {footerInfo?.hotline && (
                <div className={styles['p-footer__support']}>
                  <span className={styles['p-footer__support-icon']} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span className={styles['p-footer__support-label']}>Đường dây hỗ trợ:</span>
                  <a href={`tel:+${footerInfo.hotline.replace(/[^0-9]/g, '')}`} className={styles['p-footer__support-number']}>
                    {footerInfo.hotline}
                  </a>
                </div>
              )}
              <p className={styles['p-footer__copyright']}>
                ©Bản quyền {new Date().getFullYear()}{' '}
                <span className={styles['p-footer__copyright-brand']}>CMB</span>
              </p>
            </div>

            {/* ─── Center: Logo ─── */}
            <div className={styles['p-footer__logo']}>
              <span className={styles['p-footer__logo-brand']}>CMB</span>
              <span className={styles['p-footer__logo-tagline']}>Cổng thông tin việc làm</span>
            </div>

            {/* ─── Right: Social ─── */}
            {socialLinks.length > 0 && (
              <div className={styles['p-footer__bottom-right']}>
                <div className={styles['p-footer__social']}>
                  <span className={styles['p-footer__social-label']}>Theo dõi CMB:</span>
                  {socialLinks.map((social) => (
                    <a
                      key={social.key}
                      href={social.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['p-footer__social-link']}
                      aria-label={social.label}
                      id={`footer-${social.key}`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
