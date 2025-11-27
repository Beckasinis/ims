/*
Webbaserat lagerhanteringssystem - Inventory Management System (IMS)
där användare kan hantera produkter i ett lager

Produkter ska minst bestå av:
- Namn
- Antal (i lager)
- Pris
- Kategori (sträng)
*/
import express from 'express';
import dotenv from 'dotenv';
import pool from './db.mjs';
import productRoutes from './routes/products.mjs';

dotenv.config();

const app = express ();
const PORT = process.env.PORT || 3000;

// Middleware som gör att vi kan läsa JSON-data från request body
// Utan denna kan vi inte ta emot data från klienten
app.use(express.json());

//Routes
app.use('/products', productRoutes);

//Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Lagerhantering Hundartiklar',
    endpoints: {
      getAllProducts: 'GET /products',
      getProduct: 'GET /products/:id',
      createProduct: 'POST /products',
      updateProduct: 'PUT /products/:id'
      deleteProduct: 'DELETE /products/:id'
    }
  });
});

//404 handler
app.use((req,res) => {
  res.status(404).json({ error: 'Endpoint hittades inte'})
});

app.listen(PORT, () => {
  console.log('Server körs på http://localhost:${PORT}');
});