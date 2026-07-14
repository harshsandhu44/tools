import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'
import { ThemeToggle } from '@/components/theme-toggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        <Wordmark className="text-xl" />
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#tools" className="hidden sm:inline hover:text-foreground transition-colors">
            Tools
          </Link>
          <Link href="#faq" className="hidden sm:inline hover:text-foreground transition-colors">
            FAQ
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
