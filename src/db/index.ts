import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import * as schema from './schema.ts';

const connectionString = process.env.DATABASE_URL;

const isValidConnectionString = !!(
  connectionString &&
  (connectionString.startsWith('postgres://') || connectionString.startsWith('postgresql://')) &&
  !connectionString.includes('placeholder') &&
  !connectionString.includes('YOUR_DATABASE_URL')
);

export function isDbConfigured(): boolean {
  return isValidConnectionString;
}

if (!isValidConnectionString) {
  console.warn('⚠️ DATABASE_URL is not defined or is set to a placeholder. The app will run in offline mode (using localStorage/in-memory fallback).');
}

let poolInstance: any = null;
let dbInstance: any = null;

export function getDb() {
  if (!isValidConnectionString) {
    throw new Error('DATABASE_URL is not configured or is invalid. Please define a valid Supabase/PostgreSQL connection URL in your environment secrets.');
  }

  if (!dbInstance) {
    poolInstance = new Pool({
      connectionString,
      connectionTimeoutMillis: 15000,
      ssl: connectionString?.includes('supabase') ? { rejectUnauthorized: false } : undefined,
    });

    poolInstance.on('error', (err: Error) => {
      console.error('Unexpected error on idle SQL pool client:', err);
    });

    dbInstance = drizzle(poolInstance, { schema });
  }

  return dbInstance;
}
