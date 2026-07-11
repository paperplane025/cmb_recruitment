import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { blogService } from '@/services/blogService.ts'
import type { BlogFilters } from '../types.ts'

export function useBlogPosts(filters: BlogFilters = {}, page = 1) {
  return useQuery({
    queryKey: queryKeys.blog.list(filters, page),
    queryFn: () => blogService.getAll(filters, page),
    placeholderData: (previousData) => previousData,
  })
}
