const Joi = require('joi');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
  // productId: Joi.number().required(),
});

const validateProducts = (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = PRODUCT.validate({ name, quantity });
 
  if (error) {
    if (error.details[0].type === 'string.min' || error.details[0].type === 'number.min') {
      return next({ status: 422, message: error.message });
    }
     return next({ status: 400, message: error.message });
    } 

  next();
};

const idValidate = (req, res, next) => {
  const { id } = req.params;

  console.log(id);

  next();
};

module.exports = {
  validateProducts,
  idValidate,
};