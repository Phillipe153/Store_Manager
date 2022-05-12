const { getSales, getSalesById } = require('./salesController');
const { getProducts, getProductsById, postProduct, putProduct } = require('./productsController');
    
module.exports = {
    getProducts,
    getProductsById,
    getSales,
    getSalesById,
    postProduct,
    putProduct,
  };