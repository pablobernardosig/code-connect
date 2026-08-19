import { SocialButton } from './SocialButton.tsx'

const providers = [
  { label: 'Github', iconSrc: '/github.png', iconAlt: 'Logo do Github' },
  { label: 'Gmail', iconSrc: '/gmail.png', iconAlt: 'Logo do Gmail' },
] as const

export function SocialProviders() {
  return (
    <div className="flex items-center justify-center gap-8">
      {providers.map((provider) => (
        <SocialButton key={provider.label} {...provider} />
      ))}
    </div>
  )
}
