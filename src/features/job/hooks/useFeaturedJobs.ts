import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { jobService } from '@/services/jobService.ts'

export function useFeaturedJobs() {
  return useQuery({
    queryKey: queryKeys.jobs.featured,
    queryFn: () => jobService.getFeatured(),
  })
}
