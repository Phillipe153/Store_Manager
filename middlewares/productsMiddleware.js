const Joi = require('joi');
// const service = require('../services/productsService');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
  // productId: Joi.number().required(),
});

// const erroHandler = (status, message) => ({
//   status,
//   message,
// });

const validateProducts = (req, res, next) => {
  // const { id } = req.params;
  const { name, quantity } = req.body;

  const { error } = PRODUCT.validate({ name, quantity });
  console.log(error.details[0].type);
  if (error.details[0].type === 'string.min' || error.details[0].type === 'number.min') {
    return next({ status: 422, message: error.message });
  } 
  if (error) return next({ status: 400, message: error.message });

  next();
};

module.exports = {
  validateProducts,
};