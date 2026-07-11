import styles from './ErrorState.module.scss'

type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Đã xảy ra lỗi. Vui lòng thử lại.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles['c-error-state']}>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className={styles['c-error-state__retry']}>
          Thử lại
        </button>
      ) : null}
    </div>
  )
}
