import { LoginForm } from '@/features/auth/index.ts'

export function LoginPage() {
  return (
    <section className="py-8">
      <h1 className="text-center text-3xl">Đăng nhập</h1>
      <p className="mt-2 text-center text-sm text-[var(--text)]">
        Đăng nhập để truy cập danh sách tuyển dụng nội bộ.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </section>
  )
}
