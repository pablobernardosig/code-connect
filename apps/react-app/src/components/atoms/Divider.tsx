type DividerProps = {
  text: string
}

export function Divider({ text }: DividerProps) {
  return (
    <div className="my-8 flex items-center gap-4">
      <span className="h-px flex-1 bg-auth-subtle" aria-hidden="true" />
      <span className="text-2xl text-auth-muted">{text}</span>
      <span className="h-px flex-1 bg-auth-subtle" aria-hidden="true" />
    </div>
  )
}
