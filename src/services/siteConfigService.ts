import { env } from '@/configs/env.ts'
import type { FooterInfo, HeroBanner, SiteStat, Testimonial } from '@/features/landing/types.ts'
import { delay } from '@/shared/lib/delay.ts'
import { apiClient } from './client.ts'

const MOCK_DELAY_MS = 200

const mockStats: SiteStat[] = [
  { label: 'Tổng nhà tuyển dụng', value: 800, suffix: 'K+', iconUrl: null },
  { label: 'Lượt truy cập mỗi ngày', value: 600, suffix: 'K+', iconUrl: null },
  { label: 'Việc làm đăng mỗi ngày', value: 10, suffix: 'K+', iconUrl: null },
  { label: 'Tổng lượt ứng tuyển', value: 700, suffix: 'K+', iconUrl: null },
]

const mockTestimonials: Testimonial[] = [
  {
    name: 'Ông Jacoline Frankly',
    role: 'Kỹ sư UI/UX',
    quote: 'Mặt khác, chúng tôi lên án một cách chính đáng và không ưa những người bị mê hoặc và suy đồi.',
    avatarUrl: null,
  },
  {
    name: 'Ông Robertson Maike',
    role: 'Lập trình viên PHP',
    quote: 'Mặt khác, chúng tôi lên án một cách chính đáng và không ưa những người bị mê hoặc và suy đồi.',
    avatarUrl: null,
  },
]

const mockFooterInfo: FooterInfo = {
  hotline: '+099-035 7398 3465',
  facebookUrl: '#',
  twitterUrl: '#',
  linkedinUrl: '#',
  instagramUrl: '#',
}

const mockHeroBanner: HeroBanner = {
  imageUrl: null,
}

const mockCompanyGallery: string[] = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
]

export const siteConfigService = {
  getStats: async (): Promise<SiteStat[]> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      return mockStats
    }
    const { data } = await apiClient.get<SiteStat[]>('/stats')
    return data
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      return mockTestimonials
    }
    const { data } = await apiClient.get<Testimonial[]>('/testimonials')
    return data
  },

  getCompanyGallery: async (): Promise<string[]> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      return mockCompanyGallery
    }
    const { data } = await apiClient.get<string[]>('/company-gallery')
    return data
  },

  getFooterInfo: async (): Promise<FooterInfo> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      return mockFooterInfo
    }
    const { data } = await apiClient.get<FooterInfo>('/footer-info')
    return data
  },

  getHeroBanner: async (): Promise<HeroBanner> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      return mockHeroBanner
    }
    const { data } = await apiClient.get<HeroBanner>('/hero-banner')
    return data
  },
}
