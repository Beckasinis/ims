// Database connection
import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import productsRouter from "./routes/products.mjs";

dotenv.config();

const app = express();
app.use(express.json()); // Important to be able to read JSON-body
app.use("/products", productsRouter);

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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