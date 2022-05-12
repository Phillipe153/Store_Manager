const { getSales, getSalesById } = require('./salesController');
const { getProducts, getProductsById } = require('./productsController');
    
module.exports = {
    getProducts,
    getProductsById,
    getSales,
    getSalesById,
  };