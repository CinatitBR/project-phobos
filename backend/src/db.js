import pkg from 'pg';

const { Pool } = pkg;
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString
})

const test = async () => {
  const { rows } = await pool.query('SELECT NOW()');

  console.log({ time: rows[0] });
}

test();

export default pool;