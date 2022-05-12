// Renomeie esse arquivo
const model = require('../models/productsModel');

const getProducts = async () => {
    const getAll = await model.getProducts();
    return getAll;
};

const getProductsById = async (id) => {
    const getProduct = await model.getProductsById(id);
    return getProduct;
};

const getSales = async () => {
    const getAll = await model.getSales();
    return getAll;
};

const getSalesById = async (id) => {
    const getSale = await model.getSalesById(id);
    return getSale;
};

module.exports = {
    getProducts,
    getProductsById,
    getSales,
    getSalesById,
  };