# Tools

A personal web app for a cluster of everyday developer and productivity tools, hosted at [tools.harshsandhu.com](https://tools.harshsandhu.com).

The goal is to provide fast, focused utilities in one place without needing to rely on random third-party websites for common formatting, comparison, encoding, decoding, and conversion tasks.

## Planned Tools

### JSON

- JSON formatter and validator
- JSON compare
- JSON tree viewer

### Diff and Compare

- Diff checker
- Text compare
- Document compare
- Image compare

### Images

- Image to Base64 converter
- Image comparison utilities

### Text and URLs

- URL slug generator
- Encoders and decoders

### Security and Tokens

- Encrypt and decrypt utilities
- JWT encoder and decoder

## Product Direction

- Keep tools quick to access and easy to use.
- Prefer client-side processing where practical, especially for sensitive data.
- Make each tool focused, with clear input, output, copy, reset, and download actions where relevant.
- Group related tools so the app stays easy to scan as the toolset grows.

## Tech Stack

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Deployment

Production will be hosted at:

```text
https://tools.harshsandhu.com
```
