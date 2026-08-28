import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client pool:', err);
    });

    console.log('PostgreSQL database pool initialized.');
  } catch (err) {
    console.warn('Failed to initialize PostgreSQL pool, continuing in memory-backed mode:', err);
    pool = null;
  }
} else {
  console.log('No DATABASE_URL configured. Running backend with in-memory persistence mode.');
}

export const db = {
  query: async (text: string, params?: any[]) => {
    if (!pool) {
      return { rows: [] };
    }
    return pool.query(text, params);
  },
  isConnected: () => !!pool,
  getPool: () => pool,
};

export default db;
