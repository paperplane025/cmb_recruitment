import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Button } from '@/shared/components/ui/Button.tsx'
import styles from './ErrorBoundary.module.scss'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className={styles['c-error-boundary']}>
          <div className={styles['c-error-boundary__icon']}>⚠️</div>
          <h2 className={styles['c-error-boundary__title']}>
            Đã xảy ra lỗi không mong muốn
          </h2>
          <p className={styles['c-error-boundary__message']}>
            {this.state.error?.message ?? 'Vui lòng thử lại sau.'}
          </p>
          <Button onClick={this.handleReset}>Thử lại</Button>
        </div>
      )
    }

    return this.props.children
  }
}
