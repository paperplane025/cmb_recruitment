type LoadingStateProps = {
  label?: string
}

export function LoadingState({ label = 'Đang tải...' }: LoadingStateProps) {
  return <p className="text-left text-sm text-[var(--text)]">{label}</p>
}
