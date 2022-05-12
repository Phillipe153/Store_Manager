const { validateProducts } = require('./productsMiddleware');
const { validateSales } = require('./salesMiddleware');

module.exports = {
    validateProducts,
    validateSales,
};