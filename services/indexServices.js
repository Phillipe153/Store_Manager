const { getSales, getSalesById } = require('./salesService');
const { getProducts, getProductsById } = require('./productsService');
    
module.exports = {
    getProducts,
    getProductsById,
    getSales,
    getSalesById,
  };