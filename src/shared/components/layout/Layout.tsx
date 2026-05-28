import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'
import { JobesHeader } from '@/features/landing/index.ts'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isJobsPage = location.pathname === '/jobs' || location.pathname.startsWith('/jobs/')
  const isFullBleed = isHome || isJobsPage

  return (
    <div className="flex min-h-svh flex-col">
      {isHome || isJobsPage ? <JobesHeader /> : <Header />}
      <main className={`flex-1 ${isFullBleed ? '' : 'px-6 py-8 l-container'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
