import type { Metadata } from 'next'
import { Base64Client } from './base64-client'

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder',
  description: 'Encode text to Base64 or decode Base64 back to plain text. Handles Unicode. Runs entirely in your browser.',
}

export default function Base64Page() {
  return <Base64Client />
}
