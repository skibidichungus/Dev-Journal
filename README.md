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
- Strict server-side API validation
- Automated tests with Vitest

## Daily Use (Start/Stop)
**Important:** PostgreSQL runs locally through Docker. You *must* have Docker and the database container running, otherwise the app will fail to load or save entries!

1. **Start the database:** `docker compose up -d`
2. **Start the app:** `npm run dev`
3. **Stop the app:** Press `Ctrl+C` in your terminal.
4. **(Optional) Stop the database:** `docker compose down`

## Local Setup From Scratch
1. Install dependencies:
```bash
npm install
```

2. Start PostgreSQL:
```bash
docker compose up -d
```

3. Set environment variables:
Create `.env` in the project root:
```env
DATABASE_URL="postgresql://devjournal:devjournal@localhost:5432/devjournal?schema=public"
```

4. Generate schema & run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. (Optional) Seed sample data:
```bash
npm run prisma:seed
```

6. Run the app:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts
- `npm run dev`: Starts the Next.js development server
- `npm run lint`: Runs ESLint to check for code quality issues
- `npm run test`: Runs the Vitest test suite (validations, date logic, etc.)
- `npm run prisma:generate`: Generates Prisma client
- `npm run prisma:migrate`: Runs database migrations
- `npm run prisma:seed`: Seeds local database with sample data
- `npm run prisma:studio`: Opens a local GUI to view your database tables

## Folder Structure Overview
```text
.
├── prisma/                 # Schema, migrations, and seed script
├── src/
│   ├── app/                # Routes and API handlers (App Router)
│   ├── components/         # Reusable UI components
│   ├── db/                 # Prisma client setup
│   ├── lib/                # Utility helpers (date formatting, validation)
│   ├── services/           # Journal business logic
│   └── types/              # Shared TypeScript types
├── tests/                  # Vitest test files
├── docker-compose.yml      # Local PostgreSQL service
└── README.md
```

## Deployment Note
Because this repository uses a local Docker container for PostgreSQL, deploying this app to platforms like Vercel or Render will require providing a `DATABASE_URL` for a remote, hosted PostgreSQL database (like Supabase, Neon, or RDS) in your production environment variables.

## Future Improvements
- Add authentication so each user has private entries.
- Add search across titles/content.
- Add pagination for larger journals.
- Improve form UX (toasts, autosave).
