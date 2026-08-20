import { SocialButton } from './SocialButton.tsx'

const providers = [
  { label: 'Github', iconSrc: '/github.svg', iconAlt: 'Logo do Github' },
  { label: 'Gmail', iconSrc: '/gmail.svg', iconAlt: 'Logo do Gmail' },
] as const

export function SocialProviders() {
  return (
    <div className="flex items-center justify-center gap-6">
      {providers.map((provider) => (
        <SocialButton key={provider.label} {...provider} />
      ))}
    </div>
  )
}
