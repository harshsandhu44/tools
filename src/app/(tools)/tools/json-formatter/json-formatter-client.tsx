'use client'

import { useState, useCallback } from 'react'
import { JsonEditor } from '@/components/json-editor'

export function JsonFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [indent, setIndent] = useState<2 | 4>(2)
  const [copied, setCopied] = useState(false)

  const format = useCallback(() => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }, [input, indent])

  const minify = useCallback(() => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }, [input])

  const copy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const clear = useCallback(() => {
    setInput('')
    setOutput('')
    setError(null)
  }, [])

  const download = useCallback(() => {
    if (!output) return
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [output])

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight">JSON Formatter & Validator</h1>
        <p className="text-muted-foreground text-sm mt-1">Format, validate, and minify JSON</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="indent-select" className="text-sm text-muted-foreground">
            Indent
          </label>
          <select
            id="indent-select"
            value={indent}
            onChange={e => setIndent(Number(e.target.value) as 2 | 4)}
            className="text-sm border border-border rounded-md px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <button
            onClick={format}
            className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Format
          </button>
          <button
            onClick={minify}
            className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Minify
          </button>
          <button
            onClick={copy}
            disabled={!output}
            className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={download}
            disabled={!output}
            className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Download
          </button>
          <button
            onClick={clear}
            className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editors */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Input
          </div>
          <JsonEditor
            value={input}
            onChange={setInput}
            hasError={!!error}
            placeholder="Paste your JSON here..."
          />
          {error && (
            <p className="mt-1.5 text-sm text-red-500 font-mono break-words">{error}</p>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Output
          </div>
          <JsonEditor
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>
    </div>
  )
}
