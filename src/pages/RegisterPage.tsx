import { RegisterForm } from '@/features/auth/index.ts'

export function RegisterPage() {
  return (
    <section className="py-8">
      <h1 className="text-center text-3xl">Đăng ký</h1>
      <p className="mt-2 text-center text-sm text-[var(--text)]">
        Tạo tài khoản để tham gia tuyển dụng nội bộ.
      </p>
      <div className="mt-8">
        <RegisterForm />
      </div>
    </section>
  )
}
