import { RegisterForm } from '@/features/auth/index.ts'

export function RegisterPage() {
  return (
    <div
      style={{
        background: '#f5f5f5',
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem',
      }}
    >
      <RegisterForm />
    </div>
  )
}
