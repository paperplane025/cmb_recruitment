import type { JobFilters } from '@/features/job/types.ts'
import type { BlogFilters } from '@/features/blog/types.ts'

export const queryKeys = {
  jobs: {
    all: ['jobs'] as const,
    list: (filters: JobFilters, page: number) =>
      ['jobs', 'list', filters, page] as const,
    detail: (id: string) => ['jobs', 'detail', id] as const,
    featured: ['jobs', 'featured'] as const,
    categories: ['jobs', 'categories'] as const,
    locations: ['jobs', 'locations'] as const,
    facets: ['jobs', 'facets'] as const,
  },
  blog: {
    all: ['blog'] as const,
    list: (filters: BlogFilters, page: number) =>
      ['blog', 'list', filters, page] as const,
    detail: (id: string) => ['blog', 'detail', id] as const,
    featured: ['blog', 'featured'] as const,
  },
  siteConfig: {
    stats: ['siteConfig', 'stats'] as const,
    testimonials: ['siteConfig', 'testimonials'] as const,
    companyGallery: ['siteConfig', 'companyGallery'] as const,
    footerInfo: ['siteConfig', 'footerInfo'] as const,
  },
  contact: {
    info: ['contact', 'info'] as const,
  },
  staticPage: {
    detail: (slug: string) => ['staticPage', 'detail', slug] as const,
  },
} as const
