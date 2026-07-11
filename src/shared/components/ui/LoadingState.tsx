import styles from './LoadingState.module.scss'

type LoadingStateProps = {
  label?: string
}

export function LoadingState({ label = 'Đang tải...' }: LoadingStateProps) {
  return (
    <div className={styles['c-loading-state']}>
      <span className={styles['c-loading-state__spinner']} aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}
