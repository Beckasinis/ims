//databaskoppling

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


//Testa databasen
pool.query('SELECT NOW()', (err,res ) => {
  if (err) {
    console.error('Databasanslutning misslyckades:',err);
  } else {
    console.log('Ansluten till PostgreSQL:', res.rows[0].now);
  }
});

export default pool;