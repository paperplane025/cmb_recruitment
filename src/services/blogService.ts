import { env } from '@/configs/env.ts'
import { mockBlogPosts } from '@/mocks/blog.ts'
import type { BlogPost, BlogFilters, PaginatedBlogPosts } from '@/features/blog/types.ts'
import { delay } from '@/shared/lib/delay.ts'
import { apiClient } from './client.ts'

const MOCK_DELAY_MS = 300
const DEFAULT_PAGE_SIZE = 6

function applyFilters(posts: BlogPost[], filters: BlogFilters): BlogPost[] {
  let result = posts

  if (filters.search) {
    const query = filters.search.toLowerCase()
    result = result.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query),
    )
  }

  return result
}

export const blogService = {
  getAll: async (
    filters: BlogFilters = {},
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  ): Promise<PaginatedBlogPosts> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)

      const filtered = applyFilters(mockBlogPosts, filters)
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

    const { data } = await apiClient.get<PaginatedBlogPosts>('/blog', {
      params: { ...filters, page, pageSize },
    })
    return data
  },

  getById: async (id: string): Promise<BlogPost> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      const post = mockBlogPosts.find((item) => item.id === id)
      if (!post) {
        throw new Error('Không tìm thấy bài viết.')
      }
      return post
    }

    const { data } = await apiClient.get<BlogPost>(`/blog/${id}`)
    return data
  },

  getFeatured: async (limit = 3): Promise<BlogPost[]> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      return mockBlogPosts.slice(0, limit)
    }

    const { data } = await apiClient.get<BlogPost[]>('/blog/featured', {
      params: { limit },
    })
    return data
  },
}
