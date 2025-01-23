const order = await Order.create({
  userId,
  total: calculateTotal(cartItems),
  deliveryAddress,
});
updateStock(cartItems);
