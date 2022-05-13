const { validateProducts, idValidate } = require('./productsMiddleware');
const { validateSales, postValidate } = require('./salesMiddleware');

module.exports = {
    validateProducts,
    idValidate,
    validateSales,
    postValidate,
};