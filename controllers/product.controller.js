const Product = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getProducts = (req, res) => {
  res.json({ message: "List of products" });
};

const getProductById = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Product details for ID: ${id}` });
};

module.exports = { getProducts, getProductById };
