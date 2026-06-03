import type { Metadata } from 'next'
import { JwtDecoderClient } from './jwt-decoder-client'

export const metadata: Metadata = {
  title: 'JWT Decoder',
  description: 'Decode and inspect JWT tokens client-side. View header, payload claims, and expiry status without sending your token anywhere.',
}

export default function JwtDecoderPage() {
  return <JwtDecoderClient />
}
