import { type ChangeEvent } from 'react'
import type { JobCategory, EmploymentType, JobFilters } from '../types.ts'

type JobFiltersBarProps = {
  filters: JobFilters
  onChange: (filters: JobFilters) => void
}

const CATEGORIES: Array<{ value: JobCategory; label: string }> = [
  { value: 'engineering', label: 'Kỹ thuật' },
  { value: 'design', label: 'Thiết kế' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Kinh doanh' },
  { value: 'hr', label: 'Nhân sự' },
  { value: 'finance', label: 'Tài chính' },
  { value: 'operations', label: 'Vận hành' },
  { value: 'product', label: 'Sản phẩm' },
]

const EMPLOYMENT_TYPES: Array<{ value: EmploymentType; label: string }> = [
  { value: 'full-time', label: 'Toàn thời gian' },
  { value: 'part-time', label: 'Bán thời gian' },
  { value: 'contract', label: 'Hợp đồng' },
  { value: 'internship', label: 'Thực tập' },
]

const DATE_OPTIONS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'today', label: 'Hôm nay' },
  { value: 'this-week', label: 'Tuần này' },
  { value: 'this-month', label: 'Tháng này' },
] as const

const SALARY_RANGES = [
  { value: '', label: 'Tất cả mức lương' },
  { value: '0-10', label: 'Dưới 10 triệu' },
  { value: '10-20', label: '10 – 20 triệu' },
  { value: '20-30', label: '20 – 30 triệu' },
  { value: '30-50', label: '30 – 50 triệu' },
  { value: '50-999', label: 'Trên 50 triệu' },
] as const

const selectClass =
  'w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm text-[var(--text-h)] outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-bg)]'

export function JobFiltersBar({ filters, onChange }: JobFiltersBarProps) {
  const updateFilter = <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K],
  ) => {
    onChange({ ...filters, [key]: value || undefined })
  }

  const handleSalaryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    if (!val) {
      onChange({ ...filters, salaryMin: undefined, salaryMax: undefined })
    } else {
      const [min, max] = val.split('-').map(Number)
      onChange({
        ...filters,
        salaryMin: (min ?? 0) * 1_000_000,
        salaryMax: (max ?? 999) * 1_000_000,
      })
    }
  }

  const currentSalaryValue =
    filters.salaryMin !== undefined && filters.salaryMax !== undefined
      ? `${filters.salaryMin / 1_000_000}-${filters.salaryMax / 1_000_000}`
      : ''

  return (
    <aside className="space-y-4 rounded-lg border border-[var(--border)] p-4">
      <h3 className="text-sm font-medium text-[var(--text-h)]">Bộ lọc</h3>

      {/* Category */}
      <div>
        <label
          htmlFor="filter-category"
          className="mb-1 block text-xs font-medium text-[var(--text)]"
        >
          Danh mục
        </label>
        <select
          id="filter-category"
          className={selectClass}
          value={filters.category ?? ''}
          onChange={(e) =>
            updateFilter(
              'category',
              (e.target.value as JobCategory) || undefined,
            )
          }
        >
          <option value="">Tất cả</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Employment Type */}
      <div>
        <label
          htmlFor="filter-employment"
          className="mb-1 block text-xs font-medium text-[var(--text)]"
        >
          Loại hình
        </label>
        <select
          id="filter-employment"
          className={selectClass}
          value={filters.employmentType ?? ''}
          onChange={(e) =>
            updateFilter(
              'employmentType',
              (e.target.value as EmploymentType) || undefined,
            )
          }
        >
          <option value="">Tất cả</option>
          {EMPLOYMENT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date Posted */}
      <div>
        <label
          htmlFor="filter-date"
          className="mb-1 block text-xs font-medium text-[var(--text)]"
        >
          Ngày đăng
        </label>
        <select
          id="filter-date"
          className={selectClass}
          value={filters.datePosted ?? 'all'}
          onChange={(e) =>
            updateFilter(
              'datePosted',
              e.target.value as JobFilters['datePosted'],
            )
          }
        >
          {DATE_OPTIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Salary Range */}
      <div>
        <label
          htmlFor="filter-salary"
          className="mb-1 block text-xs font-medium text-[var(--text)]"
        >
          Mức lương
        </label>
        <select
          id="filter-salary"
          className={selectClass}
          value={currentSalaryValue}
          onChange={handleSalaryChange}
        >
          {SALARY_RANGES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  )
}
