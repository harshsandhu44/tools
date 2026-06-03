'use client'

import CodeMirror from '@uiw/react-codemirror'
import { useTheme } from 'next-themes'
import type { Extension } from '@uiw/react-codemirror'

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
  hasError?: boolean
  placeholder?: string
  height?: string
  extensions?: Extension[]
}

export function CodeEditor({
  value,
  onChange,
  readOnly,
  hasError,
  placeholder,
  height = '450px',
  extensions = [],
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme()

  return (
    <div
      className={[
        'rounded-md border overflow-hidden transition-colors',
        hasError ? 'border-red-500 ring-1 ring-red-500' : 'border-border',
      ].join(' ')}
    >
      <CodeMirror
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        extensions={extensions}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        placeholder={placeholder}
        height={height}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
        }}
      />
    </div>
  )
}
