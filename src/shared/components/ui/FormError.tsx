import styles from './FormError.module.scss'

type FormErrorProps = {
  message: string | null | undefined
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null
  return <p className={styles['c-form-error']}>{message}</p>
}
