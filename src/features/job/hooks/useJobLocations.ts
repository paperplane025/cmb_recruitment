import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { jobService } from '@/services/jobService.ts'

export function useJobLocations() {
  return useQuery({
    queryKey: queryKeys.jobs.locations,
    queryFn: () => jobService.getLocations(),
  })
}
