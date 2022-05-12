const Joi = require('joi');
const service = require('../services/productsService');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
  productId: Joi.number().required(),
});

const validateProducts = async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = PRODUCT.validate({ name, quantity });

  if (error) return res.status(400).json({ message: 'Deu ruim aqui!' });

  next();
  const { id } = req.params;
  const productId = await service.getProductsById(id);
  if (productId.length === 0) return res.status(404).json({ message: 'Product not found' });

  next();
};

module.exports = {
  validateProducts,
};