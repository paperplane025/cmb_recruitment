export type ContactOffice = {
  name: string
  address: string
  phone: string
  mapSrc: string
}

export type ContactInfo = {
  address: string
  phones: string[]
  emails: string[]
  workingHours: string
  offices: ContactOffice[]
  /** Ảnh minh hoạ trang Liên hệ — cấu hình ở ACF Options "Liên hệ" (field contact_page_image). */
  imageUrl?: string | null
}

export type ContactFormInput = {
  name: string
  address: string
  phone: string
  email: string
  message: string
}
