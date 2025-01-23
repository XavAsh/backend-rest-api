// Simulated products and tags storage (replace with database logic in a real app)
const products = [];
const tags = [];

// Add a new product
const addProduct = (req, res) => {
  const { title, price, description, stock, tags: productTags } = req.body;

  if (!title || !price || !stock) {
    return res
      .status(400)
      .json({ message: "Title, price, and stock are required" });
  }

  const newProduct = {
    id: Date.now(),
    title,
    price,
    description,
    stock,
    tags: productTags || [],
    createdAt: new Date(),
  };

  products.push(newProduct);
  res.status(201).json({ message: "Product added", product: newProduct });
};

// Update a product
const updateProduct = (req, res) => {
  const { productId } = req.params;
  const { title, price, description, stock, tags: productTags } = req.body;

  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Update product fields
  if (title) product.title = title;
  if (price) product.price = price;
  if (description) product.description = description;
  if (stock !== undefined) product.stock = stock;
  if (productTags) product.tags = productTags;

  res.json({ message: "Product updated", product });
};

// Delete a product
const deleteProduct = (req, res) => {
  const { productId } = req.params;
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(productId)
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);
  res.json({ message: "Product deleted" });
};

// Add a new tag
const addTag = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Tag name is required" });
  }

  const newTag = {
    id: Date.now(),
    name,
    createdAt: new Date(),
  };

  tags.push(newTag);
  res.status(201).json({ message: "Tag added", tag: newTag });
};

// Delete a tag
const deleteTag = (req, res) => {
  const { tagId } = req.params;
  const tagIndex = tags.findIndex((tag) => tag.id === parseInt(tagId));

  if (tagIndex === -1) {
    return res.status(404).json({ message: "Tag not found" });
  }

  tags.splice(tagIndex, 1);
  res.json({ message: "Tag deleted" });
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  addTag,
  deleteTag,
};
