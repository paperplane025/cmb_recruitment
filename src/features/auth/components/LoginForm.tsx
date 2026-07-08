import { type FormEvent, useState } from 'react'
import { Link } from 'react-router'
import { FormError } from '@/shared/components/ui/FormError.tsx'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { useLogin } from '../hooks/useLogin.ts'
import styles from './LoginForm.module.scss'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const login = useLogin()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login.mutate({ email, password })
  }

  const errorMessage = login.error
    ? getErrorMessage(login.error, 'Đăng nhập thất bại.')
    : null

  return (
    <div className={styles['p-login']}>
      <div className={styles['p-login__title-wrap']}>
        <h1 className={styles['p-login__title']}>Đăng nhập tại đây!</h1>
      </div>

      <div className={styles['p-login__card']}>
        <form onSubmit={handleSubmit} className={styles['p-login__form']}>
          {/* Email field */}
          <div className={styles['p-login__field']}>
            <label htmlFor="login-email" className={styles['p-login__label']}>
              Email<span>*</span>
            </label>
            <div className={styles['p-login__input-wrapper']}>
              <svg
                className={styles['p-login__icon-left']}
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
              <div className={styles['p-login__divider']} />
              <input
                id="login-email"
                type="email"
                placeholder="info@example.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles['p-login__input']} ${styles['p-login__input--with-icon']}`}
              />
            </div>
          </div>

          {/* Password field */}
          <div className={styles['p-login__field']}>
            <label htmlFor="login-password" className={styles['p-login__label']}>
              Mật khẩu<span>*</span>
            </label>
            <div className={styles['p-login__input-wrapper']}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles['p-login__input']}
              />
              <button
                type="button"
                className={styles['p-login__toggle-password']}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? (
                  // Eye-off icon
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
                  // Eye icon
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

          {/* Remember me & Forgot password */}
          <div className={styles['p-login__options']}>
            <label className={styles['p-login__remember']}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className={styles['p-login__forgot']}>
              Quên mật khẩu?
            </a>
          </div>

          <FormError message={errorMessage} />

          {/* Submit button */}
          <button
            type="submit"
            className={styles['p-login__button']}
            disabled={login.isPending}
          >
            {login.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className={styles['p-login__signup-prompt']}>
          Bạn chưa có tài khoản?{' '}
          <Link to={APP_ROUTES.register}>Đăng ký</Link>
        </p>
      </div>
    </div>
  )
}
