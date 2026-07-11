import styles from './FieldError.module.scss'

type FieldErrorProps = {
  message: string | null | undefined
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null
  return <span className={styles['c-field-error']}>{message}</span>
}
