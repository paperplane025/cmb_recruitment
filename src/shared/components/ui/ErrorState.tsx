type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Đã xảy ra lỗi. Vui lòng thử lại.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-md border border-red-300 bg-red-500/10 p-4 text-left text-sm text-red-700 dark:text-red-300">
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-[var(--accent)] underline"
        >
          Thử lại
        </button>
      ) : null}
    </div>
  )
}
