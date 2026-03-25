# Inventory Management App

This is an Inventory Management application built with Next.js and TypeScript. It uses SQLite as the default database via Prisma ORM.

## Features

- Product, order, vendor, and invoice management
- Cart and quotation support
- Modern UI with Tailwind CSS
- Modular and extensible codebase

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd inventory-management
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Database Setup

By default, the app uses SQLite. To use another database, update the `provider` in `prisma/schema.prisma` and set the `DATABASE_URL` in your `.env` file.

1. Set your database URL in `.env`:
   ```env
   DATABASE_URL="file:./dev.db"
   # or for another provider, e.g. PostgreSQL
   # DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   ```
2. Change the provider in `prisma/schema.prisma` if needed:
   ```prisma
   datasource db {
     provider = "sqlite" # Change to "postgresql" or other if needed
     url      = env("DATABASE_URL")
   }
   ```
3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

### Running the App

Start the development server:

```bash
npm run dev
# or

```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Customization

- Update database provider and connection string as needed.
- Modify UI and features in the `components/` and `app/` directories.

## License

MIT
