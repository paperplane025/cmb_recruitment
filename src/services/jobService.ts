import { env } from '@/configs/env.ts'
import { mockJobs } from '@/mocks/jobs.ts'
import type { Job, JobFilters, JobFacets, FacetItem, PaginatedJobs } from '@/features/job/types.ts'
import { delay } from '@/shared/lib/delay.ts'
import { apiClient } from './client.ts'

const MOCK_DELAY_MS = 300
const DEFAULT_PAGE_SIZE = 6

function isWithinDateRange(postedAt: string, range: string): boolean {
  const posted = new Date(postedAt)
  const now = new Date()

  switch (range) {
    case 'today': {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return posted >= today
    }
    case 'this-week': {
      const weekAgo = new Date(now)
      weekAgo.setDate(weekAgo.getDate() - 7)
      return posted >= weekAgo
    }
    case 'this-month': {
      const monthAgo = new Date(now)
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return posted >= monthAgo
    }
    default:
      return true
  }
}

function applyFilters(jobs: Job[], filters: JobFilters): Job[] {
  let result = jobs

  if (filters.search) {
    const query = filters.search.toLowerCase()
    result = result.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query),
    )
  }

  if (filters.category) {
    // Hỗ trợ nhiều danh mục cùng lúc (VD: "marketing,sales" từ card gộp ở trang chủ)
    const categories = filters.category.split(',').filter(Boolean)
    result = result.filter((job) => categories.includes(job.category))
  }

  if (filters.employmentType) {
    // Hỗ trợ chọn nhiều loại hình cùng lúc — khớp job có chứa BẤT KỲ loại hình nào trong danh sách
    const types = filters.employmentType.split(',').filter(Boolean)
    result = result.filter((job) => job.employmentType.some((t) => types.includes(t)))
  }

  if (filters.datePosted && filters.datePosted !== 'all') {
    result = result.filter((job) =>
      isWithinDateRange(job.postedAt, filters.datePosted!),
    )
  }

  if (filters.salaryMin !== undefined) {
    result = result.filter((job) => job.salary.max >= filters.salaryMin!)
  }

  if (filters.salaryMax !== undefined) {
    result = result.filter((job) => job.salary.min <= filters.salaryMax!)
  }

  if (filters.location) {
    // Hỗ trợ nhiều khu vực cùng lúc — khớp job có chứa BẤT KỲ khu vực nào trong danh sách
    // (job.location có thể chứa nhiều slug cách nhau bởi dấu phẩy).
    const locations = filters.location.split(',').filter(Boolean)
    result = result.filter((job) =>
      job.location.split(',').some((loc) => locations.includes(loc)),
    )
  }

  return result
}

