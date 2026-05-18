import type { EmploymentType, Job, JobCategory } from './types.ts'

export function getJobSlug(job: Job): string {
  return job.id
}

export function sortJobsByDate(jobs: Job[]): Job[] {
  return [...jobs].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
  )
}

const employmentTypeLabels: Record<EmploymentType, string> = {
  'full-time': 'Toàn thời gian',
  'part-time': 'Bán thời gian',
  contract: 'Hợp đồng',
  internship: 'Thực tập',
}

export function getEmploymentTypeLabel(type: EmploymentType): string {
  return employmentTypeLabels[type]
}

const categoryLabels: Record<JobCategory, string> = {
  engineering: 'Kỹ thuật',
  design: 'Thiết kế',
  marketing: 'Marketing',
  sales: 'Kinh doanh',
  hr: 'Nhân sự',
  finance: 'Tài chính',
  operations: 'Vận hành',
  product: 'Sản phẩm',
}

export function getCategoryLabel(category: JobCategory): string {
  return categoryLabels[category]
}

export function formatSalary(min: number, max: number, currency: string): string {
  const formatter = new Intl.NumberFormat('vi-VN')
  if (currency === 'VND') {
    return `${formatter.format(min / 1_000_000)} – ${formatter.format(max / 1_000_000)} triệu`
  }
  return `${formatter.format(min)} – ${formatter.format(max)} ${currency}`
}
