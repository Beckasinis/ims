/*

Webbaserat lagerhanteringssystem - Inventory Management System (IMS)
där användare kan hantera produkter i ett lager

Produkter ska minst bestå av:
- Namn
- Antal (i lager)
- Pris
- Kategori (sträng)

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

const express = require('express');
const app = express ();
const PORT = 3000;

// Middleware som gör att vi kan läsa JSON-data från request body
// Utan denna kan vi inte ta emot data från klienten
app.use(express.json());