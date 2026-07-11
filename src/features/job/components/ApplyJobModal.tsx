import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { FieldError } from '@/shared/components/ui/FieldError.tsx'
import { FormError } from '@/shared/components/ui/FormError.tsx'
import { applicationService } from '@/services/applicationService.ts'
import { isValidEmail, isValidPhone } from '@/shared/utils/validation.ts'
import styles from './ApplyJobModal.module.scss'

type ApplyJobModalProps = {
  jobId: string
  jobTitle: string
  company: string
  onClose: () => void
}

type FormState = {
  fullName: string
  address: string
  phone: string
  email: string
}

type FieldErrors = Partial<Record<keyof FormState | 'cvFile', string>>

const INITIAL_FORM: FormState = {
  fullName: '',
  address: '',
  phone: '',
  email: '',
}

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_FILE_TYPES = '.pdf,.doc,.docx'

export function ApplyJobModal({ jobId, jobTitle, company, onClose }: ApplyJobModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file && file.size > MAX_FILE_SIZE) {
      setFieldErrors((prev) => ({ ...prev, cvFile: 'Dung lượng CV không được vượt quá 5MB.' }))
      e.target.value = ''
      setCvFile(null)
      return
    }
    setFieldErrors((prev) => ({ ...prev, cvFile: undefined }))
    setCvFile(file)
  }

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {}
    if (!form.fullName) errors.fullName = 'Vui lòng nhập họ tên.'
    if (!form.phone) errors.phone = 'Vui lòng nhập số điện thoại.'
    else if (!isValidPhone(form.phone)) errors.phone = 'Số điện thoại không đúng định dạng.'
    if (!form.email) errors.email = 'Vui lòng nhập email.'
    else if (!isValidEmail(form.email)) errors.email = 'Email không đúng định dạng.'
    if (!cvFile) errors.cvFile = 'Vui lòng tải lên CV của bạn.'
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
      await applicationService.submit({ jobId, cvFile: cvFile as File, ...form })
      setIsSubmitted(true)
    } catch {
      setError('Gửi hồ sơ thất bại. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles['c-apply-modal']} onClick={onClose}>
      <div
        className={styles['c-apply-modal__content']}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
      >
        <button className={styles['c-apply-modal__close']} onClick={onClose} aria-label="Đóng">
          &times;
        </button>

        {isSubmitted ? (
          <div className={styles['c-apply-modal__success']}>
            <div className={styles['c-apply-modal__success-icon']}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className={styles['c-apply-modal__success-title']}>Ứng tuyển thành công!</h3>
            <p className={styles['c-apply-modal__success-text']}>
              Cảm ơn bạn đã quan tâm vị trí <strong>{jobTitle}</strong> tại <strong>{company}</strong>.
              Bộ phận tuyển dụng sẽ liên hệ với bạn trong vòng 24h làm việc.
            </p>
            <button className={styles['c-apply-modal__button']} onClick={onClose}>
              Đóng
            </button>
          </div>
        ) : (
          <>
            <div className={styles['c-apply-modal__header']}>
              <h3 id="apply-modal-title" className={styles['c-apply-modal__title']}>
                Ứng tuyển vị trí
              </h3>
              <p className={styles['c-apply-modal__subtitle']}>
                <strong>{jobTitle}</strong> tại <strong>{company}</strong> — vui lòng điền thông tin bên dưới,
                chúng tôi sẽ phản hồi hồ sơ của bạn sớm nhất.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className={styles['c-apply-modal__form']}>
              <div className={styles['c-apply-modal__field']}>
                <label htmlFor="apply-fullname" className={styles['c-apply-modal__label']}>
                  Họ tên<span>*</span>
                </label>
                <input
                  id="apply-fullname"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  spellCheck={false}
                  value={form.fullName}
                  onChange={handleChange('fullName')}
                  className={styles['c-apply-modal__input']}
                />
                <FieldError message={fieldErrors.fullName} />
              </div>

              <div className={styles['c-apply-modal__field']}>
                <label htmlFor="apply-address" className={styles['c-apply-modal__label']}>
                  Địa chỉ
                </label>
                <input
                  id="apply-address"
                  type="text"
                  placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố"
                  spellCheck={false}
                  value={form.address}
                  onChange={handleChange('address')}
                  className={styles['c-apply-modal__input']}
                />
              </div>

              <div className={styles['c-apply-modal__row']}>
                <div className={styles['c-apply-modal__field']}>
                  <label htmlFor="apply-phone" className={styles['c-apply-modal__label']}>
                    Số điện thoại<span>*</span>
                  </label>
                  <input
                    id="apply-phone"
                    type="tel"
                    placeholder="09xxxxxxxx"
                    spellCheck={false}
                    value={form.phone}
                    onChange={handleChange('phone')}
                    className={styles['c-apply-modal__input']}
                  />
                  <FieldError message={fieldErrors.phone} />
                </div>

                <div className={styles['c-apply-modal__field']}>
                  <label htmlFor="apply-email" className={styles['c-apply-modal__label']}>
                    Email<span>*</span>
                  </label>
                  <input
                    id="apply-email"
                    type="email"
                    placeholder="info@example.com"
                    spellCheck={false}
                    value={form.email}
                    onChange={handleChange('email')}
                    className={styles['c-apply-modal__input']}
                  />
                  <FieldError message={fieldErrors.email} />
                </div>
              </div>

              <div className={styles['c-apply-modal__field']}>
                <label htmlFor="apply-cv" className={styles['c-apply-modal__label']}>
                  CV của bạn<span>*</span>
                </label>
                <label htmlFor="apply-cv" className={styles['c-apply-modal__upload']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span>{cvFile ? cvFile.name : 'Chọn tệp CV (PDF, DOC, DOCX — tối đa 5MB)'}</span>
                  <input
                    id="apply-cv"
                    type="file"
                    accept={ACCEPTED_FILE_TYPES}
                    onChange={handleFileChange}
                    className={styles['c-apply-modal__upload-input']}
                  />
                </label>
                <FieldError message={fieldErrors.cvFile} />
              </div>

              <FormError message={error} />

              <p className={styles['c-apply-modal__note']}>
                Bằng việc nhấn "Gửi hồ sơ ứng tuyển", bạn đồng ý cho phép chúng tôi lưu trữ và
                sử dụng thông tin trên để xử lý hồ sơ ứng tuyển của bạn.
              </p>

              <button type="submit" className={styles['c-apply-modal__button']} disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : 'Gửi hồ sơ ứng tuyển'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
