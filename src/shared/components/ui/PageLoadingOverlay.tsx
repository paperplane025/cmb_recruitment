import styles from './PageLoadingOverlay.module.scss'

export function PageLoadingOverlay() {
  return (
    <div className={styles['c-page-loading-overlay']}>
      <span className={styles['c-page-loading-overlay__spinner']} aria-hidden="true" />
      <p className={styles['c-page-loading-overlay__label']}>Đang tải trang...</p>
    </div>
  )
}
