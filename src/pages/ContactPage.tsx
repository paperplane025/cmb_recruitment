import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Link } from 'react-router'
import { useContactInfo } from '@/features/contact/index.ts'
import { useJobLocations } from '@/features/job/index.ts'
import { contactService } from '@/services/contactService.ts'
import { FieldError } from '@/shared/components/ui/FieldError.tsx'
import { FormError } from '@/shared/components/ui/FormError.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { getCityImage } from '@/shared/utils/cityImage.ts'
import { isValidEmail, isValidPhone } from '@/shared/utils/validation.ts'
import styles from './ContactPage.module.scss'
import bannerImage from '@/assets/images/banner.jpg'

type FormState = {
  name: string
  address: string
  phone: string
  email: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>

const INITIAL_FORM: FormState = {
  name: '',
  address: '',
  phone: '',
  email: '',
  message: '',
}

export function ContactPage() {
  const { data: info, isLoading } = useContactInfo()
  const { data: locations } = useJobLocations()
  const firstLocation = locations?.[0]
  const formImage =
    info?.imageUrl ??
    firstLocation?.imageUrl ??
    (firstLocation?.label ? getCityImage(firstLocation.label) : bannerImage)

  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeOfficeIdx, setActiveOfficeIdx] = useState(0)

  const handleChange =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {}
    if (!form.name) errors.name = 'Vui lòng nhập họ tên.'
    if (!form.phone) errors.phone = 'Vui lòng nhập số điện thoại.'
    else if (!isValidPhone(form.phone)) errors.phone = 'Số điện thoại không đúng định dạng.'
    if (!form.email) errors.email = 'Vui lòng nhập email.'
    else if (!isValidEmail(form.email)) errors.email = 'Email không đúng định dạng.'
    if (!form.message) errors.message = 'Vui lòng nhập nội dung.'
    return errors
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setError(null)
    setIsSubmitting(true)
    try {
      await contactService.submit({
        name: form.name,
        address: form.address,
        phone: form.phone,
        email: form.email,
        message: form.message,
      })
      setIsSubmitted(true)
      setForm(INITIAL_FORM)
    } catch {
      setError('Gửi thông tin liên hệ thất bại. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const activeOffice = info?.offices[activeOfficeIdx]

  return (
    <section>
      {/* ─── Breadcrumb Banner ─── */}
      <header className={styles['p-contact-banner']}>
        <div className={styles['p-contact-banner__ripple']} aria-hidden="true" />
        <div className={styles['p-contact-banner__content']}>
          <h1 className={styles['p-contact-banner__title']}>Liên hệ</h1>
          <nav className={styles['p-contact-banner__breadcrumbs']} aria-label="Breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className={styles['p-contact-banner__breadcrumbs-separator']} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </span>
            <span className={styles['p-contact-banner__breadcrumbs-current']}>Liên hệ</span>
          </nav>
        </div>
      </header>

      <div className="l-container">
        {isLoading ? (
          <LoadingState />
        ) : info ? (
          <>
            {/* ─── Info Bar ─── */}
            <div className={styles['p-contact-infobar']}>
              <div className={styles['p-contact-infobar__item']}>
                <span className={styles['p-contact-infobar__icon']} aria-hidden="true">
                  <svg viewBox="0 0 28 28" fill="none"><path d="M14 3C9.58 3 6 6.58 6 11C6 16.5 14 25 14 25C14 25 22 16.5 22 11C22 6.58 18.42 3 14 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="14" cy="11" r="3" stroke="currentColor" strokeWidth="1.6"/></svg>
                </span>
                <div className={styles['p-contact-infobar__text']}>
                  <span className={styles['p-contact-infobar__label']}>Địa chỉ</span>
                  <span className={styles['p-contact-infobar__value']}>
                    {info.address.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </span>
                </div>
              </div>

              <div className={styles['p-contact-infobar__item']}>
                <span className={styles['p-contact-infobar__icon']} aria-hidden="true">
                  <svg viewBox="0 0 28 28" fill="none"><path d="M4.5 5H9L11 9.5L8.5 11.5C9.33 13.17 10.83 14.67 12.5 15.5L14.5 13L18.5 15V19.5C18.5 19.78 18.28 20 18 20C9.72 20 3 13.28 3 5C3 4.72 3.22 4.5 3.5 4.5L4.5 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/></svg>
                </span>
                <div className={styles['p-contact-infobar__text']}>
                  <span className={styles['p-contact-infobar__label']}>Điện thoại</span>
                  <span className={styles['p-contact-infobar__value']}>
                    {info.phones.map((phone) => (
                      <a key={phone} href={`tel:+${phone.replace(/[^0-9]/g, '')}`}>{phone}</a>
                    ))}
                  </span>
                </div>
              </div>

              <div className={styles['p-contact-infobar__item']}>
                <span className={styles['p-contact-infobar__icon']} aria-hidden="true">
                  <svg viewBox="0 0 28 28" fill="none"><rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M3 10L14 17L25 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div className={styles['p-contact-infobar__text']}>
                  <span className={styles['p-contact-infobar__label']}>Email</span>
                  <span className={styles['p-contact-infobar__value']}>
                    {info.emails.map((email) => (
                      <a key={email} href={`mailto:${email}`}>{email}</a>
                    ))}
                  </span>
                </div>
              </div>

              <div className={styles['p-contact-infobar__item']}>
                <span className={styles['p-contact-infobar__icon']} aria-hidden="true">
                  <svg viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="1.6"/><path d="M14 8V14L17.5 17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div className={styles['p-contact-infobar__text']}>
                  <span className={styles['p-contact-infobar__label']}>Giờ làm việc</span>
                  <span className={styles['p-contact-infobar__value']}>
                    {info.workingHours.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </span>
                </div>
              </div>
            </div>

            {/* ─── Contact Form ─── */}
            <div className={styles['p-contact-form']}>
              <div className={styles['p-contact-form__image']}>
                <img src={formImage} alt="Liên hệ CMB" loading="lazy" />
              </div>

              <div className={styles['p-contact-form__wrap']}>
                <h2 className={styles['p-contact-form__title']}>Gửi thông tin liên hệ</h2>

                {isSubmitted ? (
                  <div className={styles['p-contact-form__success']}>
                    <div className={styles['p-contact-form__success-icon']}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <p>Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
                    <button className={styles['p-contact-form__button']} onClick={() => setIsSubmitted(false)}>
                      Gửi liên hệ khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className={styles['p-contact-form__fields']}>
                    <div className={styles['p-contact-form__field']}>
                      <label htmlFor="contact-name" className={styles['p-contact-form__label']}>
                        Họ tên<span>*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        spellCheck={false}
                        value={form.name}
                        onChange={handleChange('name')}
                        className={styles['p-contact-form__input']}
                      />
                      <FieldError message={fieldErrors.name} />
                    </div>

                    <div className={styles['p-contact-form__field']}>
                      <label htmlFor="contact-address" className={styles['p-contact-form__label']}>
                        Địa chỉ
                      </label>
                      <input
                        id="contact-address"
                        type="text"
                        placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố"
                        spellCheck={false}
                        value={form.address}
                        onChange={handleChange('address')}
                        className={styles['p-contact-form__input']}
                      />
                    </div>

                    <div className={styles['p-contact-form__row']}>
                      <div className={styles['p-contact-form__field']}>
                        <label htmlFor="contact-phone" className={styles['p-contact-form__label']}>
                          Số điện thoại<span>*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="09xxxxxxxx"
                          spellCheck={false}
                          value={form.phone}
                          onChange={handleChange('phone')}
                          className={styles['p-contact-form__input']}
                        />
                        <FieldError message={fieldErrors.phone} />
                      </div>

                      <div className={styles['p-contact-form__field']}>
                        <label htmlFor="contact-email" className={styles['p-contact-form__label']}>
                          Email<span>*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="info@example.com"
                          spellCheck={false}
                          value={form.email}
                          onChange={handleChange('email')}
                          className={styles['p-contact-form__input']}
                        />
                        <FieldError message={fieldErrors.email} />
                      </div>
                    </div>

                    <div className={styles['p-contact-form__field']}>
                      <label htmlFor="contact-message" className={styles['p-contact-form__label']}>
                        Nội dung<span>*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        placeholder="Nội dung bạn muốn trao đổi với chúng tôi..."
                        rows={5}
                        value={form.message}
                        onChange={handleChange('message')}
                        className={styles['p-contact-form__textarea']}
                      />
                      <FieldError message={fieldErrors.message} />
                    </div>

                    <FormError message={error} />

                    <button type="submit" className={styles['p-contact-form__button']} disabled={isSubmitting}>
                      {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ─── Offices + Map ─── */}
            <section className={styles['p-contact-offices']} aria-label="Văn phòng và chi nhánh CMB">
              <div className={styles['p-contact-offices__sidebar']}>
                <h3 className={styles['p-contact-offices__title']}>Văn phòng / Chi nhánh</h3>
                <ul className={styles['p-contact-offices__list']}>
                  {info.offices.map((office, idx) => (
                    <li key={office.name}>
                      <button
                        type="button"
                        className={`${styles['p-contact-offices__item']} ${idx === activeOfficeIdx ? styles['p-contact-offices__item--active'] : ''}`}
                        onClick={() => setActiveOfficeIdx(idx)}
                      >
                        <span className={styles['p-contact-offices__item-name']}>
                          <svg viewBox="0 0 14 18" width="14" height="18" fill="none" aria-hidden="true">
                            <path d="M7 1C4.24 1 2 3.24 2 6C2 9.75 7 17 7 17C7 17 12 9.75 12 6C12 3.24 9.76 1 7 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <circle cx="7" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                          {office.name}
                        </span>
                        {office.address && <p className={styles['p-contact-offices__item-address']}>{office.address}</p>}
                        {office.phone && (
                          <p className={styles['p-contact-offices__item-phone']}>
                            <a href={`tel:+${office.phone.replace(/[^0-9]/g, '')}`} onClick={(e) => e.stopPropagation()}>
                              {office.phone}
                            </a>
                          </p>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles['p-contact-offices__map']}>
                {activeOffice?.mapSrc && (
                  <iframe
                    title="Bản đồ vị trí văn phòng CMB"
                    src={activeOffice.mapSrc}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>
            </section>
          </>
        ) : null}
      </div>
    </section>
  )
}
