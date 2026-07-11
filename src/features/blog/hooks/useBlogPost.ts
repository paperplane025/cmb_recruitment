import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { blogService } from '@/services/blogService.ts'

export function useBlogPost(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.blog.detail(id ?? ''),
    queryFn: () => blogService.getById(id!),
    enabled: Boolean(id),
  })
}
