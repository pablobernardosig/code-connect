type AuthHeadingProps = {
  title: string
  subtitle: string
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-3xl font-semibold leading-normal text-offwhite">{title}</h1>
      <p className="text-xl font-normal leading-normal text-offwhite">{subtitle}</p>
    </div>
  )
}
