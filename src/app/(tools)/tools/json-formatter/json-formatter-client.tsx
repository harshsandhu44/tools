'use client'

import { useState, useCallback } from 'react'
import { json } from '@codemirror/lang-json'
import { CodeEditor } from '@/components/code-editor'
import { ToolHeader } from '@/components/tool-header'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

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
      <ToolHeader
        title="JSON Formatter & Validator"
        description="Format, validate, and minify JSON"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="indent-select" className="text-sm text-muted-foreground">
            Indent
          </label>
          <Select
            id="indent-select"
            value={indent}
            onChange={e => setIndent(Number(e.target.value) as 2 | 4)}
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </Select>
        </div>

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <Button size="sm" onClick={format}>
            Format
          </Button>
          <Button variant="secondary" size="sm" onClick={minify}>
            Minify
          </Button>
          <Button variant="secondary" size="sm" onClick={copy} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button variant="secondary" size="sm" onClick={download} disabled={!output}>
            Download
          </Button>
          <Button variant="secondary" size="sm" onClick={clear}>
            Clear
          </Button>
        </div>
      </div>

      {/* Editors */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Input
          </div>
          <CodeEditor
            value={input}
            onChange={setInput}
            hasError={!!error}
            extensions={[json()]}
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
          <CodeEditor
            value={output}
            readOnly
            extensions={[json()]}
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>
    </div>
  )
}
