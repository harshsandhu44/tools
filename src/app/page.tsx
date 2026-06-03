import Link from 'next/link'
import { tools } from '@/lib/tools'

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
          Developer Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Fast, focused utilities. No account needed.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(tool => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block p-4 border border-border rounded-lg hover:border-primary transition-colors group"
            >
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {tool.category}
              </span>
              <h2 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                {tool.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
