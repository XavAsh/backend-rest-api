const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// Routes for products
router.get("/", productController.getProducts); // List all products
router.get("/:id", productController.getProductById); // Get product by ID

module.exports = router;
