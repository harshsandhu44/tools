'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tools } from '@/lib/tools'
import { Wordmark } from '@/components/wordmark'
import { ThemeToggle } from '@/components/theme-toggle'
import { Input } from '@/components/ui/input'

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  const pathname = usePathname()

  const grouped = useMemo(() => {
    const filtered = search
      ? tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
      : tools
    return filtered.reduce<Record<string, typeof tools>>((acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = []
      acc[tool.category].push(tool)
      return acc
    }, {})
  }, [search])

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-30 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-200',
          'w-72',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:static lg:translate-x-0 lg:shrink-0',
          collapsed ? 'lg:w-12' : 'lg:w-64',
        ].join(' ')}
      >
        {/* Header */}
        <div
          className={[
            'flex items-center h-14 px-3 border-b border-sidebar-border shrink-0',
            collapsed ? 'justify-between lg:justify-center' : 'justify-between',
          ].join(' ')}
        >
          <Wordmark className={collapsed ? 'lg:hidden' : ''} />


          {/* Desktop collapse/expand button */}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>

          {/* Mobile close button */}
          <button
            onClick={onMobileClose}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors ml-auto"
            aria-label="Close sidebar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main content — hidden on desktop when collapsed, always shown on mobile */}
        <div className={['flex-1 flex flex-col min-h-0 overflow-hidden', collapsed ? 'lg:hidden' : ''].join(' ')}>
          {/* Search */}
          <div className="px-3 py-2 shrink-0">
            <Input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tools..."
            />
          </div>

          {/* Tool list */}
          <nav className="flex-1 overflow-y-auto px-2 py-1">
            {Object.entries(grouped).map(([category, categoryTools]) => (
              <div key={category} className="mb-3">
                <p className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {category}
                </p>
                {categoryTools.map(tool => {
                  const isActive = pathname === `/tools/${tool.slug}`
                  return (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      onClick={onMobileClose}
                      className={[
                        'flex items-center px-2 py-1.5 text-sm rounded-md transition-colors',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      ].join(' ')}
                    >
                      {tool.name}
                    </Link>
                  )
                })}
              </div>
            ))}
            {Object.keys(grouped).length === 0 && (
              <p className="px-2 py-4 text-sm text-muted-foreground text-center">
                No tools found
              </p>
            )}
          </nav>

          {/* Theme switcher */}
          <div className="px-3 py-3 border-t border-sidebar-border shrink-0 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  )
}
