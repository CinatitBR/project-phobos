import pkg from 'pg';

const { Pool } = pkg;
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ...(process.env.NODE_ENV === 'production' && 
    {
      ssl: {
        rejectUnauthorized: false
      }
    }
  ) // Add SSL conditionally
})

const test = async () => {
  const { rows } = await pool.query('SELECT NOW()');

  console.log({ time: rows[0] });
}

test();

export default pool;