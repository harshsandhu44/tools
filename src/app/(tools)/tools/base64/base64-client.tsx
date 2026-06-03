'use client'

import { useState, useCallback, useMemo } from 'react'
import { CodeEditor } from '@/components/code-editor'

type Mode = 'encode' | 'decode'

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  bytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

function decodeBase64(text: string): string {
  const binary = atob(text.trim())
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

export function Base64Client() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<Mode>('encode')
  const [copied, setCopied] = useState(false)

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: null }
    try {
      return { output: mode === 'encode' ? encodeBase64(input) : decodeBase64(input), error: null }
    } catch (e) {
      return { output: '', error: (e as Error).message }
    }
  }, [input, mode])

  const copy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight">Base64 Encoder/Decoder</h1>
        <p className="text-muted-foreground text-sm mt-1">Encode text to Base64 or decode Base64 back to plain text.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
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

        <button
          onClick={copy}
          disabled={!output}
          className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Editors */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {mode === 'encode' ? 'Plain Text' : 'Base64'}
          </div>
          <CodeEditor
            value={input}
            onChange={setInput}
            hasError={!!error}
            placeholder={mode === 'encode' ? 'Type or paste text to encode...' : 'Paste Base64 to decode...'}
          />
          {error && (
            <p className="mt-1.5 text-sm text-red-500 font-mono break-words">{error}</p>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {mode === 'encode' ? 'Base64' : 'Plain Text'}
          </div>
          <CodeEditor
            value={output}
            readOnly
            placeholder={mode === 'encode' ? 'Base64 output will appear here...' : 'Decoded text will appear here...'}
          />
        </div>
      </div>
    </div>
  )
}
