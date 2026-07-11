import { env } from '@/configs/env.ts'
import type { ContactFormInput, ContactInfo } from '@/features/contact/types.ts'
import { delay } from '@/shared/lib/delay.ts'
import { apiClient } from './client.ts'

const mockContactInfo: ContactInfo = {
  address: 'Tầng 11, Tòa nhà CMB, 512 Tôn Thất Thuyết,\nCầu Giấy, Hà Nội, Việt Nam',
  phones: ['(84) 24 3786 6291', '(84) 225 3 760 629'],
  emails: ['info@cmb.com.vn', 'ir@cmb.com.vn'],
  workingHours: 'Thứ 2 – Thứ 6\n08:00 – 17:30',
  offices: [
    {
      name: 'Văn phòng Hà Nội',
      address: 'Tầng 11, Tòa nhà CMB, 512 Tôn Thất Thuyết, Cầu Giấy, Hà Nội',
      phone: '(84) 24 3786 6291',
      mapSrc: 'https://maps.google.com/maps?q=512+Ton+That+Thuyet,+Cau+Giay,+Ha+Noi,+Viet+Nam&output=embed&hl=vi',
    },
    {
      name: 'VP Hải Phòng',
      address: 'Số 12 Lô 22 Lê Hồng Phong, Ngô Quyền, Hải Phòng',
      phone: '(84) 225 3 768 629',
      mapSrc: 'https://maps.google.com/maps?q=Le+Hong+Phong,+Ngo+Quyen,+Hai+Phong,+Viet+Nam&output=embed&hl=vi',
    },
    {
      name: 'VP TP HCM',
      address: 'Tầng 6, Tòa nhà Sailing, 111A Pasteur, Quận 1, TP.HCM',
      phone: '(84) 28 6287 4840',
      mapSrc: 'https://maps.google.com/maps?q=111A+Pasteur,+Quan+1,+Ho+Chi+Minh+City,+Viet+Nam&output=embed&hl=vi',
    },
  ],
}

export const contactService = {
  getContactInfo: async (): Promise<ContactInfo> => {
    if (env.enableMockApi) {
      await delay(200)
      return mockContactInfo
    }
    const { data } = await apiClient.get<ContactInfo>('/contact-info')
    return data
  },

  submit: async (input: ContactFormInput): Promise<{ message: string }> => {
    if (env.enableMockApi) {
      await delay(900)
      return { message: 'Gửi thông tin liên hệ thành công' }
    }
    const { data } = await apiClient.post<{ message: string }>('/contact', input)
    return data
  },
}
