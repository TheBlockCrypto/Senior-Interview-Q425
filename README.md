# 📝 Networked Todo App - Interview Project

This is a public/networked todo application built with Nuxt 4, featuring SQLite database, Drizzle ORM, and unstorage caching. Perfect for interview coding challenges!

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Initialize database and start development server:
```bash
npm run init
```

3. Test the API endpoint:
```bash
curl http://localhost:3000/api/ping
```

## Tech Stack

- **Nuxt 4** - Frontend framework
- **Nitro** - Backend server
- **SQLite** - Database (app.db)
- **Drizzle ORM** - Database ORM
- **unstorage** - Caching layer

## Project Structure

```
├── lib/
│   ├── db/
│   │   ├── index.ts          # Database connection
│   │   ├── schema.ts         # Database schema
│   │   ├── migrate.ts        # Migration runner
│   │   └── migrations/       # Generated migrations
│   └── cache.ts              # Caching utilities
├── server/
│   └── api/
│       └── ping.get.ts       # Test API endpoint
└── app.db                    # SQLite database file
```

## Database Commands

Generate new migration after schema changes:
```bash
npm run db:generate
```

Apply migrations:
```bash
npm run db:push
```

## Features

🎯 **Complete Todo System**
- Users can create, view, and manage todos
- Priority levels (high, medium, low)
- Due dates with overdue detection
- User assignment and role management

🔗 **Public API**
- REST endpoints for todos and users
- Caching layer with TTL
- Error handling and validation

🎨 **Modern UI**
- Responsive design with Tailwind CSS
- Loading states and error boundaries
- SEO-friendly pages

## API Endpoints

### GET /api/ping
Health check endpoint with database and cache testing

### GET /api/todos/:id  
Fetch a specific todo with user information

### GET /api/users/:id
Fetch user profile information

## Sample URLs

After running `npm run init`, try these URLs:
- `http://localhost:3000` - Homepage with links to sample data
- `http://localhost:3000/todos/1` - View todo #1
- `http://localhost:3000/users/1` - View user profile #1
- `http://localhost:3000/api/ping` - Test API health

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
