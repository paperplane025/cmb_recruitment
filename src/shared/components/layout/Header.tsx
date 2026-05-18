import { Link } from 'react-router'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { env } from '@/configs/env.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import { Button } from '@/shared/components/ui/Button.tsx'

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
      <Link
        to={APP_ROUTES.home}
        className="text-lg font-medium text-[var(--text-h)]"
      >
        {env.appName}
      </Link>
      <nav className="flex items-center gap-4 text-sm text-[var(--text)]">
        {isAuthenticated ? (
          <>
            <Link to={APP_ROUTES.jobs}>Việc làm</Link>
            <span className="hidden sm:inline">{user?.fullName}</span>
            <Button variant="secondary" onClick={logout}>
              Đăng xuất
            </Button>
          </>
        ) : (
          <>
            <Link to={APP_ROUTES.login}>Đăng nhập</Link>
            <Link to={APP_ROUTES.register}>Đăng ký</Link>
          </>
        )}
      </nav>
    </header>
  )
}
