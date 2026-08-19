import { TextLink } from '../atoms/TextLink.tsx'

type AuthFooterCtaProps = {
  prompt: string
  ctaLabel: string
  ctaTo: string
}

export function AuthFooterCta({ prompt, ctaLabel, ctaTo }: AuthFooterCtaProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <p className="text-4xl text-auth-muted">{prompt}</p>
      <TextLink to={ctaTo} variant="accent" className="text-5xl">
        {ctaLabel}
      </TextLink>
    </div>
  )
}
