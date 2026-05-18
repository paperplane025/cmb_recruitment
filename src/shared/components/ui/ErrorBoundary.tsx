import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Button } from '@/shared/components/ui/Button.tsx'

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
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="text-5xl">⚠️</div>
          <h2 className="text-xl text-[var(--text-h)]">
            Đã xảy ra lỗi không mong muốn
          </h2>
          <p className="max-w-md text-sm text-[var(--text)]">
            {this.state.error?.message ?? 'Vui lòng thử lại sau.'}
          </p>
          <Button onClick={this.handleReset}>Thử lại</Button>
        </div>
      )
    }

    return this.props.children
  }
}
