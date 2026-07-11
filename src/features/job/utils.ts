import type { EmploymentType, Gender, Job, JobCategory } from './types.ts'

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
  remote: 'Từ xa',
}

export function getEmploymentTypeLabel(type: EmploymentType): string {
  return employmentTypeLabels[type]
}

/** Job có thể thuộc nhiều loại hình cùng lúc — nối nhãn lại thành 1 chuỗi hiển thị (VD: "Toàn thời gian, Từ xa"). */
export function getEmploymentTypeLabels(types: EmploymentType[]): string {
  return types.map(getEmploymentTypeLabel).join(', ')
}

/** Fallback label cho mock data / khi thiếu categoryLabel thật từ API — danh mục thật lấy động từ taxonomy. */
const categoryLabels: Record<string, string> = {
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
  return categoryLabels[category] ?? category
}

const genderLabels: Record<Gender, string> = {
  any: 'Không yêu cầu',
  male: 'Nam',
  female: 'Nữ',
}

export function getGenderLabel(gender: Gender | undefined): string {
  return genderLabels[gender ?? 'any']
}

export function formatSalary(min: number, max: number, currency: string): string {
  const formatter = new Intl.NumberFormat('vi-VN')
  if (currency === 'VND') {
    return `${formatter.format(min / 1_000_000)} – ${formatter.format(max / 1_000_000)} triệu`
  }
  return `${formatter.format(min)} – ${formatter.format(max)} ${currency}`
}

/** Ưu tiên hiển thị salaryText (VD: "Thoả thuận") khi salary.min/max chưa được nhập cụ thể. */
export function getSalaryDisplay(job: Pick<Job, 'salary' | 'salaryText'>): string {
  if (job.salary.min <= 0 && job.salary.max <= 0) {
    return job.salaryText?.trim() || 'Thoả thuận'
  }
  return formatSalary(job.salary.min, job.salary.max, job.salary.currency)
}

/** "/ Tháng" chỉ hiển thị khi có range lương cụ thể — không áp dụng khi hiển thị "Thoả thuận". */
export function getSalaryDisplayWithPeriod(job: Pick<Job, 'salary' | 'salaryText'>): string {
  const display = getSalaryDisplay(job)
  const hasRange = job.salary.min > 0 || job.salary.max > 0
  return hasRange ? `${display} / Tháng` : display
}
