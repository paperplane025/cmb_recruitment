import { type FormEvent, useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { FormError } from '@/shared/components/ui/FormError.tsx'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { useRegister } from '../hooks/useRegister.ts'

export function RegisterForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const register = useRegister()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    register.mutate({ fullName, email, password })
  }

  const errorMessage = register.error
    ? getErrorMessage(register.error, 'Đăng ký thất bại.')
    : null

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-4">
      <Input
        id="fullName"
        label="Họ và tên"
        autoComplete="name"
        required
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />
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
        autoComplete="new-password"
        required
        minLength={6}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <FormError message={errorMessage} />
      <Button type="submit" className="w-full" disabled={register.isPending}>
        {register.isPending ? 'Đang đăng ký...' : 'Đăng ký'}
      </Button>
      <p className="text-center text-sm text-[var(--text)]">
        Đã có tài khoản?{' '}
        <Link to={APP_ROUTES.login} className="text-[var(--accent)]">
          Đăng nhập
        </Link>
      </p>
    </form>
  )
}
