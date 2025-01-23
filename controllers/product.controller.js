const getProducts = (req, res) => {
  // Logic to fetch all products (paginated)
  res.json({ message: "List of products" });
};

const getProductById = (req, res) => {
  const { id } = req.params;
  // Logic to fetch product details by ID
  res.json({ message: `Product details for ID: ${id}` });
};

module.exports = { getProducts, getProductById };
