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
]
