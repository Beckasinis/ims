/*
Webbased Inventory Management System (IMS)
where user can handle products in an inventory of dog supplies
*/
import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/products.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware 
app.use(express.json()); // Important to be able to read JSON-body

//Routes
app.use('/products', productRoutes);

//Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Lagerhantering Hundartiklar' });
});

//404 handler
app.use((req,res) => {
  res.status(404).json({ error: 'Endpoint hittades inte'})
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});