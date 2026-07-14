export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote'

/** Slug danh mục — lấy động từ taxonomy thật trên backend, không còn cố định. */
export type JobCategory = string

export type SalaryRange = {
  min: number
  max: number
  currency: string
}

export type Gender = 'any' | 'male' | 'female'

export type Job = {
  id: string
  title: string
  company: string
  /** Một job có thể thuộc nhiều khu vực — nhiều slug cách nhau bởi dấu phẩy (VD: "ha-noi,da-nang"). */
  location: string
  description: string
  postedAt: string
  category: JobCategory
  /** Tên danh mục thật lấy từ term taxonomy (fallback dùng getCategoryLabel khi thiếu, ví dụ ở mock data). */
  categoryLabel?: string
  /** Tên khu vực thật lấy từ term taxonomy, nhiều khu vực cách nhau bởi ", " (fallback dùng location khi thiếu, ví dụ ở mock data). */
  locationLabel?: string
  /** Một job có thể thuộc nhiều loại hình cùng lúc (VD: vừa full-time vừa remote). */
  employmentType: EmploymentType[]
  salary: SalaryRange
  /** Ghi chú mức lương dạng text (VD: "Thoả thuận") — ưu tiên hiển thị khi salary.min/max đều 0. */
  salaryText?: string
  requirements: string[]
  benefits: string[]
  isFeatured: boolean
  deadline?: string | null
  vacancies?: number
  experience?: string
  education?: string
  gender?: Gender
}

export type JobFilters = {
  search?: string
  category?: JobCategory
  /** Có thể chứa nhiều loại hình cách nhau bởi dấu phẩy (VD: "full-time,remote"), giống pattern của category/location. */
  employmentType?: string
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

export type FacetItem = {
  key: string
  label: string
  count: number
  /** Ảnh đại diện do admin chọn (chỉ có ở danh mục/khu vực) — dùng thay ảnh random khi đã thiết lập. */
  imageUrl?: string | null
}

export type SalaryRangeFacet = {
  min: number
  max: number
  label: string
  count: number
}

export type JobFacets = {
  categories: FacetItem[]
  locations: FacetItem[]
  employmentTypes: FacetItem[]
  datePosted: FacetItem[]
  salaryRanges: SalaryRangeFacet[]
}
