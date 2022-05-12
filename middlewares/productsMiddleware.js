const service = require('../services/productsService');

const validateProducts = async (req, res, next) => {
  const { id } = req.params;
  const productId = await service.getProductsById(id);
  console.log(productId);
  if (productId.length === 0) return res.status(404).json({ message: 'Product not found' });

  next();
};

module.exports = {
  validateProducts,
};