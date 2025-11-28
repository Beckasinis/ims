// Database connection
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

//Check database
pool.query('SELECT NOW()', (err,res ) => {
  if (err) {
    console.log('Databasanslutning misslyckades:',err);
  } else {
    console.log('Ansluten till PostgreSQL:', res.rows[0].now);
  }
});

export default pool;