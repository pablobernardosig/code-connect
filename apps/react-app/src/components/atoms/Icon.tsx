import type { ReactNode } from 'react'

type IconName = 'arrow_forward' | 'assignment' | 'login'

type IconProps = {
  name: IconName
  className?: string
}

const iconPaths: Record<IconName, ReactNode> = {
  arrow_forward: (
    <path d="M16.17 11H4v2h12.17l-5.59 5.59L12 20l8-8-8-8-1.41 1.41z" />
  ),
  assignment: (
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m7 14H5V5h2v3h10V5h2z" />
  ),
  login: (
    <path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z" />
  ),
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`inline-block size-6 shrink-0 ${className ?? ''}`}
      aria-hidden="true"
      data-icon={name}
    >
      {iconPaths[name]}
    </svg>
  )
}
