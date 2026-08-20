import { Icon } from '../atoms/Icon.tsx'
import { TextLink } from '../atoms/TextLink.tsx'

type AuthFooterCtaProps = {
  prompt: string
  ctaLabel: string
  ctaTo: string
  layout?: 'stack' | 'inline'
  icon?: 'assignment' | 'login'
}

export function AuthFooterCta({
  prompt,
  ctaLabel,
  ctaTo,
  layout = 'stack',
  icon,
}: AuthFooterCtaProps) {
  const isInline = layout === 'inline'

  return (
    <div
      className={
        isInline
          ? 'mt-6 flex items-center gap-2'
          : 'mt-6 flex flex-col items-center gap-2 text-center'
      }
    >
      <p className={isInline ? 'text-lg leading-normal text-offwhite' : 'text-sm leading-normal text-offwhite'}>
        {prompt}
      </p>
      <TextLink
        to={ctaTo}
        variant="accent"
        className="inline-flex items-center gap-3 whitespace-nowrap"
      >
        {ctaLabel}
        {icon ? <Icon name={icon} className="text-2xl" /> : null}
      </TextLink>
    </div>
  )
}
