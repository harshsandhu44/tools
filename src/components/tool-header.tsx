export function ToolHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </div>
  )
}
