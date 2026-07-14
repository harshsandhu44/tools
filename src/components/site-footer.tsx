import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'
import { tools } from '@/lib/tools'

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Wordmark className="text-lg" />
          <p className="mt-2 text-sm text-muted-foreground">
            Fast, focused developer utilities that run entirely in your browser.
            No account, no uploads, no tracking.
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tools
          </span>
          {tools.map(tool => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {tool.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="max-w-6xl mx-auto px-6 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} tools.harshsandhu.com · Runs 100% client-side
        </p>
      </div>
    </footer>
  )
}
