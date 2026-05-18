function parseDateInput(value: string | Date): Date {
  if (value instanceof Date) return value

  const trimmed = value.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const parts = trimmed.split('-')
    const year = Number(parts[0])
    const month = Number(parts[1])
    const day = Number(parts[2])
    return new Date(year, month - 1, day)
  }

  return new Date(value)
}

export function formatDate(
  value: string | Date,
  locale = 'vi-VN',
): string {
  const date = parseDateInput(value)
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
