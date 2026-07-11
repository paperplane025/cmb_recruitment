import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { siteConfigService } from '@/services/siteConfigService.ts'

export function useFooterInfo() {
  return useQuery({
    queryKey: queryKeys.siteConfig.footerInfo,
    queryFn: () => siteConfigService.getFooterInfo(),
  })
}
