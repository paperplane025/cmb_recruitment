import styles from './Footer.module.scss'

const FOOTER_COLUMNS = [
  {
    heading: "About Company",
    links: [
      { label: 'Contact Us', href: '#' },
      { label: 'Terms & Condition', href: '#' },
      { label: 'Privacy & Policy', href: '#' },
      { label: 'Candidate Listing', href: '#' },
    ],
  },
  {
    heading: "For Candidate's",
    links: [
      { label: 'Create Resume', href: '#' },
      { label: 'Browse Categories', href: '#' },
      { label: 'Save Jobs List', href: '#' },
      { label: 'Browse Jobs', href: '#' },
      { label: 'Candidate Dashboard', href: '#' },
    ],
  },
  {
    heading: "For Employer's",
    links: [
      { label: 'Post A Job', href: '#' },
      { label: 'Browse Candidates', href: '#' },
      { label: 'Job Packages', href: '#' },
      { label: 'Jobs Featured', href: '#' },
      { label: 'Employer Dashboard', href: '#' },
    ],
  },
]

const BOTTOM_NAV = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Services', href: '#' },
  { label: 'Our Sitemap', href: '#' },
]

export function Footer() {
  return (
    <footer className={styles['p-footer']} id="site-footer">
      {/* ─── Top Section: 4-column links ─── */}
      <div className={styles['p-footer__top']}>
        <div className="l-container-1320">
          <div className={styles['p-footer__grid']}>
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading} className={styles['p-footer__col']}>
                <h3 className={styles['p-footer__col-heading']}>{col.heading}</h3>
                <ul className={styles['p-footer__links']}>
                  {col.links.map((link) => (
                    <li key={link.label} className={styles['p-footer__links-item']}>
                      <a href={link.href} className={styles['p-footer__links-anchor']}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* ─── Download App Column ─── */}
            <div className={styles['p-footer__col']}>
              <h3 className={styles['p-footer__col-heading']}>Download App</h3>
              <div className={styles['p-footer__app-buttons']}>
                <a
                  href="#"
                  className={styles['p-footer__app-btn']}
                  aria-label="Download on the App Store"
                  id="footer-appstore-btn"
                >
                  <span className={styles['p-footer__app-btn-icon']}>
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                    </svg>
                  </span>
                  <span className={styles['p-footer__app-btn-text']}>
                    <span className={styles['p-footer__app-btn-text-small']}>Download on the</span>
                    <span className={styles['p-footer__app-btn-text-large']}>App Store</span>
                  </span>
                </a>
                <a
                  href="#"
                  className={styles['p-footer__app-btn']}
                  aria-label="Get it on Google Play"
                  id="footer-googleplay-btn"
                >
                  <span className={styles['p-footer__app-btn-icon']}>
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.609 1.814L13.792 12 3.609 22.186A2.008 2.008 0 0 1 3 20.586V3.414c0-.478.17-.919.609-1.6zM14.5 12.707l2.302 2.302-8.972 5.098L14.5 12.707zm4.386-2.468l2.18 1.238a1.073 1.073 0 0 1 0 1.886l-2.18 1.238-2.596-2.601 2.596-2.761zM7.83 3.893l8.972 5.098L14.5 11.293 7.83 3.893z" />
                    </svg>
                  </span>
                  <span className={styles['p-footer__app-btn-text']}>
                    <span className={styles['p-footer__app-btn-text-small']}>Get in</span>
                    <span className={styles['p-footer__app-btn-text-large']}>Google Play</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className={styles['p-footer__bottom']}>
        <div className="l-container-1320">
          <div className={styles['p-footer__bottom-inner']}>
            {/* ─── Left: Support + Copyright ─── */}
            <div>
              <div className={styles['p-footer__support']}>
                <span className={styles['p-footer__support-icon']} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className={styles['p-footer__support-label']}>Support Line:</span>
                <a href="tel:+0990357398-3465" className={styles['p-footer__support-number']}>
                  +099-035 7398 3465
                </a>
              </div>
              <p className={styles['p-footer__copyright']}>
                ©Copyright {new Date().getFullYear()}{' '}
                <span className={styles['p-footer__copyright-brand']}>JOBES</span>
                {' | Design By '}
                <a href="#" className={styles['p-footer__copyright-link']}>Egenslab</a>
              </p>
            </div>

            {/* ─── Center: Logo ─── */}
            <div className={styles['p-footer__logo']}>
              <span className={styles['p-footer__logo-brand']}>
                JO<span>BES</span>
              </span>
              <span className={styles['p-footer__logo-tagline']}>Job Portal</span>
            </div>

            {/* ─── Right: Nav + Social ─── */}
            <div className={styles['p-footer__bottom-right']}>
              <nav aria-label="Footer navigation">
                <ul className={styles['p-footer__bottom-nav']}>
                  {BOTTOM_NAV.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className={styles['p-footer__bottom-nav-link']}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className={styles['p-footer__social']}>
                <span className={styles['p-footer__social-label']}>Follow JOBES:</span>
                <a href="#" className={styles['p-footer__social-link']} aria-label="Facebook" id="footer-facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="#" className={styles['p-footer__social-link']} aria-label="Twitter" id="footer-twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                </a>
                <a href="#" className={styles['p-footer__social-link']} aria-label="LinkedIn" id="footer-linkedin">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="#" className={styles['p-footer__social-link']} aria-label="Instagram" id="footer-instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
