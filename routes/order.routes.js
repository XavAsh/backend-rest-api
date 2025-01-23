const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/order.controller");

// Routes for order operations
router.get("/", ordersController.getOrders); // Get all orders for a client
router.get("/:orderId", ordersController.getOrderById); // Get specific order by ID
router.post("/", ordersController.createOrder); // Create a new order
router.delete("/:orderId", ordersController.cancelOrder); // Cancel an order

module.exports = router;
