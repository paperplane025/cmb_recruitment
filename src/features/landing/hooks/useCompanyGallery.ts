import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { siteConfigService } from '@/services/siteConfigService.ts'

export function useCompanyGallery() {
  return useQuery({
    queryKey: queryKeys.siteConfig.companyGallery,
    queryFn: () => siteConfigService.getCompanyGallery(),
  })
}
