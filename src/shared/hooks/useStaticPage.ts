import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { staticPageService } from '@/services/staticPageService.ts'

export function useStaticPage(slug: string) {
  return useQuery({
    queryKey: queryKeys.staticPage.detail(slug),
    queryFn: () => staticPageService.getBySlug(slug),
  })
}
