import type { ReactNode } from 'react'

type AuthLayoutProps = {
  bannerSrc: string
  bannerAlt: string
  children: ReactNode
}

export function AuthLayout({ bannerSrc, bannerAlt, children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-auth-bg p-4 sm:p-8">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-4xl bg-auth-card shadow-2xl lg:grid-cols-[1fr_1fr]">
        <img
          src={bannerSrc}
          alt={bannerAlt}
          className="hidden h-full w-full object-cover lg:block"
        />
        <div className="px-7 py-10 sm:px-10 lg:px-12">{children}</div>
      </section>
    </main>
  )
}
