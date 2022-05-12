// Renomeie esse arquivo
// const app = require('../app');
const service = require('../services/productsService');

const getProducts = async (_req, res) => {
  const allProducts = await service.getProducts();

  return res.status(200).json(allProducts);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await service.getProductsById(id);
  return res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProductsById,
};