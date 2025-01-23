const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getProducts); // List all products
router.get("/:id", productController.getProductById); // Get product by ID

module.exports = router;
