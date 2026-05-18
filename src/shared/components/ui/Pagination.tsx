import { Button } from './Button.tsx'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, page - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <nav
      aria-label="Phân trang"
      className="mt-8 flex items-center justify-center gap-2"
    >
      <Button
        variant="secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Trang trước"
      >
        ←
      </Button>

      {start > 1 && (
        <>
          <Button variant="secondary" onClick={() => onPageChange(1)}>
            1
          </Button>
          {start > 2 && (
            <span className="px-2 text-sm text-[var(--text)]">…</span>
          )}
        </>
      )}

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? 'primary' : 'secondary'}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </Button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2 text-sm text-[var(--text)]">…</span>
          )}
          <Button
            variant="secondary"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Trang sau"
      >
        →
      </Button>
    </nav>
  )
}
