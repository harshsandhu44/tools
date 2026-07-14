'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

// false during SSR + first client render (matches server), true after hydration
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className={cn(
        'inline-flex items-center justify-center w-9 h-9 rounded-md border border-border text-foreground hover:bg-muted transition-colors',
        className,
      )}
    >
      {/* Render icon only after mount — resolvedTheme is unknown during SSR */}
      {mounted && (isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />)}
    </button>
  )
}
