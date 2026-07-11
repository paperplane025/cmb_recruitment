import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { siteConfigService } from '@/services/siteConfigService.ts'

export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.siteConfig.testimonials,
    queryFn: () => siteConfigService.getTestimonials(),
  })
}
