import type { InputHTMLAttributes } from 'react'

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
    <div className="space-y-1 text-left">
      <label htmlFor={id} className="block text-sm font-medium text-[var(--text-h)]">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm text-[var(--text-h)] outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-bg)] ${className}`.trim()}
        {...props}
      />
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  )
}
