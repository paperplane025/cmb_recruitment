import type { JobFilters } from '@/features/job/types.ts'

export const queryKeys = {
  jobs: {
    all: ['jobs'] as const,
    list: (filters: JobFilters, page: number) =>
      ['jobs', 'list', filters, page] as const,
    detail: (id: string) => ['jobs', 'detail', id] as const,
    featured: ['jobs', 'featured'] as const,
    categories: ['jobs', 'categories'] as const,
    locations: ['jobs', 'locations'] as const,
  },
} as const
