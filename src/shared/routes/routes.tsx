/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { Layout } from '@/shared/components/layout/Layout.tsx'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { PageLoadingOverlay } from '@/shared/components/ui/PageLoadingOverlay.tsx'

const HomePage = lazy(() =>
  import('@/pages/HomePage.tsx').then((m) => ({ default: m.HomePage })),
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
const BlogListingPage = lazy(() =>
  import('@/pages/BlogListingPage.tsx').then((m) => ({
    default: m.BlogListingPage,
  })),
)
const BlogDetailPage = lazy(() =>
  import('@/pages/BlogDetailPage.tsx').then((m) => ({
    default: m.BlogDetailPage,
  })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage.tsx').then((m) => ({ default: m.ContactPage })),
)
const StaticPage = lazy(() =>
  import('@/pages/StaticPage.tsx').then((m) => ({ default: m.StaticPage })),
)

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoadingOverlay />}>{children}</Suspense>
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
        path: 'blog',
        element: (
          <SuspenseWrapper>
            <BlogListingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'blog/:id',
        element: (
          <SuspenseWrapper>
            <BlogDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'contact',
        element: (
          <SuspenseWrapper>
            <ContactPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'page/:slug',
        element: (
          <SuspenseWrapper>
            <StaticPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
])
