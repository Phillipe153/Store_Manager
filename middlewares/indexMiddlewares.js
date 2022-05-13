const { validateProducts, idValidate } = require('./productsMiddleware');
const { validateSales } = require('./salesMiddleware');

module.exports = {
    validateProducts,
    idValidate,
    validateSales,
};