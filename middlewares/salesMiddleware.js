const Joi = require('joi');

// const service = require('../services/salesService');

const SALES = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().integer().required(),
});

const validateSales = (req, res, next) => {
  const { productId, quantity } = req.body;

  const { error } = SALES.validate({ productId, quantity });
  // console.log(error);
  if (error) {
    if (error.details[0].type === 'number.min') {
      return next({ status: 422, message: error.message });
    } 
    return next({ status: 400, message: error.message });
  }

  next();
};
module.exports = {
  validateSales,
};