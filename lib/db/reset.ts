import { db } from './index'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

// Drop existing tables
console.log('Dropping existing tables...')
db.run('DROP TABLE IF EXISTS todos')
db.run('DROP TABLE IF EXISTS users')
db.run('DROP TABLE IF EXISTS __drizzle_migrations')

// Re-run migrations
console.log('Running migrations...')
migrate(db, { migrationsFolder: './lib/db/migrations' })

console.log('Database reset successfully')