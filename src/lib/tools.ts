import { FileJson, KeyRound, Binary, Link2, type LucideIcon } from 'lucide-react'

export type Tool = {
  name: string
  slug: string
  description: string
  category: string
  icon: LucideIcon
}

export const tools: Tool[] = [
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, validate, and minify JSON with syntax highlighting.',
    category: 'JSON',
    icon: FileJson,
  },
  {
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JWT tokens. See header, payload, and expiry status.',
    category: 'Security',
    icon: KeyRound,
  },
  {
    name: 'Base64 Encoder/Decoder',
    slug: 'base64',
    description: 'Encode text to Base64 or decode Base64 back to plain text.',
    category: 'Encoders',
    icon: Binary,
  },
  {
    name: 'URL Encoder/Decoder',
    slug: 'url-encoder',
    description: 'Encode or decode URL components using encodeURIComponent or encodeURI.',
    category: 'Encoders',
    icon: Link2,
  },
]

export const comingSoon: { name: string; category: string }[] = [
  { name: 'JSON Compare', category: 'JSON' },
  { name: 'JSON Tree Viewer', category: 'JSON' },
  { name: 'Diff Checker', category: 'Compare' },
  { name: 'Image → Base64', category: 'Images' },
  { name: 'URL Slug Generator', category: 'Text' },
  { name: 'Encrypt / Decrypt', category: 'Security' },
  { name: 'JWT Encoder', category: 'Security' },
]
