import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { jobService } from '@/services/jobService.ts'

export function useJobCategories() {
  return useQuery({
    queryKey: queryKeys.jobs.categories,
    queryFn: () => jobService.getCategories(),
  })
}
