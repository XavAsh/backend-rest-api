const Order = require("../models/order.model");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve order" });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.destroy();
    return res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to cancel order" });
  }
};

// Existing createOrder method remains the same
exports.createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body;

    // Validate input
    if (!userId || !productId || !quantity || !totalPrice) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create order
    const newOrder = await Order.create({
      userId,
      productId,
      quantity,
      totalPrice,
    });
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create order." });
  }
};
