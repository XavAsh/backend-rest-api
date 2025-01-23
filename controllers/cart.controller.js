// Simulated cart storage (replace with database logic in a real app)
const cart = [];

// Get the user's cart
const getCart = (req, res) => {
  res.json({ cart });
};

// Add a product to the cart
const addToCart = (req, res) => {
  const { productId, quantity } = req.body;

  // Check if the product is already in the cart
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity; // Update the quantity if already in cart
  } else {
    cart.push({ productId, quantity }); // Add a new item to the cart
  }

  res.json({ message: "Product added to cart", cart });
};

// Update quantities in the cart
const updateCart = (req, res) => {
  const { productId, quantity } = req.body;

  const item = cart.find((item) => item.productId === productId);

  if (!item) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  if (quantity <= 0) {
    // If quantity is zero or less, remove the item from the cart
    cart.splice(cart.indexOf(item), 1);
    return res.json({ message: "Product removed from cart", cart });
  }

  item.quantity = quantity; // Update the quantity
  res.json({ message: "Cart updated", cart });
};

// Remove a product from the cart
const removeFromCart = (req, res) => {
  const { productId } = req.body;

  const itemIndex = cart.findIndex((item) => item.productId === productId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  cart.splice(itemIndex, 1); // Remove the item from the cart
  res.json({ message: "Product removed from cart", cart });
};

// Checkout and create an order
const checkout = (req, res) => {
  const { shippingAddress } = req.body;

  if (cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // Simulate creating an order and clearing the cart
  const order = {
    id: Date.now(),
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.quantity * 10, 0), // Replace 10 with actual product prices
    shippingAddress,
    createdAt: new Date(),
  };

  cart.length = 0; // Clear the cart after checkout

  res.json({ message: "Checkout successful", order });
};

module.exports = { getCart, addToCart, updateCart, removeFromCart, checkout };
