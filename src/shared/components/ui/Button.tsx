import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles['c-btn']} ${styles[`c-btn--${variant}`]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
