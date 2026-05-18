import { env } from '@/configs/env.ts'
import { mockJobs } from '@/mocks/jobs.ts'
import type { Job, JobFilters, PaginatedJobs } from '@/features/job/types.ts'
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
    result = result.filter((job) => job.category === filters.category)
  }

  if (filters.employmentType) {
    result = result.filter(
      (job) => job.employmentType === filters.employmentType,
    )
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
    const loc = filters.location.toLowerCase()
    result = result.filter((job) => job.location.toLowerCase().includes(loc))
  }

  return result
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
      const sorted = [...filtered].sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
      )

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

  getCategories: async (): Promise<
    Array<{ key: string; label: string; count: number }>
  > => {
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

    const { data } =
      await apiClient.get<
        Array<{ key: string; label: string; count: number }>
      >('/jobs/categories')
    return data
  },

  getLocations: async (): Promise<
    Array<{ name: string; count: number }>
  > => {
    if (env.enableMockApi) {
      await delay(200)
      const counts = new Map<string, number>()
      for (const job of mockJobs) {
        counts.set(job.location, (counts.get(job.location) ?? 0) + 1)
      }
      return Array.from(counts.entries()).map(([name, count]) => ({
        name,
        count,
      }))
    }

    const { data } =
      await apiClient.get<Array<{ name: string; count: number }>>(
        '/jobs/locations',
      )
    return data
  },
}
