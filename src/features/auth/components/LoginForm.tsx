import { type FormEvent, useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { FormError } from '@/shared/components/ui/FormError.tsx'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { useLogin } from '../hooks/useLogin.ts'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login.mutate({ email, password })
  }

  const errorMessage = login.error
    ? getErrorMessage(login.error, 'Đăng nhập thất bại.')
    : null

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-4">
      <Input
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        id="password"
        label="Mật khẩu"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <FormError message={errorMessage} />
      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>
      <p className="text-center text-sm text-[var(--text)]">
        Chưa có tài khoản?{' '}
        <Link to={APP_ROUTES.register} className="text-[var(--accent)]">
          Đăng ký
        </Link>
      </p>
    </form>
  )
}
