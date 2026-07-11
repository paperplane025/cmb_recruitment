import { env } from '@/configs/env.ts'
import { delay } from '@/shared/lib/delay.ts'
import { apiClient } from './client.ts'

export type StaticPage = {
  slug: string
  title: string
  content: string
}

const mockPages: Record<string, StaticPage> = {
  'chinh-sach-bao-mat': {
    slug: 'chinh-sach-bao-mat',
    title: 'Chính sách bảo mật',
    content: '<p>Nội dung chính sách bảo mật sẽ được cập nhật tại đây.</p>',
  },
  'dieu-khoan-dich-vu': {
    slug: 'dieu-khoan-dich-vu',
    title: 'Điều khoản dịch vụ',
    content: '<p>Nội dung điều khoản dịch vụ sẽ được cập nhật tại đây.</p>',
  },
  'so-do-trang-web': {
    slug: 'so-do-trang-web',
    title: 'Sơ đồ trang web',
    content: '<p>Danh sách các trang chính trên website: Trang chủ, Danh sách việc làm, Blog, Liên hệ.</p>',
  },
}

export const staticPageService = {
  getBySlug: async (slug: string): Promise<StaticPage> => {
    if (env.enableMockApi) {
      await delay(200)
      const page = mockPages[slug]
      if (!page) throw new Error('Không tìm thấy trang')
      return page
    }
    const { data } = await apiClient.get<StaticPage>(`/pages/${slug}`)
    return data
  },
}
