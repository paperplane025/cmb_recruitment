import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({
  id,
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={styles['c-input']}>
      <label htmlFor={id} className={styles['c-input__label']}>
        {label}
      </label>
      <input id={id} className={`${styles['c-input__field']} ${className}`.trim()} {...props} />
      {error ? <p className={styles['c-input__error']}>{error}</p> : null}
    </div>
  )
}
