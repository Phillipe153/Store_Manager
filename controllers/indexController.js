const { getSales, getSalesById } = require('./salesController');
const { getProducts, getProductsById, postProduct } = require('./productsController');
    
module.exports = {
    getProducts,
    getProductsById,
    getSales,
    getSalesById,
    postProduct,
  };