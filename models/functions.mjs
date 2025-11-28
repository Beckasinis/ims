import pool from '../db.mjs';

// Hämta alla produkter
export async function getAllProducts() {
  const result = await pool.query('SELECT * FROM products');
  return result.rows;
}

// Hämta en produkt via id
export async function getProduct(id) {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0]; // returnerar ett objekt eller undefined
}

// Skapa en ny produkt
export async function createProduct({ name, quantity, price, category }) {
  const result = await pool.query(
    'INSERT INTO products (name, quantity, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, quantity, price, category]
  );
  return result.rows[0];
}

// Uppdatera produkt
export async function updateProduct(id, { name, quantity, price, category }) {
  const result = await pool.query(
    'UPDATE products SET name=$1, quantity=$2, price=$3, category=$4 WHERE id=$5 RETURNING *',
    [name, quantity, price, category, id]
  );
  return result.rows[0];
}

// Ta bort produkt
export async function deleteProduct(id) {
  await pool.query('DELETE FROM products WHERE id=$1', [id]);
  return true;
}
