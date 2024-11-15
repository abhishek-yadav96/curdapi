const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productmodels'); // Import the Product model
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json()); // This ensures you can access req.body

// Set up a basic route for the API
app.get('/', (req, res) => {
  res.send('Hello Node API!');
});

// Set up a route for the blog endpoint
app.get('/blog', (req, res) => {
  res.send('Hello Blog, My Name is Abhishek Yadav');
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL
    const product = await Product.findById(id); // Find the product by its ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // If no product found, return 404
    }
    res.status(200).json(product); // If product is found, return it
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});


// Add a new product
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body); // Creates a new product using the request body
    res.status(201).json(product); // Respond with the created product
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});


// Update a product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from URL
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true }); // Update the product by its ID
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found` }); // If not found, return 404
    }
    res.status(200).json(product); // Return the updated product
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});


// Delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from URL
    const product = await Product.findByIdAndDelete(id); // Delete the product by its ID
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found` }); // If not found, return 404
    }
    res.status(200).json(product); // Return the deleted product data
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});


// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/nodeapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Node API app is running on port ${port}`);
});
