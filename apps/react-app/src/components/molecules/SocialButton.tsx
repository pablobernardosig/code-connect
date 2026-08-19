type SocialButtonProps = {
  label: string
  iconSrc: string
  iconAlt: string
}

export function SocialButton({ label, iconSrc, iconAlt }: SocialButtonProps) {
  return (
    <button type="button" className="flex flex-col items-center gap-2 text-2xl text-auth-muted">
      <img src={iconSrc} alt={iconAlt} className="size-12" />
      <span>{label}</span>
    </button>
  )
}
