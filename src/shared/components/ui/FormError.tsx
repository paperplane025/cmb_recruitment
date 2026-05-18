type FormErrorProps = {
  message: string | null | undefined
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null
  return (
    <p className="rounded-md bg-red-500/10 px-3 py-2 text-left text-sm text-red-600 dark:text-red-400">
      {message}
    </p>
  )
}
