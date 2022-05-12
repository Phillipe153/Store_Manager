// Renomeie esse arquivo
// const app = require('../app');
const service = require('../services/productsService');

const OK = 200;

const getProducts = async (_req, res) => {
  const allProducts = await service.getProducts();

  return res.status(200).json(allProducts);
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getProductsById(id);
    return res.status(OK).json(product);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    console.log('1');
    const newProduct = await service.addProduct(name, quantity);
    const newProductById = await service.getProductsById(newProduct.insertId);
    return res.status(201).json(newProductById);
  } catch (err) {
    console.log('err');
    return res.status(err.status).json({ message: err.message });
  }
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = service.toUpdateProduct(name, quantity, id);
  return res.status(OK).json(updatedProduct);
}; 

module.exports = {
  getProducts,
  getProductsById,
  postProduct,
  putProduct,
};