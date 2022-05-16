const { getSales, getSalesById, postSale, putSale, deleteSale } = require('./salesController');
const { 
  getProducts, getProductsById, postProduct, putProduct, deleteProduct, 
} = require('./productsController');
    
module.exports = {
    getProducts,
    getProductsById,
    getSales,
    getSalesById,
    postProduct,
    putProduct,
    postSale,
    putSale,
    deleteProduct,
    deleteSale,
  };