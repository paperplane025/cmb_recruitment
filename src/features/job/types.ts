export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship'

export type JobCategory =
  | 'engineering'
  | 'design'
  | 'marketing'
  | 'sales'
  | 'hr'
  | 'finance'
  | 'operations'
  | 'product'

export type SalaryRange = {
  min: number
  max: number
  currency: string
}

export type Job = {
  id: string
  title: string
  company: string
  location: string
  description: string
  postedAt: string
  category: JobCategory
  employmentType: EmploymentType
  salary: SalaryRange
  requirements: string[]
  benefits: string[]
  isFeatured: boolean
}

export type JobFilters = {
  search?: string
  category?: JobCategory
  employmentType?: EmploymentType
  datePosted?: 'all' | 'today' | 'this-week' | 'this-month'
  salaryMin?: number
  salaryMax?: number
  location?: string
}

export type PaginatedJobs = {
  items: Job[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
