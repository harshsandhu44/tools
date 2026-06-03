import type { Metadata } from 'next'
import { JsonFormatterClient } from './json-formatter-client'

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator',
  description:
    'Format, validate, and minify JSON online. Syntax highlighting, error detection, copy to clipboard, and download.',
}

export default function JsonFormatterPage() {
  return <JsonFormatterClient />
}
