'use client'

import { useState, useCallback, useMemo } from 'react'
import { CodeEditor } from '@/components/code-editor'
import { ToolHeader } from '@/components/tool-header'
import { Button } from '@/components/ui/button'
import { SegmentedControl } from '@/components/ui/toggle-group'

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
      <ToolHeader
        title="URL Encoder/Decoder"
        description="Encode or decode URLs and query string components."
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SegmentedControl
          value={mode}
          onChange={setMode}
          options={[
            { value: 'encode', label: 'Encode' },
            { value: 'decode', label: 'Decode' },
          ]}
        />

        <SegmentedControl
          value={standard}
          onChange={setStandard}
          options={[
            { value: 'component', label: 'Component' },
            { value: 'full', label: 'Full URL' },
          ]}
        />

        <Button variant="secondary" size="sm" onClick={copy} disabled={!output} className="ml-auto">
          {copied ? 'Copied!' : 'Copy'}
        </Button>
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
