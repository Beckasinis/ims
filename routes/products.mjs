import express from 'express';
import { validateString, validateNumber } from "../utilities/validation.mjs";
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../models/functions.mjs';

const router = express.Router();

/*
APIet must handle these endpoints:
- GET /products       - to get all products
- GET /products/:id   - to get one specific product
- POST /products      - to create a new product
- PUT /products/:id   - to update a product
- DELETE /product/:id - to delete a product
*/

// GET /products - Get all products
router.get('/', async (req, res) => {
  try {
  const product = await getAllProducts();

  //Status 200 OK
  res.status(200).json(product);
  } catch (error) {

  // If wrong, 500 server error
  console.log(error);
  res.status(500).json({ error: "An unexpected error occurred." });
  return;
  }
});

// GET /products/:id - Get one specific product
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      res.status(400).json({ error: "Invalid product id" });
      return;
    }

    // Get product from database
    const product = await getProduct(id);
    
    if (!product) {

    // If product are not found, return 404
    res.status(404).json({ error: "Product not found" });
    return;
    }

    // If found, 200 OK
    res.status(200).json(product);
    return;

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
});

// POST /products - Create new product
router.post('/', async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;

    // Validate strings
    if (!validateString(name) || !validateString(category)) {
      res.status(400).json({
        error: "Name and category must be non-empty strings"
      });
      return 
    }

    // Validate number
    if (!validateNumber(quantity) || !validateNumber(price)) {
      res.status(400).json({
        error: "Quantity and price must be valid numbers"
      });
      return 
    }

    // Check for positive numbers
    if (quantity < 0 || price < 0) {
      res.status(400).json({
        error: "Quantity and price must be positive numbers"
      });
      return 
    }

    // Database
    const product = await createProduct ({ name, quantity, price, category});

    res.status(201).json(product);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create new product" });
  }
});
  
// PUT /products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      res.status(400).json({ error: "Invalid product id" });
      return 
    } 

    const { name, quantity, price, category } = req.body;

    // Validate strings
    if (!validateString(name) || !validateString(category)) {
      res.status(400).json({
        error: "Name and category must be non-empty strings"
      });
      return 
    }

    // Validate numbers
    if (!validateNumber(quantity) || !validateNumber(price) || quantity < 0 || price < 0) {
      res.status(400).json({
        error: "Quantity and price must be valid numbers"
      });
      return 
    }

    // Check if product are found
    const existing = await getProduct(id);

    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update to database
    const product = await updateProduct(id, {name, quantity, price, category});
    res.status(200).json(product);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not update product" });
  }
});

// DELETE /products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      res.status(400).json({ error: "Invalid product id" });
      return;
    }
    
    const existing = await getProduct(id);
    if (!existing) {
      res.status(404).json({ error: "Product not found" });
      return
    }

    await deleteProduct(id);
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not delete product" });
  }
});

export default router;