// Renomeie esse arquivo
const model = require('../models/productsModel');

const getProducts = async () => {
    const getAll = await model.getProducts();
    return getAll;
};

const erroHandler = (status, message) => ({
    status,
    message,
  });
const getProductsById = async (id) => {
    const [getProduct] = await model.getProductsById(id);

    if (!getProduct) throw erroHandler(404, 'Product not found');

    return getProduct;
};

const addProduct = async (name, quantity) => {
    const newProduct = await model.addProduct(name, quantity);
    return newProduct;
};

const toUpdateProduct = async (name, quantity, id) => {
    const [updatedProduct] = await model.toUpdateProduct(name, quantity, id);
    return updatedProduct;
};

module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    toUpdateProduct,
  };