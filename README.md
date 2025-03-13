# Product/Quote Management

A comprehensive client management and quotation platform that helps track clients, products, and create professional quotes.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org) with App Router
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Authentication**: Supabase Auth (migration to Clerk planned)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Deployment**: Vercel

## Features

- Client management
- Product catalog with search
- Quote creation and management
- Dashboard with analytics
- User authentication and account management

## Development Setup

### Prerequisites

- Node.js (v18+)
- Docker (for local Supabase)
- npm, pnpm, yarn, or bun

### Setting up Supabase locally

1. Install the Supabase CLI:
```bash
npm install -g supabase
```

2. Start the local Supabase:
```bash
supabase start
```

3. Apply migrations:
```bash
supabase migration up
```

4. Seed the database:
```bash
supabase db reset
```

### Running the app

1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn
```

2. Copy the `.env.example` file to `.env.local` and fill in the required values.

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Planned Features

- **Python Web Scraper**: Automatically fetch and update product information
- **Automated Reminders**: Send notifications for upcoming quote due dates
- **Stock Notifications**: Alert when products go out of stock
- **Invoice Generation**: Convert quotes to invoices
- **Analytics Dashboard**: Enhanced reporting and visualization

## Database

The project uses Supabase with tables for clients, products, quotes, and users.