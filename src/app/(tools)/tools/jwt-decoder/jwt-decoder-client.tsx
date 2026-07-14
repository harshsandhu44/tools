'use client'

import { useState, useCallback } from 'react'
import { json } from '@codemirror/lang-json'
import { CodeEditor } from '@/components/code-editor'
import { ToolHeader } from '@/components/tool-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

function formatDiff(seconds: number): string {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return [d && `${d}d`, h && `${h}h`, m && `${m}m`].filter(Boolean).join(' ') || '<1m'
}

function decodeBase64Url(str: string): string {
  return atob(str.replace(/-/g, '+').replace(/_/g, '/').padEnd(str.length + ((4 - (str.length % 4)) % 4), '='))
}

interface ExpiryInfo {
  expired: boolean
  diff: number
}

function getExpiryInfo(payload: Record<string, unknown>): ExpiryInfo | null {
  const exp = payload.exp
  if (typeof exp !== 'number') return null
  const now = Math.floor(Date.now() / 1000)
  const diff = exp - now
  return diff > 0 ? { expired: false, diff } : { expired: true, diff: Math.abs(diff) }
}

export function JwtDecoderClient() {
  const [input, setInput] = useState('')
  const [headerJson, setHeaderJson] = useState('')
  const [payloadJson, setPayloadJson] = useState('')
  const [expiry, setExpiry] = useState<ExpiryInfo | null | 'none'>(null)
  const [error, setError] = useState<string | null>(null)
  const [copiedHeader, setCopiedHeader] = useState(false)
  const [copiedPayload, setCopiedPayload] = useState(false)

  const decode = useCallback((token: string) => {
    const trimmed = token.trim()
    if (!trimmed) {
      setHeaderJson('')
      setPayloadJson('')
      setExpiry(null)
      setError(null)
      return
    }

    const parts = trimmed.split('.')
    if (parts.length !== 3) {
      setError('Invalid JWT: expected 3 dot-separated parts')
      setHeaderJson('')
      setPayloadJson('')
      setExpiry(null)
      return
    }

    try {
      const header = JSON.parse(decodeBase64Url(parts[0]))
      const payload = JSON.parse(decodeBase64Url(parts[1]))
      setHeaderJson(JSON.stringify(header, null, 2))
      setPayloadJson(JSON.stringify(payload, null, 2))
      const exp = getExpiryInfo(payload)
      setExpiry(exp ?? 'none')
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setHeaderJson('')
      setPayloadJson('')
      setExpiry(null)
    }
  }, [])

  const handleChange = useCallback((value: string) => {
    setInput(value)
    decode(value)
  }, [decode])

  const copyHeader = useCallback(async () => {
    if (!headerJson) return
    await navigator.clipboard.writeText(headerJson)
    setCopiedHeader(true)
    setTimeout(() => setCopiedHeader(false), 2000)
  }, [headerJson])

  const copyPayload = useCallback(async () => {
    if (!payloadJson) return
    await navigator.clipboard.writeText(payloadJson)
    setCopiedPayload(true)
    setTimeout(() => setCopiedPayload(false), 2000)
  }, [payloadJson])

  const jsonExtensions = [json()]

  return (
    <div className="p-6">
      <ToolHeader
        title="JWT Decoder"
        description="Paste a JWT to decode header and payload. Runs entirely in your browser."
      />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Input */}
        <div className="lg:w-1/2 min-w-0">
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Token
          </div>
          <CodeEditor
            value={input}
            onChange={handleChange}
            hasError={!!error}
            placeholder="Paste your JWT here..."
            height="450px"
          />
          {error && (
            <p className="mt-1.5 text-sm text-red-500 font-mono break-words">{error}</p>
          )}
        </div>

        {/* Output panels */}
        <div className="lg:w-1/2 min-w-0 flex flex-col gap-4">
          {/* Expiry badge */}
          {expiry !== null && (
            <div>
              <div className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Expiry
              </div>
              {expiry === 'none' ? (
                <Badge variant="muted">No expiry claim</Badge>
              ) : expiry.expired ? (
                <Badge variant="danger">Expired {formatDiff(expiry.diff)} ago</Badge>
              ) : (
                <Badge variant="success">Expires in {formatDiff(expiry.diff)}</Badge>
              )}
            </div>
          )}

          {/* Header */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Header</span>
              <Button variant="secondary" size="sm" onClick={copyHeader} disabled={!headerJson}>
                {copiedHeader ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <CodeEditor
              value={headerJson}
              readOnly
              extensions={jsonExtensions}
              placeholder="Header will appear here..."
              height="150px"
            />
          </div>

          {/* Payload */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Payload</span>
              <Button variant="secondary" size="sm" onClick={copyPayload} disabled={!payloadJson}>
                {copiedPayload ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <CodeEditor
              value={payloadJson}
              readOnly
              extensions={jsonExtensions}
              placeholder="Payload will appear here..."
              height="270px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
