type SocialButtonProps = {
  label: string
  iconSrc: string
  iconAlt: string
}

export function SocialButton({ label, iconSrc, iconAlt }: SocialButtonProps) {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center gap-1 text-xs leading-normal text-offwhite"
    >
      <span className="flex size-8 items-center justify-center overflow-clip">
        <img src={iconSrc} alt={iconAlt} className="size-full object-contain" />
      </span>
      <span>{label}</span>
    </button>
  )
}
