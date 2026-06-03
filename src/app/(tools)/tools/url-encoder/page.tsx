import type { Metadata } from 'next'
import { UrlEncoderClient } from './url-encoder-client'

export const metadata: Metadata = {
  title: 'URL Encoder/Decoder',
  description: 'Encode or decode URL components using encodeURIComponent or encodeURI. Useful for debugging query strings and API paths.',
}

export default function UrlEncoderPage() {
  return <UrlEncoderClient />
}
