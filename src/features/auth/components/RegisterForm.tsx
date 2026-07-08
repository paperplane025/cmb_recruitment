import { type FormEvent, useState } from 'react'
import { Link } from 'react-router'
import { FormError } from '@/shared/components/ui/FormError.tsx'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { useRegister } from '../hooks/useRegister.ts'
import styles from './RegisterForm.module.scss'

export function RegisterForm() {
  const [activeTab, setActiveTab] = useState<'candidate' | 'company'>('candidate')
  
  // Fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  
  // Company specific fields
  const [companyName, setCompanyName] = useState('')
  const [companyType, setCompanyType] = useState('Digital Agency')
  
  // Passwords
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Agreement
  const [agreeTerms, setAgreeTerms] = useState(false)
  
  // Validation State
  const [validationError, setValidationError] = useState<string | null>(null)

  const register = useRegister()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidationError(null)

    if (password !== confirmPassword) {
      setValidationError('Mật khẩu xác nhận không khớp.')
      return
    }

    if (!agreeTerms) {
      setValidationError('Bạn phải đồng ý với các điều khoản và điều kiện.')
      return
    }

    // Prepare register data
    // Concatenate first and last name to map to the API-expected fullName
    const fullName = `${firstName} ${lastName}`.trim()
    register.mutate({ fullName, email, password })
  }

  const errorMessage = validationError || (register.error
    ? getErrorMessage(register.error, 'Đăng ký thất bại.')
    : null)

  return (
    <div className={styles['p-register']}>
      <div className={styles['p-register__title-wrap']}>
        <h1 className={styles['p-register__title']}>Đăng ký tài khoản</h1>
      </div>

      {/* Tabs */}
      <div className={styles['p-register__tabs']}>
        <button
          type="button"
          className={`${styles['p-register__tab-btn']} ${
            activeTab === 'candidate' ? styles['p-register__tab-btn--active'] : ''
          }`}
          onClick={() => {
            setActiveTab('candidate')
            setValidationError(null)
          }}
        >
          Ứng viên
        </button>
        <button
          type="button"
          className={`${styles['p-register__tab-btn']} ${
            activeTab === 'company' ? styles['p-register__tab-btn--active'] : ''
          }`}
          onClick={() => {
            setActiveTab('company')
            setValidationError(null)
          }}
        >
          Nhà tuyển dụng
        </button>
      </div>

      <div className={styles['p-register__card']}>
        <form onSubmit={handleSubmit} className={styles['p-register__form']}>
          <div className={styles['p-register__grid']}>
            
            {/* First Name */}
            <div className={styles['p-register__field']}>
              <label htmlFor="reg-first-name" className={styles['p-register__label']}>
                Tên<span>*</span>
              </label>
              <div className={styles['p-register__input-wrapper']}>
                <svg
                  className={styles['p-register__icon-left']}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div className={styles['p-register__divider']} />
                <input
                  id="reg-first-name"
                  type="text"
                  placeholder="Mr. Robert"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`${styles['p-register__input']} ${styles['p-register__input--with-icon']}`}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className={styles['p-register__field']}>
              <label htmlFor="reg-last-name" className={styles['p-register__label']}>
                Họ<span>*</span>
              </label>
              <div className={styles['p-register__input-wrapper']}>
                <svg
                  className={styles['p-register__icon-left']}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div className={styles['p-register__divider']} />
                <input
                  id="reg-last-name"
                  type="text"
                  placeholder="Jonson"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`${styles['p-register__input']} ${styles['p-register__input--with-icon']}`}
                />
              </div>
            </div>

            {/* User Name */}
            <div className={styles['p-register__field']}>
              <label htmlFor="reg-username" className={styles['p-register__label']}>
                Tên đăng nhập<span>*</span>
              </label>
              <div className={styles['p-register__input-wrapper']}>
                <svg
                  className={styles['p-register__icon-left']}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div className={styles['p-register__divider']} />
                <input
                  id="reg-username"
                  type="text"
                  placeholder="robertjonson"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`${styles['p-register__input']} ${styles['p-register__input--with-icon']}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className={styles['p-register__field']}>
              <label htmlFor="reg-email" className={styles['p-register__label']}>
                Email<span>*</span>
              </label>
              <div className={styles['p-register__input-wrapper']}>
                <svg
                  className={styles['p-register__icon-left']}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div className={styles['p-register__divider']} />
                <input
                  id="reg-email"
                  type="email"
                  placeholder="info@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${styles['p-register__input']} ${styles['p-register__input--with-icon']}`}
                />
              </div>
            </div>

            {/* Conditionally rendered Company Name and Type */}
            {activeTab === 'company' && (
              <>
                {/* Company Name */}
                <div className={styles['p-register__field']}>
                  <label htmlFor="reg-company-name" className={styles['p-register__label']}>
                    Tên công ty<span>*</span>
                  </label>
                  <div className={styles['p-register__input-wrapper']}>
                    <svg
                      className={styles['p-register__icon-left']}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <div className={styles['p-register__divider']} />
                    <input
                      id="reg-company-name"
                      type="text"
                      placeholder="Mr. Robert"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={`${styles['p-register__input']} ${styles['p-register__input--with-icon']}`}
                    />
                  </div>
                </div>

                {/* Company Type */}
                <div className={styles['p-register__field']}>
                  <label htmlFor="reg-company-type" className={styles['p-register__label']}>
                    Loại hình công ty<span>*</span>
                  </label>
                  <div className={styles['p-register__select-wrapper']}>
                    <svg
                      className={styles['p-register__icon-left']}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <div className={styles['p-register__divider']} />
                    <select
                      id="reg-company-type"
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className={styles['p-register__select']}
                    >
                      <option value="Digital Agency">Công ty truyền thông số</option>
                      <option value="Product Company">Công ty sản phẩm</option>
                      <option value="Outsourcing">Gia công phần mềm</option>
                      <option value="Consulting">Tư vấn</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div className={styles['p-register__field']}>
              <label htmlFor="reg-password" className={styles['p-register__label']}>
                Mật khẩu<span>*</span>
              </label>
              <div className={styles['p-register__input-wrapper']}>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles['p-register__input']}
                />
                <button
                  type="button"
                  className={styles['p-register__toggle-password']}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className={styles['p-register__field']}>
              <label htmlFor="reg-confirm-password" className={styles['p-register__label']}>
                Xác nhận mật khẩu<span>*</span>
              </label>
              <div className={styles['p-register__input-wrapper']}>
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Xác nhận mật khẩu"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles['p-register__input']}
                />
                <button
                  type="button"
                  className={styles['p-register__toggle-password']}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showConfirmPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Agreement Checkbox */}
          <div className={styles['p-register__options']}>
            <label className={styles['p-register__terms']}>
              <input
                type="checkbox"
                checked={agreeTerms}
                required
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span>Tôi đồng ý với các điều khoản và điều kiện của công ty.</span>
            </label>
          </div>

          <FormError message={errorMessage} />

          {/* Submit Button */}
          <button
            type="submit"
            className={styles['p-register__button']}
            disabled={register.isPending}
          >
            {register.isPending ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <p className={styles['p-register__login-prompt']}>
          Bạn đã có tài khoản?{' '}
          <Link to={APP_ROUTES.login}>Đăng nhập</Link> tại đây
        </p>

        {/* Social Register */}
        <div className={styles['p-register__socials']}>
          <button type="button" className={styles['p-register__social-btn']}>
            {/* Google Icon */}
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.114 2.78-2.42 4.3l3.75 2.9c2.2-2.03 3.73-5.03 3.73-8.05z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.97-1.08 7.96-2.9l-3.75-2.9c-1.04.7-2.38 1.12-4.21 1.12-3.24 0-5.97-2.18-6.95-5.13L1.22 17.1C3.24 21.14 7.37 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.05 14.29a7.17 7.17 0 0 1 0-4.58l-3.83-2.9a11.96 11.96 0 0 0 0 10.38l3.83-2.9z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.6 4.6 1.8l3.43-3.43C17.95 1.19 15.22 0 12 0 7.37 0 3.24 2.86 1.22 6.9l3.83 2.9c.98-2.95 3.71-5.05 6.95-5.05z"
              />
            </svg>
            <span>Đăng nhập bằng Google</span>
          </button>
          
          <button type="button" className={styles['p-register__social-btn']}>
            {/* Facebook Icon */}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Đăng nhập bằng Facebook</span>
          </button>
        </div>
      </div>
    </div>
  )
}
