import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'font-display font-extrabold tracking-tight text-foreground hover:opacity-80 transition-opacity',
        className,
      )}
    >
      Tools<span className="text-primary">.</span>
    </Link>
  )
}
