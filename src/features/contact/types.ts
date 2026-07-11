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
}

export type ContactFormInput = {
  name: string
  address: string
  phone: string
  email: string
  message: string
}
