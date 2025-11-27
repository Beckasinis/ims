import express from 'express';
import pool from '../db.mjs';

const router = express.Router();

/*
APIet ska hantera följande endpoints:
- GET /products       - för att hämta alla produkter
- GET /products/:id   - för att hämta en specifik produkt
- POST /products      - för att skapa en ny produkt
- PUT /products/:id   - för att uppdatera en befintlig produkt
- DELETE /product/:id - för att ta bort en produkt

Funktioner:
Skapa produkt
Uppdatera produkt
  - Uppdatera pris
  - Uppdatera kategori
Radera produkt 
*/

//GET /products - Hämta alla produkter
router.get('routes/products', async (req, res) => {
  try {
  const result = await getAllProducts();
  //Status 200 OK
   res.status(200).json(result);
  } catch (error) {
    // Om fel, 500 server error
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
});



