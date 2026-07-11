import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys.ts'
import { contactService } from '@/services/contactService.ts'

export function useContactInfo() {
  return useQuery({
    queryKey: queryKeys.contact.info,
    queryFn: () => contactService.getContactInfo(),
  })
}
