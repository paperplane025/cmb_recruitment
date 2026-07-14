import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { siteConfigService } from '@/services/siteConfigService.ts'

export function useHeroBanner() {
  return useQuery({
    queryKey: queryKeys.siteConfig.heroBanner,
    queryFn: () => siteConfigService.getHeroBanner(),
  })
}
