import { delay } from '@/shared/lib/delay.ts'
import { env } from '@/configs/env.ts'
import { apiClient } from './client.ts'

export type SubmitApplicationInput = {
  jobId: string
  fullName: string
  address: string
  phone: string
  email: string
  cvFile: File
}

export type SubmitApplicationResult = {
  id: number
  message: string
}

export const applicationService = {
  submit: async (
    input: SubmitApplicationInput,
  ): Promise<SubmitApplicationResult> => {
    if (env.enableMockApi) {
      await delay(900)
      return { id: Date.now(), message: 'Nộp hồ sơ thành công' }
    }

    const formData = new FormData()
    formData.append('jobId', input.jobId)
    formData.append('fullName', input.fullName)
    formData.append('address', input.address)
    formData.append('phone', input.phone)
    formData.append('email', input.email)
    formData.append('cvFile', input.cvFile)

    const { data } = await apiClient.post<SubmitApplicationResult>(
      '/applications',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return data
  },
}
