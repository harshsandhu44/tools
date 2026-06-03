'use client'

import { useState, useCallback } from 'react'
import { json } from '@codemirror/lang-json'
import { CodeEditor } from '@/components/code-editor'

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
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight">JWT Decoder</h1>
        <p className="text-muted-foreground text-sm mt-1">Paste a JWT to decode header and payload. Runs entirely in your browser.</p>
      </div>

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
                <div className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-muted text-muted-foreground">
                  No expiry claim
                </div>
              ) : expiry.expired ? (
                <div className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  Expired {formatDiff(expiry.diff)} ago
                </div>
              ) : (
                <div className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Expires in {formatDiff(expiry.diff)}
                </div>
              )}
            </div>
          )}

          {/* Header */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Header</span>
              <button
                onClick={copyHeader}
                disabled={!headerJson}
                className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copiedHeader ? 'Copied!' : 'Copy'}
              </button>
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
              <button
                onClick={copyPayload}
                disabled={!payloadJson}
                className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copiedPayload ? 'Copied!' : 'Copy'}
              </button>
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
