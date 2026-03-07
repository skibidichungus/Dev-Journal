# Dev Jouurnal

Dev Journal is a Next.js App Router project for tracking daily software engineering learning.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint
- `src/` directory layout enabled

## Project Structure

All core code lives in `src/`:

- `src/app` - Routes, layouts, and server components for pages.
- `src/components` - Reusable UI components shared across routes.
- `src/lib` - Framework-agnostic utilities and helpers.
- `src/services` - Business logic and application use-cases.
- `src/db` - Database client setup and data access wiring.
- `src/types` - Shared TypeScript types and domain models.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Checks

Run before deployment:

```bash
npm run lint
npm run build
```