function applySort(jobs: Job[], sort: JobFilters['sort']): Job[] {
  const sorted = [...jobs]
  switch (sort) {
    case 'salary':
      return sorted.sort((a, b) => b.salary.max - a.salary.max)
    case 'applications':
    // Mock data không có số liệu ứng tuyển thực (đến từ CPT don_ung_tuyen riêng trên WP) —
    // API thật xếp theo số hồ sơ ứng tuyển, mock tạm fallback về mới nhất trước.
    default:
      return sorted.sort(
        (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
      )
  }
}

export const jobService = {
  getAll: async (
    filters: JobFilters = {},
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  ): Promise<PaginatedJobs> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)

      const filtered = applyFilters(mockJobs, filters)
      const sorted = applySort(filtered, filters.sort)

      const total = sorted.length
      const totalPages = Math.max(1, Math.ceil(total / pageSize))
      const safePage = Math.min(page, totalPages)
      const start = (safePage - 1) * pageSize
      const items = sorted.slice(start, start + pageSize)

      return { items, total, page: safePage, pageSize, totalPages }
    }

    const { data } = await apiClient.get<PaginatedJobs>('/jobs', {
      params: { ...filters, page, pageSize },
    })
    return data
  },

  getById: async (id: string): Promise<Job> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      const job = mockJobs.find((item) => item.id === id)
      if (!job) {
        throw new Error('Không tìm thấy tin tuyển dụng.')
      }
      return job
    }

    const { data } = await apiClient.get<Job>(`/jobs/${id}`)
    return data
  },

  getFeatured: async (): Promise<Job[]> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      return mockJobs.filter((job) => job.isFeatured)
    }

    const { data } = await apiClient.get<Job[]>('/jobs/featured')
    return data
  },

  getCategories: async (): Promise<FacetItem[]> => {
    if (env.enableMockApi) {
      await delay(200)
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
      const counts = new Map<string, number>()
      for (const job of mockJobs) {
        counts.set(job.category, (counts.get(job.category) ?? 0) + 1)
      }
      return Array.from(counts.entries()).map(([key, count]) => ({
        key,
        label: categoryLabels[key] ?? key,
        count,
      }))
    }

    const { data } = await apiClient.get<FacetItem[]>('/jobs/categories')
    return data
  },

  getLocations: async (): Promise<FacetItem[]> => {
    if (env.enableMockApi) {
      await delay(200)
      const counts = new Map<string, number>()
      const labels = new Map<string, string>()
      for (const job of mockJobs) {
        const locs = job.location.split(',').filter(Boolean)
        const locLabels = (job.locationLabel ?? job.location).split(',').filter(Boolean)
        locs.forEach((loc, idx) => {
          counts.set(loc, (counts.get(loc) ?? 0) + 1)
          labels.set(loc, (locLabels[idx] ?? loc).trim())
        })
      }
      return Array.from(counts.entries()).map(([key, count]) => ({
        key,
        label: labels.get(key) ?? key,
        count,
      }))
    }

    const { data } = await apiClient.get<FacetItem[]>('/jobs/locations')
    return data
  },

  getFacets: async (): Promise<JobFacets> => {
    if (env.enableMockApi) {
      await delay(200)

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
      const employmentTypeLabels: Record<string, string> = {
        'full-time': 'Toàn thời gian',
        'part-time': 'Bán thời gian',
        contract: 'Hợp đồng',
        internship: 'Thực tập',
        remote: 'Từ xa',
      }

      // Một job có thể có nhiều loại hình — đếm job vào tất cả các loại hình nó thuộc về.
      const countByEmploymentType = (labels: Record<string, string>) => {
        const counts = new Map<string, number>()
        for (const job of mockJobs) {
          for (const type of job.employmentType) {
            counts.set(type, (counts.get(type) ?? 0) + 1)
          }
        }
        return Array.from(counts.entries()).map(([key, count]) => ({
          key,
          label: labels[key] ?? key,
          count,
        }))
      }

      const countBy = (getKey: (job: Job) => string, labels: Record<string, string>) => {
        const counts = new Map<string, number>()
        for (const job of mockJobs) {
          const key = getKey(job)
          counts.set(key, (counts.get(key) ?? 0) + 1)
        }
        return Array.from(counts.entries()).map(([key, count]) => ({
          key,
          label: labels[key] ?? key,
          count,
        }))
      }

      const dateBuckets = [
        { key: 'today', label: 'Hôm nay', range: 'today' },
        { key: 'this-week', label: 'Tuần này', range: 'this-week' },
        { key: 'this-month', label: 'Tháng này', range: 'this-month' },
      ]
      const salaryBuckets = [
        { min: 5_000_000, max: 15_000_000, label: '5 – 15 triệu' },
        { min: 15_000_000, max: 25_000_000, label: '15 – 25 triệu' },
        { min: 25_000_000, max: 40_000_000, label: '25 – 40 triệu' },
        { min: 40_000_000, max: 60_000_000, label: '40 – 60 triệu' },
        { min: 60_000_000, max: 999_000_000, label: 'Trên 60 triệu' },
      ]

      const locationCounts = new Map<string, number>()
      const locationLabels = new Map<string, string>()
      for (const job of mockJobs) {
        const locs = job.location.split(',').filter(Boolean)
        const locLabels = (job.locationLabel ?? job.location).split(',').filter(Boolean)
        locs.forEach((loc, idx) => {
          locationCounts.set(loc, (locationCounts.get(loc) ?? 0) + 1)
          locationLabels.set(loc, (locLabels[idx] ?? loc).trim())
        })
      }

      return {
        categories: countBy((job) => job.category, categoryLabels),
        locations: Array.from(locationCounts.entries()).map(([key, count]) => ({
          key,
          label: locationLabels.get(key) ?? key,
          count,
        })),
        employmentTypes: countByEmploymentType(employmentTypeLabels),
        datePosted: dateBuckets.map((bucket) => ({
          key: bucket.key,
          label: bucket.label,
          count: mockJobs.filter((job) => isWithinDateRange(job.postedAt, bucket.range)).length,
        })),
        salaryRanges: salaryBuckets.map((bucket) => ({
          ...bucket,
          count: mockJobs.filter(
            (job) => job.salary.max >= bucket.min && job.salary.min <= bucket.max,
          ).length,
        })),
      }
    }

    const { data } = await apiClient.get<JobFacets>('/jobs/facets')
    return data
  },
}
