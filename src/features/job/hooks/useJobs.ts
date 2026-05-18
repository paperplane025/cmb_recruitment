import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { jobService } from '@/services/jobService.ts'
import type { JobFilters } from '../types.ts'

export function useJobs(filters: JobFilters = {}, page = 1) {
  return useQuery({
    queryKey: queryKeys.jobs.list(filters, page),
    queryFn: () => jobService.getAll(filters, page),
    placeholderData: (previousData) => previousData,
  })
}
