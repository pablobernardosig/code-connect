type DividerProps = {
  text: string
}

export function Divider({ text }: DividerProps) {
  return (
    <div className="my-2 flex items-center gap-4">
      <span className="h-px flex-1 bg-cinza-medio" aria-hidden="true" />
      <span className="whitespace-nowrap text-sm leading-normal text-offwhite">{text}</span>
      <span className="h-px flex-1 bg-cinza-medio" aria-hidden="true" />
    </div>
  )
}
