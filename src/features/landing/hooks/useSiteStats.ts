import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { siteConfigService } from '@/services/siteConfigService.ts'

export function useSiteStats() {
  return useQuery({
    queryKey: queryKeys.siteConfig.stats,
    queryFn: () => siteConfigService.getStats(),
  })
}
