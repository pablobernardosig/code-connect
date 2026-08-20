import type { ReactNode } from 'react'

type AuthLayoutProps = {
  bannerSrc: string
  bannerAlt: string
  children: ReactNode
}

export function AuthLayout({ bannerSrc, bannerAlt, children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-grafite p-4 sm:p-8">
      <section className="flex w-full max-w-5xl items-start justify-between overflow-hidden rounded-4xl bg-cinza-escuro px-6 py-10 lg:px-20 lg:py-14">
        <img
          src={bannerSrc}
          alt={bannerAlt}
          width={384}
          height={600}
          fetchPriority="high"
          decoding="async"
          className="hidden h-full w-96 object-cover lg:block"
        />
        <div className="w-full lg:w-96 lg:px-8">{children}</div>
      </section>
    </main>
  )
}
