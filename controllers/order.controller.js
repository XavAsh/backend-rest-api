// Simulated orders storage (replace with database logic in a real app)
const orders = [];

// Get all orders for a user
const getOrders = (req, res) => {
  const userId = req.userId || 1; // Replace with authenticated user logic
  const userOrders = orders.filter((order) => order.userId === userId);
  res.json({ orders: userOrders });
};

// Get a specific order by ID
const getOrderById = (req, res) => {
  const { orderId } = req.params;
  const order = orders.find((order) => order.id === parseInt(orderId));

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json({ order });
};

// Create a new order
const createOrder = (req, res) => {
  const { items, total, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in the order" });
  }

  const newOrder = {
    id: Date.now(),
    userId: req.userId || 1, // Replace with authenticated user logic
    items,
    total,
    shippingAddress,
    createdAt: new Date(),
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Order created", order: newOrder });
};

// Cancel an order
const cancelOrder = (req, res) => {
  const { orderId } = req.params;
  const orderIndex = orders.findIndex(
    (order) => order.id === parseInt(orderId)
  );

  if (orderIndex === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  orders.splice(orderIndex, 1);
  res.json({ message: "Order canceled" });
};

module.exports = { getOrders, getOrderById, createOrder, cancelOrder };
