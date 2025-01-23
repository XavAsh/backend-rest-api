const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// Routes for admin operations
router.post("/products", adminController.addProduct); // Add a new product
router.put("/products/:productId", adminController.updateProduct); // Update a product
router.delete("/products/:productId", adminController.deleteProduct); // Delete a product
router.post("/tags", adminController.addTag); // Add a new tag
router.delete("/tags/:tagId", adminController.deleteTag); // Delete a tag

module.exports = router;
