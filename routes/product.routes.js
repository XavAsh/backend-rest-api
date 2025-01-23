const products = await Product.findAndCountAll({
  where: { stock: { [Op.gt]: 0 }, tags: { [Op.contains]: tags } },
  limit,
  offset,
});
res.json(products);
