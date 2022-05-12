// Renomeie esse arquivo
// const app = require('../app');
const service = require('../services/productsService');

const OK = 200;

const getProducts = async (_req, res) => {
  const allProducts = await service.getProducts();

  return res.status(200).json(allProducts);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await service.getProductsById(id);
  return res.status(OK).json(product);
};

const postProduct = async (req, res) => {
  const { name, quantity } = req.body;

  await service.addProduct(name, quantity);
  return res.status(OK).json({ message: 'Produto cadastrado com sucesso' });
};

module.exports = {
  getProducts,
  getProductsById,
  postProduct,
};