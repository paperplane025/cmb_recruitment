import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { blogService } from '@/services/blogService.ts'

export function useFeaturedBlogPosts(limit = 3) {
  return useQuery({
    queryKey: queryKeys.blog.featured,
    queryFn: () => blogService.getFeatured(limit),
  })
}
