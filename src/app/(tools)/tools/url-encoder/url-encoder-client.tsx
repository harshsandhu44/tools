'use client'

import { useState, useCallback, useMemo } from 'react'
import { CodeEditor } from '@/components/code-editor'

type Mode = 'encode' | 'decode'
type Standard = 'component' | 'full'

function transformUrl(value: string, mode: Mode, standard: Standard): string {
  if (mode === 'encode') {
    return standard === 'component' ? encodeURIComponent(value) : encodeURI(value)
  } else {
    return standard === 'component' ? decodeURIComponent(value) : decodeURI(value)
  }
}

export function UrlEncoderClient() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<Mode>('encode')
  const [standard, setStandard] = useState<Standard>('component')
  const [copied, setCopied] = useState(false)

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: null }
    try {
      return { output: transformUrl(input, mode, standard), error: null }
    } catch (e) {
      return { output: '', error: (e as Error).message }
    }
  }, [input, mode, standard])

  const copy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight">URL Encoder/Decoder</h1>
        <p className="text-muted-foreground text-sm mt-1">Encode or decode URLs and query string components.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Mode toggle */}
        <div className="flex rounded-md border border-border overflow-hidden text-sm font-medium">
          <button
            onClick={() => setMode('encode')}
            className={[
              'px-3 py-1.5 transition-colors',
              mode === 'encode' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted',
            ].join(' ')}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={[
              'px-3 py-1.5 transition-colors',
              mode === 'decode' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted',
            ].join(' ')}
          >
            Decode
          </button>
        </div>

        {/* Standard toggle */}
        <div className="flex rounded-md border border-border overflow-hidden text-sm font-medium">
          <button
            onClick={() => setStandard('component')}
            className={[
              'px-3 py-1.5 transition-colors',
              standard === 'component' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted',
            ].join(' ')}
          >
            Component
          </button>
          <button
            onClick={() => setStandard('full')}
            className={[
              'px-3 py-1.5 transition-colors',
              standard === 'full' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted',
            ].join(' ')}
          >
            Full URL
          </button>
        </div>

        <button
          onClick={copy}
          disabled={!output}
          className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Standard hint */}
      <p className="text-xs text-muted-foreground mb-4">
        {standard === 'component'
          ? 'Component: encodes all special chars including / and ?. Use for individual query string values.'
          : 'Full URL: preserves / : ? # & = characters. Use for complete URLs.'}
      </p>

      {/* Editors */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {mode === 'encode' ? 'Input' : 'Encoded'}
          </div>
          <CodeEditor
            value={input}
            onChange={setInput}
            hasError={!!error}
            placeholder={mode === 'encode' ? 'Type or paste text to encode...' : 'Paste encoded URL to decode...'}
          />
          {error && (
            <p className="mt-1.5 text-sm text-red-500 font-mono break-words">{error}</p>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {mode === 'encode' ? 'Encoded' : 'Decoded'}
          </div>
          <CodeEditor
            value={output}
            readOnly
            placeholder={mode === 'encode' ? 'Encoded output will appear here...' : 'Decoded output will appear here...'}
          />
        </div>
      </div>
    </div>
  )
}
