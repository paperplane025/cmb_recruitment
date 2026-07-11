export type BlogGalleryItem = {
  id: string
  url: string
  alt: string
  isVideo: boolean
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  eventGallery: BlogGalleryItem[]
  postedAt: string
  author: string
}

export type BlogFilters = {
  search?: string
}

export type PaginatedBlogPosts = {
  items: BlogPost[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
