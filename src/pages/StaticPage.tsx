import { Link, useParams } from 'react-router'
import { useStaticPage } from '@/shared/hooks/useStaticPage.ts'
import { ErrorState } from '@/shared/components/ui/ErrorState.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import styles from './StaticPage.module.scss'

export function StaticPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: page, isLoading, isError, error, refetch } = useStaticPage(slug ?? '')

  return (
    <section>
      <header className={styles['p-static-page-banner']}>
        <div className={styles['p-static-page-banner__ripple']} aria-hidden="true" />
        <div className={styles['p-static-page-banner__content']}>
          <h1 className={styles['p-static-page-banner__title']}>{page?.title ?? 'Trang'}</h1>
          <nav className={styles['p-static-page-banner__breadcrumbs']} aria-label="Breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className={styles['p-static-page-banner__breadcrumbs-separator']} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </span>
            <span className={styles['p-static-page-banner__breadcrumbs-current']}>{page?.title ?? 'Trang'}</span>
          </nav>
        </div>
      </header>

      <div className={`${styles['p-static-page']} l-container`}>
        {isLoading && <LoadingState />}

        {isError && (
          <ErrorState
            message={getErrorMessage(error, 'Không tải được nội dung trang.')}
            onRetry={() => refetch()}
          />
        )}

        {page && (
          <div className={styles['p-static-page__content']} dangerouslySetInnerHTML={{ __html: page.content }} />
        )}
      </div>
    </section>
  )
}
