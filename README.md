# Dev Journal

Dev Journal is a beginner-friendly full-stack app for tracking daily software engineering learning.  
You can create, edit, delete, and filter journal entries by tag and date.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (Docker)

## Features

- Create journal entries with:
  - title
  - entry date
  - content
  - tags
  - understanding score (1-5)
- View and edit individual entries at `/journal/[id]`
- Delete entries
- Filter dashboard entries by tag and date
- Basic form validation and friendly error states

## Run Locally (Docker + Prisma + Next.js)

### 1) Install dependencies

```bash
npm install
```

### 2) Start PostgreSQL with Docker

```bash
docker compose up -d
```

### 3) Set environment variables

Create `.env` in the project root:

```env
DATABASE_URL="postgresql://devjournal:devjournal@localhost:5432/devjournal?schema=public"
```

### 4) Generate Prisma client + run migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5) (Optional) Seed sample data

```bash
npm run prisma:seed
```

### 6) Run Next.js dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Folder Structure Overview

```text
.
├── prisma/                 # Schema, migrations, and seed script
├── src/
│   ├── app/                # Routes and API handlers (App Router)
│   ├── components/         # Reusable UI components
│   ├── db/                 # Prisma client setup
│   ├── lib/                # Utility helpers
│   ├── services/           # Journal business logic
│   └── types/              # Shared TypeScript types
├── docker-compose.yml      # Local PostgreSQL service
└── README.md
```

## Future Improvements

- Add authentication so each user has private entries
- Add search across titles/content
- Add pagination for larger journals
- Add tests (unit + integration)
- Improve form UX (toasts, autosave, better validation messages)
