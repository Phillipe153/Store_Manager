const { getSales, getSalesById } = require('./salesModel');
const { getProducts, getProductsById } = require('./productsModel');
    
module.exports = {
    getProducts,
    getProductsById,
    getSales,
    getSalesById,
  };