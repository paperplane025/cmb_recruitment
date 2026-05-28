/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { Layout } from '@/shared/components/layout/Layout.tsx'
import { GuestRoute } from '@/shared/components/routing/GuestRoute.tsx'
import { ProtectedRoute } from '@/shared/components/routing/ProtectedRoute.tsx'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'

const HomePage = lazy(() =>
  import('@/pages/HomePage.tsx').then((m) => ({ default: m.HomePage })),
)
const LoginPage = lazy(() =>
  import('@/pages/LoginPage.tsx').then((m) => ({ default: m.LoginPage })),
)
const RegisterPage = lazy(() =>
  import('@/pages/RegisterPage.tsx').then((m) => ({ default: m.RegisterPage })),
)
const JobListingPage = lazy(() =>
  import('@/pages/JobListingPage.tsx').then((m) => ({
    default: m.JobListingPage,
  })),
)
const JobDetailPage = lazy(() =>
  import('@/pages/JobDetailPage.tsx').then((m) => ({
    default: m.JobDetailPage,
  })),
)

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingState label="Đang tải trang..." />}>
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: 'login',
            element: (
              <SuspenseWrapper>
                <LoginPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'register',
            element: (
              <SuspenseWrapper>
                <RegisterPage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        path: 'jobs',
        element: (
          <SuspenseWrapper>
            <JobListingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'jobs/:id',
        element: (
          <SuspenseWrapper>
            <JobDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
        ],
      },
    ],
  },
])
