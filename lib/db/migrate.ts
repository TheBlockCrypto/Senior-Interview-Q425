import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from './index'

migrate(db, { migrationsFolder: './lib/db/migrations' })
console.log('Database migrated successfully')