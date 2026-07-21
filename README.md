# Ferro Sentry Homepage

Official website for [Ferro Sentry](https://ferrosentry.dev) — an ultralight EDR, continuous posture audit, and security agent written in Rust by [SecuryBlack](https://securyblack.com).

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styles | Tailwind CSS v4 |
| Animations | Framer Motion |
| Deployment | Cloudflare Workers via OpenNext |

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/install` | Installation guide (Linux, Windows) |
| `/docs` | Documentation (Introduction, Quick Start, Configuration, Modules, Rules, Contributing) |
| `/changelog` | Release history |
| `/blog` | Engineering & Security blog |
| `/community` | Community & links |

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build
npm run lint
```

## Deploy (Cloudflare Workers)

```bash
npx opennextjs-cloudflare build   # Builds Next.js + OpenNext adapter
npx wrangler deploy               # Deploys to Cloudflare Workers
```

The site deploys automatically on every push to `main` via Cloudflare CI/CD.

## License

This repository uses a dual license:

- **Source code** (components, scripts, styles) — [MIT](./LICENSE)
- **Written content, documentation and Markdown files** (`.md`, `.mdx`) — [CC BY 4.0](./LICENSE-CONTENT)

© 2026 [SecuryBlack](https://securyblack.com)
