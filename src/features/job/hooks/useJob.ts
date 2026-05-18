import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { jobService } from '@/services/jobService.ts'

export function useJob(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id ?? ''),
    queryFn: () => jobService.getById(id!),
    enabled: Boolean(id),
  })
}
