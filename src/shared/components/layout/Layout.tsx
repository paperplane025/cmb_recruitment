import { Outlet } from 'react-router'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1 px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
