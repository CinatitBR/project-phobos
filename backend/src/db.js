import pkg from 'pg';

const { Pool } = pkg;
const connectionString = process.env.DATABASE_URI;

export const pool = new Pool({
  connectionString
})

export default pool;