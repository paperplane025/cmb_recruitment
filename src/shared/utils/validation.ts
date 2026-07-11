const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^(\+84|0)(3|5|7|8|9)\d{8}$/

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

export function isValidPhone(phone: string): boolean {
  return PHONE_PATTERN.test(phone.trim().replace(/[\s.-]/g, ''))
}
