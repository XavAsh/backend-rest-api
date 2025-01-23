const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

// Routes for cart operations
router.get("/", cartController.getCart); // Get the user's cart
router.post("/add", cartController.addToCart); // Add a product to the cart
router.put("/update", cartController.updateCart); // Update quantities in the cart
router.delete("/remove", cartController.removeFromCart); // Remove a product from the cart
router.post("/checkout", cartController.checkout); // Checkout and create an order

module.exports = router;
