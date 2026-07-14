import Link from 'next/link'
import { ShieldCheck, UserX, Zap, Gift, ArrowRight } from 'lucide-react'
import { tools, comingSoon } from '@/lib/tools'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const valueProps = [
  {
    icon: ShieldCheck,
    title: '100% client-side',
    body: 'Everything runs in your browser. Your data never touches a server.',
  },
  {
    icon: UserX,
    title: 'No account, no ads',
    body: 'No sign-up, no cookies, no tracking. Open a tool and go.',
  },
  {
    icon: Zap,
    title: 'Instant',
    body: 'Nothing to install. Fast, focused tools that load in a blink.',
  },
  {
    icon: Gift,
    title: 'Free & open',
    body: 'Every tool here is free to use, forever.',
  },
]

const faqs = [
  {
    q: 'Is my data safe?',
    a: 'Yes. Every tool runs entirely in your browser using client-side JavaScript. Nothing you paste is ever uploaded or logged.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. There is no sign-up, no login, and no email required. Just open a tool and use it.',
  },
  {
    q: 'Is it free?',
    a: 'Completely. There are no ads, no paywalls, and no premium tier.',
  },
]

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="font-mono text-sm text-primary mb-6">{'// client-side only'}</p>
          <h1 className="font-display font-extrabold tracking-tight text-foreground text-5xl sm:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
            Developer tools that{' '}
            <span className="bg-primary text-primary-foreground px-3 box-decoration-clone">
              respect your data
            </span>
            .
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Fast, focused utilities that run entirely in your browser. No account.
            No uploads. No tracking.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Browse tools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#faq"
              className="inline-flex items-center h-12 px-6 rounded-md border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              How it works
            </Link>
          </div>
        </section>

        {/* Value props */}
        <section className="border-y border-border bg-card">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map(v => (
              <div key={v.title}>
                <v.icon className="w-6 h-6 text-primary" />
                <h3 className="font-display font-bold text-foreground mt-4">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tool grid */}
        <section id="tools" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            The tools
          </h2>
          <p className="text-muted-foreground mt-2">
            {tools.length} utilities and counting.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map(tool => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group">
                <Card className="h-full p-6 transition-colors hover:border-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline">{tool.category}</Badge>
                  </div>
                  <h3 className="font-display font-bold text-foreground mt-5 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Coming soon */}
        <section className="border-t border-border bg-card">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Coming soon
            </h2>
            <p className="text-muted-foreground mt-2">More utilities on the way.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {comingSoon.map(item => (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-md border border-dashed border-border px-3 py-1.5 text-sm text-muted-foreground"
                >
                  <span className="font-mono text-xs text-primary">{item.category}</span>
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How it works
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {faqs.map(f => (
              <div key={f.q}>
                <h3 className="font-display font-bold text-foreground">{f.q}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
