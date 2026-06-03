export type Tool = {
  name: string
  slug: string
  description: string
  category: string
}

export const tools: Tool[] = [
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, validate, and minify JSON with syntax highlighting.',
    category: 'JSON',
  },
  {
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JWT tokens. See header, payload, and expiry status.',
    category: 'Security',
  },
  {
    name: 'Base64 Encoder/Decoder',
    slug: 'base64',
    description: 'Encode text to Base64 or decode Base64 back to plain text.',
    category: 'Encoders',
  },
  {
    name: 'URL Encoder/Decoder',
    slug: 'url-encoder',
    description: 'Encode or decode URL components using encodeURIComponent or encodeURI.',
    category: 'Encoders',
  },
]
