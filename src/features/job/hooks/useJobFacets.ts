import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { jobService } from '@/services/jobService.ts'

export function useJobFacets() {
  return useQuery({
    queryKey: queryKeys.jobs.facets,
    queryFn: () => jobService.getFacets(),
  })
}
