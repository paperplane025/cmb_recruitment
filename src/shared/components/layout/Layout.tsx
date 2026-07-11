import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'
import styles from './Layout.module.scss'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isJobsPage = location.pathname === '/jobs' || location.pathname.startsWith('/jobs/')
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  const isFullBleed = isHome || isJobsPage || isAuthPage

  return (
    <div className={styles['l-layout']}>
      <Header />
      <main
        className={`${styles['l-layout__main']} ${isFullBleed ? '' : `${styles['l-layout__main--contained']} l-container`}`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
